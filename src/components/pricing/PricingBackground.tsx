import { motion, MotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface PricingBackgroundProps {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}

const PricingBackground = ({ cursorX, cursorY }: PricingBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Cursor light effect
  const lightX = useTransform(cursorX, (x) => x);
  const lightY = useTransform(cursorY, (y) => y);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        setDimensions({ width: canvas.width, height: canvas.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Particles
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;

      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      {/* Mesh gradient animated */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(6, 182, 212, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59, 130, 246, 0.1), transparent)',
        }}
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(6, 182, 212, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59, 130, 246, 0.1), transparent)',
            'radial-gradient(ellipse 80% 50% at 30% 50%, rgba(6, 182, 212, 0.15), transparent), radial-gradient(ellipse 60% 40% at 70% 50%, rgba(59, 130, 246, 0.1), transparent)',
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(6, 182, 212, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59, 130, 246, 0.1), transparent)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Canvas for particles and grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Cursor light effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: lightX,
          y: lightY,
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -200,
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </>
  );
};

export default PricingBackground;
