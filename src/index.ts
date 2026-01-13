import { GoogleGenerativeAI } from '@google/generative-ai';

interface Env {
  GEMINI_API_KEY: string;
  ASSETS: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API Routes
    if (url.pathname.startsWith('/api/')) {
      // CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      try {
        // Chat endpoint
        if (url.pathname === '/api/chat' && request.method === 'POST') {
          const { message } = await request.json();

          if (!env.GEMINI_API_KEY) {
            return new Response(
              JSON.stringify({ error: 'API Key not configured' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            systemInstruction: "You are a helpful, encouraging AI assistant for a Sri Lankan factory owner. You speak primarily in Sinhala, but can use English terms where appropriate for business context. Keep answers practical, simple, and related to manufacturing, business, or the specific 100-day training plan."
          });

          const result = await model.generateContent(message);
          const response = result.response;
          const text = response.text();

          return new Response(
            JSON.stringify({ response: text }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Translate endpoint
        if (url.pathname === '/api/translate' && request.method === 'POST') {
          const { text } = await request.json();

          if (!env.GEMINI_API_KEY) {
            return new Response(
              JSON.stringify({ error: 'API Key not configured' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

          const result = await model.generateContent(
            `Translate the following business text into professional but easy-to-understand Sinhala:\n\n${text}`
          );
          const translation = result.response.text();

          return new Response(
            JSON.stringify({ translation }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Email draft endpoint
        if (url.pathname === '/api/email' && request.method === 'POST') {
          const { details } = await request.json();

          if (!env.GEMINI_API_KEY) {
            return new Response(
              JSON.stringify({ error: 'API Key not configured' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

          const result = await model.generateContent(
            `Write a professional business email in English based on these details (provided in Sinhala/English): "${details}". Also provide a Sinhala summary of what the email says below it.`
          );
          const email = result.response.text();

          return new Response(
            JSON.stringify({ email }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response('Not Found', { status: 404, headers: corsHeaders });
      } catch (error: any) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};
