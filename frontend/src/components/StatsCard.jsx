import { motion } from "framer-motion";

const colorConfig = {
  violet: { bg: "#eef2ff", border: "#c7d2fe", icon: "#6366f1", value: "#3730a3", trend: "#6366f1", sparkColor: "#6366f1" },
  emerald: { bg: "#ecfdf5", border: "#a7f3d0", icon: "#10b981", value: "#065f46", trend: "#10b981", sparkColor: "#10b981" },
  amber: { bg: "#fffbeb", border: "#fde68a", icon: "#f59e0b", value: "#78350f", trend: "#f59e0b", sparkColor: "#f59e0b" },
  sky: { bg: "#f0f9ff", border: "#bae6fd", icon: "#0ea5e9", value: "#0c4a6e", trend: "#0ea5e9", sparkColor: "#0ea5e9" },
};

// Mini sparkline bars
const Sparkline = ({ color, trendUp }) => {
  const bars = trendUp
    ? [3, 5, 4, 6, 5, 7, 6, 8]
    : [8, 6, 7, 5, 6, 4, 5, 3];

  return (
    <div className="flex items-end gap-0.5 h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h * 4}px` }}
          transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
          className="w-1.5 rounded-sm"
          style={{ background: i === bars.length - 1 ? color : `${color}50` }}
        />
      ))}
    </div>
  );
};

const StatsCard = ({ title, value, icon, color = "violet", trend, trendUp, sub }) => {
  const c = colorConfig[color];

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(99,102,241,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-white rounded-2xl p-4 cursor-default card-shadow"
      style={{ border: `1px solid ${c.border}` }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{
              background: trendUp ? "#ecfdf5" : "#fff1f2",
              color: trendUp ? "#059669" : "#e11d48",
              border: trendUp ? "1px solid #a7f3d0" : "1px solid #fecdd3",
            }}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>

      {/* Value */}
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-0.5"
        style={{ color: c.value }}
      >
        {value}
      </motion.p>
      <p className="text-xs font-medium text-slate-400 mb-3">{title}</p>

      {/* Sparkline */}
      <div className="flex items-end justify-between">
        <Sparkline color={c.sparkColor} trendUp={trendUp} />
        <span className="text-[10px] text-slate-300 font-medium">{sub}</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
