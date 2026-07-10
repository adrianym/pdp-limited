import {
  type ImgHTMLAttributes,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import './App.css'

const imgHeroLeft = 'https://www.figma.com/api/mcp/asset/448c7457-4255-40a6-a3f3-552cb3d7d305'
const imgHeroRight = 'https://www.figma.com/api/mcp/asset/781efe73-5af3-4463-9df1-cbadecf15910'
const imgLowerHero = 'https://www.figma.com/api/mcp/asset/93352d03-213e-4eea-9ce4-b721a01e2bc2'
const imgGalleryDress =
  'https://www.figma.com/api/mcp/asset/28de3985-f014-4a3a-8cb3-70bfd10aeba6'
const imgGalleryModel =
  'https://www.figma.com/api/mcp/asset/21fc8642-e918-44e5-8fc8-55b97ab545c8'
const imgGalleryDetail =
  'https://www.figma.com/api/mcp/asset/015058da-981c-4884-a754-2b13e4c4bf8d'
const imgEditorial = 'https://www.figma.com/api/mcp/asset/d2a34c6b-e5b0-44fe-bf11-1cfc7e0e64ae'
const imgMiniDress = 'https://www.figma.com/api/mcp/asset/7ae6630e-1a76-4bcc-94db-a7cf53e3356a'
const imgMiniNecklace =
  'https://www.figma.com/api/mcp/asset/59911518-0e42-4c8b-9ca1-b5d16b37591f'
const imgMiniShoe = 'https://www.figma.com/api/mcp/asset/9fcdff23-8067-4e1f-81d0-8854691ab3c0'

const HERO_WHEEL_TO_HORIZONTAL_RATIO = 2
const HERO_LERP_FACTOR = 0.4
const HERO_MAX_LERP_STEP_PX = 72

type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>['fetchPriority']
}

function OptimizedImage({
  src,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      draggable={false}
    />
  )
}

