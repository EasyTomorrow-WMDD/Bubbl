const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('🔐 Using Supabase key:', supabaseKey?.slice(0, 20)); // Muestra los primeros caracteres

module.exports = supabase;
