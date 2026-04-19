import { motion, MotionValue, useTransform } from "motion/react";

export default function Scene4({ progress }: { progress: MotionValue<number> }) {
  const finalOpacity = useTransform(progress, [0.91, 0.95], [0, 1]);
  const haloScale = useTransform(progress, [0.93, 0.98], [0, 1]);

  // Dots converging animation (they fade in, move to center, and vanish)
  // Let's just do a simple entrance for them 
  const dot1Y = useTransform(progress, [0.91, 0.95], [-100, 0]);
  const dot1X = useTransform(progress, [0.91, 0.95], [-100, 0]);

  const dot2Y = useTransform(progress, [0.91, 0.95], [-100, 0]);
  const dot2X = useTransform(progress, [0.91, 0.95], [100, 0]);

  const dot3Y = useTransform(progress, [0.91, 0.95], [100, 0]);
  const dot3X = useTransform(progress, [0.91, 0.95], [0, 0]);

  const dotsOpacity = useTransform(progress, [0.91, 0.94, 0.96], [0, 1, 0]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 flex-col"
      style={{ opacity: finalOpacity }}
    >
      <div className="absolute inset-0 bg-brand-bg -z-10" />

      {/* Converging dots representing the 3 games */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10">
        <motion.div style={{ opacity: dotsOpacity, x: dot1X, y: dot1Y }} className="absolute w-[6px] h-[6px] bg-brand-cyan rounded-full shadow-[0_0_15px_var(--color-brand-cyan)] -ml-[3px] -mt-[3px]" />
        <motion.div style={{ opacity: dotsOpacity, x: dot2X, y: dot2Y }} className="absolute w-[6px] h-[6px] bg-brand-gold rounded-full shadow-[0_0_15px_var(--color-brand-gold)] -ml-[3px] -mt-[3px]" />
        <motion.div style={{ opacity: dotsOpacity, x: dot3X, y: dot3Y }} className="absolute w-[6px] h-[6px] bg-white rounded-full shadow-[0_0_15px_white] -ml-[3px] -mt-[3px]" />

        {/* Final Breathing Halo */}
        <motion.div style={{ scale: haloScale }} className="absolute -ml-[75px] -mt-[75px] w-[150px] h-[150px]">
           <motion.div 
             className="w-full h-full border border-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)]"
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           />
           <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />
        </motion.div>
      </div>

      <div className="z-10 text-center mb-40">
        <h2 className="text-[42px] font-[200] text-brand-fg mb-6 tracking-widest">
          夺回「时间的主权」
        </h2>
        <div className="space-y-4 text-[14px] text-white/70 font-[300] tracking-[0.05em] mt-8">
          <p>电子游戏以其极其精密的多维时空架构</p>
          <p>精准填补了现实异化生活反馈匮乏的断裂带</p>
          <p>我们在一次次启动虚拟规则的瞬间，完成着数字资本时代下</p>
          <p className="text-brand-cyan mt-4 font-[400]">一场寻回生命共鸣与自我主权的当代精神实践</p>
        </div>
      </div>
    </motion.div>
  );
}
