import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ArrowUpAZ, ArrowDownAZ } from 'lucide-react';
import { products } from '../data/products';

export default function Collection() {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('newest'); // newest | price-asc | price-desc

  // カテゴリ定義
  const categories = ['All', 'Bag', 'Wallet', 'Case', 'Accessory'];

  // フィルタリングとソートのロジック
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (filter !== 'All') {
      result = result.filter(p => p.category === filter);
    }

    // Sort
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest (ID descending for now)
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [filter, sort]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-leather-dark mb-4">Collection</h1>
        <p className="text-gray-500 font-light">
          沖縄の風と、デニムの温もり。<br/>
          あなただけの一点をお選びください。
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 sticky top-20 z-30 bg-gray-50/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-gray-100">
        
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                filter === cat 
                  ? 'bg-leather text-white shadow-md' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative group w-full md:w-auto">
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-48 appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:border-leather cursor-pointer text-sm font-medium"
          >
            <option value="newest">新着順</option>
            <option value="price-asc">価格が安い順</option>
            <option value="price-desc">価格が高い順</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/product/${product.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="aspect-square overflow-hidden relative bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000"; 
                    }}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                     <span className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-leather-dark uppercase tracking-wider">
                       {product.category}
                     </span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-gray-900 text-sm md:text-base mb-1 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-500 line-clamp-1 mb-2">
                      {product.tagline}
                    </p>
                  </div>
                  <div className="flex justify-between items-end border-t border-gray-50 pt-3 mt-2">
                    <span className="text-leather font-bold text-sm md:text-lg">{product.priceStr}</span>
                    <span className="text-[10px] text-gray-400">詳細を見る</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p>該当する商品が見つかりませんでした。</p>
          <button onClick={() => setFilter('All')} className="mt-4 text-leather underline">すべての商品を表示</button>
        </div>
      )}

    </div>
  );
}
