import type { Product } from '../types'

export const products: Product[] = [
  // Drones
  {
    id: 'd001',
    name: 'AeroMaster Pro X500',
    category: 'drones',
    price: 1299.99,
    description: 'Professional drone with 8K camera, 40-minute flight time, and advanced obstacle avoidance system.',
    features: [
      '8K Ultra HD Camera',
      '40-minute flight time',
      'Advanced obstacle avoidance',
      '10km range',
      'Foldable design',
      'Wind resistance up to 38mph'
    ],
    specifications: {
      'Camera': '8K Ultra HD, 1" CMOS Sensor',
      'Flight Time': '40 minutes',
      'Range': '10km',
      'Max Speed': '72km/h',
      'Weight': '595g',
      'Dimensions': '214×91×84mm (folded)',
      'Battery': '5000mAh LiPo',
      'Charging Time': '90 minutes'
    },
    images: [
      'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/320375/pexels-photo-320375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.8,
    reviewCount: 234,
    stock: 15,
    brand: 'AeroTech',
    isFeatured: true,
    relatedProducts: ['d002', 'd003']
  },
  {
    id: 'd002',
    name: 'SkyWalker Mini',
    category: 'drones',
    price: 499.99,
    description: 'Compact, portable drone perfect for beginners and travelers. Features 4K camera and intelligent flight modes.',
    features: [
      '4K Camera',
      '30-minute flight time',
      'Basic obstacle detection',
      '5km range',
      'Ultra-portable design',
      'Automated flight modes'
    ],
    specifications: {
      'Camera': '4K, 1/2.3" CMOS Sensor',
      'Flight Time': '30 minutes',
      'Range': '5km',
      'Max Speed': '54km/h',
      'Weight': '249g',
      'Dimensions': '138×81×58mm (folded)',
      'Battery': '2400mAh LiPo',
      'Charging Time': '60 minutes'
    },
    images: [
      'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.5,
    reviewCount: 182,
    stock: 28,
    brand: 'SkyTech',
    isNew: true
  },
  
  // Humanoid Robots
  {
    id: 'h001',
    name: 'Companion X1',
    category: 'humanoid-robots',
    price: 9999.99,
    description: 'Advanced humanoid robot designed for home assistance, entertainment, and education.',
    features: [
      'Natural conversation AI',
      'Facial recognition',
      'Object manipulation',
      'Autonomous navigation',
      'Emotional response system',
      'Learning capabilities'
    ],
    specifications: {
      'Height': '120cm',
      'Weight': '25kg',
      'Battery Life': '6 hours active use',
      'Charging Time': '3 hours',
      'Processors': 'Quantum AI Processor',
      'Memory': '16TB SSD',
      'Connectivity': 'Wi-Fi 7, Bluetooth 6.0',
      'Sensors': 'LiDAR, Depth Cameras, Touch Sensors, Microphones'
    },
    images: [
      'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.7,
    reviewCount: 56,
    stock: 5,
    brand: 'RoboLife',
    isFeatured: true
  },
  
  // Quadruped Robots
  {
    id: 'x30',
    name: 'X30 Quadruped Robot',
    category: 'quadruped-robots',
    price: 15000.00,
    description: 'DEEPRobotics X30是一款高性能四足机器人，适用于复杂地形的探索、巡检和科研应用。',
    features: [
      '卓越的全地形移动能力',
      '先进的姿态稳定系统',
      '高精度环境感知',
      '模块化负载接口',
      '长续航电池',
      '智能自主导航'
    ],
    specifications: {
      '尺寸': '100cm x 50cm x 70cm',
      '重量': '30kg',
      '最大速度': '5m/s',
      '续航时间': '4小时',
      '负载能力': '10kg',
      '防护等级': 'IP67',
      '工作温度': '-20°C to 50°C'
    },
    images: [
      '/chatgpt-extracted_files/images/CompanyProfile_p10_img1.jpeg',
      '/chatgpt-extracted_files/images/CompanyProfile_p10_img2.png'
    ],
    rating: 4.9,
    reviewCount: 120,
    stock: 5,
    brand: 'DEEPRobotics',
    isNew: true,
    isFeatured: true
  },
  {
    id: 'lite3',
    name: 'Lite3 Quadruped Robot',
    category: 'quadruped-robots',
    price: 8000.00,
    description: 'DEEPRobotics Lite3是一款最新一代的敏捷智能机器狗，具有卓越的运动能力和可扩展性。',
    features: [
      '算法升级，更敏捷响应',
      '更强的逾越能力和机动性',
      '可扩展模块化设计',
      '关节扭矩增加50%，驱动力更强',
      '工业级控制系统，计算能力提升三倍',
      '交互系统升级',
      '更安全多样的感知能力'
    ],
    specifications: {
      '重量': '9kg (估算)',
      '续航时间': '90分钟',
      '最大负载': '7.5kg',
      '爬台阶高度': '15cm'
    },
    images: [
      '/chatgpt-extracted_files/images/Lite3_p1_img1.jpeg',
      '/chatgpt-extracted_files/images/Lite3_p1_img2.jpeg',
      '/chatgpt-extracted_files/images/Lite3_p1_img3.jpeg',
      '/chatgpt-extracted_files/images/Lite3_p1_img4.jpeg'
    ],
    rating: 4.7,
    reviewCount: 85,
    stock: 10,
    brand: 'DEEPRobotics',
    isNew: true
  },
  {
    id: 'lynxm20',
    name: 'LYNX M20',
    category: 'quadruped-robots',
    price: 18000.00,
    description: '全新的LYNX M20是一款中型、敏捷、便携式机器人，具有行业领先的恶劣环境适应能力。',
    features: [
      '全地形操作',
      '轻便易携',
      '极端环境持续运行',
      '敏捷多功能，更多应用场景',
      '超宽关节移动范围',
      '行业领先性能'
    ],
    specifications: {
      '尺寸': '0.82m*0.43m*0.57m',
      '重量': '33kg',
      '负载能力': '15kg',
      '空载续航/里程': '3小时/15公里',
      '负载续航/里程': '2.5小时/12公里',
      '防护等级': 'IP66',
      '工作温度': '-20℃~55℃',
      '最大速度': '5m/s',
      '野外运行速度': '2m/s',
      '爬台阶/障碍物高度': '25cm',
      '坡度': '45°',
      'LiDAR计算能力': '双八核64位工业处理器 (16GB+128GB)',
      '硬件接口': '电源接口 (72V) 千兆以太网'
    },
    images: [
      '/chatgpt-extracted_files/images/LYNXM20_p1_img1.jpeg',
      '/chatgpt-extracted_files/images/LYNXM20_p1_img2.jpeg',
      '/chatgpt-extracted_files/images/LYNXM20_p1_img3.jpeg',
      '/chatgpt-extracted_files/images/LYNXM20_p1_img4.jpeg',
      '/chatgpt-extracted_files/images/LYNXM20_p1_img5.jpeg',
      '/chatgpt-extracted_files/images/LYNXM20_p1_img6.jpeg',
      '/chatgpt-extracted_files/images/LYNXM20_p1_img7.jpeg',
      '/chatgpt-extracted_files/images/LYNXM20_p1_img8.png'
    ],
    rating: 4.8,
    reviewCount: 60,
    stock: 8,
    brand: 'DEEPRobotics',
    isNew: true
  }
]