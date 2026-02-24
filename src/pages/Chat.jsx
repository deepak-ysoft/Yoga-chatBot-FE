import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ZenNav from "../components/layout/ZenNav";
import { motion as _motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Plus,
  Loader2,
  Sparkles,
  User,
  History,
  MoreVertical,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";

const typingCursorStyle = `
  @keyframes typing-cursor {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  .typing-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: currentColor;
    animation: typing-cursor 1s infinite;
    margin-left: 2px;
  }
`;

const Chat = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session");

  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState(null);
  const [displayedTextLength, setDisplayedTextLength] = useState(0);

  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (typingMessageIndex === null || typingMessageIndex >= messages.length)
      return;

    const message = messages[typingMessageIndex];
    const fullText = message.message;

    if (displayedTextLength >= fullText.length) {
      setTypingMessageIndex(null);
      return;
    }

    typingIntervalRef.current = setTimeout(() => {
      setDisplayedTextLength((prev) => prev + 1);
    }, 15);

    return () => clearTimeout(typingIntervalRef.current);
  }, [displayedTextLength, typingMessageIndex, messages]);

  useEffect(() => {
    // Inject typing cursor styles
    const styleId = "typing-cursor-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = typingCursorStyle;
      document.head.appendChild(style);
    }
  }, []);

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
      const response = await api.get("/chat/sessions");
      setSessions(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/chat/history/${id}`);
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
      const response = await fetch(`${api.defaults.baseURL}/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Message: input,
          sessionId: sessionId || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to send");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "Assistant", message: "" }]);
      setTypingMessageIndex(messages.length);
      setDisplayedTextLength(0);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.replace("data: ", "");
            try {
              const data = JSON.parse(jsonStr);
              const content = data.text;
              if (content === "[DONE]") continue;
              assistantContent += content;

              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].message = assistantContent;
                return newMessages;
              });
            } catch (e) {
              console.warn(`Stream line parse fail, ${e.message}:`, line);
            }
          }
        }
      }

      setTypingMessageIndex(null);
      await fetchSessions();
      const newSessionId = response.headers.get("X-Session-Id");
      if (newSessionId) {
        setSearchParams({
          session: newSessionId,
        });
      }
    } catch (err) {
      console.error(err);
      setTypingMessageIndex(null);
      setMessages((prev) => [
        ...prev,
        {
          role: "Assistant",
          message: "The divine flow was interrupted. Please try re-sending.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const deleteSession = async (id) => {
    if (!confirm("This will permanently archive this dialogue. Continue?"))
      return;
    try {
      await api.delete(`/chat/sessions/${id}`);
      fetchSessions();
      if (sessionId === id) setSearchParams({});
    } catch (err) {
      console.error(err);
    }
  };

  const TypingIndicator = () => (
    <div className="flex gap-2 p-5 bg-white border border-sage-100 rounded-3xl rounded-tl-none w-fit shadow-sm">
      {[0, 1, 2].map((i) => (
        <_motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="w-1.5 h-1.5 bg-[#3a4d3f] rounded-full"
        />
      ))}
    </div>
  );

  return (
    <ZenNav>
      <div className="h-[calc(100vh-80px)] flex gap-8 max-w-7xl mx-auto px-8 py-6">
        {/* Reflections Sidebar - Elevated Design */}
        <aside className="hidden lg:flex w-96 flex-col gap-6 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white/80 p-8 shadow-lg overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-serif text-[#2d3a30]">Archive</h2>
              <Link to="/chat">
                <_motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-linear-to-br from-[#3a4d3f] to-[#2d3a30] text-white rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                  title="New Reflection"
                >
                  <Plus size={22} />
                </_motion.button>
              </Link>
            </div>
            <div className="w-12 h-1 bg-[#3a4d3f]/20 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {sessions.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center py-16">
                <p className="text-sage-400 italic text-sm font-medium">
                  No dialogues yet
                </p>
              </div>
            ) : (
              sessions.map((s) => (
                <_motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative group"
                >
                  <Link
                    to={`/chat?session=${s.id}`}
                    className={`block p-5 rounded-2xl transition-all duration-300 ${
                      sessionId === s.id
                        ? "bg-white border-2 border-[#3a4d3f] shadow-lg"
                        : "bg-white/50 border-2 border-transparent hover:bg-white hover:border-sage-100 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <p
                        className={`text-xs font-black uppercase tracking-widest leading-tight truncate ${sessionId === s.id ? "text-[#3a4d3f]" : "text-sage-600"}`}
                      >
                        {s.title || "Spiritual Dialogue"}
                      </p>
                      <p className="text-[10px] font-bold text-sage-400">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteSession(s.id);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-sage-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50/30 rounded-lg"
                    title="Remove Reflection"
                  >
                    <Trash2 size={16} />
                  </button>
                </_motion.div>
              ))
            )}
          </div>
        </aside>

        {/* Main Conversation Area - Modern & Spacious */}
        <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-sm rounded-[3.5rem] border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden">
          {/* Header - Elegant Design */}
          <header className="px-10 py-8 border-b border-sage-100/50 flex items-center justify-between bg-linear-to-r from-white/50 to-sage-50/30 backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="lg:hidden p-2 hover:bg-sage-50 rounded-xl text-sage-400 transition-colors"
              >
                <ChevronLeft size={24} />
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#3a4d3f] to-[#2d3a30] flex items-center justify-center text-white shadow-xl shadow-sage-900/20">
                  <Sparkles size={26} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-[#2d3a30] leading-tight">
                    Spiritual Guide
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                    <span className="text-[10px] font-black text-sage-500 uppercase tracking-[0.2em]">
                      Synchronized
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="p-3 text-sage-400 hover:bg-sage-50/50 rounded-2xl transition-all hover:text-sage-600">
              <MoreVertical size={22} />
            </button>
          </header>

          {/* Messages Area - Spacious Layout */}
          <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center h-full text-sage-400 flex-col gap-6">
                <Loader2 className="animate-spin text-[#3a4d3f]" size={48} />
                <p className="text-sm font-bold uppercase tracking-widest text-[#2d3a30]">
                  Opening the scrolls...
                </p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-10 p-20">
                <_motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-40 h-40 rounded-full bg-linear-to-br from-[#3a4d3f]/5 to-[#2d3a30]/5 flex items-center justify-center text-[#3a4d3f]"
                >
                  <Sparkles size={80} className="opacity-30" />
                </_motion.div>
                <div className="max-w-sm">
                  <h4 className="text-4xl font-serif text-[#2d3a30] mb-4">
                    Divine Connection
                  </h4>
                  <p className="text-base text-sage-500 leading-relaxed font-medium">
                    Whisper your curiosities or intentions. Your guide is ready
                    to illuminate your path with wisdom and insight.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((m, i) => {
                const isUser = m.role?.toLowerCase() === "user";
                const isBeingTyped = i === typingMessageIndex;
                const displayedText = isBeingTyped
                  ? m.message.substring(0, displayedTextLength)
                  : m.message;
                return (
                  <_motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-5 max-w-[85%] sm:max-w-[75%] ${isUser ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center shadow-lg transform transition-transform ${
                          isUser
                            ? "bg-linear-to-br from-[#3a4d3f] to-[#2d3a30] text-white rotate-3"
                            : "bg-white text-[#3a4d3f] border-2 border-sage-100 -rotate-3"
                        }`}
                      >
                        {isUser ? <User size={20} /> : <Sparkles size={20} />}
                      </div>
                      <div
                        className={`p-6 rounded-4xl shadow-md text-sm leading-relaxed prose prose-sm max-w-none transition-all ${
                          isUser
                            ? "bg-linear-to-br from-[#3a4d3f] to-[#2d3a30] text-white rounded-tr-none font-medium prose-invert"
                            : "bg-white border-2 border-sage-100 text-sage-950 rounded-tl-none prose-headings:text-[#2d3a30] prose-headings:font-serif"
                        }`}
                      >
                        <ReactMarkdown>{displayedText}</ReactMarkdown>
                        {isBeingTyped &&
                          displayedTextLength < m.message.length && (
                            <span className="typing-cursor" />
                          )}
                      </div>
                    </div>
                  </_motion.div>
                );
              })
            )}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Modern & Focused */}
          <div className="px-10 py-8 bg-white/50 backdrop-blur-sm border-t border-sage-100/50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
            <form onSubmit={handleSend} className="space-y-6">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share your reflection or ask a question..."
                  className="w-full bg-white border-2 border-sage-100 rounded-4xl py-5 pl-8 pr-16 text-sm focus:outline-none focus:ring-4 focus:ring-[#3a4d3f]/10 focus:border-[#3a4d3f] transition-all placeholder:text-sage-400 font-medium"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#3a4d3f] text-white rounded-xl disabled:opacity-30 hover:bg-[#2d3a30] transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {isTyping ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-center gap-3 opacity-50">
                <div className="w-1 h-1 rounded-full bg-sage-400" />
                <p className="text-[10px] text-center text-sage-400 uppercase font-black tracking-[0.3em]">
                  Thoughtful, intentional dialogue
                </p>
                <div className="w-1 h-1 rounded-full bg-sage-400" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </ZenNav>
  );
};

export default Chat;
