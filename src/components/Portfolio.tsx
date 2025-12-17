import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter, Sparkles } from 'lucide-react';
import { useState, useMemo } from 'react';

type Category = 'all' | 'campaigns' | 'websites';
type SubCategory = 'meta-ads' | 'google-ads' | 'landing' | 'ecommerce' | 'sistemas' | null;

interface Project {
  id: number;
  name: string;
  category: Category;
  subCategory: SubCategory;
  result: string;
  description: string;
  gradient: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: 'TechStart',
    category: 'campaigns',
    subCategory: 'meta-ads',
    result: '+340% ROAS',
    description: 'Startup tecnológica que triplicó sus ventas en 3 meses con Meta Ads',
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Meta Ads', 'SaaS', 'B2B'],
  },
  {
    id: 2,
    name: 'FashionHub',
    category: 'websites',
    subCategory: 'ecommerce',
    result: '+$500K ventas',
    description: 'Tienda de moda que escaló a 6 cifras mensuales con e-commerce optimizado',
    gradient: 'from-pink-500 to-rose-600',
    tags: ['E-commerce', 'Moda', 'Shopify'],
  },
  {
    id: 3,
    name: 'FinanceApp',
    category: 'campaigns',
    subCategory: 'google-ads',
    result: '15K leads',
    description: 'App financiera con campañas de Google Ads para generación de leads',
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Google Ads', 'Fintech', 'Leads'],
  },
  {
    id: 4,
    name: 'HealthPlus',
    category: 'websites',
    subCategory: 'landing',
    result: '+250% conversiones',
    description: 'Landing page para clínica que multiplicó sus citas agendadas',
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Landing Page', 'Salud', 'Conversiones'],
  },
  {
    id: 5,
    name: 'EduLearn',
    category: 'campaigns',
    subCategory: 'meta-ads',
    result: '10K estudiantes',
    description: 'Plataforma educativa con expansión internacional vía Meta Ads',
    gradient: 'from-amber-500 to-orange-600',
    tags: ['Meta Ads', 'Educación', 'Internacional'],
  },
  {
    id: 6,
    name: 'LogiTrack',
    category: 'websites',
    subCategory: 'sistemas',
    result: '-60% tiempo gestión',
    description: 'Sistema web de logística que automatizó procesos operativos',
    gradient: 'from-violet-500 to-purple-600',
    tags: ['Sistema Web', 'Logística', 'Automatización'],
  },
  {
    id: 7,
    name: 'FoodDelivery',
    category: 'campaigns',
    subCategory: 'google-ads',
    result: '+180% pedidos',
    description: 'App de delivery con campañas de búsqueda altamente optimizadas',
    gradient: 'from-red-500 to-orange-600',
    tags: ['Google Ads', 'Food', 'App'],
  },
  {
    id: 8,
    name: 'RealState Pro',
    category: 'websites',
    subCategory: 'landing',
    result: '45 propiedades/mes',
    description: 'Landing pages inmobiliarias con alta conversión de leads',
    gradient: 'from-slate-500 to-zinc-600',
    tags: ['Landing Page', 'Real Estate', 'Leads'],
  },
];

const mainFilters = [
  { id: 'all' as Category, label: 'Todos', icon: Sparkles },
  { id: 'campaigns' as Category, label: 'Campañas', icon: Filter },
  { id: 'websites' as Category, label: 'Sitios Web', icon: Filter },
];

const subFilters: Record<Category, { id: SubCategory; label: string }[]> = {
  all: [],
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

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory === 'all') return true;
      if (activeSubCategory) return project.subCategory === activeSubCategory;
      return project.category === activeCategory;
    });
  }, [activeCategory, activeSubCategory]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setActiveSubCategory(null);
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
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
              <motion.span
                className="absolute -inset-1 bg-[#06B6D4]/20 blur-xl rounded-lg -z-10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Resultados reales de clientes que confiaron en nosotros para escalar sus negocios.
          </motion.p>
        </div>

        {/* Filter System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          {/* Main Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {mainFilters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => handleCategoryChange(filter.id)}
                className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden group ${
                  activeCategory === filter.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  animate={{
                    background:
                      activeCategory === filter.id
                        ? 'linear-gradient(135deg, #06B6D4, #3B82F6)'
                        : 'rgba(55, 65, 81, 0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glow Effect */}
                {activeCategory === filter.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#06B6D4]/30 blur-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </span>

                {/* Hover Particles */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  whileHover={{
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Sub Filters */}
          <AnimatePresence mode="wait">
            {subFilters[activeCategory].length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-2 overflow-hidden"
              >
                <motion.button
                  onClick={() => setActiveSubCategory(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSubCategory === null
                      ? 'bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/50'
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Todos
                </motion.button>
                {subFilters[activeCategory].map((sub, index) => (
                  <motion.button
                    key={sub.id}
                    onClick={() => setActiveSubCategory(sub.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSubCategory === sub.id
                        ? 'bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/50'
                        : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sub.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <span className="text-gray-500 text-sm">
            Mostrando{' '}
            <motion.span
              key={filteredProjects.length}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#06B6D4] font-semibold"
            >
              {filteredProjects.length}
            </motion.span>{' '}
            {filteredProjects.length === 1 ? 'proyecto' : 'proyectos'}
          </span>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  index === 0 && filteredProjects.length > 2 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Background Gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                  initial={{ opacity: 0.15 }}
                  whileHover={{ opacity: 0.25 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glass Card */}
                <div className={`relative backdrop-blur-sm bg-gray-900/60 border border-gray-800/50 p-6 md:p-8 h-full ${
                  index === 0 && filteredProjects.length > 2 ? 'min-h-[400px]' : 'min-h-[220px]'
                } flex flex-col justify-end rounded-2xl transition-all duration-300 group-hover:border-[#06B6D4]/30`}>
                  
                  {/* Tags */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-gray-800/80 text-xs font-medium text-gray-300 border border-gray-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Result Badge */}
                  <motion.div
                    initial={false}
                    animate={{
                      scale: hoveredId === project.id ? 1.05 : 1,
                      boxShadow: hoveredId === project.id 
                        ? '0 0 30px rgba(6, 182, 212, 0.4)' 
                        : '0 0 0px rgba(6, 182, 212, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                  >
                    <span className="text-sm font-bold text-white">
                      {project.result}
                    </span>
                  </motion.div>

                  {/* Info */}
                  <div className="mt-auto">
                    <motion.h3 
                      className="font-heading text-2xl font-bold mb-2 text-white"
                      initial={false}
                      animate={{
                        x: hoveredId === project.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.name}
                    </motion.h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>
                    
                    {/* CTA */}
                    <motion.div
                      initial={false}
                      animate={{
                        x: hoveredId === project.id ? 0 : -10,
                        opacity: hoveredId === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-[#06B6D4] font-medium"
                    >
                      <span>Ver caso completo</span>
                      <motion.div
                        animate={{
                          x: hoveredId === project.id ? [0, 5, 0] : 0,
                        }}
                        transition={{ 
                          duration: 0.6, 
                          repeat: hoveredId === project.id ? Infinity : 0,
                          repeatDelay: 0.5
                        }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 text-lg">
                No hay proyectos en esta categoría todavía.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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

export default Portfolio;
