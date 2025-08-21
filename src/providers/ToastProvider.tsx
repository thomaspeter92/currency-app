import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../stores";
import { removeToast } from "../stores/toast";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, InfoIcon } from "lucide-react";

const ToastProvider = () => {
  const toasts = useSelector((state: RootState) => state.toastReducer.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toasts[0].id));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, dispatch]);

  return (
    <div className="fixed bottom-8 right-4 space-y-2 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            role={toast.type === "error" ? "alert" : "polite"}
            key={toast.id}
            className={`px-4 border-l-5 font-medium border py-2 rounded shadow flex items-center gap-3 ${
              toast.type === "error"
                ? "bg-red-100 text-red-500 border-red-500"
                : toast.type === "success"
                ? "bg-green-100 text-green-500 border-green-500"
                : "bg-yellow-100 text-yellow-600 border-yellow-600"
            }`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {toast.type === "error" ? (
              <AlertCircle aria-hidden />
            ) : (
              <InfoIcon aria-hidden />
            )}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastProvider;
