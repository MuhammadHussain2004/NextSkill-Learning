const express = require ('express')
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.listen(4000, ()=> console.log('server running at port 4000...'));
