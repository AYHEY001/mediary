import { useEffect, useRef } from "react";
import { motion, MotionValue } from "motion/react";

interface ParticleSystemProps {
  progress?: MotionValue<number>;
}

export default function ParticleSystem({ progress }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };
    let scrollOffset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = window.innerWidth < 768 ? 50 : 120;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 2, // 3D depth effect
          size: Math.random() * 1.5 + 0.5,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Interactivity: repel from mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        // Scroll effect: move Y based on scroll
        const yOffset = p.y - scrollOffset * 5000 * (p.z + 0.2);
        let renderY = yOffset % canvas.height;
        if (renderY < 0) renderY += canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, renderY, p.size * (p.z + 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + p.z * 0.2})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const renderY2 = (p2.y - scrollOffset * 5000 * (p2.z + 0.2)) % canvas.height;
          let rY2 = renderY2 < 0 ? renderY2 + canvas.height : renderY2;

          const dx2 = p.x - p2.x;
          const dy2 = renderY - rY2;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, renderY);
            ctx.lineTo(p2.x, rY2);
            ctx.strokeStyle = `rgba(0, 242, 255, ${(1 - dist2 / 100) * 0.1})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let unsubscribe: () => void;
    if (progress) {
      unsubscribe = progress.on("change", (v) => {
        scrollOffset = v;
      });
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (unsubscribe) unsubscribe();
    };
  }, [progress]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[2]" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
