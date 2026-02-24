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
  Leaf,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ZenNav>
      {/* Enhanced Animated Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-5%] w-[450px] h-[450px] bg-primary/8 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[400px] h-[400px] bg-sage-200/12 rounded-full blur-[110px] animate-pulse animation-delay-2000" />
        <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <_motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16 relative z-10"
      >
        {/* Modern Hero with Immersive Image and Enhanced Effects */}
        <_motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary/25 via-sage-200/15 to-primary/20 blur-3xl rounded-[2.5rem] group-hover:from-primary/40 group-hover:via-sage-200/25 group-hover:to-primary/30 transition-colors duration-700 opacity-70 group-hover:opacity-100" />
          <div className="relative h-[400px] md:h-[480px] rounded-card overflow-hidden shadow-2xl shadow-primary/20 border border-white/50 group hover:shadow-primary/40 transition-all duration-500">
            <img
              src="https://images.pexels.com/photos/3756517/pexels-photo-3756517.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
              alt="Daily Yoga Practice"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/60 via-primary-dark/35 to-transparent group-hover:from-primary-dark/50 transition-all duration-500" />

            <_motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 space-y-6 md:space-y-8"
            >
              <div className="space-y-4">
                <_motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-xl rounded-full text-white/95 text-[10px] font-bold uppercase tracking-widest border border-white/30 shadow-lg shadow-white/20 w-fit"
                >
                  <Sparkles
                    size={13}
                    className="animate-spin animation-duration-3000"
                  />{" "}
                  Personalized Daily Flow
                </_motion.div>
                <h1 className="text-4xl md:text-6xl font-serif text-white max-w-xl leading-[1.1] drop-shadow-lg">
                  Begin Your{" "}
                  <span className="italic font-normal bg-gradient-to-r from-white via-white/90 to-cream bg-clip-text text-transparent">
                    Daily Ritual
                  </span>
                </h1>
                <p className="text-white/85 text-sm md:text-lg max-w-md font-medium drop-shadow-md">
                  Reconnect with your body and breath in our immersive AI-guided
                  sanctuary.
                </p>
              </div>

              <_motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <_motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/chat"
                    className="bg-white text-primary-dark hover:bg-cream px-8 py-4 rounded-button font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-white/30 hover:shadow-white/50 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Enter mindful flow</span>{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </_motion.div>
                <_motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/profile"
                    className="bg-white/15 backdrop-blur-md text-white border border-white/40 hover:bg-white/25 hover:border-white/60 px-8 py-4 rounded-button font-bold flex items-center justify-center transition-all shadow-lg shadow-white/10"
                  >
                    View My progress
                  </Link>
                </_motion.div>
              </_motion.div>
            </_motion.div>
          </div>
        </_motion.div>

        {/* Dynamic Status & Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-12">
            {/* Focus Grid */}
            <_motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-primary-dark">
                  Today's Practice
                </h2>
                <div className="w-12 h-1 bg-primary/10 rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Flexibility",
                    icon: <Sparkles className="text-orange-400" />,
                    level: "Level 1",
                    gradient: "from-orange-100/40 to-orange-50/20",
                  },
                  {
                    title: "Strength",
                    icon: <Target className="text-red-400" />,
                    level: "Level 2",
                    gradient: "from-red-100/40 to-red-50/20",
                  },
                  {
                    title: "Stress Relief",
                    icon: <Leaf className="text-teal-400" />,
                    level: "Mastery",
                    gradient: "from-teal-100/40 to-teal-50/20",
                  },
                ].map((item, i) => (
                  <_motion.button
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group relative p-8 rounded-2xl flex flex-col items-center text-center space-y-4 bg-gradient-to-br ${item.gradient} border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    <_motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all relative z-10"
                    >
                      {item.icon}
                    </_motion.div>
                    <div className="space-y-2 relative z-10">
                      <h3 className="font-bold text-sage-800 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-sage-500 uppercase tracking-widest font-bold">
                        {item.level}
                      </p>
                    </div>
                  </_motion.button>
                ))}
              </div>
            </_motion.div>

            {/* Recent Reflections */}
            <_motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-primary-dark">
                  Recent Reflections
                </h2>
                <Link
                  to="/chat"
                  className="text-xs font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-[0.2em]"
                >
                  View History
                </Link>
              </div>
              <div className="grid gap-4">
                {loading ? (
                  [1, 2].map((i) => (
                    <_motion.div
                      key={i}
                      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-24 bg-gradient-to-r from-white/30 via-white/50 to-white/30 rounded-2xl border border-white/50 skeleton-loading"
                    />
                  ))
                ) : sessions.length > 0 ? (
                  sessions.slice(0, 3).map((session, idx) => (
                    <_motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        to={`/chat?session=${session.id}`}
                        className="group flex items-center justify-between p-6 bg-gradient-to-r from-white/80 to-white/60 border border-sage-100/60 rounded-2xl hover:shadow-xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300 overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-5 relative z-10">
                          <_motion.div
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all shadow-md"
                          >
                            <MessageSquare size={20} />
                          </_motion.div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sage-800 group-hover:text-primary transition-colors duration-300">
                              {session.title || "Spiritual Dialogue"}
                            </h4>
                            <p className="text-[10px] text-sage-400 font-bold uppercase tracking-widest">
                              {new Date(session.createdAt).toLocaleDateString()}{" "}
                              &bull; 15 min session
                            </p>
                          </div>
                        </div>
                        <ArrowRight
                          size={20}
                          className="text-sage-300 group-hover:text-primary group-hover:translate-x-1 transition-all relative z-10"
                        />
                      </Link>
                    </_motion.div>
                  ))
                ) : (
                  <_motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-16 text-center bg-gradient-to-br from-white/40 to-white/20 border border-dashed border-sage-200/50 rounded-2xl"
                  >
                    <p className="text-sage-500 italic text-lg">
                      No dialogues recorded yet. Start your journey.
                    </p>
                  </_motion.div>
                )}
              </div>
            </_motion.div>
          </div>

          {/* Right Sidebar - Status & Metrics */}
          <_motion.div
            variants={itemVariants}
            className="space-y-8 sticky top-24"
          >
            <_motion.div
              className="bg-gradient-to-br from-primary-dark via-primary to-primary-dark p-8 rounded-2xl text-white space-y-8 shadow-2xl shadow-primary/30 relative overflow-hidden group hover:shadow-primary/50 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <_motion.div
                className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-15 group-hover:scale-125 transition-all duration-700"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Leaf size={140} />
              </_motion.div>

              <div className="space-y-6 relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-light/70">
                  Practice Essence
                </h3>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-xs text-primary-light/60 font-bold">
                        Current State
                      </p>
                      <p className="text-2xl font-serif text-white">
                        Harmonized
                      </p>
                    </div>
                    <_motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                    </_motion.div>
                  </div>

                  <div className="space-y-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <div className="flex justify-between text-xs font-bold text-primary-light/70">
                      <span>Weekly Goal</span>
                      <span>85%</span>
                    </div>
                    <_motion.div
                      className="h-2.5 bg-white/10 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <_motion.div
                        className="h-full bg-gradient-to-r from-primary-light via-white to-primary-light rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5 }}
                      />
                    </_motion.div>
                  </div>

                  <div className="flex items-center gap-2 pt-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                      <_motion.div
                        key={d}
                        initial={{ height: 0 }}
                        animate={{ height: 24 }}
                        transition={{ delay: d * 0.1 }}
                        className={`flex-1 rounded-md ${d <= 5 ? "bg-gradient-to-t from-primary-light/50 to-primary-light/20" : "bg-white/5"} transition-all`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </_motion.div>

            <div className="bg-gradient-to-br from-white/90 via-white/85 to-cream/80 p-8 rounded-2xl space-y-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-sage-600">
                Quick Rituals
              </h3>
              <div className="space-y-3">
                {[
                  "Mindful Breathing",
                  "Gentle Morning",
                  "Solar Salutation",
                ].map((r, idx) => (
                  <_motion.button
                    key={r}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cream/80 to-cream/50 rounded-xl text-sage-700 text-sm font-bold hover:from-primary/15 hover:to-primary/10 hover:text-primary transition-all group shadow-sm hover:shadow-md"
                  >
                    <span>{r}</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
                    />
                  </_motion.button>
                ))}
              </div>
            </div>
          </_motion.div>
        </div>
      </_motion.div>
    </ZenNav>
  );
};

export default Dashboard;
