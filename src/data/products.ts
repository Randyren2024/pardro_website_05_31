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
      '/images/m16_01.jpg',
      '/images/m16_02.jpg',
      '/images/m16_03.jpg'
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
  {
    id: 'm16-hexacopter',
    name: {
      zh: 'M16六旋翼无人机',
      en: 'M16 Hexacopter Drone',
      es: 'Dron Hexacóptero M16',
      ru: 'Гексакоптер M16',
      ja: 'M16ヘキサコプタードローン',
      de: 'M16 Hexacopter-Drohne',
      fr: 'Drone Hexacoptère M16',
      th: 'โดรนเฮกซาคอปเตอร์ M16'
    },
    category: 'drones',
    price: 89999,
    description: {
      zh: '安徽皓翔航空科技有限公司生产的M16六旋翼无人机，具有优异的稳定性和可靠性，适用于各种专业应用场景。',
      en: 'The M16 hexacopter drone produced by Anhui Haoxiang Aviation Technology Co., Ltd. features excellent stability and reliability, suitable for various professional application scenarios.',
      es: 'El dron hexacóptero M16 producido por Anhui Haoxiang Aviation Technology Co., Ltd. presenta excelente estabilidad y confiabilidad, adecuado para varios escenarios de aplicación profesional.',
      ru: 'Гексакоптер M16, произведенный компанией Anhui Haoxiang Aviation Technology Co., Ltd., отличается превосходной стабильностью и надежностью, подходит для различных профессиональных сценариев применения.',
      ja: '安徽皓翔航空科技有限公司が製造するM16ヘキサコプタードローンは、優れた安定性と信頼性を備え、さまざまな専門的な応用シナリオに適しています。',
      de: 'Die von Anhui Haoxiang Aviation Technology Co., Ltd. hergestellte M16-Hexacopter-Drohne zeichnet sich durch hervorragende Stabilität und Zuverlässigkeit aus und eignet sich für verschiedene professionelle Anwendungsszenarien.',
      fr: 'Le drone hexacoptère M16 produit par Anhui Haoxiang Aviation Technology Co., Ltd. présente une excellente stabilité et fiabilité, adapté à divers scénarios d\'application professionnelle.',
      th: 'โดรนเฮกซาคอปเตอร์ M16 ที่ผลิตโดย Anhui Haoxiang Aviation Technology Co., Ltd. มีความเสถียรและความน่าเชื่อถือที่ยอดเยี่ยม เหมาะสำหรับสถานการณ์การใช้งานระดับมืออาชีพต่างๆ'
    },
    features: {
      zh: [
        '六旋翼设计，稳定性更强',
        '专业级飞行控制系统',
        '高精度GPS定位',
        '模块化载荷设计',
        '工业级可靠性',
        '多种飞行模式'
      ],
      en: [
        'Hexacopter design for enhanced stability',
        'Professional-grade flight control system',
        'High-precision GPS positioning',
        'Modular payload design',
        'Industrial-grade reliability',
        'Multiple flight modes'
      ],
      es: [
        'Diseño hexacóptero para mayor estabilidad',
        'Sistema de control de vuelo de grado profesional',
        'Posicionamiento GPS de alta precisión',
        'Diseño de carga útil modular',
        'Confiabilidad de grado industrial',
        'Múltiples modos de vuelo'
      ],
      ru: [
        'Дизайн гексакоптера для повышенной стабильности',
        'Профессиональная система управления полетом',
        'Высокоточное GPS-позиционирование',
        'Модульная конструкция полезной нагрузки',
        'Промышленная надежность',
        'Множественные режимы полета'
      ],
      ja: [
        '安定性を向上させるヘキサコプター設計',
        'プロフェッショナルグレードの飛行制御システム',
        '高精度GPS測位',
        'モジュラーペイロード設計',
        '産業グレードの信頼性',
        '複数の飛行モード'
      ],
      de: [
        'Hexacopter-Design für verbesserte Stabilität',
        'Professionelles Flugkontrollsystem',
        'Hochpräzise GPS-Positionierung',
        'Modulares Nutzlast-Design',
        'Industrielle Zuverlässigkeit',
        'Mehrere Flugmodi'
      ],
      fr: [
        'Conception hexacoptère pour une stabilité améliorée',
        'Système de contrôle de vol de qualité professionnelle',
        'Positionnement GPS haute précision',
        'Conception de charge utile modulaire',
        'Fiabilité de qualité industrielle',
        'Modes de vol multiples'
      ],
      th: [
        'การออกแบบเฮกซาคอปเตอร์เพื่อความเสถียรที่เพิ่มขึ้น',
        'ระบบควบคุมการบินระดับมืออาชีพ',
        'การระบุตำแหน่ง GPS ความแม่นยำสูง',
        'การออกแบบน้ำหนักบรรทุกแบบโมดูลาร์',
        'ความน่าเชื่อถือระดับอุตสาหกรรม',
        'โหมดการบินหลายแบบ'
      ]
    },
    specifications: {
      zh: {
        '轴距': '1600mm',
        '起飞重量': '≤25kg',
        '载荷重量': '≤8kg',
        '续航时间': '≤45min',
        '飞行高度': '≤500m',
        '抗风等级': '≤6级',
        '工作温度': '-10°C~+50°C',
        '定位精度': '±1m'
      },
      en: {
        'Wheelbase': '1600mm',
        'Takeoff Weight': '≤25kg',
        'Payload Weight': '≤8kg',
        'Flight Time': '≤45min',
        'Flight Altitude': '≤500m',
        'Wind Resistance': '≤Level 6',
        'Operating Temperature': '-10°C~+50°C',
        'Positioning Accuracy': '±1m'
      },
      es: {
        'Distancia entre ejes': '1600mm',
        'Peso de despegue': '≤25kg',
        'Peso de carga útil': '≤8kg',
        'Tiempo de vuelo': '≤45min',
        'Altitud de vuelo': '≤500m',
        'Resistencia al viento': '≤Nivel 6',
        'Temperatura de funcionamiento': '-10°C~+50°C',
        'Precisión de posicionamiento': '±1m'
      },
      ru: {
        'Колесная база': '1600mm',
        'Взлетный вес': '≤25kg',
        'Вес полезной нагрузки': '≤8kg',
        'Время полета': '≤45min',
        'Высота полета': '≤500m',
        'Ветроустойчивость': '≤Уровень 6',
        'Рабочая температура': '-10°C~+50°C',
        'Точность позиционирования': '±1m'
      },
      ja: {
        'ホイールベース': '1600mm',
        '離陸重量': '≤25kg',
        'ペイロード重量': '≤8kg',
        '飛行時間': '≤45min',
        '飛行高度': '≤500m',
        '耐風性': '≤レベル6',
        '動作温度': '-10°C~+50°C',
        '測位精度': '±1m'
      },
      de: {
        'Radstand': '1600mm',
        'Startgewicht': '≤25kg',
        'Nutzlastgewicht': '≤8kg',
        'Flugzeit': '≤45min',
        'Flughöhe': '≤500m',
        'Windwiderstand': '≤Stufe 6',
        'Betriebstemperatur': '-10°C~+50°C',
        'Positionierungsgenauigkeit': '±1m'
      },
      fr: {
        'Empattement': '1600mm',
        'Poids au décollage': '≤25kg',
        'Poids de charge utile': '≤8kg',
        'Temps de vol': '≤45min',
        'Altitude de vol': '≤500m',
        'Résistance au vent': '≤Niveau 6',
        'Température de fonctionnement': '-10°C~+50°C',
        'Précision de positionnement': '±1m'
      },
      th: {
        'ฐานล้อ': '1600mm',
        'น้ำหนักขณะขึ้น': '≤25kg',
        'น้ำหนักบรรทุก': '≤8kg',
        'เวลาบิน': '≤45min',
        'ความสูงบิน': '≤500m',
        'ความต้านทานลม': '≤ระดับ 6',
        'อุณหภูมิการทำงาน': '-10°C~+50°C',
        'ความแม่นยำในการระบุตำแหน่ง': '±1m'
      }
    },
    images: [
      '/images/m16_01.jpg',
      '/images/m16_02.jpg',
      '/images/m16_03.jpg'
    ],
    brand: '皓翔航空',
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
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
      '/images/CompanyProfile_p10_img1.jpeg',
      '/images/CompanyProfile_p10_img2.png'
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
    price: 8000.00, // 估算价格
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
      '/images/Lite3_p1_img1.jpeg',
      '/images/Lite3_p1_img2.jpeg',
      '/images/Lite3_p1_img3.jpeg',
      '/images/Lite3_p1_img4.jpeg'
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
    price: 18000.00, // 估算价格
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
      '/images/LYNXM20_p1_img1.jpeg',
      '/images/LYNXM20_p1_img2.jpeg',
      '/images/LYNXM20_p1_img3.jpeg',
      '/images/LYNXM20_p1_img4.jpeg',
      '/images/LYNXM20_p1_img5.jpeg',
      '/images/LYNXM20_p1_img6.jpeg',
      '/images/LYNXM20_p1_img7.jpeg',
      '/images/LYNXM20_p1_img8.png'
    ],
    rating: 4.8,
    reviewCount: 60,
    stock: 8,
    brand: 'DEEPRobotics',
    isNew: true
  }
]
