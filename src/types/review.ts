export type Review = {
  id: number,
  productId: number,
  author: string,
  date: string,
  dateTime: string,
  rating: number,
  title?: string,
  comment: string,
  photos?: string[]
}