import { motion, useScroll, useTransform } from "motion/react";
import Scene0 from "./components/Scene0";
import Scene1 from "./components/Scene1";
import Scene2 from "./components/Scene2";
import Scene3 from "./components/Scene3";
import Scene4 from "./components/Scene4";
import ParticleSystem from "./components/ParticleSystem";
import OpeningAnimation from "./components/OpeningAnimation";

export default function App() {
  const { scrollYProgress } = useScroll();
  
  // Adjusted transitions to fit the dark theme vibe
  const backgroundColor = useTransform(scrollYProgress,
    [0, 0.15, 0.2, 0.4, 0.45, 0.65, 0.7, 0.9, 0.92, 1],
    [
      "#050505", // 0
      "#050505", // 0.15 (Scene 0)
      "#050505", // 0.2  (Scene 1 - Slate 900)
      "#050505", // 0.4  (Scene 1)
      "#050505", // 0.45 (Scene 2 - Stardew green)
      "#050505", // 0.65 (Scene 2)
      "#050505", // 0.7  (Scene 3 - Morandi base)
      "#050505", // 0.9  (Scene 3)
      "#050505", // 0.92 (Scene 4 - Dark)
      "#050505"  // 1
    ]
  );

  const worldX = useTransform(scrollYProgress,
    [0, 0.4, 0.45, 1],
    ["0vw", "0vw", "-100vw", "-100vw"]
  );

  const worldY = useTransform(scrollYProgress,
    [0, 0.65, 0.7, 1],
    ["0vh", "0vh", "-100vh", "-100vh"]
  );

  const activeIndex = useTransform(scrollYProgress, 
    [0, 0.15, 0.45, 0.7, 0.92], 
    [0, 1, 2, 3, 4]
  );

  return (
    <div className="relative h-[1000vh] w-full text-brand-fg selection:bg-brand-cyan/30 scroll-smooth">
      <OpeningAnimation />
      <ParticleSystem progress={scrollYProgress} />
      <motion.div 
        className="fixed inset-0 overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="canvas-grid z-[1]" />
        
        {/* Global Header */}
        <div className="absolute top-10 left-10 z-[20] flex flex-col pointer-events-none">
          <h1 className="text-[12px] uppercase tracking-[0.4em] opacity-50 font-normal mb-2 text-brand-fg">跨学科视角：认知心理学与社会加速理论</h1>
          <h2 className="text-[36px] md:text-[42px] font-[200] tracking-[-0.02em] leading-[1.1] text-brand-fg">数字媒介下的时间体验重塑</h2>
        </div>

        <nav className="absolute bottom-10 left-10 flex gap-5 z-[20]">
          {['00 序言', '01 三角洲行动', '02 星露谷物语', '03 陪伴游戏', '04 结语'].map((label, idx) => (
             <motion.div 
               key={idx}
               className="text-[11px] tracking-[0.1em] cursor-default"
               style={{
                 opacity: useTransform(activeIndex, (v) => Math.round(v) === idx ? 1 : 0.3),
                 color: useTransform(activeIndex, (v) => Math.round(v) === idx ? 'var(--color-brand-cyan)' : 'var(--color-brand-fg)'),
                 fontWeight: useTransform(activeIndex, (v) => Math.round(v) === idx ? 600 : 400)
               }}
             >
               {label}
             </motion.div>
          ))}
        </nav>

        <div className="absolute right-5 top-1/2 -translate-y-1/2 rotate-180 z-[10] text-[10px] uppercase tracking-[0.5em] opacity-20" style={{ writingMode: 'vertical-rl' }}>
          数字媒介下的时间体验
        </div>

        <motion.div
          className="absolute inset-0 w-[200vw] h-[200vh] z-[5]"
          style={{
            x: worldX,
            y: worldY,
          }}
        >
          <div className="absolute top-0 left-0 w-screen h-screen">
            <Scene0 progress={scrollYProgress} />
            <Scene1 progress={scrollYProgress} />
          </div>

          <div className="absolute top-0 left-[100vw] w-screen h-screen">
            <Scene2 progress={scrollYProgress} />
          </div>

          <div className="absolute top-[100vh] left-[100vw] w-screen h-screen">
            <Scene3 progress={scrollYProgress} />
          </div>
        </motion.div>

        <Scene4 progress={scrollYProgress} />

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 animate-pulse pointer-events-none z-[10]"
        >
          <span className="text-[10px] tracking-[0.2em] mb-2 uppercase opacity-50">滑动</span>
          <div className="w-[1px] h-8 bg-brand-cyan/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}
