import {
  Leaf,
  Wind,
  Target,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Heart,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Activity } from "react";

const Landing = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  };

  return (
    <div className="yoga-gradient min-h-screen selection:bg-primary/30">
      {/* Immersive Background Decor - Subtle & Professional */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/3 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-sage-200/10 blur-[100px] rounded-full" />
      </div>

      {/* Structured Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
        <div className="bg-white/80 backdrop-blur-2xl px-10 py-5 flex items-center justify-between border border-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#3a4d3f] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Leaf size={20} />
            </div>
            <span className="text-2xl font-serif text-[#2d3a30] tracking-tight">
              YogaFlow <span className="text-[#3a4d3f] font-medium">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.25em] text-sage-400">
            <a
              href="#philosophy"
              className="hover:text-[#2d3a30] transition-colors"
            >
              Philosophy
            </a>
            <a
              href="#ritual"
              className="hover:text-[#2d3a30] transition-colors"
            >
              The Ritual
            </a>
            <Link
              to="/login"
              className="hover:text-[#2d3a30] transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="btn-primary px-8! py-3.5! rounded-full!"
            >
              Begin Path
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - High Contrast & Authority */}
      <section className="relative pt-64 pb-32 px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        <_motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8 max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#3a4d3f]/5 rounded-full text-[#3a4d3f] text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-[#3a4d3f]/10">
            <Sparkles size={14} /> Ancient Wisdom x Modern AI
          </div>
          <h1 className="text-6xl md:text-8xl font-serif leading-none tracking-tight text-[#2d3a30]">
            Your Digital{" "}
            <span className="italic font-normal text-primary-dark">
              Sanctuary
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-sage-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Personalized yoga and mindfulness rituals crafted for your unique
            journey. Designed for clarity, peace, and transformation.
          </p>
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              to="/register"
              className="btn-primary flex items-center gap-4 group shadow-2xl"
            >
              Start Your Journey{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/login"
              className="btn-secondary bg-transparent! border-sage-200"
            >
              Resume Your Flow
            </Link>
          </div>
        </_motion.div>

        {/* High-End Visual Anchor */}
        <_motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
          }}
          className="mt-32 relative w-full"
        >
          <div className="bg-white p-5 rounded-[4rem] border border-white shadow-[0_60px_120px_-30px_rgba(45,61,48,0.25)] relative z-10">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600"
              alt="Deep Yoga Practice"
              className="rounded-[3rem] w-full h-150 object-cover"
            />
          </div>
          {/* Floating Data Point - High Contrast */}
          <div className="absolute -bottom-12 -right-12 hidden lg:block z-20">
            <_motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-[#2d3a30] p-10 rounded-[2.5rem] shadow-2xl border border-white/10"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                  <Heart size={28} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-black text-white/40 uppercase tracking-widest">
                    Ritual Insight
                  </p>
                  <p className="text-2xl font-serif text-white">
                    Flowing Peace
                  </p>
                </div>
              </div>
            </_motion.div>
          </div>
        </_motion.div>
      </section>

      {/* Essence Section - Structured & Professional */}
      <section id="philosophy" className="py-40 px-8 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-32 space-y-4">
            <h2 className="text-5xl font-serif text-[#2d3a30]">
              The Essence of Flow
            </h2>
            <div className="w-20 h-1.5 bg-[#3a4d3f] mx-auto rounded-full opacity-10" />
            <p className="text-sage-500 font-bold uppercase tracking-[0.2em] text-[11px]">
              Why over 10,000 yogis choose us
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                icon: <Target />,
                title: "Personalized Action",
                desc: "Our AI understands your goals, injuries, and aspirations to create the perfect ritual every time.",
              },
              {
                icon: <Zap />,
                title: "Instant Attunement",
                desc: "Speak naturally to your guide. It adjusts your practice in real-time based on your feedback.",
              },
              {
                icon: <Wind />,
                title: "Mindful Breath",
                desc: "Integrated pranayama sensors and guidance to ensure every movement is fueled by peace.",
              },
            ].map((f, i) => (
              <_motion.div
                key={i}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.2 }}
                className="group flex flex-col items-center text-center space-y-8"
              >
                <div className="w-24 h-24 bg-white border border-sage-100 rounded-[2.5rem] flex items-center justify-center text-[#3a4d3f] shadow-xl group-hover:bg-[#3a4d3f] group-hover:text-white transition-all duration-500">
                  {f.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif text-[#2d3a30]">
                    {f.title}
                  </h3>
                  <p className="text-sage-500 leading-relaxed text-sm font-medium">
                    {f.desc}
                  </p>
                </div>
              </_motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual Roadmap - Clean & Linear */}
      <section id="ritual" className="py-40 px-8 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-serif text-[#2d3a30] leading-none">
                Your Path to <br /> Balance
              </h2>
              <p className="text-sage-500 font-medium">
                A structured ritual for the modern spiritual seeker.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  n: "01",
                  t: "Seek the Guide",
                  d: "Initialize your identity and share your current intentions and vulnerabilities.",
                },
                {
                  n: "02",
                  t: "Enter the Flow",
                  d: "Commune with your AI guide to manifest a daily ritual that fits your schedule.",
                },
                {
                  n: "03",
                  t: "Witness Growth",
                  d: "Visualize your transformation as you gain strength, flexibility, and inner peace.",
                },
              ].map((step, i) => (
                <_motion.div
                  key={i}
                  {...fadeInUp}
                  className="flex gap-10 group"
                >
                  <div className="text-5xl font-serif text-sage-200 group-hover:text-[#3a4d3f]/20 transition-colors duration-500 leading-none">
                    {step.n}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-[#2d3a30] tracking-tight">
                      {step.t}
                    </h4>
                    <p className="text-sage-500 text-sm font-medium leading-relaxed">
                      {step.d}
                    </p>
                  </div>
                </_motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-5 rounded-[4rem] shadow-2xl border border-sage-50 transform rotate-2 hover:rotate-0 transition-transform duration-1000">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000"
                className="rounded-[3rem] h-150 object-cover"
                alt="Pure Meditation"
              />
            </div>
            {/* Minimal Stat Card */}
            <div className="absolute top-1/2 -left-16 -translate-y-1/2 flex flex-col gap-6">
              <div className="w-20 h-20 bg-[#3a4d3f] rounded-3xl flex items-center justify-center text-white shadow-2xl">
                <Activity size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Action - Authority & Class */}
      <section className="py-40 px-8">
        <_motion.div
          {...fadeInUp}
          className="max-w-5xl mx-auto bg-[#2d3a30] rounded-[5rem] p-20 md:p-32 text-center text-white shadow-[0_50px_100px_-20px_rgba(45,61,48,0.5)] border border-white/10"
        >
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-serif mb-8">
              Begin Your Ritual Today.
            </h2>
            <p className="text-sage-300 text-xl font-medium leading-relaxed">
              Step into the sanctuary and discover the perfect harmony of mind,
              body, and wisdom.
            </p>
            <Link
              to="/register"
              className="btn-secondary bg-white! text-[#2d3a30]! px-16! py-6! flex items-center justify-center gap-4 w-fit mx-auto group shadow-2xl hover:scale-105 transition-transform"
            >
              Begin Free Path{" "}
              <ChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </_motion.div>
      </section>

      {/* Clean Footer */}
      <footer className="py-32 px-10 border-t border-sage-100 bg-white/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-20">
          <div className="col-span-2 space-y-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#3a4d3f] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Leaf size={24} />
              </div>
              <span className="text-3xl font-serif text-[#2d3a30]">
                YogaFlow
              </span>
            </div>
            <p className="text-sage-500 text-lg font-medium leading-relaxed max-w-sm">
              Creating digital sanctuaries for the modern practitioner. May your
              path be illuminated and your mind be still.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 col-span-2">
            <div>
              <h5 className="text-[11px] font-black text-sage-300 uppercase tracking-[0.3em] mb-10">
                Exploration
              </h5>
              <ul className="space-y-6 text-sm font-black text-[#2d3a30] uppercase tracking-tighter">
                <li>
                  <Link
                    to="/philosophy"
                    className="hover:text-primary-dark transition-colors"
                  >
                    Philosophy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rituals"
                    className="hover:text-primary-dark transition-colors"
                  >
                    The Ritual
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-primary-dark transition-colors"
                  >
                    Enter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[11px] font-black text-sage-300 uppercase tracking-[0.3em] mb-10">
                Connection
              </h5>
              <ul className="space-y-6 text-sm font-black text-[#2d3a30] uppercase tracking-tighter">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-dark transition-colors"
                  >
                    Presence
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-dark transition-colors"
                  >
                    Vibe Check
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-dark transition-colors"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-32 text-center">
          <p className="text-[10px] font-black text-sage-200 uppercase tracking-[0.5em]">
            &copy; 2024 YogaFlow Sanctuary &bull; Unified Peace Ritual
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
