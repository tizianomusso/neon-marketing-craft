import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// For now, we'll use a simplified approach that creates a calendar invite
// In production, you'd want to set up OAuth for full Google Calendar integration
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, dateTime, timezone } = await req.json();

    console.log('Creating calendar event:', { name, email, dateTime, timezone });

    // Validate inputs
    if (!name || !email || !dateTime) {
      throw new Error('Missing required fields');
    }

    const eventDate = new Date(dateTime);
    const endDate = new Date(eventDate.getTime() + 30 * 60 * 1000); // 30 min meeting

    // Format dates for ICS file
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Create ICS calendar file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Innova Solutions//Booking//ES
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${formatICSDate(eventDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:Consulta Gratuita - Innova Solutions
DESCRIPTION:Reunión de consulta gratuita con ${name}.\\n\\nContacto: ${email}
LOCATION:Google Meet (link a confirmar)
ORGANIZER;CN=Innova Solutions:mailto:contacto@innovasolutions.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${name}:mailto:${email}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Recordatorio: Consulta con ${name} en 30 minutos
END:VALARM
END:VEVENT
END:VCALENDAR`;

    // For a complete integration, you would:
    // 1. Use Google Calendar API with OAuth2 to create the event
    // 2. Send email via Resend or similar service
    
    // Return success with the ICS data
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Evento creado exitosamente',
        event: {
          name,
          email,
          dateTime,
          duration: 30,
          icsContent
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error creating calendar event:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error creating event' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
