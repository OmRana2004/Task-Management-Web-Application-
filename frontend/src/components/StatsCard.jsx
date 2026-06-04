import { motion } from "framer-motion";

const colorMap = {
  indigo: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/30 text-indigo-400",
  green:  "from-green-500/20 to-green-600/5 border-green-500/30 text-green-400",
  yellow: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30 text-yellow-400",
  purple: "from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400",
};

const StatsCard = ({ title, value, icon, color = "indigo" }) => {
  const colors = colorMap[color];

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative bg-gradient-to-br ${colors} border backdrop-blur-sm rounded-2xl p-5 overflow-hidden`}
    >
      {/* Background glow */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-current opacity-5 blur-xl" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <motion.h2
            key={value}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mt-1"
          >
            {value}
          </motion.h2>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
