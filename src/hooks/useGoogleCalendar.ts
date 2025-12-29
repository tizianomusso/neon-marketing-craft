import { useState, useCallback, useEffect } from 'react';

const GOOGLE_CLIENT_ID = '696471129784-fer4333u7kmmiuu0j31orj4vb1q140ro.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

interface CalendarEventData {
  title: string;
  description: string;
  startDateTime: Date;
  durationMinutes: number;
}

interface UseGoogleCalendarReturn {
  isLoading: boolean;
  isAuthenticated: boolean;
  addToCalendar: (eventData: CalendarEventData) => Promise<boolean>;
  initGoogleClient: () => void;
}

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

export const useGoogleCalendar = (): UseGoogleCalendarReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const loadGoogleScripts = useCallback(() => {
    return new Promise<void>((resolve) => {
      // Check if scripts are already loaded
      if (window.google?.accounts?.oauth2 && window.gapi) {
        resolve();
        return;
      }

      let scriptsLoaded = 0;
      const onScriptLoad = () => {
        scriptsLoaded++;
        if (scriptsLoaded === 2) {
          // Initialize gapi
          window.gapi.load('client', async () => {
            await window.gapi.client.init({});
            resolve();
          });
        }
      };

      // Load Google Identity Services
      if (!document.getElementById('google-gsi-script')) {
        const gsiScript = document.createElement('script');
        gsiScript.id = 'google-gsi-script';
        gsiScript.src = 'https://accounts.google.com/gsi/client';
        gsiScript.async = true;
        gsiScript.defer = true;
        gsiScript.onload = onScriptLoad;
        document.head.appendChild(gsiScript);
      } else {
        scriptsLoaded++;
      }

      // Load Google API client
      if (!document.getElementById('google-api-script')) {
        const gapiScript = document.createElement('script');
        gapiScript.id = 'google-api-script';
        gapiScript.src = 'https://apis.google.com/js/api.js';
        gapiScript.async = true;
        gapiScript.defer = true;
        gapiScript.onload = onScriptLoad;
        document.head.appendChild(gapiScript);
      } else {
        scriptsLoaded++;
      }

      // If both already exist, resolve
      if (scriptsLoaded === 2) {
        resolve();
      }
    });
  }, []);

  const initGoogleClient = useCallback(async () => {
    await loadGoogleScripts();
    
    if (window.google?.accounts?.oauth2) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: (response: any) => {
          if (response.access_token) {
            setAccessToken(response.access_token);
            setIsAuthenticated(true);
          }
        },
      });
      setTokenClient(client);
    }
  }, [loadGoogleScripts]);

  const createCalendarEvent = async (eventData: CalendarEventData, token: string): Promise<boolean> => {
    const endDateTime = new Date(eventData.startDateTime.getTime() + eventData.durationMinutes * 60000);

    const event = {
      summary: eventData.title,
      description: eventData.description,
      start: {
        dateTime: eventData.startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
    };

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      return true;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return false;
    }
  };

  const addToCalendar = useCallback(async (eventData: CalendarEventData): Promise<boolean> => {
    setIsLoading(true);

    try {
      await loadGoogleScripts();

      return new Promise((resolve) => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: SCOPES,
          callback: async (response: any) => {
            if (response.access_token) {
              setAccessToken(response.access_token);
              setIsAuthenticated(true);
              const success = await createCalendarEvent(eventData, response.access_token);
              setIsLoading(false);
              resolve(success);
            } else {
              setIsLoading(false);
              resolve(false);
            }
          },
        });

        // Request access token
        client.requestAccessToken({ prompt: 'consent' });
      });
    } catch (error) {
      console.error('Error in addToCalendar:', error);
      setIsLoading(false);
      return false;
    }
  }, [loadGoogleScripts]);

  return {
    isLoading,
    isAuthenticated,
    addToCalendar,
    initGoogleClient,
  };
};
