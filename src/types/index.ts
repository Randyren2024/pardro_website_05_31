export interface Product {
  id: string
  name: string | Record<string, string>
  category: string
  price: number
  discountedPrice?: number
  description: string | Record<string, string>
  features: string[] | Record<string, string[]>
  specifications: Record<string, string> | Record<string, Record<string, string>>
  images: string[]
  rating: number
  reviewCount: number
  stock: number
  brand: string
  isNew?: boolean
  isFeatured?: boolean
  relatedProducts?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

export interface User {
  id: string
  name: string
  email: string
  orders: Order[]
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: CartItem[]
  total: number
  shippingAddress: Address
  paymentMethod: PaymentMethod
}

export interface Address {
  name: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
  phone: string
}

export interface PaymentMethod {
  type: 'credit_card' | 'paypal'
  details: string
}

export interface SupportedLanguage {
  code: string
  name: string
  flag: string
}