import { useEffect, useState } from 'react';

export default function Counter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    let end = parseInt(target);
    let increment = end / (duration / 16); // 60fps ≈ 16ms/frame
    let raf;

    function update() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    }

    update();
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
