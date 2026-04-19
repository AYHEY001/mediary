import { motion, MotionValue, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export default function Scene3({ progress }: { progress: MotionValue<number> }) {
  const nightOverlay = useTransform(progress, [0.75, 0.85], [0, 0.7]);
  const contentOpacity = useTransform(progress, [0.65, 0.70], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden"
      style={{ opacity: contentOpacity }}
      onMouseMove={handleMouseMove}
    >
      <motion.div className="absolute inset-0 bg-[#000000] pointer-events-none" style={{ opacity: nightOverlay }} />

      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right z-20 pointer-events-none">
        <span className="text-[11px] uppercase text-brand-cyan tracking-[0.2em] mb-1 block">机制 03 / 赛博时间伦理预演</span>
        <h2 className="text-[32px] font-[200] text-brand-fg mb-6">
           边界缝合与「软性体验」
        </h2>
        <ul className="list-none text-[14px] opacity-70 font-[300] tracking-[0.05em] space-y-4">
          <li>
            <span className="text-brand-cyan block mb-1">时空锚点交叠</span>
            无干预式陪伴消解主客体间的物理孤立感
          </li>
          <li>
            <span className="text-brand-cyan block mb-1">反抗注意力剥夺陷阱</span>
            摒弃高频阈值刺激，追求长周期连续情绪回潮
          </li>
          <li>
            <span className="text-brand-cyan block mb-1">后人类主义情绪补偿</span>
            在冰冷的社会网络中构建极具温度的绝对归属
          </li>
        </ul>
      </div>

      {/* Mouse interactive ambient light */}
      <motion.div 
        className="absolute w-[800px] h-[800px] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none z-10"
        style={{
          x: useTransform(springX, (v) => v - 400),
          y: useTransform(springY, (v) => v - 400),
        }}
      />

      <motion.div 
        className="absolute left-[30%] top-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-brand-cyan/20 blur-[100px] md:blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ opacity: useTransform(progress, [0.75, 0.85], [1, 0.1]) }} 
      />
      <motion.div 
        className="absolute left-[30%] top-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-brand-cyan/20 blur-[100px] md:blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: useTransform(progress, [0.75, 0.85], [0, 1]) }} 
      />

      <motion.div 
        whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(0, 242, 255, 0.2)" }}
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[360px] md:w-[320px] md:h-[400px] bg-brand-bg/80 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col overflow-hidden backdrop-blur-md cursor-default z-20"
      >
        <div className="h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/10">
           <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-red-400 transition-colors" />
           <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-yellow-400 transition-colors" />
           <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-green-400 transition-colors" />
        </div>
        
        <div className="flex-1 bg-transparent relative flex items-center justify-center p-8">
           {/* Minimalist character reading */}
           <div className="relative">
             {/* Book/Laptop */}
             <motion.div 
               whileHover={{ rotate: [-10, -5, -10], y: -5 }} 
               className="absolute -right-6 top-10 w-16 h-4 bg-white/30 rounded-sm shadow-md transform rotate-[-10deg]" 
             />
             {/* Character Body with breathing animation */}
             <motion.div 
                className="w-16 h-20 bg-white/20 rounded-t-3xl relative z-10 box-border border border-white/10"
                animate={{ y: [0, 2, 0], scaleY: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ filter: "brightness(1.5)" }}
             >
                {/* Character Head */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 border border-white/10 rounded-full" />
             </motion.div>
             {/* Desk */}
             <div className="w-32 h-2 bg-white/40 rounded-full mt-2 relative z-20" />
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
