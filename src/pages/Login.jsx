import { motion as _motion } from "framer-motion";
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
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
      setError("The connection was interrupted. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-br from-cream via-cream to-sage-50 min-h-screen flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] bg-primary/8 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] bg-sage-200/10 rounded-full blur-[80px] animate-pulse animation-delay-2000" />
      </div>

      <_motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <_motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/90 backdrop-blur-xl p-10 md:p-12 rounded-2xl w-full shadow-2xl shadow-primary/20 border border-white/80 space-y-8"
        >
          <_motion.header variants={itemVariants} className="text-center space-y-4">
            <_motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              className="inline-flex p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl text-primary mb-2 shadow-lg shadow-primary/10"
            >
              <Sparkles size={28} />
            </_motion.div>
            <h2 className="text-4xl font-serif text-primary-dark">Welcome Back</h2>
            <p className="text-sage-500 font-bold uppercase tracking-widest text-[11px]">
              Reconnect with your practice
            </p>
          </_motion.header>

          {error && (
            <_motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-50 to-red-50/50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-200/50 flex items-start gap-3"
            >
              <div className="text-red-500 mt-0.5">⚠</div>
              <span>{error}</span>
            </_motion.div>
          )}

          <_motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <_motion.div variants={itemVariants} className="space-y-3">
              <label className="text-[11px] font-bold text-sage-600 uppercase tracking-widest ml-1 block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="yogi@flow.com"
                  required
                />
              </div>
            </_motion.div>

            <_motion.div variants={itemVariants} className="space-y-3">
              <label className="text-[11px] font-bold text-sage-600 uppercase tracking-widest ml-1 block">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </_motion.div>

            <_motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 group shadow-xl shadow-primary/30 relative overflow-hidden"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Aligning Chakras...
                </>
              ) : (
                <>
                  Enter Sanctuary <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </_motion.button>
          </_motion.form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sage-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sage-400 text-[10px] font-bold uppercase tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          <_motion.div variants={itemVariants}>
            <SocialLoginButtons />
          </_motion.div>

          <_motion.footer
            variants={itemVariants}
            className="text-center pt-6 border-t border-sage-100"
          >
            <p className="text-sage-600 text-sm">
              New to the sanctuary?{" "}
              <Link to="/register" className="text-primary font-bold hover:text-primary-dark transition-colors duration-300">
                Create an account
              </Link>
            </p>
          </_motion.footer>
        </_motion.div>
      </_motion.div>
    </div>
  );
};

export default Login;
