import { useAuth } from "../context/AuthContext";
import ZenNav from "../components/layout/ZenNav";
import { motion as _motion } from "framer-motion";
import {
  Sparkles,
  History,
  ArrowRight,
  MessageSquare,
  Target,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/chat/sessions");
        setSessions(response.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const welcomeName = user?.fullName?.split(" ")[0] || "Yogi";

  return (
    <ZenNav>
      <div className="min-h-[calc(100vh-80px)] pb-20">
        <div className="max-w-7xl mx-auto px-8 space-y-20 pt-12">
          {/* Immersive Header - Elevated Design */}
          <_motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-serif text-[#2d3a30] leading-none tracking-tight">
                Namaste,{" "}
                <span className="italic font-normal text-[#3a4d3f]">
                  {welcomeName}
                </span>
              </h1>
              <div className="w-20 h-1.5 bg-[#3a4d3f] rounded-full opacity-30" />
              <p className="text-sage-500 font-bold uppercase tracking-[0.25em] text-[11px] max-w-md">
                Welcome to your digital sanctuary. Continue your transformative
                journey
              </p>
            </div>

            <div className="flex items-center gap-3 w-fit">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse" />
              <span className="text-[11px] font-black text-sage-600 uppercase tracking-[0.25em]">
                Synchronized & Aligned
              </span>
            </div>
          </_motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Hero CTA Card - Main Focus */}
            <_motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0  from-[#3a4d3f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative backdrop-blur-md p-16 rounded-[4rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                {/* Decorative Icon */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-125 transition-transform duration-1000">
                  <Sparkles size={280} />
                </div>

                <div className="relative z-10 space-y-8 max-w-2xl">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#3a4d3f]/5 rounded-full text-[#3a4d3f] text-[10px] font-black uppercase tracking-[0.4em] border border-[#3a4d3f]/10">
                      <Sparkles size={14} /> AI-Powered Guidance
                    </div>
                    <h2 className="text-5xl font-serif text-[#2d3a30] leading-tight">
                      Begin Your Daily Ritual
                    </h2>
                    <p className="text-lg text-sage-600 leading-relaxed font-medium">
                      Connect with your personalized guide to synchronize your
                      body and spirit. Receive transformative insights tailored
                      to your unique journey.
                    </p>
                  </div>

                  <Link
                    to="/chat"
                    className="btn-primary inline-flex items-center gap-4 px-12! py-5! group text-lg shadow-2xl shadow-sage-200 hover:scale-105 transition-transform"
                  >
                    Enter Mindful Flow{" "}
                    <ArrowRight
                      size={22}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </_motion.div>

            {/* Quick Stats Sidebar */}
            <_motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-lg space-y-8">
                <div className="space-y-3">
                  <p className="text-[11px] font-black text-sage-400 uppercase tracking-[0.3em]">
                    Current Status
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-lg font-serif text-[#2d3a30]">
                      Fully Attuned
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-sage-100 space-y-3">
                  <p className="text-[11px] font-black text-sage-400 uppercase tracking-[0.3em]">
                    Your Level
                  </p>
                  <p className="text-lg font-bold text-primary-dark">
                    Mindfulness Level 1
                  </p>
                </div>
              </div>

              {/* Quick Access */}
              <div className="bg-linear-to-br from-[#3a4d3f] to-[#2d3a30] p-10 rounded-[3rem] border border-white/10 shadow-2xl text-white space-y-6">
                <div>
                  <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em] mb-3">
                    Quick Access
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors group"
                    >
                      <User size={18} />
                      <span className="text-sm font-medium">View Profile</span>
                      <ArrowRight
                        size={16}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </_motion.div>
          </div>

          {/* Goals Grid Section */}
          <_motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-[#2d3a30] flex items-center gap-3">
                <Target size={24} />
                Your Current Intentions
              </h3>
              <div className="w-16 h-1 bg-[#3a4d3f]/20 rounded-full" />
            </div>

            {user?.goals?.split(", ").filter((g) => g).length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {user?.goals
                  ?.split(", ")
                  .filter((g) => g)
                  .map((goal, i) => (
                    <_motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group"
                    >
                      <div className="h-full bg-white/70 backdrop-blur-sm border border-white/80 p-8 rounded-4xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 bg-linear-to-br from-[#3a4d3f]/10 to-[#2d3a30]/10 rounded-full flex items-center justify-center group-hover:bg-[#3a4d3f]/20 transition-colors">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#3a4d3f]" />
                        </div>
                        <span className="text-sm font-bold text-sage-700 group-hover:text-primary-dark transition-colors">
                          {goal}
                        </span>
                      </div>
                    </_motion.div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-16 px-8 bg-white/40 border-2 border-dashed border-sage-200 rounded-[3rem]">
                <p className="text-sage-500 italic font-medium mb-4">
                  No intentions set yet
                </p>
                <Link
                  to="/profile"
                  className="text-[#3a4d3f] font-bold text-sm hover:underline"
                >
                  Add intentions in your profile
                </Link>
              </div>
            )}
          </_motion.div>

          {/* Recent Sessions */}
          <_motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-[#2d3a30] flex items-center gap-3">
                  <History size={24} />
                  Past Reflections
                </h3>
                <div className="w-16 h-1 bg-[#3a4d3f]/20 rounded-full" />
              </div>
              {sessions.length > 0 && (
                <Link
                  to="/chat"
                  className="text-[11px] font-black text-[#3a4d3f] uppercase tracking-[0.3em] hover:underline flex items-center gap-2 group"
                >
                  View All
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              )}
            </div>

            {loading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-white/50 rounded-3xl animate-pulse border border-sage-100"
                  />
                ))}
              </div>
            ) : sessions.length > 0 ? (
              <div className="grid gap-4">
                {sessions.slice(0, 5).map((session) => (
                  <_motion.div
                    key={session.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/chat?session=${session.id}`}
                      className="group block bg-white/70 backdrop-blur-sm border border-white/80 p-6 rounded-4xl shadow-lg hover:shadow-xl hover:border-[#3a4d3f]/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#3a4d3f]/10 to-[#2d3a30]/10 flex items-center justify-center text-[#3a4d3f] group-hover:bg-[#3a4d3f] group-hover:text-white transition-all duration-300 shadow-sm">
                          <MessageSquare size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sage-900 group-hover:text-[#3a4d3f] transition-colors truncate">
                            {session.title || "Spiritual Dialogue"}
                          </h4>
                          <p className="text-[11px] font-black text-sage-400 uppercase tracking-[0.2em] mt-1">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <ArrowRight
                          size={18}
                          className="text-sage-300 group-hover:text-[#3a4d3f] group-hover:translate-x-1 transition-all shrink-0"
                        />
                      </div>
                    </Link>
                  </_motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-8 bg-white/40 border-2 border-dashed border-sage-200 rounded-[3rem]">
                <Sparkles size={40} className="mx-auto mb-4 text-sage-300" />
                <p className="text-sage-500 italic font-medium mb-4">
                  No reflections captured yet
                </p>
                <Link
                  to="/chat"
                  className="text-[#3a4d3f] font-bold text-sm hover:underline"
                >
                  Begin your first dialogue
                </Link>
              </div>
            )}
          </_motion.div>
        </div>
      </div>
    </ZenNav>
  );
};

export default Dashboard;
