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
  const [isStickyHidden, setIsStickyHidden] = useState(false)
  const [isHeaderSolid, setIsHeaderSolid] = useState(true)

  // Scroll-driven UI states: fade the sticky at the very end and give the header a solid
  // background once the user has scrolled past both full-viewport hero images.
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
        // Header is solid white at the very top of the scroll; once the user starts
        // scrolling, it becomes transparent so the imagery passes behind it.
        setIsHeaderSolid(scrollTop <= 2)
      })
    }
    onScroll()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="mobile-stage">
      <div className="app-frame" role="region" aria-label="Prototipo app Massimo Dutti">
        <div className="app-scroll" ref={scrollAreaRef}>
          <section className="app-hero" aria-label="Imágenes del producto">
            <figure className="app-hero__slot">
              <OptimizedImage
                src={imgHeroLeft}
                alt="Modelo con vestido satinado beige"
                loading="eager"
                fetchPriority="high"
                style={{ objectPosition: 'center 30%' }}
              />
            </figure>
            <figure className="app-hero__slot app-hero__slot--fit">
              <OptimizedImage
                src={imgHero2}
                alt="Modelo con vestido en paisaje desértico"
                loading="eager"
                fetchPriority="low"
              />
            </figure>
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

        <div className={`app-status-bar ${isHeaderSolid ? 'is-solid' : ''}`} aria-hidden="true">
          <span className="app-status-bar__time">9:41</span>
          <div className="app-status-bar__icons">
            <StatusBarSignal />
            <StatusBarWifi />
            <StatusBarBattery />
          </div>
        </div>

        <header className={`app-header ${isHeaderSolid ? 'is-solid' : ''}`}>
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
