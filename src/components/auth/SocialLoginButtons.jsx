import { motion as _motion } from "framer-motion";
import { Mail as MicrosoftIcon, Loader2 } from "lucide-react";
import { authService } from "../../services/authService";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const SocialLoginButtons = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const idToken = await authService.googleLogin();
      const result = await authService.googleLoginWithToken(idToken);
      if (result.success) {
        login(result.data, result.data.token);
      } else {
        setError(result.message || "Google login failed");
      }
    } catch (err) {
      setError(err.message || "Failed to complete Google login");
      console.error(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    setMicrosoftLoading(true);
    setError("");
    try {
      const response = await authService.microsoftLogin();
      if (response && response.idToken) {
        const result = await authService.microsoftLoginWithToken(
          response.idToken,
        );
        if (result.success) {
          login(result.data, result.data.token);
        } else {
          setError(result.message || "Microsoft login failed");
        }
      }
    } catch (err) {
      setError(err.message || "Failed to complete Microsoft login");
      console.error(err);
    } finally {
      setMicrosoftLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <_motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-red-500" />
          {error}
        </_motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <_motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          disabled={googleLoading || microsoftLoading}
          className="flex items-center justify-center gap-3 py-4 px-4 bg-white/60 hover:bg-white border border-white/60 rounded-2xl transition-all shadow-lg hover:shadow-xl text-xs font-bold text-sage-600 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google"
              className="w-5 h-5 grayscale opacity-70"
            />
          )}
          {googleLoading ? "Loading..." : "Google"}
        </_motion.button>

        <_motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMicrosoftLogin}
          disabled={googleLoading || microsoftLoading}
          className="flex items-center justify-center gap-3 py-4 px-4 bg-white/60 hover:bg-white border border-white/60 rounded-2xl transition-all shadow-lg hover:shadow-xl text-xs font-bold text-sage-600 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {microsoftLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <MicrosoftIcon size={18} className="text-blue-500" />
          )}
          {microsoftLoading ? "Loading..." : "Microsoft"}
        </_motion.button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
