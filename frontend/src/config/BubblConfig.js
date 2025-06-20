const isDev = process.env.NODE_ENV === 'development'; // set NODE_ENV in local environment to 'development' for development mode. Otherwise, it will be 'production'.

const BubblConfig = {
  // Backend API
  // For development, check the local IP address with `ifconfig` or `ipconfig` command and replace the IP address in the URL with the IP address of localhost.
  BACKEND_URL: isDev
    ? 'http://10.128.230.78:3000'
    : 'https://some-url-in-aws-to-be-created.com',

  // Supabase URL
  SUPABASE_URL: isDev
    ? 'https://ogbfgllkkyehcurolhjf.supabase.co'
    : 'https://ogbfgllkkyehcurolhjf.supabase.co',

  SUPABASE_ANON_KEY: isDev
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmZnbGxra3llaGN1cm9saGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA0NTMsImV4cCI6MjA2NDc2NjQ1M30.VIU3Wj-qyaRl4wT9wXGLFflrqooF58-SS8kZq9K8cBU'
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmZnbGxra3llaGN1cm9saGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA0NTMsImV4cCI6MjA2NDc2NjQ1M30.VIU3Wj-qyaRl4wT9wXGLFflrqooF58-SS8kZq9K8cBU',
};

export default BubblConfig;
