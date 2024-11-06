import React, { useEffect, useRef } from 'react';
function MouseTrail() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const points = [];
  const segments = 200; // More segments for smoother trail
  const mouse = { x: 0, y: 0 };

  // Mouse move handler to track mouse position
  const move = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    mouse.x = x;
    mouse.y = y;

    // Initialize points array on the first move
    if (points.length === 0) {
      for (let i = 0; i < segments; i++) {
        points.push({ x, y });
      }
    }
  };

  // Animation loop to update trail points and path
  const anim = () => {
    let px = mouse.x;
    let py = mouse.y;

    points.forEach((p, index) => {
      const next = points[index + 1];
      if (next) {
        px += (next.x - px) * 0.1; // Smooth out the movement
        py += (next.y - py) * 0.1;
      }
      p.x = px;
      p.y = py;
    });

    // Update the path 'd' attribute to form the trail
    if (pathRef.current) {
      pathRef.current.setAttribute(
        'd',
        `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`
      );
    }

    requestAnimationFrame(anim);
  };

  // Resize the SVG based on window size
  const resize = () => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    if (svgRef.current) {
      svgRef.current.style.width = `${ww}px`;
      svgRef.current.style.height = `${wh}px`;
      svgRef.current.setAttribute('viewBox', `0 0 ${ww} ${wh}`);
    }
  };

  // Attach event listeners for mouse movement and window resize
  useEffect(() => {
    document.addEventListener('mousemove', move);
    window.addEventListener('resize', resize);

    // Start animation and initial resize
    anim();
    resize();

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', move);
      window.removeEventListener('resize', resize);
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
      <path ref={pathRef} fill="none" stroke="#8c4e41" strokeWidth="6" />
    </svg>
  );
}

export default MouseTrail;
