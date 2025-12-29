import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, ArrowRight, Check, Loader2 } from 'lucide-react';
import { format, setHours, setMinutes, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
];

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);
  
  const { addToCalendar, isLoading: isCalendarLoading } = useGoogleCalendar();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setStep(2);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email || !phone) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-booking', {
        body: {
          name,
          email,
          phone,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success('¡Consulta agendada exitosamente!', {
        description: 'Podés agregar el evento a tu Google Calendar.'
      });

    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Error al agendar la consulta', {
        description: 'Por favor intenta nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCalendar = async () => {
    if (!selectedDate || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(hours, minutes, 0, 0);

    const success = await addToCalendar({
      title: 'Diagnóstico con Innova Solutions',
      description: `Reunión de diagnóstico gratuita\n\nDatos del cliente:\n- Nombre: ${name}\n- Email: ${email}\n- Teléfono: ${phone}\n\nDuración: 30 minutos`,
      startDateTime,
      durationMinutes: 30,
    });

    if (success) {
      setCalendarAdded(true);
      toast.success('¡Evento agregado a tu calendario!', {
        description: 'Recibirás recordatorios 1 día y 1 hora antes.'
      });
    } else {
      toast.error('No se pudo agregar al calendario', {
        description: 'Inténtalo nuevamente o agrégalo manualmente.'
      });
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setName('');
    setEmail('');
    setPhone('');
    setIsSuccess(false);
    setCalendarAdded(false);
  };

  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    const day = date.getDay();
    return isBefore(date, today) || day === 0 || day === 6;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[500px] bg-[#0A0A0A] rounded-[20px] border border-primary/20 shadow-2xl overflow-hidden"
            style={{
              boxShadow: '0 0 60px rgba(6, 182, 212, 0.1)'
            }}
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-white/10">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white font-heading">
                Agenda tu consulta gratuita
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Selecciona fecha y hora disponible
              </p>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        step >= s
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`w-8 h-0.5 transition-all ${
                          step > s ? 'bg-primary' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      ¡Consulta Agendada!
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las {selectedTime}
                    </p>
                    
                    {!calendarAdded ? (
                      <button
                        onClick={handleAddToCalendar}
                        disabled={isCalendarLoading}
                        className="w-full py-3 bg-white rounded-lg text-gray-900 font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        {isCalendarLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Conectando...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Agregar a Google Calendar
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-green-400">
                        <Check className="w-5 h-5" />
                        <span>Agregado a tu calendario</span>
                      </div>
                    )}
                    
                    <button
                      onClick={handleClose}
                      className="mt-4 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-white font-medium">Selecciona una fecha</span>
                    </div>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={disabledDays}
                      locale={es}
                      className="rounded-lg border border-white/10 bg-white/5 p-3 pointer-events-auto mx-auto"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium text-white",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative",
                        day: "h-9 w-9 p-0 font-normal text-white hover:bg-primary/20 rounded-lg transition-colors",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        day_today: "bg-white/10 text-white",
                        day_outside: "text-gray-600 opacity-50",
                        day_disabled: "text-gray-600 opacity-50 cursor-not-allowed",
                        day_hidden: "invisible",
                      }}
                    />
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-white font-medium">Selecciona una hora</span>
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="text-sm text-primary hover:underline"
                      >
                        Cambiar fecha
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                            selectedTime === time
                              ? 'border-primary bg-primary/20 text-white'
                              : 'border-white/10 bg-white/5 text-white hover:border-primary/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        <span className="text-white font-medium">Tus datos</span>
                      </div>
                      <button
                        onClick={() => setStep(2)}
                        className="text-sm text-primary hover:underline"
                      >
                        Cambiar hora
                      </button>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                      <p className="text-gray-400 text-sm">
                        {selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las {selectedTime}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Nombre completo</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre"
                            required
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Teléfono / WhatsApp</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+54 9 11 1234-5678"
                            required
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-primary to-cyan-400 rounded-lg text-primary-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Agendando...
                          </>
                        ) : (
                          <>
                            Confirmar consulta
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
