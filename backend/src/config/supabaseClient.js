const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log("Inicializando conexión a Supabase con URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase client inicializado correctamente.");
module.exports = supabase;
