import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const Toast = ({ message, type = "success" }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl text-sm font-medium whitespace-nowrap ${
        isSuccess
          ? "bg-green-500/20 border-green-500/40 text-green-300"
          : "bg-red-500/20 border-red-500/40 text-red-300"
      }`}
    >
      {isSuccess ? <FiCheckCircle className="text-lg shrink-0" /> : <FiAlertCircle className="text-lg shrink-0" />}
      {message}
    </motion.div>
  );
};

export default Toast;
