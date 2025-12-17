import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

const EcommerceMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showAddedNotif, setShowAddedNotif] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const products = [
    { name: "Producto A", price: "$49.99", color: "from-purple-400 to-pink-400", stock: 12 },
    { name: "Producto B", price: "$79.99", color: "from-cyan-400 to-blue-400", stock: 8 },
    { name: "Producto C", price: "$34.99", color: "from-green-400 to-emerald-400", stock: 23 },
    { name: "Producto D", price: "$99.99", color: "from-orange-400 to-red-400", stock: 5 },
  ];

  // Simulate adding to cart
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct(prev => (prev + 1) % products.length);
      setCartCount(prev => prev + 1);
      setShowAddedNotif(true);
      setTimeout(() => setShowAddedNotif(false), 1500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[400px] perspective-1000"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden bg-white"
        style={{
          boxShadow: isHovered 
            ? "0 25px 80px rgba(16, 185, 129, 0.3)" 
            : "0 15px 40px rgba(0, 0, 0, 0.1)",
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/20 rounded-lg" />
            <span className="font-semibold text-sm">Mi Tienda</span>
          </div>
          <motion.div 
            className="relative"
            animate={{ scale: showAddedNotif ? [1, 1.3, 1] : 1 }}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* Categories */}
        <div className="px-3 py-2 flex gap-2 border-b border-gray-100">
          {["Todos", "Popular", "Nuevo", "Ofertas"].map((cat, i) => (
            <motion.div
              key={cat}
              className={`px-3 py-1 rounded-full text-xs ${
                i === 0 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {cat}
            </motion.div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="p-3 grid grid-cols-2 gap-3">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              className="bg-gray-50 rounded-xl p-3 border border-gray-100 relative overflow-hidden"
              animate={{
                borderColor: activeProduct === i ? "#10B981" : "#F3F4F6",
                boxShadow: activeProduct === i ? "0 0 20px rgba(16, 185, 129, 0.2)" : "none",
              }}
              whileHover={{ y: -2 }}
            >
              {/* Product Image Placeholder */}
              <div className={`w-full h-16 rounded-lg bg-gradient-to-br ${product.color} mb-2 relative`}>
                {product.stock < 10 && (
                  <motion.span
                    className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ¡Últimos!
                  </motion.span>
                )}
              </div>
              <p className="text-gray-800 text-xs font-medium">{product.name}</p>
              <p className="text-emerald-600 text-sm font-bold">{product.price}</p>
              <motion.button
                className="mt-2 w-full bg-emerald-500 text-white text-xs py-1.5 rounded-lg"
                whileHover={{ backgroundColor: "#059669" }}
                whileTap={{ scale: 0.95 }}
              >
                Agregar
              </motion.button>
              
              {/* Add to cart animation overlay */}
              {activeProduct === i && showAddedNotif && (
                <motion.div
                  className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, y: -50, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl"
                  >
                    🛒
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        <motion.div 
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white to-transparent p-3"
          animate={{ y: cartCount > 0 ? 0 : 50 }}
        >
          <motion.div
            className="bg-emerald-500 text-white rounded-xl p-3 flex items-center justify-between"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <p className="text-xs opacity-80">Tu carrito</p>
              <p className="font-bold text-sm">{cartCount} productos</p>
            </div>
            <motion.button
              className="bg-white text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Checkout →
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Added to cart notification */}
        {showAddedNotif && (
          <motion.div
            className="absolute top-16 right-3 bg-emerald-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            ✓ Agregado al carrito
          </motion.div>
        )}
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default EcommerceMockup;
