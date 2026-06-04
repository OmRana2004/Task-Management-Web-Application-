import { motion } from "framer-motion";

const colorConfig = {
  violet: {
    glow: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.2)",
    text: "#a78bfa",
    bg: "rgba(139,92,246,0.08)",
  },
  emerald: {
    glow: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.2)",
    text: "#34d399",
    bg: "rgba(16,185,129,0.07)",
  },
  amber: {
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.2)",
    text: "#fbbf24",
    bg: "rgba(245,158,11,0.07)",
  },
  sky: {
    glow: "rgba(14,165,233,0.12)",
    border: "rgba(14,165,233,0.2)",
    text: "#38bdf8",
    bg: "rgba(14,165,233,0.07)",
  },
};

const StatsCard = ({ title, value, icon, color = "violet" }) => {
  const c = colorConfig[color];

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative rounded-2xl p-4 overflow-hidden cursor-default"
      style={{
        background: `linear-gradient(135deg, ${c.bg} 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 20px ${c.glow}`,
      }}
    >
      {/* Shimmer top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${c.text}40, transparent)` }}
      />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
          <motion.p
            key={value}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            {value}
          </motion.p>
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
