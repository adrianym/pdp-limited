import { type PointerEvent, useEffect, useRef, useState } from 'react'

import { OptimizedImage } from './OptimizedImage'
import {
  imgEditorial,
  imgGalleryDetail,
  imgGalleryDress,
  imgGalleryModel,
  imgHeroLeft,
  imgLowerHero,
  imgMiniDress,
  imgMiniNecklace,
  imgMiniShoe,
  recommendationProducts,
} from './data'

const heroSlides = [
  {
    src: imgHeroLeft,
    alt: 'Modelo con vestido satinado beige',
    objectPosition: 'center 30%',
  },
  {
    src: imgLowerHero,
    alt: 'Vestido satinado, plano completo',
    objectPosition: 'center center',
  },
  {
    src: imgGalleryDress,
    alt: 'Vestido beige sobre fondo gris',
    objectPosition: 'center center',
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
  const heroCarouselRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [showCompactSticky, setShowCompactSticky] = useState(false)

  // Pointer drag support on the horizontal carousel (for mouse users viewing app mode)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollRef = useRef(0)

  useEffect(() => {
    const carousel = heroCarouselRef.current
    if (!carousel) return

    let raf: number | null = null
    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        raf = null
        const w = carousel.clientWidth
        if (w <= 0) return
        const index = Math.round(carousel.scrollLeft / w)
        setActiveSlide(index)
      })
    }
    carousel.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      carousel.removeEventListener('scroll', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  // Compact the sticky when the user scrolls past the hero — better use of vertical space
  useEffect(() => {
    const scroller = scrollAreaRef.current
    if (!scroller) return

    let raf: number | null = null
    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        raf = null
        // Compact after ~40% of first viewport scroll
        setShowCompactSticky(scroller.scrollTop > 240)
      })
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  const onCarouselPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const el = heroCarouselRef.current
    if (!el) return
    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartScrollRef.current = el.scrollLeft
    el.classList.add('is-dragging')
    el.setPointerCapture(event.pointerId)
  }

  const onCarouselPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const el = heroCarouselRef.current
    if (!el) return
    const deltaX = event.clientX - dragStartXRef.current
    el.scrollLeft = dragStartScrollRef.current - deltaX
  }

  const onCarouselPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const el = heroCarouselRef.current
    if (!el) return
    isDraggingRef.current = false
    el.classList.remove('is-dragging')

    // Snap to nearest slide
    const w = el.clientWidth
    if (w > 0) {
      const nearest = Math.round(el.scrollLeft / w)
      el.scrollTo({ left: nearest * w, behavior: 'smooth' })
    }
    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId)
    }
  }

  const goToSlide = (index: number) => {
    const el = heroCarouselRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="mobile-stage">
      <div className="app-frame" role="region" aria-label="Prototipo app Massimo Dutti">
        <div className="app-status-bar" aria-hidden="true">
          <span className="app-status-bar__time">9:41</span>
          <div className="app-status-bar__icons">
            <StatusBarSignal />
            <StatusBarWifi />
            <StatusBarBattery />
          </div>
        </div>

        <header className="app-header">
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

        <div className="app-scroll" ref={scrollAreaRef}>
          <section className="app-hero" aria-label="Imágenes del producto">
            <div
              className="app-hero__carousel"
              ref={heroCarouselRef}
              onPointerDown={onCarouselPointerDown}
              onPointerMove={onCarouselPointerMove}
              onPointerUp={onCarouselPointerEnd}
              onPointerCancel={onCarouselPointerEnd}
            >
              {heroSlides.map((slide, i) => (
                <figure className="app-hero__slide" key={i}>
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
          </section>

          <section className="app-detail" aria-label="Descripción del producto">
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
            <OptimizedImage src={imgLowerHero} alt="Vestido satinado de cuerpo completo" />
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
                  <button type="button" aria-label="Añadir vestido satinado al look">+</button>
                </div>
              </article>
              <article className="app-shop-item">
                <OptimizedImage src={imgMiniNecklace} alt="Collar cadena con colgante" />
                <div className="app-shop-item__meta">
                  <p>Camiseta Medium Weight</p>
                  <p>29,95 €</p>
                  <button type="button" aria-label="Añadir collar al look">+</button>
                </div>
              </article>
              <article className="app-shop-item app-shop-item--wide">
                <OptimizedImage src={imgMiniShoe} alt="Zapato plano negro" />
                <div className="app-shop-item__meta">
                  <p>Camiseta Medium Weight</p>
                  <p>29,95 €</p>
                  <button type="button" aria-label="Añadir zapato al look">+</button>
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

          <footer className="app-footer" aria-label="Footer">
            <nav className="app-footer__links" aria-label="Enlaces del footer">
              <a href="#">App Massimo Dutti</a>
              <a href="#">Social</a>
              <a href="#">Ayuda</a>
              <a href="#">Servicios</a>
              <a href="#">Empresa</a>
              <a href="#">Legal</a>
            </nav>
            <div className="app-footer__locale">
              <p>Cambiar de mercado:</p>
              <a href="#" className="app-footer__market">España (€)</a>
              <div className="app-footer__langs" aria-label="Idiomas">
                <a href="#" className="is-active" aria-current="true">Es</a>
                <a href="#">Cat</a>
                <a href="#">Ga</a>
                <a href="#">Eus</a>
                <a href="#">En</a>
              </div>
            </div>
            <a href="#" className="app-footer__brand" aria-label="Massimo Dutti">
              <img src="/md-logo.svg" alt="Massimo Dutti" />
            </a>
          </footer>

          <div className="app-scroll__spacer" aria-hidden="true" />
        </div>

        <aside
          className={`app-sticky ${showCompactSticky ? 'is-compact' : ''}`}
          aria-label="Información del producto"
        >
          {!showCompactSticky && (
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
          )}
          {showCompactSticky && (
            <div className="app-sticky__compact">
              <div className="app-sticky__compact-info">
                <p className="app-sticky__title">Vestido midi fluido satinado</p>
                <p className="app-sticky__price">149 €</p>
              </div>
              <button type="button" className="app-sticky__icon-btn" aria-label="Guardar producto">
                <IconBookmark />
              </button>
            </div>
          )}
          <button type="button" className="app-sticky__cta">
            Elige una talla
          </button>
        </aside>

        <div className="app-home-indicator" aria-hidden="true" />
      </div>
    </div>
  )
}
