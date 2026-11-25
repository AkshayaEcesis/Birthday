import { useEffect, useState } from 'react';

export default function TypewriterText({ text, speedMs = 34, onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setVisibleCount(current);
      if (current >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speedMs);

    return () => clearInterval(timer);
  }, [text, speedMs, onComplete]);

  const isDone = visibleCount >= text.length;

  return (
    <span>
      {text.slice(0, visibleCount)}
      {!isDone && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.9em',
            marginLeft: '3px',
            verticalAlign: 'middle',
            backgroundColor: 'rgba(242, 223, 179, 0.85)',
          }}
        />
      )}
    </span>
  );
}

