import React, { useEffect, useRef } from 'react';

export default function ParticleLayer({ isPlaying }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: Marigold Petals, Saffron Dust, White Sparkles, Green Embers
    const particleCount = window.innerWidth < 768 ? 28 : 55;
    const particles = [];

    const colors = [
      'rgba(255, 153, 51, 0.75)',  // Saffron
      'rgba(255, 179, 71, 0.85)',  // Golden Marigold
      'rgba(248, 250, 252, 0.8)',  // Pure White
      'rgba(19, 136, 8, 0.7)',    // India Green
      'rgba(16, 185, 129, 0.75)'   // Emerald Green
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.3) * 0.8,
        vy: Math.random() * 0.9 + 0.4,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        type: Math.random() > 0.45 ? 'petal' : 'circle',
        petalScaleX: Math.random() * 0.5 + 0.6,
        opacity: Math.random() * 0.5 + 0.4
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const speedMultiplier = isPlaying ? 1.4 : 1.0;

      particles.forEach((p) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;
        p.angle += p.angularSpeed;

        // Wrap around screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;

        if (p.type === 'petal') {
          // Draw subtle flower petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.8, p.radius * 1.4, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw circular glowing dust
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-60 transition-opacity duration-1000"
    />
  );
}
