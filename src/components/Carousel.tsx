"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Slide = { src: string; alt: string };

const STEP_MS = 900; // длительность сдвига на один кадр

// Бесконечная лента: три круглых фото в ряд, сдвиг на одно фото. Список повторён дважды,
// чтобы переход от последнего фото к первому был незаметен: в конце сдвиг сбрасывается без анимации.
// Пауза при наведении и фокусе. При prefers-reduced-motion автоплей выключен.
export function Carousel({ slides, interval = 4000 }: { slides: Slide[]; interval?: number }) {
  const n = slides.length;
  const loop = [...slides, ...slides];
  const slideW = 100 / (2 * n); // ширина одного кадра в % от дорожки (дорожка = 200% контейнера)

  const [pos, setPos] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const jump = (to: number) => {
    setInstant(true);
    setPos(to);
    requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
  };

  useEffect(() => {
    if (pos !== n) return;
    timer.current = setTimeout(() => jump(0), STEP_MS);
    return () => clearTimeout(timer.current);
  }, [pos, n]);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setPos((p) => (p < n ? p + 1 : p)), interval);
    return () => clearInterval(t);
  }, [paused, n, interval]);

  const next = () => setPos((p) => (p < n ? p + 1 : p));
  const prev = () => {
    if (pos === 0) {
      jump(n);
      setTimeout(() => setPos(n - 1), 60);
    } else {
      setPos((p) => p - 1);
    }
  };

  const active = pos % n;
  const round =
    "flex h-12 w-12 items-center justify-center rounded-full bg-[#1c1011] text-xl text-[#f4e9d8] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d1282e] active:scale-95";

  return (
    <div
      role="region"
      aria-roledescription="карусель"
      aria-label="Фото бара"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            width: "200%",
            transform: `translateX(-${pos * slideW}%)`,
            transition: instant ? "none" : `transform ${STEP_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {loop.map((s, i) => (
            <div key={i} style={{ width: `${slideW}%` }} className="shrink-0 px-[1.2%]" aria-hidden={i < pos || i >= pos + n}>
              <div className="relative aspect-square overflow-hidden rounded-full">
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 860px) 24vw, 33vw" className="object-cover" priority={i < n} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[#1c1011]" aria-live="polite">{slides[active].alt}</p>
        <div className="flex items-center gap-3">
          <div className="mr-2 flex gap-2" role="group" aria-label="Выбор фото">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => jump(i)}
                aria-label={`Фото ${i + 1}: ${s.alt}`}
                aria-current={i === active}
                className={`h-3 w-3 rounded-full transition duration-300 hover:scale-125 ${i === active ? "bg-[#d1282e]" : "bg-[#1c1011]/30"}`}
              />
            ))}
          </div>
          <button type="button" onClick={prev} aria-label="Предыдущее фото" className={round}>‹</button>
          <button type="button" onClick={next} aria-label="Следующее фото" className={round}>›</button>
        </div>
      </div>
    </div>
  );
}
