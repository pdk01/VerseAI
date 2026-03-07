import React, { useMemo, Children } from 'react';

const Marquee = ({ children, speed = 30, gap = 24, height = 200, pauseOnHover = true }) => {
  const style = useMemo(
    () => ({
      '--gap': `${gap}px`,
      '--duration': `${speed}s`,
      height: `${height}px`,
    }),
    [gap, speed, height]
  );

  // Normalize children into an array
  const items = Children.toArray(children);

  return (
    <div className={`marquee-root ${pauseOnHover ? 'marquee-pausable' : ''}`} style={style}>
      <div className="marquee-mask left" />
      <div className="marquee-track">
        {/* two identical rows concatenated so movement is seamless */}
        <div className="marquee-row">
          {items.map((child, i) => (
            <div className="marquee-item" key={`a-${i}`}>
              {child}
            </div>
          ))}
          {items.map((child, i) => (
            <div className="marquee-item" key={`b-${i}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="marquee-mask right" />
    </div>
  );
};

export default Marquee;
