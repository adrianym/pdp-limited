import { useEffect, useRef, useState } from 'react'

import { OptimizedImage } from './OptimizedImage'
import {
  imgEditorial,
  imgGalleryDetail,
  imgGalleryDress,
  imgGalleryModel,
  imgHeroLeft,
  imgMiniDress,
  imgMiniNecklace,
  imgMiniShoe,
  recommendationProducts,
} from './data'

const imgHero2 = '/image-2-h.jpg'

const heroSlides = [
  {
    src: imgHeroLeft,
    alt: 'Modelo con vestido satinado beige',
    objectPosition: 'center 30%',
    wide: false,
  },
  {
    src: imgHero2,
    alt: 'Modelo con vestido en paisaje desértico',
    objectPosition: 'center center',
    wide: true,
  },
]

function IconArrowLeft() {
  return <img src="/back-arrow.svg" alt="" className="app-header__icon" aria-hidden="true" />
}

function IconShare() {
  return <img src="/share.svg" alt="" className="app-header__icon" aria-hidden="true" />
}

function IconSearch() {
  return <img src="/search.svg" alt="" className="app-header__icon" aria-hidden="true" />
}

function IconBag() {
  return <img src="/cart.svg" alt="" className="app-header__icon" aria-hidden="true" />
}

function IconBookmark() {
  return <img src="/save.svg" alt="" className="app-header__icon" aria-hidden="true" />
}

