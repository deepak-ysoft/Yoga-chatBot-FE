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
  Sparkles,
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
      {/* Enhanced Background Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-primary/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-sage-200/10 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Profile Card - Immersive Design */}
          <div className="lg:col-span-1">
            <_motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-gradient-to-br from-white/95 via-white/90 to-cream/80 rounded-2xl shadow-2xl shadow-primary/15 border border-white/80 overflow-hidden text-center group hover:shadow-primary/30 transition-all duration-500"
            >
              {/* Card Header with Zen Image */}
              <div className="h-40 relative overflow-hidden group/header">
                <img
                  src="https://images.pexels.com/photos/3752173/pexels-photo-3752173.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Zen Sanctuary"
                  className="w-full h-full object-cover grayscale opacity-50 group-hover/header:opacity-70 group-hover/header:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/20 to-white" />
              </div>

              <div className="px-6 pb-10 -mt-20 relative space-y-6">
                <_motion.div
                  className="relative inline-block mx-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  <_motion.div
                    animate={{ boxShadow: ['0 0 0 0 rgba(31, 61, 43, 0.3)', '0 0 0 15px rgba(31, 61, 43, 0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 via-cream to-cream p-1 shadow-xl relative"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-cream flex items-center justify-center text-5xl font-serif text-primary border-2 border-primary/20 font-bold">
                      {user?.fullName?.charAt(0)?.toUpperCase()}
                    </div>
                  </_motion.div>
                  <_motion.button
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-0 right-0 p-2.5 bg-white rounded-full shadow-lg border-2 border-primary/20 text-primary hover:text-white hover:bg-primary transition-all"
                  >
                    <Camera size={18} />
                  </_motion.button>
                </_motion.div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-primary-dark tracking-tight">{user?.fullName}</h2>
                  <p className="text-sm text-sage-500 font-medium">{user?.email}</p>
                </div>

                <div className="pt-6 border-t border-sage-100/50 space-y-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {formData.goals.map((goal, i) => (
                      <_motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-primary/15 to-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20 shadow-sm hover:shadow-primary/20 transition-all"
                      >
                        {goal}
                      </_motion.span>
                    ))}
                  </div>
                  <_motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-sage-100/40 to-cream/60 p-5 rounded-2xl space-y-3 border border-sage-100/50"
                  >
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-sage-600">
                      <span>Vitality Status</span>
                      <span className="text-primary">Active</span>
                    </div>
                    <_motion.div
                      className="h-2 bg-sage-200/50 rounded-full overflow-hidden shadow-inner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <_motion.div
                        className="h-full bg-gradient-to-r from-primary via-primary-light to-primary rounded-full shadow-lg shadow-primary/50"
                        initial={{ width: 0 }}
                        animate={{ width: "90%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </_motion.div>
                  </_motion.div>
                </div>
              </div>
            </_motion.div>
          </div>

          {/* Settings Form - Modern Layout */}
          <div className="lg:col-span-2">
            <_motion.form
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-white/90 via-white/85 to-cream/70 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl shadow-primary/10 border border-white/80 space-y-12 hover:shadow-primary/20 transition-all duration-500"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <h3 className="text-xl font-serif text-primary-dark tracking-tight">Personal Identity</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-sage-400 uppercase tracking-[0.2em] ml-1">Sacred Name</label>
                    <input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input-field"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-sage-400 uppercase tracking-[0.2em] ml-1">Email Essence</label>
                    <input
                      value={formData.email}
                      disabled
                      className="input-field opacity-50 cursor-not-allowed bg-cream/30"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <h3 className="text-xl font-serif text-primary-dark tracking-tight">Practice Intentions</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                      <button
                        key={goal}
                        type="button"
                        onClick={() => {
                          const newGoals = isSelected
                            ? formData.goals.filter((g) => g !== goal)
                            : [...formData.goals, goal];
                          setFormData({ ...formData, goals: newGoals });
                        }}
                        className={`p-4 rounded-2xl text-[10px] font-bold tracking-widest uppercase transition-all border ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                            : "bg-white border-sage-100 text-sage-400 hover:border-primary/30 hover:text-primary"
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <h3 className="text-xl font-serif text-primary-dark tracking-tight">Physical Vessel Notes</h3>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-sage-400 uppercase tracking-[0.2em] ml-1">Vulnerabilities or blockages</label>
                  <textarea
                    value={formData.healthConditions}
                    onChange={(e) => setFormData({ ...formData, healthConditions: e.target.value })}
                    className="input-field min-h-[140px] resize-none leading-relaxed"
                    placeholder="E.g. Lower back sensitivity, knee injury..."
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-sage-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <AnimatePresence>
                  {success && (
                    <_motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-600 text-xs font-bold flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100"
                    >
                      <CheckCircle size={14} /> Journey updated successfully
                    </_motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex items-center gap-3 w-full sm:w-auto min-w-[200px] justify-center sm:ml-auto group"
                >
                  {saving ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>Update Identity <Save size={18} className="group-hover:rotate-12 transition-transform" /></>
                  )}
                </button>
              </div>
            </_motion.form>
          </div>
        </div>
      </div>
    </ZenNav>
  );
};

export default Profile;
