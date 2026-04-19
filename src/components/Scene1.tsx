import { motion, MotionValue, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export default function Scene1({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.15, 0.18], [0, 1]);
  
  const mapScale = useTransform(progress, [0.3, 0.33], [1, 6]);
  
  const playerX = useTransform(progress, 
    [0.2, 0.22, 0.24, 0.26, 0.28, 0.3], 
    [-150, -150, 0,    0,   120,  120]
  );
  const playerY = useTransform(progress, 
    [0.2, 0.22, 0.24, 0.26, 0.28, 0.3], 
    [-100,  50,  50, -80, -80,   0]
  );
  const playerRotate = useTransform(progress, 
    [0.2, 0.22, 0.24, 0.26, 0.28, 0.3], 
    [180,  180,   90,   0,  90,  180] 
  );

  const dot1Op = useTransform(progress, [0.21, 0.22], [1, 0]);
  const dot2Op = useTransform(progress, [0.23, 0.24], [1, 0]);
  const dot3Op = useTransform(progress, [0.25, 0.26], [1, 0]);

  const enemyOpacity = useTransform(progress, [0.29, 0.3], [0, 1]);

  const bulletY = useTransform(progress, [0.34, 0.38], [25, -10]);
  const bulletOpacity = useTransform(progress, [0.34, 0.35, 0.38, 0.39], [0, 1, 1, 0]);

  const ringScale = useTransform(progress, [0.38, 0.39], [0, 10]);
  const ringOpacity = useTransform(progress, [0.38, 0.39, 0.40], [0, 1, 0]);

  // Screen shake effect mapping to combat peak
  const shakeX = useTransform(progress, [0.33, 0.34, 0.35, 0.36, 0.37, 0.38], [0, -10, 10, -5, 5, 0]);
  const shakeY = useTransform(progress, [0.33, 0.34, 0.35, 0.36, 0.37, 0.38], [0, 8, -8, 4, -4, 0]);

  // Mouse interaction for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

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
    <motion.div 
      className="absolute inset-0 flex flex-col md:flex-row items-center justify-center overflow-hidden"
      style={{ opacity }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute right-10 top-[20%] text-right z-20 md:max-w-md pointer-events-none">
        <span className="text-[11px] uppercase text-brand-cyan tracking-[0.2em] mb-1 block">机制 01 / 注意力闸门机制</span>
        <h2 className="text-[32px] font-[200] text-brand-fg mb-6">
          时间感知的「认知悖论」
        </h2>
        <ul className="list-none text-[14px] opacity-70 font-[300] tracking-[0.05em] space-y-4 mb-10">
          <motion.li style={{ opacity: useTransform(progress, [0.2, 0.22], [0, 1]) }}>
            <span className="text-brand-cyan block mb-1">起搏器-累加器假设</span>
            极限生存压力诱发高唤醒度 (Arousal)
          </motion.li>
          <motion.li style={{ opacity: useTransform(progress, [0.3, 0.32], [0, 1]) }}>
            <span className="text-brand-cyan block mb-1">奇数范式效应</span>
            高光瞬间引发微观时间极度膨胀
          </motion.li>
          <motion.li style={{ opacity: useTransform(progress, [0.35, 0.38], [0, 1]) }}>
            <span className="text-brand-cyan block mb-1">宏观时间压缩</span>
            高认知负荷致使“时间盲视”与时光飞逝
          </motion.li>
        </ul>
      </div>

      {/* Interactive Data Chart */}
      <motion.div 
        className="absolute bottom-10 right-10 z-30 w-80 p-5 border border-white/10 bg-black/50 backdrop-blur-md rounded-lg pointer-events-auto cursor-default transform transition-transform hover:scale-105"
        style={{ opacity: useTransform(progress, [0.35, 0.38], [0, 1]) }}
        whileHover={{ boxShadow: "0 0 20px rgba(0, 242, 255, 0.2)" }}
      >
        <h3 className="text-brand-cyan text-[12px] uppercase tracking-widest mb-4 flex items-center justify-between">
          <span>体感时间偏离</span>
          <span className="opacity-50 text-[10px]">&lt;Hover&gt;</span>
        </h3>
        
        <div className="mb-4 group">
          <div className="flex justify-between text-[11px] text-white/50 mb-1">
            <span>宏观现实流逝 (全局游玩时间)</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">~180 分钟无感知流逝</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-brand-fg/30" initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 1, delay: 0.2 }} />
          </div>
        </div>

        <div className="group">
          <div className="flex justify-between text-[11px] text-white/50 mb-1">
            <span className="text-brand-gold">局内心流微观延展体验</span>
            <span className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">极度漫长的高强度战术对弈</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-brand-gold shadow-[0_0_10px_var(--color-brand-gold)]" initial={{ width: "0%" }} whileInView={{ width: "20%" }} transition={{ duration: 1, delay: 0.5 }} />
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="relative w-[400px] h-[400px] border border-white/10 bg-transparent flex items-center justify-center rounded-sm overflow-hidden md:ml-[-300px] pointer-events-none"
        style={{ 
          scale: mapScale, 
          x: shakeX,
          y: shakeY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          perspective: 1000,
          maskImage: "radial-gradient(circle, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 90%)"
        }}
      >
        <svg className="absolute inset-0 w-full h-full stroke-brand-cyan/60 stroke-2 fill-none" style={{ filter: "drop-shadow(0 0 5px rgba(0,242,255,0.3))", transform: "translateZ(-20px)" }}>
           <path d="M 50 100 L 50 250 L 200 250 L 200 120 L 320 120 L 320 200" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>

        <motion.div className="absolute w-[6px] h-[6px] bg-brand-gold rounded-full shadow-[0_0_10px_var(--color-brand-gold)] opacity-60 -ml-[3px] -mt-[3px] left-[50px] top-[250px] z-10" style={{ opacity: dot1Op, transform: "translateZ(10px)" }} />
        <motion.div className="absolute w-[6px] h-[6px] bg-brand-gold rounded-full shadow-[0_0_10px_var(--color-brand-gold)] opacity-60 -ml-[3px] -mt-[3px] left-[200px] top-[250px] z-10" style={{ opacity: dot2Op, transform: "translateZ(10px)" }} />
        <motion.div className="absolute w-[6px] h-[6px] bg-brand-gold rounded-full shadow-[0_0_10px_var(--color-brand-gold)] opacity-60 -ml-[3px] -mt-[3px] left-[200px] top-[120px] z-10" style={{ opacity: dot3Op, transform: "translateZ(10px)" }} />

        <motion.div
          className="absolute left-1/2 top-1/2 -ml-3 -mt-6 z-20"
          style={{ x: playerX, y: playerY, rotate: playerRotate, transform: "translateZ(30px)" }}
        >
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-brand-cyan drop-shadow-[0_0_10px_var(--color-brand-cyan)]" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,1)] z-20"
          style={{ x: 120, y: 30, rotate: 0, opacity: enemyOpacity, transform: "translateZ(20px)" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22L2 2L12 6L22 2L12 22Z"/></svg>
        </motion.div>

        <motion.div
           className="absolute left-1/2 top-1/2 z-30"
           style={{ x: 120, y: bulletY, opacity: bulletOpacity, transform: "translateZ(40px)" }}
        >
           <div className="w-[60px] h-[4px] bg-gradient-to-r from-transparent to-brand-gold rounded-[2px] shadow-[0_0_15px_var(--color-brand-gold)] absolute top-1/2 -mt-[2px] -ml-2" style={{ transform: 'rotate(90deg)' }} />
           <div className="w-[120px] h-[120px] border border-brand-gold/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100px] scale-150" />
        </motion.div>

        <motion.div
           className="absolute left-[320px] top-[200px] w-10 h-10 border-2 border-brand-gold rounded-full shadow-[0_0_20px_var(--color-brand-gold)] -ml-5 -mt-5 z-40"
           style={{ scale: ringScale, opacity: ringOpacity, transform: "translateZ(5px)" }}
        />

      </motion.div>
    </motion.div>
  );
}
