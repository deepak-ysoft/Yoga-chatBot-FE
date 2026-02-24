import {
  Leaf,
  Target,
  Sparkles,
  ArrowRight,
  Brain,
  Lightbulb,
  MessageSquare,
  Zap,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";

const Landing = () => {
  // const fadeInUp = {
  //   initial: { opacity: 0, y: 20 },
  //   whileInView: { opacity: 1, y: 0 },
  //   viewport: { once: true },
  //   transition: {
  //     duration: 0.6,
  //     ease: "easeOut",
  //   },
  // };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="bg-gradient-to-br from-cream via-cream to-sage-50 min-h-screen selection:bg-primary/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] bg-sage-200/10 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
        <div className="absolute bottom-[10%] left-[50%] w-[300px] h-[300px] bg-primary/8 rounded-full blur-[80px]" />
      </div>

      {/* Structured Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
        <_motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-2xl px-8 py-4 flex items-center justify-between border border-white/60 rounded-2xl shadow-2xl shadow-primary/5 hover:shadow-primary/15 transition-all duration-500 hover:border-white/80"
        >
          <div className="flex items-center gap-3">
            <_motion.div
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30"
            >
              <Leaf size={18} />
            </_motion.div>
            <span className="text-xl font-serif text-primary-dark tracking-tight">
              YogaFlow{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sage-600 font-medium">
                AI
              </span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-sage-400">
            <a
              href="#philosophy"
              className="hover:text-primary transition-colors duration-300"
            >
              Philosophy
            </a>
            <a
              href="#ritual"
              className="hover:text-primary transition-colors duration-300"
            >
              The Ritual
            </a>
            <Link
              to="/login"
              className="hover:text-primary transition-colors duration-300"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="btn-primary px-6! py-2.5! rounded-full! text-[10px]! shadow-lg shadow-primary/30"
            >
              Begin Path
            </Link>
          </div>
        </_motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-8 max-w-6xl mx-auto flex flex-col items-center text-center z-10">
        <_motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="space-y-8 max-w-4xl"
        >
          <_motion.div
            animate={floatingAnimation}
            className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary/10 to-sage-200/10 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 shadow-lg shadow-primary/5"
          >
            <Sparkles
              size={14}
              className="animate-spin animation-duration-3000"
            />{" "}
            AI-Powered Zen Sanctuary
          </_motion.div>

          <h1 className="text-6xl md:text-8xl font-serif leading-tight tracking-tight text-primary-dark">
            Your Digital{" "}
            <_motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-sage-600"
            >
              Sanctuary
            </_motion.span>
          </h1>

          <_motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="text-lg md:text-xl text-sage-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Personalized yoga and mindfulness
            rituals powered by AI. Transform your
            practice with intelligent guidance
            designed for clarity, peace, and
            authentic growth.
          </_motion.p>

          <_motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="btn-primary flex items-center gap-3 group shadow-xl shadow-primary/30 hover:shadow-primary/50 transform transition-all duration-300 hover:scale-105"
            >
              Start Your Journey{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/login"
              className="btn-secondary border-sage-300/50 hover:border-primary/30 transition-all duration-300"
            >
              Resume Your Flow
            </Link>
          </_motion.div>
        </_motion.div>

        {/* Hero Image with Advanced Effects */}
        <_motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.95,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="mt-24 relative w-full max-w-5xl"
        >
          <_motion.div
            className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-sage-200/10 to-primary/10 rounded-[2.5rem] blur-3xl opacity-60"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <div className="relative bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/80 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-500 group overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3752179/pexels-photo-3752179.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
              alt="Yoga Meditation Practice"
              className="rounded-[2rem] w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent rounded-[2rem] pointer-events-none" />
          </div>
        </_motion.div>
      </section>

      {/* Features Section */}
      <section
        id="philosophy"
        className="py-32 px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <_motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-5xl font-serif text-primary-dark">
              The Essence of Flow
            </h2>
            <p className="text-sage-500 font-bold uppercase tracking-widest text-[11px]">
              Trusted by thousands of
              practitioners worldwide
            </p>
          </_motion.header>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={28} />,
                title: "Personalized Rituals",
                desc: "AI that learns your body, goals, and preferences to craft perfectly tailored sessions every single time.",
                color:
                  "from-primary/20 to-primary/5",
              },
              {
                icon: <Brain size={28} />,
                title: "Intelligent Guidance",
                desc: "Speak naturally to your AI guide. Real-time adjustments based on your body signals and feedback.",
                color:
                  "from-sage-300/20 to-sage-300/5",
              },
              {
                icon: <Lightbulb size={28} />,
                title: "Mindful Wisdom",
                desc: "Ancient yoga principles merged with modern neuroscience for breakthrough growth and transformation.",
                color:
                  "from-orange-200/20 to-orange-100/5",
              },
            ].map((f, i) => (
              <_motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden p-10 rounded-2xl bg-gradient-to-br ${f.color} border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative space-y-6 flex flex-col items-center text-center">
                  <_motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 10,
                    }}
                    className="w-20 h-20 bg-white/80 rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:shadow-xl transition-all duration-500"
                  >
                    {f.icon}
                  </_motion.div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-serif text-primary-dark group-hover:text-primary transition-colors duration-300">
                      {f.title}
                    </h3>
                    <p className="text-sage-600 leading-relaxed text-sm">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </_motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Ritual Section */}
      <section
        id="ritual"
        className="py-32 px-8 relative overflow-hidden bg-white/40"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <_motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 space-y-4"
          >
            <h2 className="text-5xl font-serif text-primary-dark tracking-tight">
              The Path of Ritual
            </h2>
            <p className="text-sage-500 font-bold uppercase tracking-[0.3em] text-[10px]">
              Four steps to mindful mastery
            </p>
          </_motion.header>

          <div className="relative">
            {/* Desktop Vertical Line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-sage-200 hidden lg:block" />

            <div className="space-y-24 lg:space-y-48">
              {[
                {
                  step: "01",
                  title: "Set Your Intention",
                  desc: "Begin by defining your focus for today. Whether it's seeking mental clarity, physical strength, or spiritual peace, your goal shapes the flow.",
                  icon: (
                    <Target
                      className="text-primary"
                      size={32}
                    />
                  ),
                  side: "left",
                },
                {
                  step: "02",
                  title: "Initiate Dialogue",
                  desc: "Converse with your AI guide in natural language. Share your energy levels, physical constraints, and aspirations to tailor your practice.",
                  icon: (
                    <MessageSquare
                      className="text-primary"
                      size={32}
                    />
                  ),
                  side: "right",
                },
                {
                  step: "03",
                  title: "Enter the Flow",
                  desc: "Experience a practice that evolves with you. Real-time guidance adjusts posture and rhythm based on your progressive needs and feedback.",
                  icon: (
                    <Zap
                      className="text-primary"
                      size={32}
                    />
                  ),
                  side: "left",
                },
                {
                  step: "04",
                  title: "Reflect & Integrate",
                  desc: "Conclude with mindful reflection. Capture your growth metrics and spiritual insights as the sanctuary learns and grows with your journey.",
                  icon: (
                    <Heart
                      className="text-primary"
                      size={32}
                    />
                  ),
                  side: "right",
                },
              ].map((step, i) => (
                <_motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x:
                      step.side === "left" ?
                        -50
                      : 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${
                    step.side === "right" ?
                      "lg:flex-row-reverse"
                    : ""
                  }`}
                >
                  <div
                    className={`flex-1 w-full ${step.side === "left" ? "lg:text-right lg:pr-24" : "lg:text-left lg:pl-24"}`}
                  >
                    <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
                      <span className="text-7xl font-serif text-primary/10 block leading-none">
                        {step.step}
                      </span>
                      <h3 className="text-3xl font-serif text-primary-dark">
                        {step.title}
                      </h3>
                      <p className="text-sage-600 leading-relaxed text-lg font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center">
                    <_motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-sage-100 z-10"
                    >
                      {step.icon}
                    </_motion.div>
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 animate-pulse" />
                  </div>

                  <div className="flex-1 w-full hidden lg:block" />
                </_motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <_motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-serif text-primary-dark">
            Ready to Transform?
          </h2>
          <p className="text-lg text-sage-600">
            Begin your journey to inner peace and
            physical vitality with personalized
            AI-guided yoga.
          </p>
          <_motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/register"
              className="btn-primary flex items-center justify-center gap-2 shadow-xl shadow-primary/30 transform transition-all hover:scale-105"
            >
              Get Started Now{" "}
              <ArrowRight size={20} />
            </Link>
          </_motion.div>
        </div>
      </_motion.section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-sage-200/50 bg-white/30 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white">
              <Leaf size={16} />
            </div>
            <span className="text-lg font-serif text-primary-dark">
              YogaFlow AI
            </span>
          </div>
          <p className="text-[11px] font-bold text-sage-400 uppercase tracking-widest">
            &copy; 2026 YogaFlow Sanctuary &bull;
            Modern AI-Powered Mindfulness
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
