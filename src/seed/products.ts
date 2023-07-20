import type { ProductInterface } from '@/types'
export const generateProducts = (quantity: number = 50): ProductInterface[] => {
  const array: ProductInterface[] = []
  for (let i = 1; i <= quantity; i++) {
    array.push({
      id: String(i),
      name: `Product #${i}`,
      price: Math.floor(Math.random() * 100),
      slug: `product-${i}`
    })
  }
  return array
}