function App() {
  const recommendationSlots = Array.from({ length: 18 })
  const [isHeaderSolid, setIsHeaderSolid] = useState(false)
  const heroTrackRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)
  const heroHorizontalTargetRef = useRef(0)
  const heroHorizontalRafRef = useRef<number | null>(null)
  const hasCompletedHeroHorizontalRef = useRef(false)

  const normalizeWheelDeltaY = (event: globalThis.WheelEvent) => {
    if (event.deltaMode === 1) {
      return event.deltaY * 16
    }

    if (event.deltaMode === 2) {
      return event.deltaY * window.innerHeight
    }

    return event.deltaY
  }

  const animateHeroTrack = () => {
    const track = heroTrackRef.current
    if (!track) {
      heroHorizontalRafRef.current = null
      return
    }

    const delta = heroHorizontalTargetRef.current - track.scrollLeft
    if (Math.abs(delta) < 0.5) {
      track.scrollLeft = heroHorizontalTargetRef.current
      heroHorizontalRafRef.current = null

      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
      hasCompletedHeroHorizontalRef.current = track.scrollLeft >= maxScroll - 1
      return
    }

    const step = Math.sign(delta) * Math.min(Math.abs(delta * HERO_LERP_FACTOR), HERO_MAX_LERP_STEP_PX)
    track.scrollLeft += step
    heroHorizontalRafRef.current = requestAnimationFrame(animateHeroTrack)
  }

  const startHeroAnimation = () => {
    if (heroHorizontalRafRef.current !== null) {
      return
    }

    heroHorizontalRafRef.current = requestAnimationFrame(animateHeroTrack)
  }

  const stopHeroAnimation = () => {
    if (heroHorizontalRafRef.current !== null) {
      cancelAnimationFrame(heroHorizontalRafRef.current)
      heroHorizontalRafRef.current = null
    }
  }

  const onHeroPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!heroTrackRef.current) {
      return
    }

    stopHeroAnimation()
    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = heroTrackRef.current.scrollLeft
    heroHorizontalTargetRef.current = heroTrackRef.current.scrollLeft
    heroTrackRef.current.classList.add('is-dragging')
    heroTrackRef.current.setPointerCapture(event.pointerId)
  }

  const onHeroPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!heroTrackRef.current || !isDraggingRef.current) {
      return
    }

    const deltaX = event.clientX - dragStartXRef.current
    heroTrackRef.current.scrollLeft = dragStartScrollLeftRef.current - deltaX
    heroHorizontalTargetRef.current = heroTrackRef.current.scrollLeft
  }

  const onHeroPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!heroTrackRef.current) {
      return
    }

    isDraggingRef.current = false
    heroTrackRef.current.classList.remove('is-dragging')
    heroHorizontalTargetRef.current = heroTrackRef.current.scrollLeft

    const maxScroll = Math.max(heroTrackRef.current.scrollWidth - heroTrackRef.current.clientWidth, 0)
    hasCompletedHeroHorizontalRef.current = heroTrackRef.current.scrollLeft >= maxScroll - 1

    if (heroTrackRef.current.hasPointerCapture(event.pointerId)) {
      heroTrackRef.current.releasePointerCapture(event.pointerId)
    }
  }

  useEffect(() => {
    const track = heroTrackRef.current
    if (!track) {
      return
    }

    const resetTrackPosition = () => {
      track.scrollLeft = 0
      heroHorizontalTargetRef.current = 0
      hasCompletedHeroHorizontalRef.current = false
    }

    const syncTrackState = () => {
      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
      heroHorizontalTargetRef.current = track.scrollLeft
      hasCompletedHeroHorizontalRef.current = track.scrollLeft >= maxScroll - 1
    }

    const onWindowWheel = (event: globalThis.WheelEvent) => {
      const normalizedDeltaY = normalizeWheelDeltaY(event)
      if (normalizedDeltaY === 0) {
        return
      }

      const isAtTop = window.scrollY <= 2
      if (!isAtTop) {
        return
      }

      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
      if (maxScroll <= 0) {
        hasCompletedHeroHorizontalRef.current = true
        return
      }

      if (normalizedDeltaY > 0) {
        if (hasCompletedHeroHorizontalRef.current) {
          return
        }

        const remainingScroll = maxScroll - track.scrollLeft
        if (remainingScroll <= 0.5) {
          hasCompletedHeroHorizontalRef.current = true
          return
        }

        const horizontalPush =
          Math.abs(normalizedDeltaY) * HERO_WHEEL_TO_HORIZONTAL_RATIO

        event.preventDefault()
        const nextScrollLeft = Math.min(maxScroll, track.scrollLeft + horizontalPush)
        heroHorizontalTargetRef.current = nextScrollLeft
        startHeroAnimation()
        return
      }

      if (track.scrollLeft <= 0.5) {
        hasCompletedHeroHorizontalRef.current = false
        heroHorizontalTargetRef.current = 0
        track.scrollLeft = 0
        return
      }

      const horizontalPush = Math.max(
        Math.abs(normalizedDeltaY) * HERO_WHEEL_TO_HORIZONTAL_RATIO,
        0,
      )

      event.preventDefault()
      hasCompletedHeroHorizontalRef.current = false
      const nextScrollLeft = Math.max(0, track.scrollLeft - horizontalPush)
      heroHorizontalTargetRef.current = nextScrollLeft
      startHeroAnimation()
    }

    requestAnimationFrame(resetTrackPosition)
    track.addEventListener('scroll', syncTrackState, { passive: true })
    window.addEventListener('wheel', onWindowWheel, { passive: false })
    window.addEventListener('resize', syncTrackState)

    return () => {
      stopHeroAnimation()
      track.removeEventListener('scroll', syncTrackState)
      window.removeEventListener('wheel', onWindowWheel)
      window.removeEventListener('resize', syncTrackState)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setIsHeaderSolid(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <main className="page" data-node-id="15401:5340">
      <header
        className={`top-header ${isHeaderSolid ? 'is-solid' : ''}`}
        data-node-id="15401:5346"
      >
        <div className="top-header__left-group">
          <nav className="top-header__menu" aria-label="Categorías">
            <a href="#" className="is-active">
              Mujer
            </a>
            <a href="#">Hombre</a>
            <a href="#">MD World</a>
          </nav>

          <a href="#" className="logo" aria-label="Massimo Dutti">
            <img src="/md-logo.svg" alt="Massimo Dutti" />
          </a>
        </div>

        <nav className="top-header__actions" aria-label="Acciones de usuario">
          <a href="#">Buscador</a>
          <a href="#">Iniciar sesión</a>
          <a href="#">Cesta [5]</a>
        </nav>
      </header>

      <section className="hero-slider" aria-label="Presentación de producto">
        <div
          className="hero-slider__track"
          ref={heroTrackRef}
          onPointerDown={onHeroPointerDown}
          onPointerMove={onHeroPointerMove}
          onPointerUp={onHeroPointerEnd}
          onPointerCancel={onHeroPointerEnd}
        >
          <article className="hero-slide hero-slide--left" data-node-id="15401:5342">
            <OptimizedImage
              className="hero-slide__media"
              src={imgHeroLeft}
              alt="Modelo con vestido satinado beige"
              loading="eager"
              fetchPriority="high"
            />
          </article>

          <article className="hero-slide hero-slide--right" data-node-id="15401:5343">
            <OptimizedImage
              className="hero-slide__media"
              src={imgHeroRight}
              alt="Modelo con vestido en paisaje desértico"
              fetchPriority="low"
            />
          </article>
        </div>

        <aside className="product-card" data-node-id="15401:5367">
          <div className="product-card__head">
            <span className="tag">Nuevo</span>
            <a href="#">Ver look</a>
          </div>

          <div className="product-card__title-row">
            <div>
              <p className="product-title">Vestido Midi Fluido Satinado</p>
              <p className="product-price">149 €</p>
            </div>
            <button type="button" className="icon-btn" aria-label="Guardar producto">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M7.66667 10.5455L12.3333 15V1H3V15L7.66667 10.5455ZM4 12.663L7.66667 9.16301L11.3333 12.663V2H4V12.663Z" />
              </svg>
            </button>
          </div>

          <div className="product-card__color" aria-label="Selección de color">
            <p>Color: Beige</p>
            <button type="button" className="swatch is-selected" aria-label="Color beige" />
          </div>

          <button type="button" className="btn btn-secondary btn--full label-m ttu btn-wide">
            Añadir a la cesta
          </button>

          <p className="shipping-note">
            Envío a tienda: Gratis | Envío a domicilio: Gratis por pedidos
            superiores a 89,00 €.
          </p>
        </aside>
      </section>

      <section className="content-band" aria-label="Detalle y galería">
        <article className="detail-panel">
          <div className="description-block">
            <p>Ref. 5102/703</p>
            <p>
              Americana confeccionada en tejido 100% lino. Cuello con solapa de
              muesca. Cierre cruzado mediante botón lateral. Dos bolsillos con
              solapa. Medio forro interior que aporta mayor ligereza a la prenda.
            </p>
          </div>

          <ul className="detail-links list list-mini">
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
        </article>

        <div className="gallery-grid">
          <OptimizedImage src={imgGalleryDress} alt="Vestido beige sobre fondo gris" />
          <OptimizedImage src={imgGalleryModel} alt="Vista posterior del vestido" />
          <OptimizedImage src={imgGalleryDetail} alt="Detalle de tejido del vestido" />
          <OptimizedImage src={imgLowerHero} alt="Vestido satinado de cuerpo completo" />
        </div>
      </section>

      <section className="editorial-band" aria-label="Shop the look" data-node-id="15632:2488">
        <OptimizedImage
          src={imgEditorial}
          alt="Editorial moda en exterior"
          className="editorial-band__image"
        />

        <div className="shop-look" data-node-id="15632:2490">
          <h3 className="shop-look__title">Look de 3 artículos</h3>

          <div className="shop-look__row" data-node-id="15632:2492">
            <article className="shop-item" data-node-id="15632:2493">
              <OptimizedImage src={imgMiniDress} alt="Vestido satinado beige" className="shop-item__image" />
              <div className="shop-item__meta">
                <p>Camiseta Medium Weight</p>
                <p>29,95 €</p>
                <button type="button" className="shop-item__plus" aria-label="Añadir vestido satinado al look">
                  +
                </button>
              </div>
            </article>

            <article className="shop-item" data-node-id="15632:2496">
              <OptimizedImage src={imgMiniNecklace} alt="Collar cadena con colgante" className="shop-item__image" />
              <div className="shop-item__meta">
                <p>Camiseta Medium Weight</p>
                <p>29,95 €</p>
                <button type="button" className="shop-item__plus" aria-label="Añadir collar al look">
                  +
                </button>
              </div>
            </article>
          </div>

          <div className="shop-look__row shop-look__row--single" data-node-id="15632:2499">
            <article className="shop-item" data-node-id="15632:2500">
              <OptimizedImage src={imgMiniShoe} alt="Zapato plano negro" className="shop-item__image" />
              <div className="shop-item__meta">
                <p>Camiseta Medium Weight</p>
                <p>29,95 €</p>
                <button type="button" className="shop-item__plus" aria-label="Añadir zapato al look">
                  +
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="recommendations" aria-label="También te puede interesar">
        <h2>También puede interesarte</h2>
        <div className="recommendations-grid">
          {recommendationSlots.map((_, index) => (
            <article key={index} className="placeholder-card" aria-label={`Recomendación ${index + 1}`}>
              <div className="placeholder-image" />
              <p className="placeholder-line">Camiseta de algodón</p>
              <p className="placeholder-line">29,95 €</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer" aria-label="Footer principal" data-node-id="15632:2416">
        <nav aria-label="Footer links" className="footer-links" data-node-id="15632:2418">
          <a href="#">App Massimo Dutti</a>
          <a href="#">Social</a>
          <a href="#">Ayuda</a>
          <a href="#">Servicios</a>
          <a href="#">Empresa</a>
          <a href="#">Legal</a>
        </nav>

        <div className="footer-block" data-node-id="15632:2425">
          <div className="footer-locale" data-node-id="15632:2426">
            <p>Cambiar de mercado:</p>
            <a href="#" className="market-link">
              España (€)
            </a>
            <div className="footer-languages" aria-label="Idiomas disponibles">
              <a href="#" className="is-active" aria-current="true">
                Es
              </a>
              <a href="#">Cat</a>
              <a href="#">Ga</a>
              <a href="#">Eus</a>
              <a href="#">En</a>
            </div>
          </div>

          <a href="#" className="footer-brand" aria-label="Massimo Dutti" data-node-id="15632:2428">
            <img src="/md-logo.svg" alt="Massimo Dutti" />
          </a>

          <div className="footer-newsletter" data-node-id="15632:2429">
            <p>Suscríbete a nuestra newsletter y te enviaremos información sobre novedades y tendencias.</p>
            <div className="footer-newsletter__actions">
              <a href="#">Suscríbete</a>
              <a href="#" className="is-muted">
                Darse de baja
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom-bar" aria-hidden="true" />
    </main>
  )
}

export default App
