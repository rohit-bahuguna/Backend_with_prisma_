const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3500;
const userRoute = require('./Routes/userRoutes');
// regular middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware

app.use(cookieParser());
app.use('/api', userRoute);
app.get('/', (req, res) => {
	res.status(200).json({ message: 'Server is working' });
});

app.listen(PORT, () => {
	console.log(`server is runing at port ${PORT}`);
});
