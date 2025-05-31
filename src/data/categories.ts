import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'drones',
    name: 'Drones',
    image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 12
  },
  {
    id: 'humanoid-robots',
    name: 'Humanoid Robots',
    image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 8
  },
  {
    id: 'quadruped-robots',
    name: 'Quadruped Robots',
    image: '/chatgpt-extracted_files/images/CompanyProfile_p1_img1.jpeg',
    productCount: 1 // Assuming X30 is the first quadruped robot
  }
]