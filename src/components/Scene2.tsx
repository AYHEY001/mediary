import { motion, MotionValue, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function Scene2({ progress }: { progress: MotionValue<number> }) {
  const seedsOp = useTransform(progress, [0.49, 0.51], [0, 1]);
  const waterOp = useTransform(progress, [0.53, 0.55], [0, 1]);
  const sproutOp = useTransform(progress, [0.57, 0.59], [0, 1]);
  const soilItemsOp = useTransform(progress, [0.57, 0.58], [1, 0]); 
  const fruitOp = useTransform(progress, [0.61, 0.63], [0, 1]);

  const [fastTime, setFastTime] = useState(0);
  const [realTime, setRealTime] = useState(new Date());

  // Mouse interaction for 3D tilt on the grid
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setFastTime(f => f + 1); 
    }, 50); 

    const intervalReal = setInterval(() => {
      setRealTime(new Date());
    }, 1000); 

    return () => {
      clearInterval(interval);
      clearInterval(intervalReal);
    }
  }, []);

  const formatFast = (ticks: number) => {
    const hours = Math.floor(ticks / 60) % 24;
    const mins = ticks % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const formatReal = (d: Date) => {
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center p-4 md:p-20 text-brand-fg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right z-20 pointer-events-none">
        <span className="text-[11px] uppercase text-brand-cyan tracking-[0.2em] mb-1 block">场景 02 / 星露谷物语</span>
        <h2 className="text-[32px] font-[200] text-brand-fg mb-6">
          时间的「结构化延展」
        </h2>
        <ul className="list-none text-[14px] opacity-70 font-[300] tracking-[0.05em] space-y-4">
          <li>
            <span className="text-brand-cyan block mb-1">重塑感知</span>
            物理流速：0.7秒 = 1分钟
          </li>
          <li>
            <span className="text-brand-cyan block mb-1">心理结构</span>
            阶段性成长，稳步释放节奏
          </li>
          <li>
            <span className="text-brand-cyan block mb-1">隐性反抗</span>
            重建现实效率以外的生活掌控感
          </li>
        </ul>
      </div>

      <div className="absolute top-10 left-10 md:top-20 md:left-20 border border-white/10 rounded-sm p-4 bg-black/40 backdrop-blur shadow-xl flex items-center gap-4 hover:border-brand-cyan/50 hover:bg-black/60 transition-colors cursor-default">
         <div className="text-2xl md:text-3xl font-mono text-brand-fg font-light">{formatFast(fastTime)}</div>
         <div className="text-[10px] font-normal uppercase tracking-widest text-brand-cyan">游戏内时间</div>
      </div>
      
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 border border-white/10 rounded-sm p-4 bg-black/40 backdrop-blur shadow-xl flex items-center gap-4 hover:border-white/30 hover:bg-black/60 transition-colors cursor-default">
         <div className="text-2xl md:text-3xl font-mono text-white/50 font-light">{formatReal(realTime)}</div>
         <div className="text-[10px] font-normal uppercase tracking-widest text-white/30">现实时间</div>
      </div>

      <motion.div 
        className="grid grid-cols-3 gap-2 md:gap-4 p-4 md:p-8 bg-[#b88c51] rounded-sm border border-[#8b5a2b] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative translate-y-20 md:translate-y-0 opacity-80 filter brightness-90 sepia-[0.2]"
        style={{ perspective: 1000, rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <motion.div 
            key={`soil-${i}`} 
            className="relative w-16 h-16 md:w-24 md:h-24 bg-[#a06d33] rounded-md overflow-hidden flex items-center justify-center border border-[#7a481c] cursor-crosshair"
            whileHover={{ scale: 1.1, z: 20, boxShadow: "0 10px 20px rgba(0,0,0,0.4)", filter: "brightness(1.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div style={{ opacity: soilItemsOp, transform: "translateZ(5px)" }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div style={{ opacity: seedsOp }} className="w-2 h-3 bg-yellow-200 rounded-full absolute drop-shadow-md" />
              <motion.div style={{ opacity: waterOp }} className="w-full h-full bg-blue-500/30 absolute inset-0" />
              <motion.div style={{ opacity: waterOp, y: -10, x: 10 }} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-300 rounded-full absolute drop-shadow-sm" />
              <motion.div style={{ opacity: waterOp, y: 15, x: -10 }} className="w-2 h-2 md:w-3 md:h-3 bg-blue-300 rounded-full absolute drop-shadow-sm" />
            </motion.div>

            <motion.div style={{ opacity: sproutOp, transform: "translateZ(15px)" }} className="absolute inset-0 flex items-end justify-center pb-2 md:pb-4 pointer-events-none">
              <div className="w-1 md:w-1.5 h-6 md:h-10 bg-green-500 rounded-full relative drop-shadow-lg">
                <div className="absolute top-1 md:top-2 -left-2 md:-left-3 w-3 md:w-4 h-1 md:h-2 bg-green-400 rounded-full rotate-[-30deg]" />
                <div className="absolute top-2 md:top-4 -right-2 md:-right-3 w-3 md:w-4 h-1 md:h-2 bg-green-400 rounded-full rotate-[30deg]" />
              </div>
            </motion.div>

            <motion.div style={{ opacity: fruitOp, transform: "translateZ(25px)" }} className="absolute inset-0 flex items-center justify-center pb-4 md:pb-8 pointer-events-none">
              <motion.div 
                className="w-4 h-4 md:w-6 md:h-6 bg-red-500 rounded-full shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.4)] md:shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.4)]" 
                whileHover={{ scale: 1.2, rotate: 10 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
