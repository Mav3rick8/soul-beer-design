// Пластинка из буквы O на вывеске. Дорожки нарисованы закрашенными кругами, надпись по кругу
// и блик вращаются вместе с диском, поэтому вращение видно. В центре по очереди меняются фото зала.
const GROOVES = Array.from({ length: 30 }, (_, i) => 492 - i * 9.5);

type Classes = { root: string; disc: string; label: string; photo: string; spindle: string };

export function Record({ photos, cls }: { photos: string[]; cls: Classes }) {
  return (
    <div className={cls.root} aria-hidden>
      <svg viewBox="0 0 1000 1000" className={cls.disc}>
        <circle cx="500" cy="500" r="500" fill="#120b0b" />
        {GROOVES.map((r, i) => (
          <circle key={r} cx="500" cy="500" r={r} fill={i % 2 ? "#120b0b" : "#1d1414"} />
        ))}
        {/* Блик: светлый сектор, по нему видно, что диск крутится */}
        <path d="M500 500 L500 8 A492 492 0 0 1 640 28 Z" fill="#f4e9d8" opacity="0.08" />
        <path d="M500 500 L500 992 A492 492 0 0 1 360 972 Z" fill="#f4e9d8" opacity="0.05" />
        <defs>
          <path id="record-ring" d="M500 500 m-232 0 a232 232 0 1 1 464 0 a232 232 0 1 1 -464 0" />
        </defs>
        <text fill="#efa53a" fontSize="34" fontWeight="600">
          <textPath href="#record-ring">Soul Beer · Stories over a pint · Кастанаевская, 16Б · Soul Beer · Stories over a pint ·</textPath>
        </text>
      </svg>
      <div className={cls.label}>
        {photos.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" className={cls.photo} />
        ))}
      </div>
      <span className={cls.spindle} />
    </div>
  );
}
