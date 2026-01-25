export const products = [
  {
    id: 101, // New Item ID
    name: 'Ryukyu Denim Clutch',
    price: 12800,
    priceStr: '¥12,800',
    tagline: '伝統を纏う、琉球の碧(あお)',
    description: '沖縄の伝統工芸「ミンサー織り」の意匠をアクセントに、上質な岡山デニムで仕立てたクラッチバッグ。「いつ（五）の世（四）までも末長く幸せに」という願いが込められた絣柄が、あなたの日々に寄り添います。内側には撥水加工を施し、実用性も兼ね備えました。',
    details: [
      '素材: 国産デニム (14oz) / 牛革',
      '装飾: ミンサー織りテープ',
      '機能: 内ポケット×2 / レザーストラップ付',
      'サイズ: 25cm x 18cm'
    ],
    care: 'デニム特有の色落ちを楽しむため、洗濯機ではなく手洗いを推奨します。革部分は水濡れに注意し、定期的にクリームで保湿してください。',
    reviews: [
      { user: 'E. Higa', rating: 5, text: 'ミンサー柄が可愛くて一目惚れしました。普段使いにちょうどいいサイズです。' },
      { user: 'S. Kinjo', rating: 5, text: 'プレゼント用に購入。意味のある柄なので喜ばれました。' }
    ],
    // Local Image in public/images
    image: '/images/ryukyu-clutch.jpg', 
    gridClass: 'md:col-span-2 md:row-span-2', // Make it big feature
  },
  {
    id: 1,
    name: 'The Heirloom Bifold',
    price: 18000,
    priceStr: '¥18,000',
    tagline: '継承されるべき、王道の二つ折り',
    description: 'イタリア・トスカーナ地方の伝統的なバケッタレザーを使用。手にするたびに少しずつ馴染み、あなただけの色艶へと育っていきます。無駄を削ぎ落としたミニマルな設計ながら、必要な機能を十分に備えた、まさに一生モノの相棒です。',
    details: [
      '素材: イタリア製ベジタブルタンニンレザー',
      '収納: カード8-10枚 + 紙幣',
      '縫製: 蝋引き麻糸によるハンドステッチ',
      'サイズ: 11cm x 9cm'
    ],
    care: '週に一度、乾いた柔らかい布で優しく乾拭きしてください。革の乾燥が気になり始めたら、専用のクリームを薄く塗布することをお勧めします。水濡れにはご注意ください。',
    reviews: [
      { user: 'K. Tanaka', rating: 5, text: '革の香りが素晴らしい。エイジングが楽しみです。' },
      { user: 'M. Sato', rating: 4, text: 'シンプルで使いやすい。少し硬めですが、馴染むのを待ちます。' }
    ],
    // Image: Leather Wallet on wood
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 2,
    name: 'Minimal Card Case',
    price: 9500,
    priceStr: '¥9,500',
    tagline: '身軽に生きるための、最小限の美学',
    description: '「持たない暮らし」を志向する現代のミニマリストへ。ジャケットの胸ポケットに入れてもシルエットを崩さない、極薄設計。キャッシュレス時代の最適解です。',
    details: [
      '素材: トップグレインレザー',
      '収納: カードスロット3つ + 中央ポケット',
      '厚み: わずか0.5cmの極薄プロファイル',
      'カラー: コニャック / オニキス'
    ],
    care: '汚れがついた場合は、固く絞った濡れタオルで優しく拭き取ってください。過度なオイルケアは革のコシを弱める可能性があるため、半年に一度程度で十分です。',
    reviews: [
      { user: 'Y. Suzuki', rating: 5, text: 'スーツのラインが崩れないので重宝しています。' }
    ],
    // Image: Slim card holder
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    name: 'The Traveler Clerk',
    price: 32000,
    priceStr: '¥32,000',
    tagline: '国境を越える、旅人の記録係',
    description: 'パスポート、航空券、そして複数の通貨。旅に必要なすべてをスマートに収納。空港のラウンジでもホテルのチェックインでも、洗練された所作を演出します。',
    details: [
      '素材: プレミアムホーウィンレザー',
      '機能: パスポートスリーブ & ボーディングパスホルダー',
      'セキュリティ: RFID保護ライニング採用',
      '付属品: トラベルペンループ'
    ],
    care: '旅行中の予期せぬ雨や汚れに備え、使用前に防水スプレーを軽く吹きかけることを推奨します。',
    reviews: [
      { user: 'T. Yamamoto', rating: 5, text: '海外出張の必需品になりました。質感が最高です。' },
      { user: 'A. John', rating: 5, text: 'Perfect companion for my trips.' }
    ],
    // Image: Travel wallet / passport holder
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gridClass: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 4,
    name: 'Studio Strap',
    price: 6800,
    priceStr: '¥6,800',
    tagline: '機能美を追求した、日常のアクセント',
    description: '単なるキーホルダーではありません。真鍮製の金具と厚みのあるレザーのコントラストが、あなたの日常に重厚感を与えます。ベルトループやバッグのアクセントに。',
    details: [
      '金具: ソリッドブラス（真鍮）シャックル',
      '構造: 二重構造レザーストラップ',
      '装飾: 職人によるロゴ刻印',
      '全長: 15cm'
    ],
    care: '真鍮部分は経年変化で黒ずむことがありますが、それが味わいとなります。輝きを取り戻したい場合は、真鍮磨きクロスをご使用ください。',
    reviews: [],
    // Image: Leather keychain
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 5,
    name: 'Executive Folio',
    price: 45000,
    priceStr: '¥45,000',
    tagline: '決断の場にふさわしい、威厳ある佇まい',
    description: 'iPad Proや重要なドキュメントを保護するフォリオケース。会議室に入った瞬間、あなたのプロフェッショナルな姿勢を周囲に印象づけます。',
    details: [
      '対応: iPad Pro 12.9インチまで収納可能',
      '機能: Apple Pencil専用スロット',
      '収納: ドキュメントスリーブ',
      '開閉: マグネット式クロージャー'
    ],
    care: '面積が広いため、傷がつかないよう保管時は付属の布袋に入れてください。ブラッシングをこまめに行うことで、美しい艶が長持ちします。',
    reviews: [
      { user: 'K. Ito', rating: 4, text: 'MacBook Airもギリギリ入りました。質感が良いです。' },
      { user: 'S. Watanabe', rating: 5, text: '会議での評判がとても良いです。' }
    ],
    // Image: Leather folio / bag
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gridClass: 'md:col-span-2 md:row-span-1',
  },
];
