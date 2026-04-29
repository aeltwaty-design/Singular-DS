'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface GravitationalGridProps {
  className?: string;
}

export function GravitationalGrid({ className }: GravitationalGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Move mouse position far away to stop the effect
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const GRID_SPACING = 24;
    const RIPPLE_INTENSITY = 10; // Medium intensity
    const WAVE_SPEED = 0.003;
    const WAVE_FREQUENCY = 0.04;
    const DECAY_RATE = 0.004;
    const MAX_EFFECT_RADIUS = 350;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Add mouse listeners to the parent section
    const parentSection = canvas.closest('section');
    if (parentSection) {
      parentSection.addEventListener('mousemove', handleMouseMove);
      parentSection.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Grid line color based on theme
      const isDark = resolvedTheme === 'dark';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(128, 128, 128, 0.07)';

      // Calculate grid points
      const cols = Math.ceil(width / GRID_SPACING) + 2;
      const rows = Math.ceil(height / GRID_SPACING) + 2;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      timeRef.current += 16; // Approximate 60fps

      // Helper to calculate displacement
      const getDisplacement = (x: number, y: number): { dx: number; dy: number } => {
        const distX = x - mouseX;
        const distY = y - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance > MAX_EFFECT_RADIUS || distance < 1) {
          return { dx: 0, dy: 0 };
        }

        // Ripple wave calculation
        const wave = Math.sin(distance * WAVE_FREQUENCY - timeRef.current * WAVE_SPEED);
        const decay = Math.exp(-distance * DECAY_RATE);
        const displacement = wave * RIPPLE_INTENSITY * decay;

        // Direction from mouse to point (normalized)
        const normalX = distX / distance;
        const normalY = distY / distance;

        return {
          dx: normalX * displacement,
          dy: normalY * displacement,
        };
      };

      // Draw vertical lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      for (let col = 0; col <= cols; col++) {
        const baseX = col * GRID_SPACING;
        
        ctx.beginPath();
        for (let row = 0; row <= rows; row++) {
          const baseY = row * GRID_SPACING;
          const { dx, dy } = getDisplacement(baseX, baseY);
          const x = baseX + dx;
          const y = baseY + dy;

          if (row === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let row = 0; row <= rows; row++) {
        const baseY = row * GRID_SPACING;
        
        ctx.beginPath();
        for (let col = 0; col <= cols; col++) {
          const baseX = col * GRID_SPACING;
          const { dx, dy } = getDisplacement(baseX, baseY);
          const x = baseX + dx;
          const y = baseY + dy;

          if (col === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      if (parentSection) {
        parentSection.removeEventListener('mousemove', handleMouseMove);
        parentSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mounted, resolvedTheme, handleMouseMove, handleMouseLeave]);

  if (!mounted) {
    // SSR fallback - render static grid pattern
    return (
      <div 
        className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${className || ''}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className || ''}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}

export default GravitationalGrid;

