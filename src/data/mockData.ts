import { Product, Coupon } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Aura Sound ANC Pro',
    subtitle: 'Cancelación Activa de Ruido Híbrida & Audio Espacial 360°',
    description: 'Experimenta la cúspide acústica. Transductores de berilio de 40mm sintonizados al milímetro con diafragma de fibra de carbono. Cancelación de ruido adaptativa con 8 micrófonos beamforming y hasta 42 horas de batería ultrarrápida.',
    features: [
      'Cancelación de Ruido Adaptativa en Tiempo Real',
      'Transductores de 40mm de Berilio puro',
      'Batería de 42h con carga ultra rápida (15m = 6h)',
      'Conexión multipunto Bluetooth 5.4 con códec LDAC Lossless'
    ],
    price: 349900,
    promoPrice: 289900,
    category: 'audio',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 148,
    stock: 7,
    isBestSeller: true,
    isNew: false,
    freeShipping: true,
    installmentsMax: 6,
    tags: ['ANC', 'Hi-Fi', 'Wireless', 'Spatial Audio'],
    variants: [
      {
        id: 'var-1a',
        name: 'Midnight Black Mate',
        sku: 'AUR-SND-BLK',
        price: 349900,
        promoPrice: 289900,
        stock: 4,
        colorHex: '#18181b',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80'
      },
      {
        id: 'var-1b',
        name: 'Cyber Silver Titanium',
        sku: 'AUR-SND-SLV',
        price: 349900,
        promoPrice: 299900,
        stock: 3,
        colorHex: '#e2e8f0',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&auto=format&fit=crop&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Nicolás Ferrero',
        rating: 5,
        date: 'Hace 3 días',
        comment: 'La cancelación de ruido compite directamente con Sony o Apple, pero con materiales mucho más premium.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Valentina Rossi',
        rating: 5,
        date: 'Hace 1 semana',
        comment: 'El empaque, la textura y el sonido espacial son una locura. En 24h ya lo tenía en casa.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Chronos Lumina Ultra Watch',
    subtitle: 'Titanio Grado Aeroespacial + Sensor Biomédico ECG & SpO2',
    description: 'Carcasa monocasco mecanizada en titanio grado 5 con pantalla AMOLED Sapphire Crystal de 2.04" y 2500 nits de brillo pico. Resistencia al agua 10ATM y autonomía de 14 días en uso continuo.',
    features: [
      'Cuerpo de Titanio Aeroespacial Grado 5',
      'Pantalla AMOLED Sapphire Crystal de 2500 nits',
      'Monitoreo cardíaco de grado clínico, SpO2 y estrés',
      'GPS de doble frecuencia L1 + L5 de precisión submétrica'
    ],
    price: 499000,
    promoPrice: 429000,
    category: 'wearables',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewCount: 92,
    stock: 5,
    isBestSeller: true,
    isNew: true,
    freeShipping: true,
    installmentsMax: 12,
    tags: ['Titanium', 'ECG', 'Sapphire', 'Smartwatch'],
    variants: [
      {
        id: 'var-2a',
        name: 'Titanium Raw 49mm',
        sku: 'CHR-LUM-RAW',
        price: 499000,
        promoPrice: 429000,
        stock: 3,
        colorHex: '#94a3b8',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80'
      },
      {
        id: 'var-2b',
        name: 'Obsidian Stealth 49mm',
        sku: 'CHR-LUM-OBS',
        price: 519000,
        promoPrice: 449000,
        stock: 2,
        colorHex: '#09090b',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&auto=format&fit=crop&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Martín Gómez',
        rating: 5,
        date: 'Hace 5 días',
        comment: 'La pantalla al sol es perfecta. La batería dura más de 10 días reales.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Nova Apex Mechanical 75%',
    subtitle: 'Gasket Mount Custom, Switches Hall Effect Magnéticos',
    description: 'Construido para velocidad pura y sonido cremoso. Chasis de aluminio anodizado CNC con triple amortiguación de sonido de poron. Switches Hall Effect con punto de activación ajustable al 0.1mm y Rapid Trigger.',
    features: [
      'Switches magnéticos Hall Effect con Rapid Trigger',
      'Actuación ajustable de 0.1mm a 4.0mm',
      'Montaje Gasket Mount con triple capa de Poron acústico',
      'Conectividad Tri-mode: 2.4Ghz ultrabajo retardo, BT 5.3 y Cable USB-C'
    ],
    price: 269000,
    promoPrice: 229000,
    category: 'gaming',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.95,
    reviewCount: 204,
    stock: 12,
    isBestSeller: true,
    isNew: false,
    freeShipping: true,
    installmentsMax: 6,
    tags: ['Hall Effect', 'Rapid Trigger', 'Custom Keeb', 'Wireless'],
    variants: [
      {
        id: 'var-3a',
        name: 'Cyberpunk Purple Neon',
        sku: 'NOV-APX-PRP',
        price: 269000,
        promoPrice: 229000,
        stock: 6,
        colorHex: '#8b5cf6',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&auto=format&fit=crop&q=80'
      },
      {
        id: 'var-3b',
        name: 'Ghost Minimalist White',
        sku: 'NOV-APX-WHT',
        price: 269000,
        promoPrice: 229000,
        stock: 6,
        colorHex: '#f8fafc',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&auto=format&fit=crop&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Facundo Rivas',
        rating: 5,
        date: 'Hace 2 días',
        comment: 'El sonido thocky que tiene de fábrica es una delicia. El Rapid Trigger para Valorant y CS2 es trampa.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'Aura Studio Dock Pro 14-in-1',
    subtitle: 'Thunderbolt 4 Hub con Soporte Triple 4K 144Hz & Carga 100W',
    description: 'Transforma cualquier MacBook o PC portátil en una estación de trabajo definitiva con un único cable trenzado. Carcasa con disipación pasiva de aluminio sólido y ranura para expansión NVMe M.2 interna.',
    features: [
      'Doble controlador Thunderbolt 4 de 40 Gbps',
      'Power Delivery 100W GaN inteligente',
      'Slot interno para SSD M.2 PCIe Gen 4 hasta 8TB',
      'Lector SD/microSD UHS-II 312 MB/s y Ethernet 2.5 Gbps'
    ],
    price: 389000,
    category: 'workstation',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewCount: 56,
    stock: 4,
    isBestSeller: false,
    isNew: true,
    freeShipping: true,
    installmentsMax: 6,
    tags: ['Thunderbolt 4', 'Dock', 'NVMe', 'Workstation']
  },
  {
    id: 'prod-5',
    title: 'Prism Horizon LED Desk Lamp',
    subtitle: 'Iluminación Asimétrica de Precisión con Sensor de Presencia',
    description: 'Barra óptica antirreflejo para monitores curvados o planos. Índice de reproducción cromática Ra > 98, ajuste de temperatura de color dinámico que acompaña tus ritmos circadianos y control inalámbrico táctil.',
    features: [
      'Iluminación asimétrica óptica anti-fatiga visual',
      'Color Rendering Index Ra > 98 (colorimetría profesional)',
      'Sensor de presencia ultrasónico con apagado y encendido automático',
      'Control giratorio inalámbrico en aluminio maquinado'
    ],
    price: 159000,
    promoPrice: 129000,
    category: 'lifestyle',
    images: [
      'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.85,
    reviewCount: 88,
    stock: 15,
    isBestSeller: false,
    isNew: false,
    freeShipping: true,
    installmentsMax: 3,
    tags: ['Desk Lamp', 'CRI98', 'Minimalist', 'Setup']
  },
  {
    id: 'prod-6',
    title: 'Aura Stealth Flight Backpack 24L',
    subtitle: 'Tejido Cordura® 500D Impermeable + Bolsillo Tech Magnetico',
    description: 'La mochila definitiva para creadores y nómadas digitales. Apertura tipo valija de 180°, compartimento acolchado suspendido para laptop de hasta 16", cierres YKK AquaGuard® y candado TSA integrado.',
    features: [
      'Tejido balístico Cordura® repelente al agua y cortes',
      'Bolsillo blindado magnético RFID para pasaporte y tarjetas',
      'Arnés ergonómico con espuma viscoelástica termoformada',
      'Pasa-valijas reforzado para viajes internacionales'
    ],
    price: 219000,
    promoPrice: 185000,
    category: 'lifestyle',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 114,
    stock: 9,
    isBestSeller: true,
    isNew: false,
    freeShipping: true,
    installmentsMax: 6,
    tags: ['Cordura', 'Backpack', 'EDC', 'Travel']
  },
  {
    id: 'prod-7',
    title: 'Vortex Carbon Ultralight Mouse',
    subtitle: 'Estructura Monocasco de Fibra de Carbono — 38 gramos',
    description: 'El ratón inalámbrico competitivo más ligero jamás creado. Sensor PixArt 3395 de 26.000 DPI reales, polling rate real de 8000Hz (0.125ms de respuesta) y switches ópticos Omron de 100 millones de clics.',
    features: [
      'Estructura de fibra de carbono aeroespacial de 38g',
      'Polling rate de 8000Hz ultrarrápido',
      'Sensor óptico PixArt 3395 (26.000 DPI / 650 IPS)',
      'Pies de teflón PTFE puro 100% virgen'
    ],
    price: 189000,
    category: 'gaming',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewCount: 67,
    stock: 8,
    isBestSeller: false,
    isNew: true,
    freeShipping: true,
    installmentsMax: 3,
    tags: ['Carbon Fiber', '8000Hz', 'Gaming Mouse', 'Ultralight']
  },
  {
    id: 'prod-8',
    title: 'Aura Pulse Smart Ring',
    subtitle: 'Titanio Grado Médico con Sensores PPG de Monitoreo Continuo',
    description: 'La tecnología de salud más discreta. Mide tus fases de sueño REM, recuperación del sistema nervioso, variabilidad cardíaca (HRV) y temperatura corporal sin pantallas que te distraigan.',
    features: [
      'Acabado PVD de titanio pulido a espejo hipoalergénico',
      'Resistente al agua hasta 100m (incluso para buceo)',
      'Batería para 7 días continuos en anillo de solo 2.5mm de grosor',
      'App sin suscripciones mensuales incluidas de por vida'
    ],
    price: 329000,
    promoPrice: 289000,
    category: 'wearables',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=1000&auto=format&fit=crop&q=80'
    ],
    rating: 4.92,
    reviewCount: 133,
    stock: 3,
    isBestSeller: true,
    isNew: true,
    freeShipping: true,
    installmentsMax: 12,
    tags: ['Smart Ring', 'Sleep Tracker', 'HRV', 'Titanium'],
    variants: [
      {
        id: 'var-8a',
        name: 'Midnight Black PVD - Talle 10',
        sku: 'AUR-RNG-BLK-10',
        price: 329000,
        promoPrice: 289000,
        stock: 2,
        colorHex: '#0f172a'
      },
      {
        id: 'var-8b',
        name: 'Liquid Silver - Talle 9',
        sku: 'AUR-RNG-SLV-09',
        price: 329000,
        promoPrice: 289000,
        stock: 1,
        colorHex: '#cbd5e1'
      }
    ]
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'MODERNA20',
    discountType: 'percentage',
    discountValue: 20,
    description: '20% OFF de lanzamiento en cualquier producto'
  },
  {
    code: 'TIENDACLOUD',
    discountType: 'fixed',
    discountValue: 50000,
    minSpend: 200000,
    description: '$50.000 de descuento en compras superiores a $200.000'
  },
  {
    code: 'ENVIOFREE',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% OFF adicional acumulable'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Productos', icon: 'Sparkles', count: 8 },
  { id: 'audio', label: 'Audio Hi-Fi', icon: 'Headphones', count: 1 },
  { id: 'wearables', label: 'Smart Wearables', icon: 'Watch', count: 2 },
  { id: 'gaming', label: 'Gaming & Keebs', icon: 'Gamepad2', count: 2 },
  { id: 'workstation', label: 'Workstation', icon: 'Laptop', count: 1 },
  { id: 'lifestyle', label: 'Lifestyle & Setup', icon: 'Layers', count: 2 },
];

export const SOCIAL_PROOF_EVENTS = [
  { name: 'Matías de Núñez, CABA', product: 'Aura Sound ANC Pro', time: 'hace 2 minutos' },
  { name: 'Camila de Córdoba Capital', product: 'Chronos Lumina Ultra Watch', time: 'hace 6 minutos' },
  { name: 'Joaquín de Rosario, SF', product: 'Nova Apex Mechanical 75%', time: 'hace 11 minutos' },
  { name: 'Sofía de Mendoza', product: 'Aura Pulse Smart Ring', time: 'hace 14 minutos' },
  { name: 'Agustín de La Plata', product: 'Aura Stealth Flight Backpack 24L', time: 'hace 19 minutos' },
];
