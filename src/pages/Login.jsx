import { motion as _motion } from "framer-motion";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { authService } from "../services/authService";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        login(response.data, response.data.token);
      } else {
        setError(response.message || "Credential mismatch. Try again.");
      }
    } catch (err) {
      setError(
        `The connection to the sanctuary was interrupted. ${err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="yoga-gradient min-h-screen flex items-center justify-center p-6 bg-[#f8f6f2]">
      <_motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 md:p-16 rounded-[3rem] w-full max-w-xl shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-white"
      >
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex p-4 bg-sage-50 rounded-3xl text-[#3a4d3f] mb-2 shadow-sm">
            <Sparkles size={32} />
          </div>
          <h2 className="text-4xl font-serif text-[#2d3a30]">Welcome Back</h2>
          <p className="text-sage-400 font-black uppercase tracking-[0.3em] text-[10px]">
            Enter your credentials to resume your flow
          </p>
        </header>

        {error && (
          <_motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl mb-10 text-xs font-bold flex items-center gap-4 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {error}
          </_motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-sage-400 uppercase tracking-[0.25em] px-1 flex items-center gap-2">
              <Mail size={12} /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field py-5!"
              placeholder="yogi@sanctuary.com"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black text-sage-400 uppercase tracking-[0.25em] px-1 flex items-center gap-2">
              <Lock size={12} /> Sacred Key (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field py-5!"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-4 group py-5! shadow-2xl shadow-sage-200"
          >
            {loading ? (
              "Aligning..."
            ) : (
              <>
                Enter Sanctuary{" "}
                <LogIn
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-sage-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em]">
            <span className="px-6 bg-white text-sage-300">
              Synchronize With
            </span>
          </div>
        </div>

        <SocialLoginButtons />

        <footer className="text-center mt-12 pt-8 border-t border-sage-50 space-y-4">
          <p className="text-sage-600 text-[13px] font-medium">
            New to the flow?{" "}
            <Link
              to="/register"
              className="text-[#3a4d3f] font-black border-b-2 border-primary/20 hover:border-primary transition-all"
            >
              Begin Your Path
            </Link>
          </p>
          <Link
            to="/"
            className="text-[10px] font-black text-sage-300 uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:text-sage-500 transition-colors"
          >
            Return to Essence
          </Link>
        </footer>
      </_motion.div>
    </div>
  );
};

export default Login;
