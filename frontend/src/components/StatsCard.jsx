import { motion } from "framer-motion";

const StatsCard = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
    >
      <p className="text-gray-400">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </motion.div>
  );
};

export default StatsCard;