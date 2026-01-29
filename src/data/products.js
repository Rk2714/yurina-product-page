export const products = [
  {
    id: 1,
    name: 'Ryukyu Denim Clutch',
    price: 12800,
    priceStr: '¥12,800',
    category: 'Bag',
    tagline: '伝統を纏う、琉球の碧(あお)',
    description: '沖縄の伝統工芸「ミンサー織り」の意匠をアクセントに、上質な岡山デニムで仕立てたクラッチバッグ。「いつ（五）の世（四）までも末長く幸せに」という願いが込められた絣柄が、あなたの日々に寄り添います。',
    details: [
      '素材: 国産デニム (14oz) / 牛革',
      '装飾: ミンサー織りテープ',
      '機能: 内ポケット×2 / ストラップ付',
      'サイズ: 25cm x 18cm'
    ],
    care: 'デニム特有の色落ちを楽しむため、洗濯機ではなく手洗いを推奨します。革部分は水濡れに注意してください。',
    reviews: [
      { user: 'E. Higa', rating: 5, text: 'ミンサー柄が可愛くて一目惚れしました。' }
    ],
    image: '/images/products/bag/ryukyu-clutch.png', 
    images: [
      '/images/products/bag/ryukyu-clutch.png', 
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000', 
      'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&q=80&w=1000'
    ],
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    name: 'Bingata Triangle Coin Case',
    price: 2800,
    priceStr: '¥2,800',
    category: 'Wallet',
    tagline: '掌(てのひら)に咲く、南国の彩り',
    description: '三角形のフォルムが愛らしいコインケース。デニムと紅型（びんがた）柄のコントラストが鮮やかです。小銭だけでなく、アクセサリーや薬を入れる小物入れとしても活躍します。',
    details: [
      '素材: デニム / 紅型プリント生地',
      '開閉: スナップボタン',
      'サイズ: 一辺 10cm'
    ],
    care: '汚れた場合は濡れた布で優しく拭き取ってください。',
    reviews: [],
    image: '/images/products/bag/ryukyu-clutch.png', // Temporary fallback
    images: [
      '/images/products/bag/ryukyu-clutch.png',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000'
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    name: 'Kasuri Key Case',
    price: 4500,
    priceStr: '¥4,500',
    category: 'Wallet',
    tagline: '毎日触れるものだから、温もりを',
    description: '琉球絣（かすり）の素朴な風合いを活かしたキーケース。使うほどにデニムが柔らかくなり、手に馴染んでいきます。4連キーフック付き。',
    details: [
      '素材: デニム / 琉球絣柄生地',
      '金具: アンティークゴールド',
      '収納: キーフック×4'
    ],
    care: '金具部分は乾いた布で磨いてください。',
    reviews: [
      { user: 'T. Yamashiro', rating: 4, text: 'シンプルで使いやすいです。' }
    ],
    image: '/images/products/bag/ryukyu-clutch.png', // Temporary fallback
    images: [
      '/images/products/bag/ryukyu-clutch.png',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000'
    ],
    gridClass: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 4,
    name: 'Denim Sacoche',
    price: 6800,
    priceStr: '¥6,800',
    category: 'Bag',
    tagline: '身軽に歩く、島時間',
    description: 'ちょっとしたお出かけに最適なフラットポーチ。スマホと財布を入れて、身軽に街へ出かけましょう。紐の長さは調節可能です。',
    details: [
      '素材: デニム',
      'ストラップ: パラコード（調整可）',
      'サイズ: 20cm x 15cm'
    ],
    care: '色移りにご注意ください。',
    reviews: [],
    image: '/images/products/bag/ryukyu-clutch.png', // Temporary fallback
    images: [
      '/images/products/bag/ryukyu-clutch.png',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000'
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 5,
    name: 'Multi Tech Case',
    price: 8500,
    priceStr: '¥8,500',
    category: 'Case',
    tagline: '大切なものを、ひとつにまとめて',
    description: '母子手帳、パスポート、通帳など。大切なドキュメントをまとめて収納できるマルチケース。デニムの丈夫さが中身をしっかり守ります。',
    details: [
      'ポケット: カード12枚 / ファスナー1',
      '開閉: マグネットボタン',
      'サイズ: A5サイズ対応'
    ],
    care: '型崩れ防止のため、洗濯は避けてください。',
    reviews: [
      { user: 'M. Kinjo', rating: 5, text: '母子手帳ケースとして使っています。夫も持てるデザインで良い。' }
    ],
    image: '/images/products/bag/ryukyu-clutch.png', // Temporary fallback
    images: [
      '/images/products/bag/ryukyu-clutch.png',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000'
    ],
    gridClass: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 6, // New Item
    name: 'Okinawa Charm Sachet',
    price: 1500,
    priceStr: '¥1,500',
    category: 'Accessory',
    tagline: '想いを包む、小さなお守り',
    description: '紅型や絣の端切れを大切に集めて作った、手のひらサイズの巾着袋（サシェ）。中にお清めの塩やポプリを入れてお守りにしたり、バッグチャームとして彩りを添えたり。ひとつひとつ異なる表情をお楽しみください。',
    details: [
      '素材: 綿（紅型/絣プリント）、江戸打紐',
      'サイズ: 約5cm x 7cm',
      '用途: お守り袋、アクセサリー入れ、バッグチャーム'
    ],
    care: '水濡れにより色落ちする場合があります。',
    reviews: [
      { user: 'H. Taira', rating: 5, text: 'カバンにつけるとアクセントになって可愛いです。' }
    ],
    image: '/images/products/accessory/sachet-bowl.png',
    images: [
      '/images/products/accessory/sachet-bowl.png',
      '/images/products/accessory/sachet-bag.png'
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
];
