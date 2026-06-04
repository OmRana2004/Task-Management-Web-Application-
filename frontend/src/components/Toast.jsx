// Toast.jsx
import { motion } from "framer-motion";

const Toast = ({ message, type = "success" }) => {
  const ok = type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-white"
      style={{
        border: ok ? "1px solid #a7f3d0" : "1px solid #fecdd3",
        color: ok ? "#059669" : "#e11d48",
        boxShadow: ok ? "0 8px 24px rgba(16,185,129,0.15), 0 2px 8px rgba(0,0,0,0.06)" : "0 8px 24px rgba(244,63,94,0.15), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
        style={{ background: ok ? "#10b981" : "#f43f5e" }}>
        {ok ? "✓" : "✕"}
      </div>
      {message}
    </motion.div>
  );
};

export default Toast;
