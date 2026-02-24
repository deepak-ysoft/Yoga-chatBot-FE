import { motion as _motion } from "framer-motion";
import { Mail as MicrosoftIcon } from "lucide-react";
import { authService } from "../../services/authService";

const SocialLoginButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <_motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={authService.googleLogin}
        className="flex items-center justify-center gap-3 py-4 px-4 bg-white/60 hover:bg-white border border-white/60 rounded-2xl transition-all shadow-lg hover:shadow-xl text-xs font-bold text-sage-600 uppercase tracking-widest"
      >
        <img
          src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
          alt="Google"
          className="w-5 h-5 grayscale opacity-70 group-hover:grayscale-0 transition-all"
        />
        Google
      </_motion.button>

      <_motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={authService.microsoftLogin}
        className="flex items-center justify-center gap-3 py-4 px-4 bg-white/60 hover:bg-white border border-white/60 rounded-2xl transition-all shadow-lg hover:shadow-xl text-xs font-bold text-sage-600 uppercase tracking-widest"
      >
        <MicrosoftIcon size={18} className="text-blue-500" />
        Microsoft
      </_motion.button>
    </div>
  );
};

export default SocialLoginButtons;
