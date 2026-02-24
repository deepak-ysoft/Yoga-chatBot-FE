import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // 'danger' | 'info' | 'success'
}) => {
  if (!isOpen) return null;

  const themes = {
    danger: {
      icon: (
        <AlertTriangle
          className="text-red-500"
          size={24}
        />
      ),
      confirmBtn:
        "bg-red-500 hover:bg-red-600 shadow-red-200",
      accent: "bg-red-50",
    },
    info: {
      icon: (
        <AlertTriangle
          className="text-primary"
          size={24}
        />
      ),
      confirmBtn:
        "bg-primary hover:bg-primary-dark shadow-primary/20",
      accent: "bg-primary/5",
    },
  };

  const theme = themes[type] || themes.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-sage-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-sage-100"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl ${theme.accent} flex items-center justify-center`}
                >
                  {theme.icon}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-sage-400 hover:text-sage-600 hover:bg-sage-50 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <h3 className="text-xl font-serif text-primary-dark mb-2">
                {title}
              </h3>
              <p className="text-sage-600 text-sm leading-relaxed mb-8">
                {message}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-2xl border border-sage-100 text-sm font-bold text-sage-600 hover:bg-sage-50 transition-all"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-6 py-3 rounded-2xl text-white text-sm font-bold shadow-lg transition-all active:scale-95 ${theme.confirmBtn}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
