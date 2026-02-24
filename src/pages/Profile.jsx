import { useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import ZenNav from "../components/layout/ZenNav";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Target,
  Save,
  Camera,
  CheckCircle,
  Shield,
  Activity,
  Loader2,
} from "lucide-react";
import api from "../services/api";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const getGoalsArray = (goals) => {
    if (Array.isArray(goals)) return goals;
    if (typeof goals === "string") return goals.split(", ").filter((g) => g);
    return [];
  };

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    goals: getGoalsArray(user?.goals),
    healthConditions: user?.healthConditions || "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        goals: formData.goals.join(", "),
      };
      const response = await api.put("/profile/update", payload);
      if (response.data.success) {
        updateUser(response.data.data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ZenNav>
      <div className="min-h-[calc(100vh-80px)] pb-20">
        <div className="max-w-7xl mx-auto px-8 space-y-20 pt-12">
          {/* Elevated Header */}
          <_motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-center max-w-2xl mx-auto"
          >
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-serif text-[#2d3a30] leading-none tracking-tight">
                Spiritual Identity
              </h1>
              <div className="w-20 h-1.5 bg-[#3a4d3f] rounded-full opacity-30 mx-auto" />
              <p className="text-lg text-sage-500 font-medium max-w-xl mx-auto">
                The reflection of your journey in the sanctuary. Refine your
                essence and align with your deepest intentions.
              </p>
            </div>
          </_motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Identity Card - Elevated & Modern */}
            <_motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="sticky top-32"
            >
              <div className="bg-white/70 backdrop-blur-md p-12 rounded-[4rem] border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.08)] space-y-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                  <Shield size={200} />
                </div>

                <div className="flex flex-col items-center space-y-8 relative z-10">
                  {/* Avatar */}
                  <div className="relative group/avatar">
                    <_motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(58, 77, 63, 0.2)",
                          "0 0 0 20px rgba(58, 77, 63, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="w-40 h-40 rounded-[3rem] bg-linear-to-br from-[#3a4d3f] to-[#2d3a30] flex items-center justify-center text-6xl font-serif text-white shadow-2xl shadow-sage-900/30 relative z-10 group-hover/avatar:rotate-6 transition-transform duration-500"
                    >
                      {user?.fullName?.charAt(0)}
                    </_motion.div>
                    <_motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -bottom-4 -right-4 p-4 bg-white rounded-2xl shadow-xl text-[#3a4d3f] border-2 border-sage-50 z-20 hover:shadow-2xl transition-shadow"
                    >
                      <Camera size={20} />
                    </_motion.button>
                  </div>

                  {/* User Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-4xl font-serif text-[#2d3a30]">
                      {user?.fullName}
                    </h3>
                    <p className="text-sage-500 font-bold text-sm tracking-tight">
                      {user?.email}
                    </p>
                  </div>

                  {/* Goals Tags */}
                  {formData.goals.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                      {formData.goals.map((goal, i) => (
                        <_motion.span
                          key={i}
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{ delay: i * 0.05 }}
                          className="px-4 py-2 bg-linear-to-r from-[#3a4d3f]/10 to-[#2d3a30]/5 border border-[#3a4d3f]/20 rounded-full text-[11px] font-black text-[#3a4d3f] uppercase tracking-widest hover:bg-[#3a4d3f]/20 transition-all"
                        >
                          {goal}
                        </_motion.span>
                      ))}
                    </div>
                  )}

                  {/* Status Info */}
                  <div className="w-full pt-8 space-y-4 border-t border-sage-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-sage-500 uppercase tracking-[0.2em]">
                        Sanctuary Status
                      </span>
                      <div className="flex items-center gap-2 text-green-600 font-bold">
                        <CheckCircle size={18} />
                        <span className="text-sm">Fully Attuned</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-sage-500 uppercase tracking-[0.2em]">
                        Current Vibe
                      </span>
                      <div className="flex items-center gap-2 text-[#3a4d3f] font-bold">
                        <Activity size={18} />
                        <span className="text-sm">Tranquil Flow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </_motion.div>

            {/* Edit Form - Modern & Spacious */}
            <_motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white/70 backdrop-blur-md p-12 rounded-[4rem] border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.08)] space-y-12"
              >
                {/* Full Name Field */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
                    <div className="w-5 h-5 rounded-lg bg-[#3a4d3f]/10 flex items-center justify-center">
                      <User size={14} className="text-[#3a4d3f]" />
                    </div>
                    Sacred Label
                  </label>
                  <input
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    className="input-field text-lg! py-4! rounded-2xl!"
                    placeholder="How shall we address you?"
                  />
                </div>

                {/* Intentions Grid */}
                <div className="space-y-5">
                  <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
                    <div className="w-5 h-5 rounded-lg bg-[#3a4d3f]/10 flex items-center justify-center">
                      <Target size={14} className="text-[#3a4d3f]" />
                    </div>
                    Refine Your Intentions
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Flexibility",
                      "Strength",
                      "Stress Relief",
                      "Weight Loss",
                      "Spirituality",
                      "Better Sleep",
                    ].map((goal) => {
                      const isSelected = formData.goals.includes(goal);
                      return (
                        <_motion.button
                          key={goal}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const newGoals = isSelected
                              ? formData.goals.filter((g) => g !== goal)
                              : [...formData.goals, goal];
                            setFormData({
                              ...formData,
                              goals: newGoals,
                            });
                          }}
                          className={`p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${
                            isSelected
                              ? "bg-linear-to-br from-[#3a4d3f] to-[#2d3a30] text-white border-[#3a4d3f] shadow-lg shadow-sage-200"
                              : "bg-white border-sage-100 text-sage-600 hover:border-[#3a4d3f]/30 hover:text-[#3a4d3f] shadow-sm"
                          }`}
                        >
                          {goal}
                        </_motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Health Conditions */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.3em] px-1">
                    Divine Vulnerabilities
                  </label>
                  <textarea
                    value={formData.healthConditions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        healthConditions: e.target.value,
                      })
                    }
                    className="input-field rounded-2xl! h-40 resize-none py-4! px-6! leading-relaxed text-base"
                    placeholder="Share any physical or spiritual blockages our guide should know about..."
                  />
                </div>

                {/* Submit Section */}
                <div className="pt-8 flex items-center justify-between border-t border-sage-100">
                  <AnimatePresence>
                    {success && (
                      <_motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-600 font-black text-[11px] uppercase tracking-widest bg-green-50/80 backdrop-blur-sm p-3 px-6 rounded-full border border-green-200"
                      >
                        <CheckCircle size={16} />
                        Harmony Restored
                      </_motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary ml-auto shadow-2xl shadow-sage-200 flex items-center gap-4 px-12! py-5! hover:scale-105 transition-transform"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Syncing...
                      </>
                    ) : (
                      <>
                        Update Identity <Save size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </_motion.div>
          </div>
        </div>
      </div>
    </ZenNav>
  );
};

export default Profile;
