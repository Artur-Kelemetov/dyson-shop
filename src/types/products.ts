export type EquipmentItem = {
  id: string,
  title: string,
  text: string,
  image: string
}

export type CharacteristicItem = {
  label: string
  value: string
}

export type Product = {
  id: number
  category: string
  title: string
  description: string
  price: number
  oldPrice: number
  discount: number
  isAvailable: boolean
  popularity: number
  isNew: boolean
  rating: number
  equipment?: EquipmentItem[]
  characteristics?: CharacteristicItem[]
  images: string[]
}