export function MobileView() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const heroPinRef = useRef<HTMLElement>(null)
  const heroStageRef = useRef<HTMLDivElement>(null)
  const heroTrackRef = useRef<HTMLDivElement>(null)
  const [isStickyHidden, setIsStickyHidden] = useState(false)

  // Fade the sticky product module out just before the bottom of the scroll.
  useEffect(() => {
    const scroller = scrollAreaRef.current
    if (!scroller) return

    const FADE_THRESHOLD_PX = 80

    let raf: number | null = null
    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        raf = null
        const { scrollTop, scrollHeight, clientHeight } = scroller
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight
        setIsStickyHidden(distanceFromBottom <= FADE_THRESHOLD_PX)
      })
    }
    onScroll()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll-jacked hero: pin the hero for a vertical range equal to the
  // horizontal distance the track needs to travel, and translate the track
  // according to scroll progress. Works identically for wheel, trackpad and
  // touch — the browser drives the vertical scroll natively and we only
  // read scrollTop to move the track via GPU-composited transforms.
  useEffect(() => {
    const scroller = scrollAreaRef.current
    const pin = heroPinRef.current
    const stage = heroStageRef.current
    const track = heroTrackRef.current
    if (!scroller || !pin || !stage || !track) return

    let maxTranslate = 0
    let pinTop = 0
    let rafId: number | null = null

    const updateTransform = () => {
      const relative = Math.max(0, scroller.scrollTop - pinTop)
      const progress =
        maxTranslate > 0 ? Math.min(1, relative / maxTranslate) : 1
      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`
    }

    const layout = () => {
      const viewportH = scroller.clientHeight
      stage.style.height = `${viewportH}px`
      const stageW = stage.clientWidth
      let trackW = 0
      for (const child of Array.from(track.children)) {
        trackW += (child as HTMLElement).offsetWidth
      }
      maxTranslate = Math.max(trackW - stageW, 0)
      pin.style.height = `${viewportH + maxTranslate}px`
      pinTop = pin.offsetTop
      updateTransform()
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        updateTransform()
      })
    }

    layout()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', layout)

    // Re-measure when the wide slide's image finishes decoding (its width
    // depends on the natural aspect × slide height and starts at 0 before load).
    const ro = new ResizeObserver(layout)
    ro.observe(track)

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', layout)
      ro.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="mobile-stage">
      <div className="app-frame" role="region" aria-label="Prototipo app Massimo Dutti">
        <div className="app-scroll" ref={scrollAreaRef}>
          <section className="app-hero" aria-label="Imágenes del producto" ref={heroPinRef}>
            <div className="app-hero__stage" ref={heroStageRef}>
              <div className="app-hero__track" ref={heroTrackRef}>
                {heroSlides.map((slide, i) => (
                  <figure
                    className={`app-hero__slide${slide.wide ? ' app-hero__slide--wide' : ''}`}
                    key={i}
                  >
                    <OptimizedImage
                      src={slide.src}
                      alt={slide.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : 'low'}
                      style={{ objectPosition: slide.objectPosition }}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>          <section className="app-detail" aria-label="Descripción del producto">
            <p className="app-detail__ref">Ref. 5102/703</p>
            <p className="app-detail__desc">
              Americana confeccionada en tejido 100% lino. Cuello con solapa de
              muesca. Cierre cruzado mediante botón lateral. Dos bolsillos con
              solapa. Medio forro interior que aporta mayor ligereza a la prenda.
            </p>
            <ul className="app-detail__links">
              <li>
                <a href="#">Ver tabla de medidas</a>
              </li>
              <li>
                <a href="#">Composición y cuidados</a>
              </li>
              <li>
                <a href="#">Envíos, cambios y devoluciones</a>
              </li>
              <li>
                <a href="#">Disponibilidad y reserva en tienda</a>
              </li>
            </ul>
          </section>

          <section className="app-gallery" aria-label="Galería del producto">
            <OptimizedImage src={imgGalleryDress} alt="Vestido beige sobre fondo gris" />
            <OptimizedImage src={imgGalleryModel} alt="Vista posterior del vestido" />
            <OptimizedImage src={imgGalleryDetail} alt="Detalle de tejido del vestido" />
          </section>

          <section className="app-editorial" aria-label="Shop the look">
            <h3 className="app-editorial__title">look de 3 artículos</h3>
            <OptimizedImage
              src={imgEditorial}
              alt="Editorial moda en exterior"
              className="app-editorial__image"
            />
            <div className="app-shop-look">
              <article className="app-shop-item">
                <OptimizedImage src={imgMiniDress} alt="Vestido satinado beige" />
                <div className="app-shop-item__meta">
                  <p>Camiseta Medium Weight</p>
                  <p>29,95 €</p>
                  <button type="button" aria-label="Añadir vestido satinado al look">
                    <img src="/plus.svg" alt="" aria-hidden="true" />
                  </button>
                </div>
              </article>
              <article className="app-shop-item">
                <OptimizedImage src={imgMiniNecklace} alt="Collar cadena con colgante" />
                <div className="app-shop-item__meta">
                  <p>Camiseta Medium Weight</p>
                  <p>29,95 €</p>
                  <button type="button" aria-label="Añadir collar al look">
                    <img src="/plus.svg" alt="" aria-hidden="true" />
                  </button>
                </div>
              </article>
              <article className="app-shop-item app-shop-item--wide">
                <OptimizedImage src={imgMiniShoe} alt="Zapato plano negro" />
                <div className="app-shop-item__meta">
                  <p>Camiseta Medium Weight</p>
                  <p>29,95 €</p>
                  <button type="button" aria-label="Añadir zapato al look">
                    <img src="/plus.svg" alt="" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section className="app-recs" aria-label="Te puede interesar">
            <h2>Te Puede Interesar</h2>
            <div className="app-recs__grid">
              {recommendationProducts.map((product, index) => (
                <article className="app-recs__card" key={index}>
                  <OptimizedImage src={product.image} alt={product.name} />
                  <p className="app-recs__name">{product.name}</p>
                  <p className="app-recs__price">{product.price}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="app-scroll__spacer" aria-hidden="true" />
        </div>

        <header className="app-header is-solid">
          <button type="button" className="app-header__btn" aria-label="Volver">
            <IconArrowLeft />
          </button>
          <div className="app-header__actions">
            <button type="button" className="app-header__btn" aria-label="Compartir">
              <IconShare />
            </button>
            <button type="button" className="app-header__btn" aria-label="Buscar">
              <IconSearch />
            </button>
            <button type="button" className="app-header__btn app-header__btn--bag" aria-label="Cesta, 0 artículos">
              <IconBag />
              <span className="app-header__count">00</span>
            </button>
          </div>
        </header>

        <aside
          className={`app-sticky ${isStickyHidden ? 'is-hidden' : ''}`}
          aria-label="Información del producto"
          aria-hidden={isStickyHidden}
        >
          <div className="app-sticky__info">
            <span className="app-sticky__tag">Nuevo</span>
            <div className="app-sticky__row">
              <div className="app-sticky__title-group">
                <p className="app-sticky__title">Vestido midi fluido satinado</p>
                <p className="app-sticky__price">149 €</p>
              </div>
              <div className="app-sticky__meta">
                <button type="button" className="app-sticky__icon-btn" aria-label="Guardar producto">
                  <IconBookmark />
                </button>
                <button
                  type="button"
                  className="app-sticky__swatch is-selected"
                  aria-label="Color beige seleccionado"
                  aria-pressed="true"
                />
              </div>
            </div>
          </div>
          <button type="button" className="app-sticky__cta">
            Elige una talla
          </button>
        </aside>

        <div className="app-home-indicator" aria-hidden="true" />
      </div>
    </div>
  )
}
