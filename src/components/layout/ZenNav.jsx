import {
  motion as _motion,
  AnimatePresence,
} from "framer-motion";
import {
  Home,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { GrYoga } from "react-icons/gr";
import ConfirmModal from "../ui/ConfirmModal";

const SidebarContent = ({
  mobile = false,
  navItems,
  location,
  hoveredItem,
  setHoveredItem,
  setIsMobileMenuOpen,
  logout,
}) => (
  <>
    <div
      className={`mb-12 ${mobile ? "flex items-center justify-between w-full px-6" : ""}`}
    >
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
        <GrYoga size={24} />
      </div>
      {mobile && (
        <button
          onClick={() =>
            setIsMobileMenuOpen(false)
          }
          className="text-sage-400 p-2"
        >
          <X size={24} />
        </button>
      )}
    </div>

    <nav
      className={`flex-1 flex flex-col gap-4 ${mobile ? "w-full px-4" : ""}`}
    >
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path;
        return (
          <div
            key={item.path}
            className="relative flex items-center group"
            onMouseEnter={() =>
              setHoveredItem(item.path)
            }
            onMouseLeave={() =>
              setHoveredItem(null)
            }
          >
            {/* Active Indicator (Vertical Pill) */}
            {isActive && !mobile && (
              <_motion.div
                layoutId="active-pill"
                className="absolute left-0 w-1.5 h-8 w-1 bg-primary rounded-r-full"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            <Link
              to={item.path}
              className={`
                  w-full h-12 rounded-2xl flex items-center transition-all duration-150
                  ${mobile ? "px-4 gap-4" : "justify-center mx-auto w-12"}
                  ${isActive ? "bg-primary/5 text-primary" : "text-sage-400 hover:bg-sage-50 hover:text-sage-700 hover:scale-105"}
                `}
            >
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center">
                {item.icon}
              </span>
              {mobile && (
                <span className="text-sm font-bold">
                  {item.label}
                </span>
              )}
            </Link>

            {/* Tooltip on Hover (Desktop only) */}
            {!mobile && (
              <AnimatePresence>
                {hoveredItem === item.path && (
                  <_motion.div
                    initial={{
                      opacity: 0,
                      x: 10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 20,
                    }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute left-full ml-2 px-3 py-1.5 bg-sage-900 text-white text-[11px] font-bold rounded-lg pointer-events-none z-[60] whitespace-nowrap"
                  >
                    {item.label}
                  </_motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>

    <div
      className={`mt-auto flex flex-col gap-4 ${mobile ? "w-full px-4 pb-8" : ""}`}
    >
      <button
        onClick={logout}
        onMouseEnter={() =>
          setHoveredItem("logout")
        }
        onMouseLeave={() => setHoveredItem(null)}
        className={`
            h-12 rounded-2xl flex items-center transition-all duration-150 relative group
            ${mobile ? "px-4 gap-4 text-red-500 hover:bg-red-50" : "w-12 justify-center mx-auto text-sage-300 hover:text-red-500 hover:bg-red-50"}
          `}
      >
        <LogOut size={24} />
        {mobile && (
          <span className="text-sm font-bold">
            Logout
          </span>
        )}
        {!mobile && (
          <AnimatePresence>
            {hoveredItem === "logout" && (
              <_motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 20 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute left-full ml-2 px-3 py-1.5 bg-red-600 text-white text-[11px] font-bold rounded-lg pointer-events-none z-[60] whitespace-nowrap"
              >
                Logout
              </_motion.div>
            )}
          </AnimatePresence>
        )}
      </button>
    </div>
  </>
);

const ZenNav = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [hoveredItem, setHoveredItem] =
    useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [
    isLogoutModalOpen,
    setIsLogoutModalOpen,
  ] = useState(false);

  const [prevPathname, setPrevPathname] =
    useState(location.pathname);

  // Close mobile menu on route change
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  const navItems = [
    {
      path: "/dashboard",
      icon: <Home size={24} />,
      label: "Sanctuary",
    },
    {
      path: "/chat",
      icon: <MessageSquare size={24} />,
      label: "Guide",
    },
    {
      path: "/profile",
      icon: <User size={24} />,
      label: "Identity",
    },
  ];

  const userName =
    user?.fullName?.split(" ")[0] || "Yogi";

  const commonProps = {
    navItems,
    location,
    hoveredItem,
    setHoveredItem,
    setIsMobileMenuOpen,
    logout: () => setIsLogoutModalOpen(true),
  };

  return (
    <div className="h-screen bg-cream flex overflow-hidden">
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() =>
          setIsLogoutModalOpen(false)
        }
        onConfirm={logout}
        title="Logout?"
        message="Are you sure you want to end your session?"
        confirmText="Logout"
        type="danger"
      />
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[72px] bg-white border-r border-sage-100 flex-col items-center py-8 z-50 flex-shrink-0">
        <SidebarContent {...commonProps} />
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <_motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
              className="fixed inset-0 bg-sage-900/40 backdrop-blur-sm z-50 md:hidden"
            />
            <_motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white z-[60] flex flex-col py-8 md:hidden shadow-2xl"
            >
              <SidebarContent
                mobile
                {...commonProps}
              />
            </_motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-sage-100 flex items-center justify-between px-4 md:px-8 z-40 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
              className="p-2 -ml-2 text-sage-600 hover:bg-sage-50 rounded-xl md:hidden"
            >
              <Menu size={24} />
            </button>
            <span className="text-sage-800 font-serif text-base md:text-lg font-medium">
              Namaste,{" "}
              <span className="text-primary">
                {userName}
              </span>
            </span>
            <div className="h-4 w-px bg-sage-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">
                Synced
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-cream">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ZenNav;
