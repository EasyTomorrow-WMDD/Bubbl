const jwt = require('jsonwebtoken');

const verifySupabaseToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) return res.status(401).json({ error: 'No token provided' });



  try {

    if (!process.env.SUPABASE_JWT_SECRET) {
      throw new Error('Missing SUPABASE_JWT_SECRET');
    }
 
    const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET, {
      algorithms: ['HS256'],
    });



    // You now have the user's info
    req.user = payload;
    // console.log('Supabase token verified:', req.user);
    next();
  } catch (err) {
    console.error('Invalid Supabase token:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifySupabaseToken;
