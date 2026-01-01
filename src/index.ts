export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // For now, just serve static assets
    // The assets directory configuration in wrangler.toml will handle serving files
    return new Response('AI Factory Master', { status: 200 });
  },
};
