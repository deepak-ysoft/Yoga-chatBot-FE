import { motion as _motion } from "framer-motion";
import { Home, MessageSquare, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ZenNav = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    {
      path: "/dashboard",
      icon: <Home size={22} />,
      label: "Sanctuary",
    },
    {
      path: "/chat",
      icon: <MessageSquare size={22} />,
      label: "Guide",
    },
    {
      path: "/profile",
      icon: <User size={22} />,
      label: "Identity",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-sage-950 pb-24 md:pb-0 md:pl-28">
      {/* Immersive Background Elements - Subtle and less distracting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary/3 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-sage-200/10 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 p-6 md:p-14 animate-in fade-in slide-in-from-bottom-2 duration-700">
        {children}
      </main>

      {/* Floating Zen Nav - High Contrast for Clarity */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-50">
        <_motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-3xl border border-white p-2.5 flex md:flex-col gap-3 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <_motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-[#3a4d3f] text-white shadow-xl shadow-sage-200"
                      : "text-sage-400 hover:text-sage-700 hover:bg-sage-50"
                  }`}
                >
                  <div className={isActive ? "mb-0.5" : ""}>{item.icon}</div>

                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-widest mt-0.5 leading-none ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } transition-opacity`}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <_motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-white/10 rounded-full blur-md"
                    />
                  )}
                </_motion.div>
              </Link>
            );
          })}

          <div className="w-px h-8 bg-sage-100 self-center md:w-8 md:h-px my-1" />

          <button
            onClick={logout}
            className="w-16 h-16 rounded-full flex items-center justify-center text-sage-300 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
            title="Leave Sanctuary"
          >
            <LogOut size={22} />
          </button>
        </_motion.div>
      </nav>
    </div>
  );
};

export default ZenNav;
