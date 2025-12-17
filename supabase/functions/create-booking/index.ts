import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, date, time, timezone } = await req.json();

    console.log('Creating booking:', { name, email, phone, date, time, timezone });

    // Validate inputs
    if (!name || !email || !phone || !date || !time) {
      throw new Error('Missing required fields');
    }

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert booking into database
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        name,
        email,
        phone,
        date,
        time,
        timezone,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save booking');
    }

    console.log('Booking saved:', booking);

    // Optional: Send to Google Sheets via webhook
    const googleSheetsWebhook = Deno.env.get('GOOGLE_SHEETS_WEBHOOK');
    if (googleSheetsWebhook) {
      try {
        await fetch(googleSheetsWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            date,
            time,
            timezone,
            created_at: new Date().toISOString()
          })
        });
        console.log('Data sent to Google Sheets');
      } catch (sheetsError) {
        console.error('Google Sheets webhook error:', sheetsError);
        // Don't fail the request if sheets webhook fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Booking created successfully',
        booking
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error creating booking' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
