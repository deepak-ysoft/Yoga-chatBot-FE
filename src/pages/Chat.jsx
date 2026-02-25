import {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  useSearchParams,
  Link,
} from "react-router-dom";
import ZenNav from "../components/layout/ZenNav";
import {
  motion as _motion,
  AnimatePresence,
} from "framer-motion";
import ConfirmModal from "../components/ui/ConfirmModal";
import {
  Send,
  Plus,
  Loader2,
  Sparkles,
  User,
  History,
  Trash2,
  ChevronLeft,
  Share2,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import { GrYoga } from "react-icons/gr";

const Chat = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();
  const sessionId = searchParams.get("session");

  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);
  const [
    deleteSessionModal,
    setDeleteSessionModal,
  ] = useState({ isOpen: false, id: null });
  const [
    deleteMessageModal,
    setDeleteMessageModal,
  ] = useState({ isOpen: false, id: null });
  const [shareToast, setShareToast] =
    useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    fetchSessions();
    if (sessionId) {
      fetchHistory(sessionId);
    } else {
      setMessages([]);
    }
  }, [sessionId]);

  const fetchSessions = async () => {
    try {
      const response = await api.get(
        "/chat/sessions",
      );
      setSessions(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/chat/history/${id}`,
      );
      setMessages(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      role: "User",
      message: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        `${api.defaults.baseURL}/chat/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            Message: input,
            sessionId: sessionId || null,
          }),
        },
      );

      if (!response.ok)
        throw new Error("Failed to send");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [
        ...prev,
        { role: "Assistant", message: "" },
      ]);

      let lineBuffer = "";
      while (true) {
        const { value, done } =
          await reader.read();
        if (done) break;

        lineBuffer += decoder.decode(value, {
          stream: true,
        });
        const lines = lineBuffer.split("\n");

        // Keep the last incomplete line in the buffer
        lineBuffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (
            !trimmedLine ||
            !trimmedLine.startsWith("data: ")
          )
            continue;

          const jsonStr = trimmedLine.replace(
            "data: ",
            "",
          );
          if (jsonStr === "[DONE]") continue;

          try {
            const data = JSON.parse(jsonStr);
            const content = data.text;
            if (content && content !== "[DONE]") {
              assistantContent += content;

              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[
                  newMessages.length - 1
                ].message = assistantContent;
                return newMessages;
              });
            }
          } catch (e) {
            console.warn(
              `Stream line parse fail, ${e.message}:`,
              line,
            );
          }
        }
      }

      await fetchSessions();
      const newSessionId = response.headers.get(
        "X-Session-Id",
      );
      if (newSessionId) {
        setSearchParams({
          session: newSessionId,
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "Assistant",
          message:
            "The divine flow was interrupted. Please try re-sending.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDeleteSession = async () => {
    if (!deleteSessionModal.id) return;
    try {
      await api.delete(
        `/chat/sessions/${deleteSessionModal.id}`,
      );
      fetchSessions();
      if (sessionId === deleteSessionModal.id)
        setSearchParams({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async () => {
    if (!deleteMessageModal.id) return;
    try {
      await api.delete(
        `/chat/message/${deleteMessageModal.id}`,
      );
      // Refresh current session history
      if (sessionId) fetchHistory(sessionId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = (text) => {
    const shareUrl = window.location.href;
    const content =
      text ?
        `${text}\n\nShared via YogaFlow AI: ${shareUrl}`
      : shareUrl;

    if (navigator.share) {
      navigator
        .share({
          title: "YogaFlow AI Insight",
          text: content,
          url: shareUrl,
        })
        .catch(() => {
          navigator.clipboard.writeText(content);
          setShareToast(true);
          setTimeout(
            () => setShareToast(false),
            2000,
          );
        });
    } else {
      navigator.clipboard.writeText(content);
      setShareToast(true);
      setTimeout(
        () => setShareToast(false),
        2000,
      );
    }
  };

  return (
    <ZenNav>
      <div className="h-[calc(100vh-64px)] flex overflow-hidden bg-cream relative">
        {/* Immersive Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/3 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] bg-sage-200/10 blur-[80px] rounded-full" />
        </div>

        {/* Collapsible Conversation History */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <>
              {/* Mobile Overlay for Sidebar */}
              <_motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                className="fixed inset-0 bg-sage-900/20 backdrop-blur-sm z-30 lg:hidden"
              />
              <_motion.aside
                initial={{ width: 0, x: -320 }}
                animate={{ width: 320, x: 0 }}
                exit={{ width: 0, x: -320 }}
                className="absolute lg:relative top-0 left-0 bottom-0 bg-white/80 backdrop-blur-xl border-r border-white/60 flex flex-col h-full overflow-hidden z-40 shadow-2xl lg:shadow-none"
              >
                <div className="p-6 border-b border-sage-50 flex items-center justify-between shrink-0 bg-white/40">
                  <h2 className="text-xl font-serif text-primary-dark tracking-tight">
                    Dialogues
                  </h2>
                  <Link
                    to="/chat"
                    onClick={() => {
                      setSearchParams({});
                      if (
                        window.innerWidth < 1024
                      )
                        setIsSidebarOpen(false);
                    }}
                  >
                    <_motion.button
                      whileHover={{
                        scale: 1.05,
                        rotate: 90,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                      <Plus size={20} />
                    </_motion.button>
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {sessions.length === 0 ?
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-40">
                      <History
                        size={40}
                        className="text-sage-300"
                      />
                      <p className="text-xs font-bold uppercase tracking-widest text-sage-400">
                        Empty Archives
                      </p>
                    </div>
                  : sessions.map((s) => (
                      <div
                        key={s.id}
                        className="group relative"
                      >
                        <Link
                          to={`/chat?session=${s.id}`}
                          onClick={() => {
                            if (
                              window.innerWidth <
                              1024
                            )
                              setIsSidebarOpen(
                                false,
                              );
                          }}
                          className={`block p-4 rounded-2xl transition-all duration-300 border ${
                            sessionId === s.id ?
                              "bg-white border-primary/20 shadow-lg shadow-primary/5 translate-x-1"
                            : "bg-white/40 border-transparent hover:bg-white hover:border-sage-100 hover:translate-x-1"
                          }`}
                        >
                          <p
                            className={`text-sm font-bold truncate ${sessionId === s.id ? "text-primary" : "text-sage-700"}`}
                          >
                            {s.title ||
                              "Spiritual Dialogue"}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${sessionId === s.id ? "bg-primary animate-pulse" : "bg-sage-200"}`}
                            />
                            <p className="text-[10px] text-sage-400 uppercase tracking-widest font-black">
                              {new Date(
                                s.createdAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setDeleteSessionModal(
                              {
                                isOpen: true,
                                id: s.id,
                              },
                            );
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-sage-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-xl"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  }
                </div>
              </_motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Share Toast */}
        <AnimatePresence>
          {shareToast && (
            <_motion.div
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md"
            >
              <CheckCircle size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">
                Link Copied to Sanctuary
              </span>
            </_motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() =>
            setIsSidebarOpen(!isSidebarOpen)
          }
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-5 h-14 bg-white border border-l-0 border-sage-100 rounded-r-2xl flex items-center justify-center text-sage-400 hover:text-primary transition-all duration-500 shadow-md ${isSidebarOpen ? "ml-[320px]" : "ml-0"} lg:flex hidden`}
        >
          <ChevronLeft
            size={16}
            className={`transition-transform duration-500 ${isSidebarOpen ? "" : "rotate-180"}`}
          />
        </button>

        {/* Mobile Sidebar Toggle (Floating Button) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden absolute left-4 bottom-[120px] z-30 w-11 h-11 bg-white/90 backdrop-blur-md border border-sage-100 rounded-xl shadow-xl flex items-center justify-center text-primary group active:scale-90 transition-all hover:bg-white"
          >
            <History
              size={18}
              className="group-hover:rotate-[-20deg] transition-transform"
            />
          </button>
        )}

        {/* Main Chat Window */}
        <div className="flex-1 flex flex-col relative min-w-0 z-10">
          {/* Chat Header Area */}
          <div className="h-16 border-b border-sage-100/50 bg-white/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-sm font-serif text-primary-dark font-bold tracking-tight">
                {sessionId ?
                  sessions.find(
                    (s) => s.id === sessionId,
                  )?.title || "Spiritual Dialogue"
                : "New Sanctuary"}
              </h2>
            </div>
            {sessionId && (
              <button
                onClick={() => handleShare()}
                className="flex items-center gap-2 px-4 py-2 bg-sage-50 hover:bg-sage-100 text-primary rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-sage-100/50"
              >
                <Share2 size={14} />
                <span className="hidden sm:inline">
                  Share Session
                </span>
              </button>
            )}
          </div>

          <div
            className={`flex-1 p-4 md:p-10 lg:p-14 space-y-6 md:space-y-10 custom-scrollbar ${messages.length === 0 ? "overflow-hidden mt-0" : "overflow-y-auto"}`}
          >
            {loading ?
              <div className="flex items-center justify-center h-full text-sage-400 flex-col gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                  <Loader2
                    className="animate-spin text-primary relative z-10"
                    size={48}
                  />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Synchronizing Spirit...
                </p>
              </div>
            : messages.length === 0 ?
              <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto text-center space-y-8">
                <_motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-white/90 via-white/85 to-cream/80 backdrop-blur-xl p-8 md:p-14 rounded-2xl shadow-2xl shadow-primary/10 border border-white/80 relative group overflow-hidden"
                >
                  <div className="absolute -inset-6 bg-gradient-to-r from-primary/10 via-sage-200/5 to-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <_motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles
                      size={56}
                      className="text-primary/20 mx-auto mb-6 transition-transform duration-700 group-hover:text-primary/30 group-hover:scale-110 md:size-42"
                    />
                  </_motion.div>
                  <h3 className="text-3xl md:text-5xl font-serif text-primary-dark mb-4 tracking-tight">
                    Digital Sanctuary
                  </h3>
                  <p className="text-sage-600 text-sm md:text-lg leading-relaxed font-medium">
                    Begin your dialogue. Whisper
                    your curiosities, intentions,
                    or ask for guidance. Your AI
                    companion awaits to illuminate
                    your path.
                  </p>
                  <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-primary/10 flex items-center justify-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse" />
                    <p className="text-[10px] md:text-xs text-sage-400 font-bold uppercase tracking-widest">
                      Ready to listen
                    </p>
                  </div>
                </_motion.div>
              </div>
            : messages.map((m, i) => {
                const isUser =
                  m.role?.toLowerCase() ===
                  "user";
                return (
                  <_motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      damping: 22,
                      stiffness: 180,
                    }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 md:gap-4 max-w-[92%] md:max-w-[75%] ${isUser ? "flex-row-reverse" : ""}`}
                    >
                      <_motion.div
                        whileHover={{
                          scale: 1.12,
                          rotate: 5,
                        }}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center shadow-lg transition-all font-bold ${
                          isUser ?
                            "bg-gradient-to-br from-primary to-primary-dark text-white"
                          : "bg-gradient-to-br from-sage-100 to-cream text-primary border border-primary/20"
                        }`}
                      >
                        {isUser ?
                          <User
                            size={16}
                            className="md:size-5"
                          />
                        : <Sparkles
                            size={16}
                            className="md:size-5"
                          />
                        }
                      </_motion.div>
                      <_motion.div
                        whileHover={{
                          scale: 1.02,
                        }}
                        className={`p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-soft text-sm md:text-base leading-relaxed relative overflow-hidden group ${
                          isUser ?
                            "bg-gradient-to-br from-primary to-primary-dark text-white rounded-tr-none shadow-primary/20"
                          : "bg-white/90 border border-sage-100/50 text-sage-900 rounded-tl-none shadow-sm hover:shadow-md transition-all duration-300"
                        }`}
                      >
                        {!isUser && (
                          <>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                              <button
                                onClick={() =>
                                  handleShare(
                                    m.message,
                                  )
                                }
                                className="p-1.5 text-sage-300 hover:text-primary opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/5 rounded-lg"
                                title="Share Insight"
                              >
                                <Share2
                                  size={14}
                                />
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteMessageModal(
                                    {
                                      isOpen: true,
                                      id: m.id,
                                    },
                                  )
                                }
                                className="p-1.5 text-sage-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg"
                                title="Delete Message"
                              >
                                <Trash2
                                  size={14}
                                />
                              </button>
                            </div>
                            <div
                              className="prose prose-sm md:prose-base max-w-none 
                              prose-headings:font-serif prose-headings:text-primary-dark 
                              prose-p:text-sage-700 prose-p:leading-relaxed prose-p:mb-4
                              prose-ul:my-2 prose-ul:list-none prose-ul:pl-0
                              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-5
                              prose-li:text-sage-700 prose-li:my-3
                              prose-strong:text-primary-dark prose-strong:font-bold
                              prose-a:text-primary hover:prose-a:text-primary-dark 
                              prose-code:bg-primary/5 prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded
                              whitespace-pre-wrap"
                            >
                              <ReactMarkdown
                                components={{
                                  li: ({
                                    ...props
                                  }) => (
                                    <li
                                      className="flex gap-3 items-start"
                                      {...props}
                                    >
                                      <span className="mt-1.5 shrink-0 text-red-500 animate-pulse">
                                        <GrYoga
                                          size={
                                            14
                                          }
                                        />
                                      </span>
                                      <span>
                                        {
                                          props.children
                                        }
                                      </span>
                                    </li>
                                  ),
                                }}
                              >
                                {m.message}
                              </ReactMarkdown>
                            </div>
                          </>
                        )}
                        {isUser && (
                          <div className="flex items-center gap-3">
                            <span className="font-medium">
                              {m.message}
                            </span>
                            <button
                              onClick={() =>
                                setDeleteMessageModal(
                                  {
                                    isOpen: true,
                                    id: m.id,
                                  },
                                )
                              }
                              className="p-1 px-2 text-white/50 hover:text-white transition-colors"
                              title="Delete Message"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </_motion.div>
                    </div>
                  </_motion.div>
                );
              })
            }
            {isTyping && (
              <_motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br from-sage-100 to-cream text-primary border border-primary/20 shadow-lg">
                    <Sparkles size={20} />
                  </div>
                  <_motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="bg-white border border-sage-100/70 p-6 rounded-3xl rounded-tl-none flex gap-3 shadow-lg shadow-primary/5"
                  >
                    {[0, 1, 2].map((i) => (
                      <_motion.div
                        key={i}
                        animate={{
                          y: [0, -10, 0],
                          scale: [0.8, 1, 0.8],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        className="w-2.5 h-2.5 bg-gradient-to-b from-primary to-primary-dark rounded-full shadow-sm"
                      />
                    ))}
                  </_motion.div>
                </div>
              </_motion.div>
            )}
            <div
              ref={messagesEndRef}
              className="h-4"
            />
          </div>

          {/* Immersive Sticky Input Area */}
          <_motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-10 lg:p-14 pt-0 md:p-0 lg:pt-0 bg-gradient-to-t from-cream via-cream/90 to-transparent backdrop-blur-sm sticky bottom-0"
          >
            <form
              onSubmit={handleSend}
              className="relative max-w-4xl mx-auto group"
            >
              <_motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/15 via-sage-200/10 to-primary/10 blur-3xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"
                layoutId="input-glow"
              />
              <div className="relative z-10 flex items-center gap-3">
                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  placeholder="Share your reflection..."
                  className="flex-1 bg-white/90 backdrop-blur-md border-2 border-sage-100/50 hover:border-sage-200/70 rounded-2xl py-4 md:py-6 pl-6 md:pl-10 pr-4 text-sm md:text-base focus:outline-none focus:ring-8 focus:ring-primary/15 focus:border-primary/50 transition-all shadow-lg hover:shadow-xl placeholder:text-sage-400 font-medium relative"
                  disabled={isTyping}
                />
                <_motion.button
                  whileHover={{
                    scale: 1.08,
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={
                    !input.trim() || isTyping
                  }
                  className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-lg shadow-2xl shadow-primary/40 transition-all relative overflow-hidden group shrink-0"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  {isTyping ?
                    <Loader2
                      className="animate-spin relative z-10"
                      size={20}
                    />
                  : <Send
                      size={24}
                      className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  }
                </_motion.button>
              </div>
            </form>
            <_motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 md:gap-3 mt-4 md:mt-6 opacity-50 hover:opacity-100 transition-opacity"
            >
              <_motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary"
              />
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-sage-400">
                Mindful Intelligence Sanctuary
              </p>
              <_motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.2,
                }}
                className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary"
              />
            </_motion.div>
          </_motion.div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteSessionModal.isOpen}
        onClose={() =>
          setDeleteSessionModal({
            isOpen: false,
            id: null,
          })
        }
        onConfirm={handleDeleteSession}
        title="Archive Dialogue?"
        message="This will permanently remove this conversation from your sanctuary."
        confirmText="Archive"
      />

      <ConfirmModal
        isOpen={deleteMessageModal.isOpen}
        onClose={() =>
          setDeleteMessageModal({
            isOpen: false,
            id: null,
          })
        }
        onConfirm={handleDeleteMessage}
        title="Discard Reflection?"
        message="Are you sure you want to remove this message?"
        confirmText="Discard"
      />
    </ZenNav>
  );
};

export default Chat;
