import React, { useEffect, useRef, useState } from 'react';

const MouseTouchTrail = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const requestRef = useRef(null);
  // Increased number of segments for smoother trail
  const [points] = useState(Array(400).fill({ x: -100, y: -100 }));
  const mouseRef = useRef({ x: -100, y: -100 });
  const isMovingRef = useRef(false);
  const lastMoveTime = useRef(Date.now());
  const isTouchDevice = useRef(false);

  const updatePosition = (x, y) => {
    mouseRef.current = { x, y };
    lastMoveTime.current = Date.now();
    isMovingRef.current = true;
    
    if (points.every(p => p.x === -100 && p.y === -100)) {
      points.forEach((_, i) => {
        points[i] = { x, y };
      });
    }
  };

  const handleMove = (event) => {
    if (event.type === 'mousemove' && isTouchDevice.current) return;

    const x = event.type.includes('touch')
      ? event.touches[0].clientX 
      : event.clientX;
    const y = event.type.includes('touch')
      ? event.touches[0].clientY 
      : event.clientY;
    
    updatePosition(x, y);
  };

  const handleTouchStart = (event) => {
    isTouchDevice.current = true;
    handleMove(event);
  };

  const handleTouchEnd = () => {
    isMovingRef.current = false;
    mouseRef.current = { x: -100, y: -100 };
    points.forEach(p => {
      p.x = -100;
      p.y = -100;
    });
  };

  const animate = () => {
    if (!isTouchDevice.current && Date.now() - lastMoveTime.current > 500) { //time in ms
      isMovingRef.current = false;
      mouseRef.current = { x: -100, y: -100 };
      points.forEach(p => {
        p.x = -100;
        p.y = -100;
      });
    }

    if (isMovingRef.current) {
      let px = mouseRef.current.x;
      let py = mouseRef.current.y;

      points.forEach((p, index) => {
        const next = points[index + 1];
        if (next) {
          // Reduced smoothing factor for slower movement
          px += (next.x - px) * 0.15;
          py += (next.y - py) * 0.15;
        }
        points[index] = { x: px, y: py };
      });
    }

    if (pathRef.current) {
      // Added curve interpolation for smoother trail
      const pathData = points.reduce((path, point, index) => {
        if (index === 0) {
          return `M ${point.x} ${point.y}`;
        }
        if (index % 2 === 0) { // Using every other point for smoother curves
          const prevPoint = points[index - 1];
          const cpX = (prevPoint.x + point.x) / 2;
          const cpY = (prevPoint.y + point.y) / 2;
          return `${path} Q ${cpX} ${cpY}, ${point.x} ${point.y}`;
        }
        return path;
      }, '');
      
      pathRef.current.setAttribute('d', pathData);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    if (svgRef.current) {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      svgRef.current.style.width = `${ww}px`;
      svgRef.current.style.height = `${wh}px`;
      svgRef.current.setAttribute('viewBox', `0 0 ${ww} ${wh}`);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="trail"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="#8c4e41"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MouseTouchTrail;