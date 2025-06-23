const isDev = process.env.NODE_ENV === 'development'; // set NODE_ENV in local environment to 'development' for development mode. Otherwise, it will be 'production'.

const BubblConfig = {
  // Backend API
  // For development, check the local IP address with `ifconfig | grep inet` or `ipconfig` command and replace the IP address in the URL with the IP address of localhost.
  BACKEND_URL: isDev
    ? 'http://10.100.2.107:3000'
    // ? 'http://192.168.1.81:3000' // Local IP address #1
    // ? 'http://10.100.1.67:3000' // Local IP address #2
    // ? 'http://10.100.2.107:3000' // Local IP address #3
    // ? 'http://10.128.230.78:3000' // Loacl IP address #4
    // ? 'http://10.128.229.169:3000' // Local IP address #5
    // ? 'http://192.168.1.72:3000' // Local IP address #6
    : 'https://some-url-in-aws-to-be-created.com',

  // Supabase URL
   SUPABASE_URL: isDev
    ? 'https://ogbfgllkkyehcurolhjf.supabase.co'
    : 'https://ogbfgllkkyehcurolhjf.supabase.co',

  SUPABASE_ANON_KEY: isDev
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmZnbGxra3llaGN1cm9saGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDU2NTksImV4cCI6MjA2NjIyMTY1OX0.WV07xTvn_EyCgrnUwgSrj_tTy6iZffEi21Hr7a8U0h0'
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmZnbGxra3llaGN1cm9saGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA0NTMsImV4cCI6MjA2NDc2NjQ1M30.VIU3Wj-qyaRl4wT9wXGLFflrqooF58-SS8kZq9K8cBU',

  // Supabase project ID
  SUPABASE_PROJECT_ID: isDev ? 'ogbfgllkkyehcurolhjf' : 'ogbfgllkkyehcurolhjf',
  };

export default BubblConfig;
