require('dotenv').config();
const express = require('express');
const app = express();
const dashboardRoutes = require('./routes/childProgressRoutes');

app.use(express.json());
app.use('/api/childProgress', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
