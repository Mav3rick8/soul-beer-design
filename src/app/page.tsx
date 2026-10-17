import Image from "next/image";
import Link from "next/link";
import s from "./home.module.css";
import { Reveal } from "@/components/Reveal";
import { Carousel } from "@/components/Carousel";
import { Record } from "@/components/Record";

type Tap = { id: string; name: string; description: string | null; price: string; available: boolean };

const plural = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "сорт" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "сорта" : "сортов");

const ROOM = [
  { src: "/soul-beer-design/img/hall.jpg", alt: "Люстры-колёса и красные абажуры над залом" },
  { src: "/soul-beer-design/img/interior.png", alt: "Барная стойка, диваны и столы у окон" },
  { src: "/soul-beer-design/img/sign.png", alt: "Вывеска: Soul Beer Bar, beer & music" },
];

// Пример пива для статической версии: в живом сайте позиции берутся из базы.
const SAMPLE_TAPS: Tap[] = [
  { id: "1", name: "Сорт 1", description: "стиль, крепость", price: "350 ₽", available: true },
  { id: "2", name: "Сорт 2", description: "стиль, крепость", price: "380 ₽", available: false },
];

export default function Home() {
  const taps = SAMPLE_TAPS;

  return (
    <main className={s.page}>
      <nav className={s.nav} aria-label="Основная навигация">
        <Link href="/" className={s.wordmark}>
          <span className={s.dot} aria-hidden />
          Soul Beer
        </Link>
        <div className={s.navLinks}>
          <Link href="#" className={s.navLink}>Меню</Link>
          <Link href="#" className={s.navLink}>Заказ</Link>
          <a href="#where" className={s.navLink}>Как добраться</a>
          <Link href="#" className={`${s.button} ${s.buttonSmall}`}>Забронировать</Link>
        </div>
      </nav>

      {/* Первый экран: кремовая карточка, как вывеска, и пластинка на красном поле абажура */}
      <header className={s.hero}>
        <div className={s.card}>
          <div>
            <Reveal>
              <h1 className={s.heroTitle}>Пиво и гитара наверху</h1>
            </Reveal>
            <Reveal delay={80}>
              <p className={s.heroText}>Бар на Кастанаевской, 16Б в Филях. Вход слева через ворота, открыто до двух ночи.</p>
            </Reveal>
            <Reveal delay={160} className={s.heroActions}>
              <Link href="#" className={s.button}>Забронировать стол</Link>
              <Link href="#" className={s.inlineLink}>Что на кране</Link>
            </Reveal>
          </div>
          <Reveal delay={240} className={s.heroFoot}>
            <span><strong>Метро</strong> Багратионовская, 740 м</span>
            <span><strong>Бронь</strong> +7 (977) 894-04-71</span>
          </Reveal>
        </div>

        <div className={s.stage}>
          <Record
            photos={ROOM.map((r) => r.src)}
            cls={{ root: s.record, disc: s.disc, label: s.label, photo: s.labelPhoto, spindle: s.spindle }}
          />
        </div>
      </header>

      {/* На кране: из базы, каждое пиво — круг цвета пива с пенным кольцом */}
      {taps.length > 0 && (
        <section className={s.section} aria-labelledby="taps">
          <div className={s.sectionHead}>
            <Reveal>
              <h2 id="taps" className={s.head}>Сейчас на кране</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className={s.count}>{taps.length} {plural(taps.length)}</p>
            </Reveal>
          </div>
          <ul className={s.taps}>
            {taps.map((t, i) => (
              <li key={t.id}>
                <Reveal delay={(i % 2) * 80} className={s.tap}>
                  <span className={`${s.glass} ${t.available ? "" : s.glassOff}`} aria-hidden />
                  <div>
                    <p className={s.tapLine}>
                      <span>{t.name}</span>
                      <span>{t.available ? t.price : "закончилось"}</span>
                    </p>
                    {t.description && <p className={s.tapDesc}>{t.description}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className={s.tapsMore}>
            <Link href="#" className={s.inlineLink}>Всё меню, закуски и цены</Link>
          </Reveal>
        </section>
      )}

      {/* Зал на кремовом поле: лента из трёх круглых фото */}
      <section className={s.room} aria-labelledby="room">
        <div className={s.roomGrid}>
          <div>
            <Reveal>
              <h2 id="room" className={s.head}>Как у нас внутри</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className={s.roomText}>
                Бордовые стены, люстры-колёса с лампочками и красные абажуры над столами. Диваны у окон и длинная барная стойка.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <Carousel slides={ROOM} />
          </Reveal>
        </div>
      </section>

      {/* Музыка: тёмная панель цвета винила, круглое фото срезано нижним краем */}
      <section className={s.panel} aria-labelledby="music">
        <div className={s.panelLeft}>
          <Reveal className={s.panelHead}>
            <h2 id="music" className={s.head}>Здесь поют под гитару</h2>
          </Reveal>
          <div className={s.panelPhoto}>
            <Image src="/soul-beer-design/img/found/vinyl-record-close-up.jpg" alt="Пластинка на проигрывателе, крупный план" width={1280} height={1280} sizes="(min-width: 860px) 42vw, 86vw" />
          </div>
        </div>
        <div className={s.panelRight}>
          <Reveal className={s.block}>
            <h3>Авторская песня по вечерам</h3>
            <p>У стойки играют под гитару: свои песни и те, что знает весь зал. Расписание вечеров уточняйте у бармена.</p>
          </Reveal>
          <Reveal delay={80} className={s.block}>
            <h3>Можно с собакой</h3>
            <p>Пускаем с животными, показываем спортивные трансляции. Есть Wi-Fi, розетки, кофе и чай.</p>
          </Reveal>
          <Reveal delay={160} className={s.block}>
            <h3>Праздник на компанию</h3>
            <p>День рождения, корпоратив или банкет: напишите в комментарии к брони, сколько вас и что празднуете.</p>
          </Reveal>
          <Reveal delay={240}>
            <Link href="#" className={s.button}>Забронировать стол</Link>
          </Reveal>
        </div>
      </section>

      {/* Отзывы: круглое фото зала и цитата со сдвигом вниз */}
      <section className={s.section} aria-label="Отзывы гостей">
        <div className={s.quotes}>
          <Reveal className={s.quotePhoto}>
            <Image src="/soul-beer-design/img/interior.png" alt="Зал Soul Beer вечером" width={900} height={900} sizes="(min-width: 860px) 30vw, 72vw" />
          </Reveal>
          <div className={s.quoteMain}>
            <Reveal>
              <blockquote>Хорошее пиво. Много хорошего пива. Новое место. Хороший ремонт. Уютно.</blockquote>
              <p className={s.cite}>Гость бара, отзыв в Яндекс Картах</p>
            </Reveal>
            <div className={s.quoteMore}>
              <Reveal delay={80}>
                <blockquote>Комфортное место для посиделок с друзьями. Бармены очень приветливые.</blockquote>
              </Reveal>
              <Reveal delay={160}>
                <blockquote>Приятная атмосфера, вежливый персонал, вкусное пиво.</blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Бронь: купон с круглыми вырезами. Форма передаёт выбор на страницу брони */}
      <section className={s.section} id="where" aria-labelledby="book">
        <Reveal>
          <form className={s.coupon} action="#" method="get">
            <span className={`${s.notch} ${s.notchTop}`} aria-hidden />
            <span className={`${s.notch} ${s.notchBottom}`} aria-hidden />
            <span className={s.perforation} aria-hidden>
              {Array.from({ length: 14 }, (_, i) => <span key={i} />)}
            </span>
            <div className={s.couponLeft}>
              <h2 id="book" className={s.head}>Столик на вечер</h2>
              <p>Выберите день, время и сколько вас. На следующем шаге оставите имя и телефон, подтвердим по SMS.</p>
            </div>
            <div className={s.couponRight}>
              <div className={s.fieldRow}>
                <label className={s.field}>
                  <span>День</span>
                  <input type="date" name="date" required />
                </label>
                <label className={s.field}>
                  <span>Время</span>
                  <input type="time" name="time" step={1800} required />
                </label>
                <label className={s.field}>
                  <span>Гостей</span>
                  <input type="number" name="guests" min={1} max={20} defaultValue={2} required />
                </label>
              </div>
              <button type="submit" className={`${s.button} ${s.submit}`}>Продолжить бронь</button>
            </div>
          </form>
        </Reveal>

        <div className={s.where}>
          <Reveal>
            <div className={s.streetPhoto}>
              <Image src="/soul-beer-design/img/found/moscow-kastanaevskaya-street-24.jpg" alt="Кастанаевская улица, дом 24" width={1000} height={1000} sizes="(min-width: 860px) 36vw, 72vw" />
            </div>
            <p className={s.caption}>
              Кастанаевская улица. Фото:{" "}
              <a href="https://commons.wikimedia.org/w/index.php?curid=120022415">Svetlov Artem</a>, CC BY-SA 4.0
            </p>
          </Reveal>
          <div className={s.facts}>
            <Reveal>
              <p><strong>Адрес</strong>Кастанаевская ул., 16Б. Вход слева через ворота, бар на втором этаже.</p>
            </Reveal>
            <Reveal delay={80}>
              <p><strong>Дорога</strong>Метро Багратионовская, 740 м. Остановка «2-я Филёвская улица», 120 м.</p>
            </Reveal>
            <Reveal delay={160}>
              <p><strong>Бронь</strong><a href="tel:+79778940471" className={s.inlineLink}>+7 (977) 894-04-71</a>, открыто до 02:00</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Подвал: имя бара во всю ширину, O — пластинка */}
      <footer className={s.footer}>
        <svg className={s.bigMark} viewBox="0 0 1200 230" role="img" aria-label="Soul Beer">
          <text x="0" y="190" fontSize="235" fontWeight="700" letterSpacing="-10" fill="#fff6ea" fontFamily="var(--font-sans), sans-serif">S</text>
          <circle cx="232" cy="118" r="88" fill="#120b0b" />
          <circle cx="232" cy="118" r="32" fill="#fff6ea" />
          <circle cx="232" cy="118" r="7" fill="#d1282e" />
          <text x="330" y="190" fontSize="235" fontWeight="700" letterSpacing="-10" fill="#fff6ea" fontFamily="var(--font-sans), sans-serif">UL BEER</text>
        </svg>
        <div className={s.footerGrid}>
          <div>
            <Link href="#">Меню</Link>
            <Link href="#">Заказ и самовывоз</Link>
          </div>
          <div>
            <Link href="#">Бронь стола</Link>
            <a href="#where">Как добраться</a>
          </div>
          <div>
            <p>Кастанаевская ул., 16Б</p>
            <p>Открыто до 02:00</p>
          </div>
          <div>
            <a href="tel:+79778940471">+7 (977) 894-04-71</a>
            <p>Только для гостей старше 18 лет</p>
          </div>
        </div>
        <p className={s.credits}>
          Фото со стороны:{" "}
          <a href="https://commons.wikimedia.org/w/index.php?curid=120022415">«Moscow Kastanaevskaya street 24»</a>, Svetlov Artem,{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>;{" "}
          <a href="https://commons.wikimedia.org/w/index.php?curid=32710034">«Vinyl record close up»</a>, ProtoplasmaKid,{" "}
          <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>; via Wikimedia Commons. Остальные фото — Soul Beer.
        </p>
      </footer>
    </main>
  );
}
