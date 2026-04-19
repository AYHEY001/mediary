import { motion, MotionValue, useTransform } from "motion/react";

export default function Scene0({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0.15, 0.2], [1, 10]);
  const opacity = useTransform(progress, [0.15, 0.2], [1, 0]);
  
  const clockOpacity = useTransform(progress, [0.08, 0.12], [1, 0]);
  const clockScale = useTransform(progress, [0.08, 0.12], [1, 1.5]);
  
  const trackOpacity = useTransform(progress, [0.1, 0.15], [0, 1]);
  const trackScaleY = useTransform(progress, [0.1, 0.15], [0, 1]);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ scale, opacity, transformOrigin: 'center center' }}
    >
      {/* Visual content for Scene 0 */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16"
        style={{ y: useTransform(progress, [0, 0.1], [0, -100]) }}
      >
         <motion.div style={{ opacity: clockOpacity, scale: clockScale }} className="flex gap-2">
            {/* Minimal Blocky Clock */}
            <div className="grid grid-cols-3 gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={`d1-${i}`} className={`w-3 h-3 bg-white ${[4,7,10,13].includes(i) ? 'opacity-0' : ''}`} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={`d2-${i}`} className={`w-3 h-3 bg-white ${[1,4,10,13].includes(i) ? 'opacity-0' : ''}`} />
              ))}
            </div>
            <div className="flex flex-col justify-center gap-2 px-2">
              <div className="w-2 h-2 bg-white" />
              <div className="w-2 h-2 bg-white" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={`d3-${i}`} className={`w-3 h-3 bg-white ${[1,4,7,10,12,13,14].includes(i) ? 'opacity-0' : ''}`} />
              ))}
            </div>
         </motion.div>

         <motion.p 
            style={{ opacity: clockOpacity }} 
            className="text-[14px] text-brand-cyan/80 font-[300] tracking-[0.05em] mt-8 text-center"
         >
           <br/>
           <span className="opacity-50 text-[12px] mt-2 block">高度折叠 · 结构化延展 · 柔性融合</span>
         </motion.p>

         <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 pointer-events-none"
            style={{ opacity: trackOpacity, perspective: 800, rotateX: 60 }}
         >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div 
                key={`track-${i}`}
                className="w-[1px] h-[600px] bg-gradient-to-b from-brand-cyan via-brand-cyan/20 to-transparent relative"
                style={{ 
                  scaleY: trackScaleY, 
                  transformOrigin: 'top center',
                  boxShadow: '0 0 10px rgba(0, 242, 255, 0.3)',
                  y: useTransform(progress, [0, 0.15], [0, i % 2 === 0 ? 100 : 200])
                }}
              >
                {/* Flowing star particles */}
                <motion.div
                  className="absolute top-0 left-[-1px] w-[3px] h-[30px] bg-white rounded-full shadow-[0_0_10px_white]"
                  animate={{ y: [0, 600], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                />
              </motion.div>
            ))}
         </motion.div>
      </motion.div>

      <div className="absolute inset-0 z-[2] pointer-events-none">
         <div className="absolute bg-white/10 border border-white/20 w-5 h-5 -rotate-[10deg] top-[20%] left-[15%] opacity-20 scale-50" />
         <div className="absolute bg-white/10 border border-white/20 w-5 h-5 rotate-[135deg] top-[70%] left-[80%] opacity-10 scale-80" />
         <div className="absolute bg-white/10 border border-white/20 w-5 h-5 rotate-[45deg] top-[10%] left-[60%] opacity-30 scale-40" />
      </div>
    </motion.div>
  );
}
