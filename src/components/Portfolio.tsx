import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Sparkles, Zap, Globe } from 'lucide-react';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

type Category = 'campaigns' | 'websites';
type SubCategory = 'meta-ads' | 'google-ads' | 'landing' | 'ecommerce' | 'sistemas' | null;

interface Project {
  id: number;
  name: string;
  category: Category;
  subCategory: SubCategory;
  result: string;
  resultNumber: number;
  resultSuffix: string;
  description: string;
  gradient: string;
  tags: string[];
  videoUrl?: string;
  imageUrl?: string;
  websiteUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Anuel AA - Tecnópolis',
    category: 'campaigns',
    subCategory: 'meta-ads',
    result: 'SOLD OUT',
    resultNumber: 30,
    resultSuffix: 'K personas',
    description: 'Campaña de Meta Ads para el show de Anuel AA en Tecnópolis. Sold out con más de 30,000 asistentes.',
    gradient: 'from-purple-600 to-pink-500',
    tags: ['Meta Ads', 'Eventos', 'Música'],
    videoUrl: '/videos/anuel-tecnopolis.mp4',
  },
  {
    id: 2,
    name: 'Usabaires',
    category: 'campaigns',
    subCategory: 'meta-ads',
    result: 'Crecimiento Exponencial',
    resultNumber: 100,
    resultSuffix: '% Growth',
    description: 'Estrategia de contenido y podcast que impulsó el crecimiento de la marca.',
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Meta Ads', 'Podcast'],
    videoUrl: '/videos/usabaires-podcast.mp4',
  },
  {
    id: 3,
    name: 'Tencery Bienes Raíces',
    category: 'websites',
    subCategory: 'sistemas',
    result: '100% Inteligente',
    resultNumber: 100,
    resultSuffix: '% Smart',
    description: 'Página web con gestión de propiedades, coordinación de visitas y análisis de conversiones.',
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Sistema Web', 'Real Estate'],
    imageUrl: '/images/tencery-bienes-raices.png',
    websiteUrl: 'https://tencerybienesraices.com.ar/',
  },
  {
    id: 4,
    name: 'FinanceApp',
    category: 'campaigns',
    subCategory: 'google-ads',
    result: '15K leads',
    resultNumber: 15,
    resultSuffix: 'K leads',
    description: 'App financiera con campañas de Google Ads',
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Google Ads', 'Fintech'],
  },
  {
    id: 5,
    name: 'Marlon Hoffstadt',
    category: 'websites',
    subCategory: 'landing',
    result: '+5K personas',
    resultNumber: 5,
    resultSuffix: 'K asistentes',
    description: 'Landing page para la pre-venta de un evento en Chile con más de 5,000 personas.',
    gradient: 'from-purple-500 to-pink-600',
    tags: ['Landing', 'Eventos'],
    imageUrl: '/images/marlon-hoffstadt.png',
    websiteUrl: 'https://marlonlatam.com/',
  },
  {
    id: 6,
    name: 'Relajate Che',
    category: 'campaigns',
    subCategory: 'meta-ads',
    result: '$0 a $35M/mes',
    resultNumber: 35,
    resultSuffix: 'M/mes',
    description: 'De $0 a $35 millones por mes en menos de 3 meses con Meta Ads.',
    gradient: 'from-blue-600 to-indigo-700',
    tags: ['Meta Ads', 'E-commerce'],
    imageUrl: '/images/relajate-che.jpg',
  },
  {
    id: 7,
    name: 'LogiTrack',
    category: 'websites',
    subCategory: 'sistemas',
    result: '-60% tiempo',
    resultNumber: 60,
    resultSuffix: '% faster',
    description: 'Sistema web que automatizó procesos operativos',
    gradient: 'from-violet-500 to-purple-600',
    tags: ['Sistema', 'Logística'],
  },
];

const subFilters: Record<Category, { id: SubCategory; label: string }[]> = {
  campaigns: [
    { id: 'meta-ads', label: 'Meta Ads' },
    { id: 'google-ads', label: 'Google Ads' },
  ],
  websites: [
    { id: 'landing', label: 'Landing Pages' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'sistemas', label: 'Sistemas Web' },
  ],
};

