import { motion as _motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  User,
  Target,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    yogaExperienceLevel: "",
    healthConditions: "",
    goals: [],
    preferredYogaStyle: "",
    dailyAvailableTime: "",
  });
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleGoal = (goal) => {
    const goals = formData.goals.includes(goal)
      ? formData.goals.filter((g) => g !== goal)
      : [...formData.goals, goal];
    setFormData({ ...formData, goals });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      // Convert goals array to comma-separated string for backend
      const payload = {
        ...formData,
        goals: formData.goals.join(", "),
      };
      const response = await api.post("/onboarding/complete", payload);
      if (response.data.success) {
        updateUser({
          isOnboardingCompleted: true,
        });
        navigate("/dashboard");
      } else {
        alert(response.data.message || "Failed to complete onboarding");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  const steps = [
    { title: "Basics", icon: <User /> },
    { title: "Experience", icon: <Target /> },
    { title: "Preferences", icon: <Clock /> },
  ];

  return (
    <div className="yoga-gradient min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#3a4d3f]/3 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-sage-200/5 blur-[80px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <_motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/40 backdrop-blur-md rounded-full text-[#3a4d3f] text-[10px] font-black uppercase tracking-[0.4em] border border-white/60 shadow-sm">
            <Sparkles size={14} />
            Personalized Path
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#2d3a30] tracking-tight leading-none">
            Begin Your Journey
          </h1>
          <p className="text-lg text-sage-500 font-medium max-w-md mx-auto">
            Let us understand your unique essence to craft your perfect ritual
          </p>
        </_motion.div>

        {/* Progress Indicator */}
        <_motion.div
          className="mb-16 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center">
            {steps.map((s, i) => (
              <_motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <_motion.div
                  animate={{
                    scale: i + 1 <= step ? 1.1 : 1,
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                    i + 1 < step
                      ? "bg-green-50 border-green-500 text-green-600"
                      : i + 1 === step
                        ? "bg-[#3a4d3f] border-[#3a4d3f] text-white shadow-xl"
                        : "bg-white/50 border-sage-200 text-sage-400"
                  }`}
                >
                  {i + 1 < step ? <Check size={20} /> : s.icon}
                </_motion.div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${i + 1 <= step ? "text-[#3a4d3f]" : "text-sage-400"}`}
                >
                  {s.title}
                </span>
              </_motion.div>
            ))}
          </div>
          <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
            <_motion.div
              className="bg-linear-to-r from-[#3a4d3f] to-[#2d3a30] h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${(step / 3) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </_motion.div>

        {/* Form Container */}
        <_motion.div
          className="bg-white/80 backdrop-blur-2xl p-12 rounded-[3rem] border border-white/90 shadow-[0_30px_80px_rgba(0,0,0,0.1)] relative overflow-hidden"
          layout
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 p-16 opacity-[0.02]">
            <Sparkles size={200} />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <_motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-10"
                >
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl font-serif text-[#2d3a30] tracking-tight">
                      Let's start with the basics
                    </h2>
                    <p className="text-sage-500 font-medium">
                      Ancient wisdom tailored to your modern life
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1">
                        <div className="w-5 h-5 rounded-lg bg-[#3a4d3f]/10 flex items-center justify-center">
                          <User size={12} className="text-[#3a4d3f]" />
                        </div>
                        Your Age
                      </label>
                      <input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        className="input-field text-lg! py-4! rounded-2xl!"
                        placeholder="25"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1">
                        <div className="w-5 h-5 rounded-lg bg-[#3a4d3f]/10 flex items-center justify-center">
                          <User size={12} className="text-[#3a4d3f]" />
                        </div>
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="input-field text-lg! py-4! rounded-2xl! appearance-none"
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </_motion.div>
              )}

              {step === 2 && (
                <_motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-10"
                >
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl font-serif text-[#2d3a30] tracking-tight">
                      Your Yoga Experience
                    </h2>
                    <p className="text-sage-500 font-medium">
                      We respect every stage of your practice
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1 mb-4">
                        <div className="w-5 h-5 rounded-lg bg-[#3a4d3f]/10 flex items-center justify-center">
                          <Target size={12} className="text-[#3a4d3f]" />
                        </div>
                        Experience Level
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                          <_motion.button
                            key={lvl}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                yogaExperienceLevel: lvl,
                              })
                            }
                            className={`p-5 rounded-2xl border-2 transition-all font-bold text-sm uppercase tracking-wider ${
                              formData.yogaExperienceLevel === lvl
                                ? "bg-[#3a4d3f] text-white border-[#3a4d3f] shadow-lg shadow-sage-200"
                                : "bg-white border-sage-100 text-sage-600 hover:border-[#3a4d3f]/30 hover:text-[#3a4d3f]"
                            }`}
                          >
                            {lvl}
                          </_motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.25em] px-1">
                        Health Conditions (Optional)
                      </label>
                      <textarea
                        name="healthConditions"
                        value={formData.healthConditions}
                        onChange={handleChange}
                        className="input-field rounded-2xl! h-28 resize-none py-4! px-6! text-base leading-relaxed"
                        placeholder="Back pain, heart issues, etc."
                      />
                    </div>
                  </div>
                </_motion.div>
              )}

              {step === 3 && (
                <_motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-10"
                >
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl font-serif text-[#2d3a30] tracking-tight">
                      Your Goals & Preferences
                    </h2>
                    <p className="text-sage-500 font-medium">
                      What would you like to achieve?
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1">
                        <div className="w-5 h-5 rounded-lg bg-[#3a4d3f]/10 flex items-center justify-center">
                          <Target size={12} className="text-[#3a4d3f]" />
                        </div>
                        Your Intentions
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "Flexibility",
                          "Strength",
                          "Stress Relief",
                          "Weight Loss",
                          "Spirituality",
                          "Better Sleep",
                        ].map((goal) => (
                          <_motion.button
                            key={goal}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleGoal(goal)}
                            className={`p-4 rounded-2xl border-2 transition-all text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
                              formData.goals.includes(goal)
                                ? "bg-[#3a4d3f] text-white border-[#3a4d3f] shadow-lg shadow-sage-200"
                                : "bg-white border-sage-100 text-sage-600 hover:border-[#3a4d3f]/30 hover:text-[#3a4d3f]"
                            }`}
                          >
                            {formData.goals.includes(goal) ? (
                              <Check size={16} />
                            ) : (
                              <Sparkles size={16} />
                            )}
                            {goal}
                          </_motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.25em] flex items-center gap-2 px-1">
                          <Clock size={12} className="text-[#3a4d3f]" />
                          Daily Time
                        </label>
                        <select
                          name="dailyAvailableTime"
                          value={formData.dailyAvailableTime}
                          onChange={handleChange}
                          className="input-field rounded-2xl! text-sm! appearance-none"
                        >
                          <option value="">Select duration</option>
                          <option value="15">15 Min</option>
                          <option value="30">30 Min</option>
                          <option value="60">1 Hour+</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-sage-500 uppercase tracking-[0.25em] px-1">
                          Preferred Style
                        </label>
                        <select
                          name="preferredYogaStyle"
                          value={formData.preferredYogaStyle}
                          onChange={handleChange}
                          className="input-field rounded-2xl! text-sm! appearance-none"
                        >
                          <option value="">Select style</option>
                          <option value="hatha">Hatha</option>
                          <option value="vinyasa">Vinyasa</option>
                          <option value="yin">Yin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </_motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <_motion.div
            className="flex justify-between gap-6 mt-14 pt-10 border-t border-sage-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="btn-secondary flex items-center gap-3 px-8! group"
              >
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />{" "}
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="btn-primary ml-auto flex items-center gap-3 px-10! group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  (step === 1 && !formData.age) ||
                  (step === 2 && !formData.yogaExperienceLevel)
                }
              >
                Next{" "}
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary ml-auto flex items-center gap-3 px-10! bg-linear-to-r! from-green-600! to-green-500! text-white! group"
              >
                <Check size={20} /> Complete Journey
              </button>
            )}
          </_motion.div>
        </_motion.div>

        {/* Progress Text */}
        <_motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-[11px] font-black text-sage-400 uppercase tracking-[0.3em]">
            Step {step} of 3
          </p>
        </_motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
