import {
  Link,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  LogOut,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ children }) => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Chat",
      icon: <MessageSquare size={20} />,
      path: "/chat",
    },
    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ?
          <X size={24} />
        : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-sage-100 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static
      `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <Leaf className="text-primary-dark w-8 h-8" />
            <span className="text-xl font-bold text-sage-800">
              YogaFlow AI
            </span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
                  ${
                    (
                      location.pathname ===
                      item.path
                    ) ?
                      "bg-primary-light text-primary-dark font-bold shadow-sm"
                    : "text-sage-500 hover:bg-sage-50 hover:text-sage-700"
                  }
                `}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-sage-100">
            <div className="flex items-center gap-3 px-4 py-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark font-bold">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              <div className="truncate">
                <p className="text-sm font-bold text-sage-800 truncate">
                  {user?.fullName}
                </p>
                <p className="text-xs text-sage-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
