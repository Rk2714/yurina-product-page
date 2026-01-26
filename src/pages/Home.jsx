import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct * 20); // Rotate Y
    y.set(yPct * -20); // Rotate X
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: mouseX,
        rotateX: mouseY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <>
      {/* Kinetic Hero Section */}
      <header className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-leather-dark">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-60 mix-blend-overlay"
        >
          <img 
            src="https://images.unsplash.com/photo-1517146783983-418c681b56c5?auto=format&fit=crop&q=80&w=1920" 
            alt="Workshop" 
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[9vw] font-serif leading-[0.85] font-bold tracking-tighter mix-blend-difference"
          >
            Oh!! Mine<br />
            <span className="italic font-normal font-serif text-leather-light text-[6vw]">Original Handmade</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex flex-col items-center"
          >
            <p className="max-w-md text-lg text-gray-200 font-light leading-relaxed tracking-wide font-serif italic">
              "Traditional × Denim"<br/>
              沖縄の伝統を、日常のポケットに。<br/>
              あなただけの「宝物」を見つけてください。
            </p>
            <Link 
              to="/collection"
              className="mt-12 group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold cursor-pointer hover:bg-leather hover:text-white transition-colors duration-500 shadow-2xl shadow-white/20"
            >
              <span className="uppercase tracking-widest text-xs">Enter Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Bento Grid Product Section */}
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="flex justify-between items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-leather font-bold tracking-[0.3em] uppercase text-xs block mb-4">New Arrivals</span>
            <h2 className="text-6xl font-serif font-bold text-leather-dark">The Catalog</h2>
          </motion.div>
          <Link to="/collection" className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 border-b border-gray-300 pb-2 hover:border-leather hover:text-leather transition-colors duration-300">
            View All Items <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-[350px]">
          {products.map((product, idx) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`} 
              className={`${product.gridClass} block h-full`}
            >
              <TiltCard
                className={`group relative overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-gray-200/50 cursor-pointer h-full min-h-[300px] border border-gray-100`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.25,0.46,0.45,0.94] group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000"; // Fallback image
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-white/80 font-mono text-sm mb-2">{product.priceStr}</p>
                    <h3 className="text-3xl text-white font-serif italic mb-6 leading-none">{product.name}</h3>
                    <div className="flex items-center gap-2 text-white text-xs tracking-widest uppercase border-t border-white/30 pt-4">
                      <span>View Detail</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="story" className="bg-white py-40 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 3, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "backOut" }}
              className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
                alt="Crafting" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-leather-dark/10 mix-blend-multiply" />
            </motion.div>
            
            <div>
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-leather font-bold tracking-[0.3em] uppercase text-xs block mb-8 pl-1"
              >
                Our Philosophy
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-7xl font-serif font-bold text-leather-dark leading-[0.9] mb-12"
              >
                Okinawa<br />Spirit.
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="prose prose-lg text-gray-500 font-light leading-relaxed mb-12"
              >
                <p>
                  「Oh!! Mine（オーマイン）」は、沖縄の言葉で「私のもの」という意味を込めた造語です。
                </p>
                <p>
                  丈夫で色落ちを楽しめるデニム生地に、紅型（びんがた）やミンサー織りといった
                  沖縄の伝統的な彩りをプラスしました。
                </p>
                <p>
                  一つひとつ、手作りで。
                  使うほどに味わいが増す、あなただけの相棒をお届けします。
                </p>
              </motion.div>
              
              <div className="flex gap-12 items-center border-t border-gray-200 pt-8">
                <div>
                   <span className="block text-3xl font-serif text-leather-dark">2,000+</span>
                   <span className="text-xs text-gray-400 uppercase tracking-wider">Collectors</span>
                </div>
                <div>
                   <span className="block text-3xl font-serif text-leather-dark">100%</span>
                   <span className="text-xs text-gray-400 uppercase tracking-wider">Handmade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
