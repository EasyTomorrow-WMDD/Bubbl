const isDev = process.env.NODE_ENV === 'development'; // set NODE_ENV in local environment to 'development' for development mode. Otherwise, it will be 'production'.

const BubblConfig = {
  // Backend API
  // For development, check the local IP address with `ifconfig | grep inet` or `ipconfig` command and replace the IP address in the URL with the IP address of localhost.
  BACKEND_URL: isDev
     ? 'http://bubbl.wmdd4950.com/app-backend'
    //  ? 'http://192.168.1.72:3000' // Do not delete this URL, it works for testing 
    : 'http://bubbl.wmdd4950.com/app-backend',


  // Supabase URL
  SUPABASE_URL: isDev
    ? 'https://ogbfgllkkyehcurolhjf.supabase.co' // Dev Supabase URL #1
    // ? 'https://abdkngdxtrszvkwvqkmx.supabase.co' // Dev Supabase URL #2
    : 'https://ogbfgllkkyehcurolhjf.supabase.co', // Production Supabase URL

  SUPABASE_ANON_KEY: isDev
     ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmZnbGxra3llaGN1cm9saGpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDY0NTY1OSwiZXhwIjoyMDY2MjIxNjU5fQ.oG7HY_RJdUmMwtEjiATZMiPHdr7Fzr8XJ5CwyHCL114' // Dev Supabase ANON key #1
    // ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZGtuZ2R4dHJzenZrd3Zxa214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxODk1ODQsImV4cCI6MjA2NDc2NTU4NH0.9YxOPyYyA61hdOJx5GvuXti7118WI9kxcaO_Mia2PPI' // Dev Supabase ANON key #2
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmZnbGxra3llaGN1cm9saGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDU2NTksImV4cCI6MjA2NjIyMTY1OX0.WV07xTvn_EyCgrnUwgSrj_tTy6iZffEi21Hr7a8U0h0', // Production Supabase ANON key

  // Supabase project ID
  SUPABASE_PROJECT_ID: isDev 
    ? 'ogbfgllkkyehcurolhjf' // Dev Supabase project ID #1
    // ? 'abdkngdxtrszvkwvqkmx' // Dev Supabase project ID #2
    : 'ogbfgllkkyehcurolhjf', // Production Supabase project ID

  // Dummy user credentials for development
  DUMMY_USER_EMAIL: isDev 
    ? ''
    // ? 'test6@bubbl.com' 
    // ? 'test5@bubbl.com' 
    : '',
  DUMMY_USER_PASSWORD: isDev 
    ? '' 
    // ? '123456' 
    : '',

};

export default BubblConfig;

