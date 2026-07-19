import { motion } from "framer-motion";
import React from "react";

type Stat = {
  label: string;
  value: string | number | undefined;
  color: string;
  icon: React.ElementType;
};

type StatCardProps = {
  stat: Stat;
  index: number;
};

export default function StatCard({ stat, index }: StatCardProps) {
  const Icon = stat.icon;
  return (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="bg-card rounded-xl p-5 border border-border/50 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="font-serif text-2xl text-foreground">{stat.value}</p>
      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
    </motion.div>
  );
}
