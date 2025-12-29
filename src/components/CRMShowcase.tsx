import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Bell,
  FileText,
  Target,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CRMMockup from '@/components/services/CRMMockup';
import { useIsMobile } from '@/hooks/use-mobile';

const features = [
  {
    id: 'leads',
    icon: Users,
    title: 'Gestión de Leads',
    description: 'Visualizá todos tus leads en un solo lugar. Filtros avanzados, estados personalizados y seguimiento automático.',
    highlights: [
      'Pipeline visual drag & drop',
      'Scoring automático de leads',
      'Historial completo de interacciones',
      'Asignación automática por reglas'
    ]
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics en Tiempo Real',
    description: 'Métricas de rendimiento actualizadas al instante. Sabé exactamente cuánto te cuesta cada lead y cada venta.',
    highlights: [
      'Costo por lead y por conversión',
      'ROI de cada campaña',
      'Comparativas semanales/mensuales',
      'Exportación de reportes'
    ]
  },
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Centro de Comunicación',
    description: 'WhatsApp, email y llamadas integradas. Respondé desde el CRM sin cambiar de ventana.',
    highlights: [
      'WhatsApp Business integrado',
      'Templates de mensajes',
      'Respuestas automáticas',
      'Historial unificado'
    ]
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Agenda Inteligente',
    description: 'Coordiná citas, reuniones y seguimientos. Recordatorios automáticos para vos y tus clientes.',
    highlights: [
      'Sincronización con Google Calendar',
      'Recordatorios automáticos por WhatsApp',
      'Disponibilidad online para clientes',
      'Vista de equipo completa'
    ]
  }
];

const stats = [
  { value: '3x', label: 'Más organización', icon: Target },
  { value: '50%', label: 'Menos tiempo en admin', icon: Zap },
  { value: '100%', label: 'Visibilidad de datos', icon: TrendingUp },
  { value: '24/7', label: 'Acceso desde cualquier lugar', icon: Bell }
];

const CRMShowcase = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [5, -5]);
  const rotateY = useTransform(x, [-150, 150], [-5, 5]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  // Disable 3D hover effect on mobile
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
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

  // Mobile: instant fade only
  const fadeIn = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.15 }, viewport: { once: true } }
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  const slideLeft = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.15 }, viewport: { once: true } }
    : { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  const slideRight = isMobile
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.15 }, viewport: { once: true } }
    : { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.2 } };

  return (
    <section className="py-24 md:py-32 bg-gray-950 relative overflow-hidden">
      {/* Background Effects - static on mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          {...fadeIn}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold tracking-wider mb-6">
            INCLUIDO CON TU CAMPAÑA
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            No solo hacemos campañas
          </h2>
          
          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 max-w-4xl mx-auto">
            Te damos el sistema para medir, ordenar y escalar tu negocio con datos reales.
          </p>
          
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Cuando trabajás con nosotros, no solo recibís una campaña de ads. Accedés a un CRM personalizado 
            y un panel de control completo para ver exactamente qué está pasando con tu negocio.
          </p>
        </motion.div>

        {/* Stats Row - Static values on mobile, no counter animation */}
        <motion.div
          {...fadeIn}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content - Video + Features */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Video/Demo Section - No 3D effect on mobile */}
          {isMobile ? (
            <div className="relative w-full max-w-full mx-auto overflow-hidden">
              {/* Floating Badge */}
              <div className="absolute -top-4 right-0 z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                Tu panel
              </div>

              {/* Mobile frame - CONSTRAINED */}
              <div className="relative w-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                {/* Browser Header - simplified */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-800 rounded px-2 py-1 text-gray-400 text-xs truncate">
                      crm.innova.com
                    </div>
                  </div>
                </div>

                {/* Static CRM Mockup container - constrained */}
                <div className="relative w-full aspect-[4/3] bg-gray-950 overflow-hidden">
                  <CRMMockup />
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              ref={containerRef}
              {...slideLeft}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
              className="relative"
            >
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/30"
              >
                Tu panel de control
              </motion.div>

              {/* Browser Window Frame */}
              <div className={`relative bg-gray-900 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${isHovered ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/20' : 'border-gray-800 shadow-xl'}`}>
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-800 rounded-lg px-4 py-1.5 text-gray-400 text-sm flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span>crm.innovasolutions.com</span>
                    </div>
                  </div>
                </div>

                {/* CRM Mockup Container */}
                <div className="relative aspect-[4/3] bg-gray-950">
                  <CRMMockup />
                </div>
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-cyan-500/20 blur-2xl rounded-full" />
            </motion.div>
          )}

          {/* Features Section */}
          <motion.div {...slideRight}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-gray-900/50 border border-gray-800 rounded-xl p-1 mb-6">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <feature.icon className="w-5 h-5" />
                  </TabsTrigger>
                ))}
              </TabsList>

              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id} className="mt-0">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-cyan-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    </div>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="space-y-3">
                      {feature.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* CTA */}
            <motion.div
              {...fadeIn}
              className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    Sin costo adicional
                  </h4>
                  <p className="text-gray-400 text-sm">
                    El acceso al CRM está incluido en todos nuestros planes de campañas publicitarias. 
                    No pagás extra por tener el control total de tus datos.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CRMShowcase;
