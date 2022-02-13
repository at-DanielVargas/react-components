import React, { useRef, useEffect } from 'react';
export const Input = ({
  type,
  placeholder,
  iconLeft = '',
  iconRight = '',
  loading = false,
  ...props
}) => {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (el.dataset.pattern) {
      const pattern = el.dataset.pattern;
      const slots = new Set(el.dataset.slots || '_');
      const prev = ((j) =>
        Array.from(pattern, (c, i) => (slots.has(c) ? (j = i + 1) : j)))(0);
      const first = [...pattern].findIndex((c) => slots.has(c));
      const accept = new RegExp(el.dataset.accept || '\\d', 'g');
      const clean = (input) => {
        input = input.match(accept) || [];
        return Array.from(pattern, (c) =>
          input[0] === c || slots.has(c) ? input.shift() || c : c
        );
      };
      const format = () => {
        const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
          i = clean(el.value.slice(0, i)).findIndex((c) => slots.has(c));
          return i < 0
            ? prev[prev.length - 1]
            : back
            ? prev[i - 1] || first
            : i;
        });
        el.value = clean(el.value).join``;
        el.setSelectionRange(i, j);
        back = false;
      };

      let back = false;
      el.addEventListener('keydown', (e) => (back = e.key === 'Backspace'));
      el.addEventListener('input', format);
      el.addEventListener('focus', format);
      el.addEventListener(
        'blur',
        () => el.value === pattern && (el.value = '')
      );
    }

    return () => {
      el.removeEventListener(format)
    }
  }, [ref]);

  console.log('render');
  return (
    <div
      className={`control ${iconLeft ?? 'with_icon_left'} ${
        iconRight ?? 'with_icon_right'
      } ${loading ? 'loading' : ''}`}
    >
      <input
        className="input"
        {...props}
        ref={ref}
        type={type}
        placeholder={placeholder}
      />
      {iconLeft && <span className="icon left">{iconLeft}</span>}
      {iconRight && <span className="icon right">{iconRight}</span>}
    </div>
  );
};
