import {
  motion as _motion,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
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
    const goals =
      formData.goals.includes(goal) ?
        formData.goals.filter((g) => g !== goal)
      : [...formData.goals, goal];
    setFormData({ ...formData, goals });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        goals: formData.goals.join(", "),
      };
      const response = await api.post(
        "/onboarding/complete",
        payload,
      );
      if (response.data.success) {
        updateUser({
          goals: response.data.data.goals,
          isOnboardingCompleted: true,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const steps = ["Basics", "Experience", "Goals"];

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="w-full max-w-xl relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
            <Sparkles size={12} /> Personalized
            Flow
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary-dark">
            Begin Your Journey
          </h1>
          <p className="text-sage-500 text-sm max-w-xs mx-auto">
            Let us understand your needs to craft
            your perfect daily ritual.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between px-2">
            {steps.map((s, i) => (
              <span
                key={i}
                className={`text-[10px] font-bold uppercase tracking-widest ${i + 1 <= step ? "text-primary" : "text-sage-300"}`}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="h-1 bg-sage-100 rounded-full overflow-hidden">
            <_motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{
                width: `${(step / 3) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-10 rounded-card shadow-soft border border-sage-50 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <_motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 flex-1"
              >
                <h2 className="text-2xl font-serif text-primary-dark">
                  The Basics
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-sage-500 uppercase tracking-widest ml-1">
                      Your Age
                    </label>
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g. 28"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-sage-500 uppercase tracking-widest ml-1">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "Male",
                        "Female",
                        "Other",
                      ].map((g) => (
                        <button
                          key={g}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              gender: g,
                            })
                          }
                          className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                            (
                              formData.gender ===
                              g
                            ) ?
                              "bg-primary text-white border-primary"
                            : "bg-white border-sage-200 text-sage-500 hover:border-primary/40"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
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
                className="space-y-8 flex-1"
              >
                <h2 className="text-2xl font-serif text-primary-dark">
                  Your Experience
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-sage-500 uppercase tracking-widest ml-1">
                      Level
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        "Beginner",
                        "Intermediate",
                        "Advanced",
                      ].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              yogaExperienceLevel:
                                lvl,
                            })
                          }
                          className={`p-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-between ${
                            (
                              formData.yogaExperienceLevel ===
                              lvl
                            ) ?
                              "bg-primary text-white border-primary shadow-sm"
                            : "bg-white border-sage-200 text-sage-500 hover:border-primary/40"
                          }`}
                        >
                          {lvl}
                          {formData.yogaExperienceLevel ===
                            lvl && (
                            <Check size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-sage-500 uppercase tracking-widest ml-1">
                      Preferred Style
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Hatha",
                        "Vinyasa",
                        "Ashtanga",
                        "Yin",
                        "Restorative",
                        "Power",
                      ].map((style) => (
                        <button
                          key={style}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              preferredYogaStyle:
                                style,
                            })
                          }
                          className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                            (
                              formData.preferredYogaStyle ===
                              style
                            ) ?
                              "bg-primary text-white border-primary shadow-sm"
                            : "bg-white border-sage-200 text-sage-500 hover:border-primary/40"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
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
                className="space-y-8 flex-1"
              >
                <h2 className="text-2xl font-serif text-primary-dark">
                  Your Goals
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Flexibility",
                    "Strength",
                    "Stress Relief",
                    "Weight Loss",
                    "Spirituality",
                    "Better Sleep",
                  ].map((goal) => {
                    const isSelected =
                      formData.goals.includes(
                        goal,
                      );
                    return (
                      <button
                        key={goal}
                        onClick={() =>
                          toggleGoal(goal)
                        }
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                          isSelected ?
                            "bg-primary text-white border-primary"
                          : "bg-white border-sage-200 text-sage-500"
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-sage-500 uppercase tracking-widest ml-1">
                    Daily Commitment
                  </label>
                  <select
                    name="dailyAvailableTime"
                    value={
                      formData.dailyAvailableTime
                    }
                    onChange={handleChange}
                    className="input-field appearance-none"
                  >
                    <option value="">
                      Select time
                    </option>
                    <option value="15">
                      15 Minutes
                    </option>
                    <option value="30">
                      30 Minutes
                    </option>
                    <option value="60">
                      1 Hour+
                    </option>
                  </select>
                </div>
              </_motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-auto pt-8 border-t border-sage-50">
            {step > 1 ?
              <button
                onClick={prevStep}
                className="text-xs font-bold text-sage-400 hover:text-primary transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={16} /> Back
              </button>
            : <div />}

            {step < 3 ?
              <button
                onClick={nextStep}
                disabled={
                  (step === 1 && !formData.age) ||
                  (step === 2 &&
                    (!formData.yogaExperienceLevel ||
                      !formData.preferredYogaStyle))
                }
                className="btn-primary flex items-center gap-2 py-2.5! px-6! disabled:opacity-30"
              >
                Next <ChevronRight size={18} />
              </button>
            : <button
                onClick={handleSubmit}
                className="btn-primary flex items-center gap-2 py-2.5! px-8!"
              >
                Complete <Check size={18} />
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