// Animated Counter Component
const AnimatedMetric = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        setShowSparkle(true);
        clearInterval(timer);
        setTimeout(() => setShowSparkle(false), 1000);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="relative">
      <span className="tabular-nums">+{count}</span>
      {suffix}
      <AnimatePresence>
        {showSparkle && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1, 
                  x: (i - 1) * 20,
                  y: -20 - i * 10
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="absolute -top-1 left-1/2 text-[#06B6D4]"
              >
                ✦
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>
    </span>
  );
};

// Toggle Switch Component
const CategoryToggle = ({ 
  active, 
  onChange 
}: { 
  active: Category; 
  onChange: (cat: Category) => void;
}) => {
  return (
    <div className="relative flex items-center justify-center mb-8">
      <motion.div 
        className="relative flex items-center bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 border border-gray-800"
        whileHover={{ scale: 1.02 }}
      >
        {/* Sliding Background */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
          initial={false}
          animate={{
            left: active === 'campaigns' ? '6px' : '50%',
            right: active === 'campaigns' ? '50%' : '6px',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-full bg-[#06B6D4]/30 blur-xl"
          initial={false}
          animate={{
            left: active === 'campaigns' ? '6px' : '50%',
            right: active === 'campaigns' ? '50%' : '6px',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Campañas Button */}
        <motion.button
          onClick={() => onChange('campaigns')}
          className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300 ${
            active === 'campaigns' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-4 h-4" />
          Campañas
        </motion.button>

        {/* Sitios Web Button */}
        <motion.button
          onClick={() => onChange('websites')}
          className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-300 ${
            active === 'websites' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-4 h-4" />
          Sitios Web
        </motion.button>

        {/* Traveling Particles */}
        <AnimatePresence>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`particle-${active}-${i}`}
              initial={{ 
                x: active === 'campaigns' ? 100 : -100,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                x: active === 'campaigns' ? -100 : 100,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.05,
                ease: 'easeInOut'
              }}
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-[#06B6D4]"
              style={{ marginTop: (i - 2) * 4 }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Floating Chip Component
const FloatingChip = ({ 
  label, 
  isActive, 
  onClick,
  index
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
  index: number;
}) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      {/* Floating animation */}
      <motion.div
        animate={{ 
          y: [0, -3, 0],
        }}
        transition={{ 
          duration: 2 + index * 0.5, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 border ${
          isActive
            ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : 'bg-gray-800/50 text-gray-500 border-gray-700/50 grayscale-[50%] hover:grayscale-0 hover:text-gray-300'
        }`}
      >
        {label}
        
        {/* Pop effect on active */}
        {isActive && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-full border-2 border-[#06B6D4]"
          />
        )}
      </motion.div>
    </motion.button>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('campaigns');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [filterClickCount, setFilterClickCount] = useState(0);
  const [showSlowDown, setShowSlowDown] = useState(false);
  const lastFilterTime = useRef(Date.now());
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeSubCategory) return project.subCategory === activeSubCategory;
      return project.category === activeCategory;
    });
  }, [activeCategory, activeSubCategory]);

  const handleCategoryChange = useCallback((category: Category) => {
    const now = Date.now();
    if (now - lastFilterTime.current < 300) {
      setFilterClickCount(prev => prev + 1);
      if (filterClickCount > 4) {
        setShowSlowDown(true);
        setTimeout(() => setShowSlowDown(false), 2000);
        setFilterClickCount(0);
      }
    } else {
      setFilterClickCount(0);
    }
    lastFilterTime.current = now;
    
    setActiveCategory(category);
    setActiveSubCategory(null);
  }, [filterClickCount]);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          document.body.style.filter = 'hue-rotate(180deg)';
          setTimeout(() => {
            document.body.style.filter = '';
          }, 3000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Shake to shuffle on mobile
  useEffect(() => {
    let lastShake = 0;
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const total = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
      if (total > 45 && Date.now() - lastShake > 1000) {
        lastShake = Date.now();
        // Trigger re-render to shuffle animation
        setActiveSubCategory(prev => prev);
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="py-24 md:py-32 relative overflow-hidden transition-colors duration-700"
      style={{
        background: activeCategory === 'campaigns' 
          ? 'linear-gradient(to bottom, #0A0A0A, #0A0F14)' 
          : 'linear-gradient(to bottom, #0A0A0A, #0A0A14)'
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: activeCategory === 'campaigns'
              ? 'radial-gradient(ellipse at top, rgba(6,182,212,0.08), transparent 60%)'
              : 'radial-gradient(ellipse at top, rgba(139,92,246,0.08), transparent 60%)'
          }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[#06B6D4] text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Casos de{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#06B6D4] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] bg-clip-text text-transparent">
                éxito
              </span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Resultados reales de clientes que confiaron en nosotros.
          </motion.p>
        </div>

        {/* Toggle Switch */}
        <CategoryToggle active={activeCategory} onChange={handleCategoryChange} />

        {/* Sub Filters - Floating Chips */}
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <FloatingChip
            label="Todos"
            isActive={activeSubCategory === null}
            onClick={() => setActiveSubCategory(null)}
            index={0}
          />
          {subFilters[activeCategory].map((sub, index) => (
            <FloatingChip
              key={sub.id}
              label={sub.label}
              isActive={activeSubCategory === sub.id}
              onClick={() => setActiveSubCategory(sub.id)}
              index={index + 1}
            />
          ))}
        </motion.div>

        {/* Slow Down Easter Egg */}
        <AnimatePresence>
          {showSlowDown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-900/95 backdrop-blur-sm border border-[#06B6D4]/50 rounded-2xl px-8 py-4 shadow-2xl"
            >
              <p className="text-white text-lg font-medium">¡Tranquilo! 😄</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isHovered={hoveredId === project.id}
                onHover={() => setHoveredId(project.id)}
                onLeave={() => setHoveredId(null)}
                isLarge={index === 0 && filteredProjects.length > 2}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

// Separate Card Component for better performance
const ProjectCard = ({ 
  project, 
  index, 
  isHovered,
  onHover,
  onLeave,
  isLarge
}: { 
  project: Project; 
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isLarge: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -80, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
        isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      style={{ perspective: '1000px' }}
    >
      {/* Video Background */}
      {project.videoUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      )}

      {/* Image Background */}
      {project.imageUrl && !project.videoUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      )}

      {/* Background Gradient with Parallax (only if no video or image) */}
      {!project.videoUrl && !project.imageUrl && (
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
          initial={{ opacity: 0.15, scale: 1 }}
          whileHover={{ opacity: 0.25, scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      )}
      
      {/* Glass Card */}
      <motion.div 
        className={`relative backdrop-blur-sm bg-gray-900/60 border border-gray-800/50 p-6 md:p-8 h-full ${
          isLarge ? 'min-h-[400px]' : 'min-h-[220px]'
        } flex flex-col justify-end rounded-2xl`}
        whileHover={{ 
          borderColor: 'rgba(6, 182, 212, 0.4)',
          boxShadow: '0 0 40px rgba(6, 182, 212, 0.15)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Tags */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-3 py-1 rounded-full bg-gray-800/80 text-xs font-medium text-gray-300 border border-gray-700/50"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Result Badge with Counter */}
        <motion.div
          initial={false}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] shadow-lg"
        >
          <span className="text-sm font-bold text-white">
            <AnimatedMetric 
              value={project.resultNumber} 
              suffix={project.resultSuffix}
              isInView={isInView}
            />
          </span>
        </motion.div>

        {/* Info */}
        <div className="mt-auto">
          <motion.h3 
            className="font-heading text-2xl font-bold mb-2 text-white"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.name}
          </motion.h3>
          <p className="text-gray-400 text-sm mb-4">
            {project.description}
          </p>
          
          {/* CTA */}
          <motion.div
            animate={{
              x: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-[#06B6D4] font-medium"
          >
            {project.websiteUrl ? (
              <a 
                href={project.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Ver página</span>
                <motion.div
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </a>
            ) : (
              <>
                <span>Ver caso completo</span>
                <motion.div
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;
