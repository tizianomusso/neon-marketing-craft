import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  MoreHorizontal,
  Search,
  Bell,
  Settings,
  Home,
  Filter,
  Plus,
  ChevronRight,
  Circle
} from 'lucide-react';

const CRMMockup = () => {
  const [activeNav, setActiveNav] = useState(0);
  const [selectedLead, setSelectedLead] = useState(0);
  const [metrics, setMetrics] = useState({
    leads: 847,
    conversions: 234,
    revenue: 45600,
    cpl: 12.50
  });
  const [notifications, setNotifications] = useState<string[]>([]);

  const navItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Users, label: 'Leads' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: MessageSquare, label: 'Mensajes' },
    { icon: Calendar, label: 'Agenda' },
    { icon: Settings, label: 'Config' }
  ];

  const leads = [
    { name: 'María García', email: 'maria@gmail.com', status: 'Nuevo', source: 'Meta Ads', time: 'Hace 2 min', avatar: 'MG', color: 'bg-cyan-500' },
    { name: 'Carlos López', email: 'carlos@hotmail.com', status: 'Contactado', source: 'Google Ads', time: 'Hace 15 min', avatar: 'CL', color: 'bg-blue-500' },
    { name: 'Ana Martínez', email: 'ana.m@gmail.com', status: 'Calificado', source: 'Meta Ads', time: 'Hace 1 hora', avatar: 'AM', color: 'bg-green-500' },
    { name: 'Roberto Sánchez', email: 'rsanchez@email.com', status: 'Negociación', source: 'Orgánico', time: 'Hace 2 horas', avatar: 'RS', color: 'bg-purple-500' },
    { name: 'Laura Fernández', email: 'laura.f@gmail.com', status: 'Nuevo', source: 'Meta Ads', time: 'Hace 3 horas', avatar: 'LF', color: 'bg-pink-500' },
  ];

  const statusColors: Record<string, string> = {
    'Nuevo': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'Contactado': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Calificado': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Negociación': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  const notificationMessages = [
    '🔥 Nuevo lead desde Meta Ads',
    '✅ Conversión confirmada',
    '📞 Llamada programada',
    '💰 Venta cerrada: $2,500',
    '📧 Email enviado automáticamente'
  ];

  // Animate metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        leads: prev.leads + Math.floor(Math.random() * 3),
        conversions: prev.conversions + (Math.random() > 0.7 ? 1 : 0),
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        cpl: Math.max(8, prev.cpl + (Math.random() - 0.5) * 0.5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through leads
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedLead(prev => (prev + 1) % leads.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Show notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const msg = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
      setNotifications(prev => [...prev.slice(-2), msg]);
      setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 3000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cycle nav
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNav(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-gray-950 rounded-lg overflow-hidden flex text-xs">
      {/* Sidebar */}
      <div className="w-14 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-3 gap-1">
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-sm">IS</span>
        </div>
        
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            animate={{
              backgroundColor: activeNav === index ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
              scale: activeNav === index ? 1.1 : 1
            }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeNav === index ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon className="w-4 h-4" />
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-12 bg-gray-900/50 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar leads..."
                className="bg-gray-800 border border-gray-700 rounded-lg pl-7 pr-3 py-1.5 text-gray-300 text-xs w-40 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <button className="flex items-center gap-1 text-gray-400 hover:text-white text-xs">
              <Filter className="w-3.5 h-3.5" />
              Filtros
            </button>
          </div>
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full" />
            </motion.div>
            <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">TU</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-3 overflow-hidden">
          {/* Metrics Row */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label: 'Leads Totales', value: metrics.leads, icon: Users, trend: '+12%', up: true },
              { label: 'Conversiones', value: metrics.conversions, icon: TrendingUp, trend: '+8%', up: true },
              { label: 'Ingresos', value: `$${metrics.revenue.toLocaleString()}`, icon: BarChart3, trend: '+23%', up: true },
              { label: 'Costo/Lead', value: `$${metrics.cpl.toFixed(2)}`, icon: TrendingDown, trend: '-5%', up: false }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/80 border border-gray-800 rounded-lg p-2.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-[10px]">{metric.label}</span>
                  <metric.icon className="w-3 h-3 text-gray-600" />
                </div>
                <div className="flex items-end justify-between">
                  <motion.span 
                    key={metric.value}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white font-semibold text-sm"
                  >
                    {metric.value}
                  </motion.span>
                  <span className={`text-[10px] ${metric.up ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-5 gap-3 h-[calc(100%-80px)]">
            {/* Leads Table */}
            <div className="col-span-3 bg-gray-900/80 border border-gray-800 rounded-lg overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
                <span className="text-white font-medium text-xs">Últimos Leads</span>
                <button className="flex items-center gap-1 text-cyan-400 text-[10px] hover:text-cyan-300">
                  <Plus className="w-3 h-3" />
                  Agregar
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {leads.map((lead, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      backgroundColor: selectedLead === index ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                      borderLeftColor: selectedLead === index ? 'rgb(6, 182, 212)' : 'transparent'
                    }}
                    className="flex items-center gap-2 px-3 py-2 border-b border-gray-800/50 border-l-2 cursor-pointer hover:bg-gray-800/30"
                  >
                    <div className={`w-6 h-6 ${lead.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-[10px] font-medium">{lead.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs font-medium truncate">{lead.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] border ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>{lead.source}</span>
                        <Circle className="w-1 h-1 fill-current" />
                        <span>{lead.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Phone className="w-3 h-3 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Mail className="w-3 h-3 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <MoreHorizontal className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Panel - Chart & Activity */}
            <div className="col-span-2 flex flex-col gap-3">
              {/* Mini Chart */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-3 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-xs">Leads por día</span>
                  <span className="text-cyan-400 text-[10px]">Últimos 7 días</span>
                </div>
                <div className="h-16 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-[9px] text-gray-600">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mié</span>
                  <span>Jue</span>
                  <span>Vie</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </div>

              {/* Pipeline */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-3">
                <span className="text-white font-medium text-xs block mb-2">Pipeline</span>
                <div className="space-y-2">
                  {[
                    { stage: 'Nuevos', count: 45, width: '80%', color: 'from-cyan-500 to-cyan-400' },
                    { stage: 'Contactados', count: 32, width: '60%', color: 'from-yellow-500 to-yellow-400' },
                    { stage: 'Calificados', count: 18, width: '35%', color: 'from-green-500 to-green-400' },
                    { stage: 'Cerrados', count: 8, width: '15%', color: 'from-purple-500 to-purple-400' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-gray-400">{item.stage}</span>
                        <span className="text-white">{item.count}</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: item.width }}
                          transition={{ delay: index * 0.2, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="absolute bottom-3 right-3 space-y-2">
        <AnimatePresence>
          {notifications.map((notif, index) => (
            <motion.div
              key={`${notif}-${index}`}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-[10px] shadow-lg"
            >
              {notif}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CRMMockup;
