import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function OpeningAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-brand-fg pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
    >
      <motion.div
        className="flex mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="w-[1px] h-[100px] bg-brand-cyan/50 mx-4 transform -skew-x-[20deg]" />
        <div className="w-[1px] h-[100px] bg-brand-gold/50 mx-4 transform -skew-x-[20deg]" />
      </motion.div>
      <motion.h1 
        className="text-[24px] md:text-[36px] font-[200] tracking-[0.2em] uppercase mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        数字媒介下的时间体验
      </motion.h1>
      <motion.p
        className="text-[12px] opacity-50 tracking-[0.4em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        System Initialization
      </motion.p>
    </motion.div>
  );
}
