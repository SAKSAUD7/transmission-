export default function WarrantyBadge() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center animate-in zoom-in duration-700">
      {/* Outer jagged seal */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 shadow-2xl drop-shadow-xl"
        style={{
          clipPath: 'polygon(50% 0%, 61% 5%, 72% 0%, 80% 9%, 91% 6%, 95% 17%, 100% 25%, 96% 35%, 100% 46%, 93% 55%, 97% 65%, 88% 72%, 91% 83%, 80% 88%, 78% 98%, 66% 94%, 60% 100%, 50% 95%, 40% 100%, 34% 94%, 22% 98%, 20% 88%, 9% 83%, 12% 72%, 3% 65%, 7% 55%, 0% 46%, 4% 35%, 0% 25%, 5% 17%, 9% 6%, 20% 9%, 28% 0%, 39% 5%)',
          transform: 'rotate(5deg)'
        }}
      />
      
      {/* Inner circles */}
      <div className="absolute inset-2 bg-gradient-to-bl from-yellow-200 via-yellow-400 to-yellow-600 rounded-full border-4 border-yellow-600/30" />
      <div className="absolute inset-4 bg-gradient-to-tr from-white via-gray-50 to-yellow-50 rounded-full border-2 border-yellow-500/50 shadow-inner flex flex-col items-center justify-center" />
      
      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
        <span className="text-yellow-600 font-black tracking-widest text-xs uppercase mb-1 drop-shadow-sm">
          Guarantee
        </span>
        <div className="flex items-baseline">
          <span className="text-6xl font-black text-gray-900 tracking-tighter drop-shadow-md">
            30
          </span>
        </div>
        <span className="text-gray-800 font-bold text-lg uppercase tracking-wide border-t-2 border-yellow-500/30 pt-1 mt-1 w-3/4">
          Days
        </span>
        <span className="text-yellow-700 font-bold text-[0.6rem] uppercase tracking-wider mt-2">
          Replacement or Refund
        </span>
      </div>
      
      {/* Decorative ribbons */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 flex justify-between z-0">
        <div className="w-12 h-20 bg-gradient-to-b from-yellow-600 to-yellow-800 transform rotate-12 origin-top-right shadow-lg"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }} />
        <div className="w-12 h-20 bg-gradient-to-b from-yellow-600 to-yellow-800 transform -rotate-12 origin-top-left shadow-lg"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }} />
      </div>
    </div>
  );
}
