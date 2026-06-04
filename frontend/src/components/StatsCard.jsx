import { motion } from "framer-motion";

const Sparkline = ({ color, trendUp }) => {
  const bars = trendUp ? [3, 5, 4, 6, 5, 7, 6, 8] : [8, 6, 7, 5, 6, 4, 5, 3];
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

const configs = {
  violet: {
    lightBg: "#eef2ff", lightBorder: "#c7d2fe", lightValue: "#3730a3",
    darkBg: "rgba(99,102,241,0.1)", darkBorder: "rgba(99,102,241,0.2)", darkValue: "#a5b4fc",
    spark: "#6366f1",
  },
  emerald: {
    lightBg: "#ecfdf5", lightBorder: "#a7f3d0", lightValue: "#065f46",
    darkBg: "rgba(16,185,129,0.1)", darkBorder: "rgba(16,185,129,0.2)", darkValue: "#6ee7b7",
    spark: "#10b981",
  },
  amber: {
    lightBg: "#fffbeb", lightBorder: "#fde68a", lightValue: "#78350f",
    darkBg: "rgba(245,158,11,0.1)", darkBorder: "rgba(245,158,11,0.2)", darkValue: "#fcd34d",
    spark: "#f59e0b",
  },
  sky: {
    lightBg: "#f0f9ff", lightBorder: "#bae6fd", lightValue: "#0c4a6e",
    darkBg: "rgba(14,165,233,0.1)", darkBorder: "rgba(14,165,233,0.2)", darkValue: "#7dd3fc",
    spark: "#0ea5e9",
  },
};

const StatsCard = ({ title, value, icon, color = "violet", trend, trendUp, sub }) => {
  const c = configs[color];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="rounded-2xl p-4 cursor-default card-shadow bg-white dark:bg-slate-900"
      style={{ border: `1px solid ${c.lightBorder}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: c.lightBg, border: `1px solid ${c.lightBorder}` }}>
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

      <motion.p
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-0.5 text-slate-800 dark:text-slate-100"
      >
        {value}
      </motion.p>
      <p className="text-xs font-medium mb-3 text-slate-400 dark:text-slate-500">{title}</p>

      <div className="flex items-end justify-between">
        <Sparkline color={c.spark} trendUp={trendUp} />
        <span className="text-[10px] font-medium text-slate-300 dark:text-slate-600">{sub}</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
