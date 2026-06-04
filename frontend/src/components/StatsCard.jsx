import { motion } from "framer-motion";

const colorConfig = {
  violet: { bg: "#eef2ff", border: "#c7d2fe", icon: "#6366f1", text: "#4338ca", glow: "rgba(99,102,241,0.12)" },
  emerald: { bg: "#ecfdf5", border: "#a7f3d0", icon: "#10b981", text: "#065f46", glow: "rgba(16,185,129,0.1)" },
  amber: { bg: "#fffbeb", border: "#fde68a", icon: "#f59e0b", text: "#92400e", glow: "rgba(245,158,11,0.1)" },
  sky: { bg: "#f0f9ff", border: "#bae6fd", icon: "#0ea5e9", text: "#0c4a6e", glow: "rgba(14,165,233,0.1)" },
};

const StatsCard = ({ title, value, icon, color = "violet" }) => {
  const c = colorConfig[color];

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-white rounded-2xl p-4 cursor-default"
      style={{
        border: `1px solid ${c.border}`,
        boxShadow: `0 2px 16px ${c.glow}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{title}</p>
          <motion.p
            key={value}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
            style={{ color: c.text }}
          >
            {value}
          </motion.p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
