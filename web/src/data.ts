export const imgHeroLeft = 'https://www.figma.com/api/mcp/asset/448c7457-4255-40a6-a3f3-552cb3d7d305'
export const imgHeroRight = '/image-2-h.jpg'
export const imgLowerHero = 'https://www.figma.com/api/mcp/asset/93352d03-213e-4eea-9ce4-b721a01e2bc2'
export const imgGalleryDress = 'https://www.figma.com/api/mcp/asset/28de3985-f014-4a3a-8cb3-70bfd10aeba6'
export const imgGalleryModel = 'https://www.figma.com/api/mcp/asset/21fc8642-e918-44e5-8fc8-55b97ab545c8'
export const imgGalleryDetail = 'https://www.figma.com/api/mcp/asset/015058da-981c-4884-a754-2b13e4c4bf8d'
export const imgEditorial = '/image-2-v.jpg'
export const imgMiniDress = 'https://www.figma.com/api/mcp/asset/7ae6630e-1a76-4bcc-94db-a7cf53e3356a'
export const imgMiniNecklace = 'https://www.figma.com/api/mcp/asset/59911518-0e42-4c8b-9ca1-b5d16b37591f'
export const imgMiniShoe = 'https://www.figma.com/api/mcp/asset/9fcdff23-8067-4e1f-81d0-8854691ab3c0'

export type RecommendationProduct = {
  name: string
  price: string
  image: string
}

export const recommendationProducts: RecommendationProduct[] = [
  {
    name: 'Pendientes aro media luna',
    price: '29,95 €',
    image:
      'https://static.massimodutti.net/assets/public/bf5c/dc1f/9be146e086b4/b2b6fddcad91/04605735808-o1/04605735808-o1.jpg?ts=1773851260437',
  },
  {
    name: 'Bolso piel napa trenzado',
    price: '149,00 €',
    image:
      'https://static.massimodutti.net/assets/public/72a7/b8c4/f4e0470d99fd/e6ef989b6f73/06949607700-o1/06949607700-o1.jpg?ts=1780051330054',
  },
  {
    name: 'Falda pareo detalle encaje 100% seda',
    price: '99,95 €',
    image:
      'https://static.massimodutti.net/assets/public/3ded/f6cd/fa2e4ae99767/50f1f5f4ebaa/05291509717-o1/05291509717-o1.jpg?ts=1781620551660',
  },
  {
    name: 'Falda midi fluida detalle encaje',
    price: '69,95 €',
    image:
      'https://static.massimodutti.net/assets/public/aff1/2bd5/0e2b438b91e4/2b5d27787ba0/05208509250-o1/05208509250-o1.jpg?ts=1778597493499',
  },
  {
    name: 'Falda midi fluida bolsillos satinada',
    price: '79,95 €',
    image:
      'https://static.massimodutti.net/assets/public/e83c/46ca/cbd0404e8529/1dfe4d1711f6/05221510400-o1/05221510400-o1.jpg?ts=1781173096509',
  },
  {
    name: 'Falda midi recta 100% seda',
    price: '89,95 €',
    image:
      'https://static.massimodutti.net/assets/public/398d/6362/aa8d43d5b751/69dc9472a11f/05260508829-o1/05260508829-o1.jpg?ts=1777391481713',
  },
  {
    name: 'Falda fluida satinada',
    price: '69,95 €',
    image:
      'https://static.massimodutti.net/assets/public/7458/1d77/94e04f6ba746/90ce9cf24baa/05216509700-o1/05216509700-o1.jpg?ts=1781703930647',
  },
  {
    name: 'Falda fluida balloon',
    price: '59,95 €',
    image:
      'https://static.massimodutti.net/assets/public/20b0/35ad/02404335b743/31ed75901337/05211202800-o1/05211202800-o1.jpg?ts=1780924254869',
  },
  {
    name: 'Falda midi goma 100% lino',
    price: '69,95 €',
    image:
      'https://static.massimodutti.net/assets/public/f2fa/7666/6ec9497eb138/124b6e259b59/05233747600-o1/05233747600-o1.jpg?ts=1779873615265',
  },
  {
    name: 'Vestido midi tirantes mezcla algodón',
    price: '79,95 €',
    image:
      'https://static.massimodutti.net/assets/public/68d4/7527/254d4ebfb714/0eb1e166e263/06648509700-o1/06648509700-o1.jpg?ts=1781796610883',
  },
]

export type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  style?: React.CSSProperties
}
