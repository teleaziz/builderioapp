export type ProductType = {
  title: string
  description?: string
  price?: number
  size?: [number]
  category?: [number]
  color?: [number]
  image?: string
  video_link?: string
}

export type SizeType = {
  size: string
}

export type ColorType = {
  color: string
}
