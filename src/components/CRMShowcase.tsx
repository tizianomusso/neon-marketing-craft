import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Bell,
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
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 overflow-x-hidden">
        {/* Header */}
        <motion.div
          {...fadeIn}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold tracking-wider mb-6">
            CRM CON IA
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Sistema de Gestión Inteligente
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Accede a nuestro CRM, medí y ordená tu negocio desde un mismo lugar. Prevení errores comunes como fallas en números de rentabilidad y aprovechá las oportunidades personalizadas recomendadas por la IA.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          {...fadeIn}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-muted/50 border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 group"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          {...fadeIn}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="https://innovasolutionsdashboard.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 h-13 rounded-full bg-primary text-primary-foreground font-medium text-base hover:bg-primary/90 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
          >
            Ver planes
          </a>
          <a
            href="https://innovasolutionsdashboard.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 h-13 rounded-full border border-border text-foreground font-medium text-base hover:border-primary/40 transition-all duration-300 inline-flex items-center justify-center"
          >
            Accede ahora
          </a>
        </motion.div>

        {/* Main Content - Video + Features */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-full">
          {/* Video/Demo Section */}
          {isMobile ? (
            <div className="relative max-w-full overflow-hidden">
              <div className="absolute -top-2 right-2 z-20 bg-gradient-to-r from-primary to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                Tu panel de control
              </div>
              <div className="relative bg-muted rounded-xl overflow-hidden border-2 border-border">
                <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-background rounded-lg px-4 py-1.5 text-muted-foreground text-sm">
                      crm.innovasolutions.com
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-background">
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
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
              >
                Tu panel de control
              </motion.div>

              <div className={`relative bg-muted rounded-2xl overflow-hidden border-2 transition-all duration-500 ${isHovered ? 'border-primary/50 shadow-2xl shadow-primary/20' : 'border-border shadow-xl'}`}>
                <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-background rounded-lg px-4 py-1.5 text-muted-foreground text-sm flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span>crm.innovasolutions.com</span>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-background">
                  <CRMMockup />
                </div>
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-primary/10 blur-2xl rounded-full" />
            </motion.div>
          )}

          {/* Features Section */}
          <motion.div {...slideRight}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-muted/50 border border-border rounded-xl p-1 mb-6">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <feature.icon className="w-5 h-5" />
                  </TabsTrigger>
                ))}
              </TabsList>

              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id} className="mt-0">
                  <div className="bg-muted/50 border border-border rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="space-y-3">
                      {feature.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-foreground/80"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CRMShowcase;
