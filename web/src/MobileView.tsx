import { type PointerEvent, useEffect, useRef, useState } from 'react'

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

const HERO_WHEEL_TO_HORIZONTAL_RATIO = 2
const HERO_LERP_FACTOR = 0.4
const HERO_MAX_LERP_STEP_PX = 72

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

function StatusBarSignal() {
  return (
    <img src="/status-cellular.svg" alt="" className="app-status-bar__cellular" aria-hidden="true" />
  )
}

function StatusBarWifi() {
  return <img src="/status-wifi.svg" alt="" className="app-status-bar__wifi" aria-hidden="true" />
}

function StatusBarBattery() {
  return (
    <img src="/status-battery.svg" alt="" className="app-status-bar__battery" aria-hidden="true" />
  )
}

export function MobileView() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const heroTrackRef = useRef<HTMLDivElement>(null)
  const [isStickyHidden, setIsStickyHidden] = useState(false)

  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)
  const heroHorizontalTargetRef = useRef(0)
  const heroHorizontalRafRef = useRef<number | null>(null)
  const hasCompletedHeroHorizontalRef = useRef(false)

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

  // Wheel-locked horizontal hero: while the app-scroll is at the top, translate
  // vertical wheel deltas into horizontal scroll on the hero track until it reaches
  // the end; then release the lock so subsequent wheel deltas scroll the page.
  useEffect(() => {
    const scroller = scrollAreaRef.current
    const track = heroTrackRef.current
    if (!scroller || !track) return

    const normalizeWheelDeltaY = (event: WheelEvent) => {
      if (event.deltaMode === 1) return event.deltaY * 16
      if (event.deltaMode === 2) return event.deltaY * scroller.clientHeight
      return event.deltaY
    }

    const animateHeroTrack = () => {
      const delta = heroHorizontalTargetRef.current - track.scrollLeft
      if (Math.abs(delta) < 0.5) {
        track.scrollLeft = heroHorizontalTargetRef.current
        heroHorizontalRafRef.current = null
        const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
        hasCompletedHeroHorizontalRef.current = track.scrollLeft >= maxScroll - 1
        return
      }
      const step =
        Math.sign(delta) *
        Math.min(Math.abs(delta * HERO_LERP_FACTOR), HERO_MAX_LERP_STEP_PX)
      track.scrollLeft += step
      heroHorizontalRafRef.current = requestAnimationFrame(animateHeroTrack)
    }

    const startHeroAnimation = () => {
      if (heroHorizontalRafRef.current !== null) return
      heroHorizontalRafRef.current = requestAnimationFrame(animateHeroTrack)
    }

    const resetTrackPosition = () => {
      track.scrollLeft = 0
      heroHorizontalTargetRef.current = 0
      hasCompletedHeroHorizontalRef.current = false
    }

    const recomputeCompletion = () => {
      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
      hasCompletedHeroHorizontalRef.current = track.scrollLeft >= maxScroll - 1
    }

    const onWheel = (event: WheelEvent) => {
      const normalizedDeltaY = normalizeWheelDeltaY(event)
      if (normalizedDeltaY === 0) return

      const isAtTop = scroller.scrollTop <= 2
      if (!isAtTop) return

      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
      if (maxScroll <= 0) {
        hasCompletedHeroHorizontalRef.current = true
        return
      }

      if (normalizedDeltaY > 0) {
        if (hasCompletedHeroHorizontalRef.current) return

        const remainingScroll = maxScroll - track.scrollLeft
        if (remainingScroll <= 0.5) {
          hasCompletedHeroHorizontalRef.current = true
          return
        }

        const horizontalPush = Math.abs(normalizedDeltaY) * HERO_WHEEL_TO_HORIZONTAL_RATIO
        event.preventDefault()
        const nextScrollLeft = Math.min(maxScroll, track.scrollLeft + horizontalPush)
        heroHorizontalTargetRef.current = nextScrollLeft
        startHeroAnimation()
        return
      }

      // Wheel up while at the top of the scroller: rewind the horizontal
      // carousel back to the first slide before releasing the lock.
      if (track.scrollLeft <= 0.5) {
        hasCompletedHeroHorizontalRef.current = false
        heroHorizontalTargetRef.current = 0
        track.scrollLeft = 0
        return
      }

      const horizontalPush = Math.abs(normalizedDeltaY) * HERO_WHEEL_TO_HORIZONTAL_RATIO
      event.preventDefault()
      hasCompletedHeroHorizontalRef.current = false
      const nextScrollLeft = Math.max(0, track.scrollLeft - horizontalPush)
      heroHorizontalTargetRef.current = nextScrollLeft
      startHeroAnimation()
    }

    requestAnimationFrame(resetTrackPosition)
    scroller.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', recomputeCompletion)

    return () => {
      if (heroHorizontalRafRef.current !== null) {
        cancelAnimationFrame(heroHorizontalRafRef.current)
        heroHorizontalRafRef.current = null
      }
      scroller.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', recomputeCompletion)
    }
  }, [])

  const onHeroPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = heroTrackRef.current
    if (!track) return
    if (heroHorizontalRafRef.current !== null) {
      cancelAnimationFrame(heroHorizontalRafRef.current)
      heroHorizontalRafRef.current = null
    }
    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = track.scrollLeft
    heroHorizontalTargetRef.current = track.scrollLeft
    track.classList.add('is-dragging')
    track.setPointerCapture(event.pointerId)
  }

  const onHeroPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = heroTrackRef.current
    if (!track || !isDraggingRef.current) return
    const deltaX = event.clientX - dragStartXRef.current
    track.scrollLeft = dragStartScrollLeftRef.current - deltaX
    heroHorizontalTargetRef.current = track.scrollLeft
  }

  const onHeroPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const track = heroTrackRef.current
    if (!track) return
    isDraggingRef.current = false
    track.classList.remove('is-dragging')
    heroHorizontalTargetRef.current = track.scrollLeft
    const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
    hasCompletedHeroHorizontalRef.current = track.scrollLeft >= maxScroll - 1
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div className="mobile-stage">
      <div className="app-frame" role="region" aria-label="Prototipo app Massimo Dutti">
        <div className="app-scroll" ref={scrollAreaRef}>
          <section className="app-hero" aria-label="Imágenes del producto">
            <div
              className="app-hero__track"
              ref={heroTrackRef}
              onPointerDown={onHeroPointerDown}
              onPointerMove={onHeroPointerMove}
              onPointerUp={onHeroPointerEnd}
              onPointerCancel={onHeroPointerEnd}
            >
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

        <div className="app-status-bar is-solid" aria-hidden="true">
          <span className="app-status-bar__time">9:41</span>
          <div className="app-status-bar__icons">
            <StatusBarSignal />
            <StatusBarWifi />
            <StatusBarBattery />
          </div>
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
