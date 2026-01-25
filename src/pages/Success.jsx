import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Mail, Truck, Calendar } from 'lucide-react';

export default function Success() {
  // Generate a random order ID and date
  const orderId = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Calculate delivery date (2 weeks from now)
  const today = new Date();
  const deliveryDate = new Date(today.setDate(today.getDate() + 14));
  const deliveryDateStr = deliveryDate.toLocaleDateString('ja-JP', { 
    month: 'long', 
    day: 'numeric',
    weekday: 'short' 
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fcfbf9]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full bg-white rounded-none p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-leather-dark" />

        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-16 border-2 border-leather-dark rounded-full flex items-center justify-center mx-auto mb-6 text-leather-dark"
          >
            <Check size={24} strokeWidth={1.5} />
          </motion.div>
          
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 tracking-wide">Thank you.</h1>
          <p className="text-gray-500 font-light text-sm tracking-widest uppercase">Your order is confirmed</p>
        </div>

        <div className="space-y-8 border-t border-b border-gray-100 py-8 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Order Number</p>
              <p className="font-mono text-lg text-gray-900">{orderId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Date</p>
              <p className="font-mono text-lg text-gray-900">
                {new Date().toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
             <div className="flex items-start gap-4">
                <Mail className="text-leather-dark mt-1" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">確認メールを送信しました</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    ご登録のメールアドレスに領収書と注文詳細をお送りしました。
                    もし届かない場合は、迷惑メールフォルダをご確認ください。
                  </p>
                </div>
             </div>
             
             <div className="flex items-start gap-4">
                <Truck className="text-leather-dark mt-1" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">発送予定日</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    職人が一点ずつ製作するため、お届けまで約2週間お時間をいただいております。<br/>
                    <span className="font-bold text-leather-dark mt-1 block">目安: {deliveryDateStr}</span>
                  </p>
                </div>
             </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-leather-dark hover:text-black transition-colors border-b border-leather-dark pb-1"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to Home
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
