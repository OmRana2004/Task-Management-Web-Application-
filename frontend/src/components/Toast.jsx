import { motion } from "framer-motion";

const Toast = ({ message, type = "success" }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap"
      style={{
        background: isSuccess
          ? "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.08))"
          : "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.08))",
        border: isSuccess ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(248,113,113,0.25)",
        color: isSuccess ? "#34d399" : "#f87171",
        backdropFilter: "blur(16px)",
        boxShadow: isSuccess
          ? "0 8px 24px rgba(16,185,129,0.15)"
          : "0 8px 24px rgba(239,68,68,0.15)",
      }}
    >
      <span className="text-base">{isSuccess ? "✓" : "✕"}</span>
      {message}
    </motion.div>
  );
};

export default Toast;
