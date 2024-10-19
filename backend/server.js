const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.js');
const producerRoutes = require('./routes/producerRoutes');
const productRoutes = require('./routes/productRoutes');
const profileRoutes = require('./routes/profileRoutes.js');
const ImagesRoutes = require('./routes/ImagesRoutes.js');
const rateRoutes = require('./routes/rateRoutes.js');
const userFavoriteProductsRoutes = require('./routes/userFavoriteProductsRoutes.js');
const emailSendRoutes = require('./routes/emailSendRoutes.js');
const messagesRoutes=require('./routes/messagesRoutes.js')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser());
// Middleware to serve static files from the public directory
app.use(express.static('public'));

app.use("/", authRoutes)
app.use('/producers', producerRoutes);
app.use('/products', productRoutes);
app.use('/profile', profileRoutes);
app.use('/images', ImagesRoutes);
app.use('/submit-review', rateRoutes);
app.use('/userFavoriteProducts', userFavoriteProductsRoutes);
app.use('/api/sendEmail',emailSendRoutes)
app.use('/messages',messagesRoutes);


app.listen(8000, () => {
    console.log("running")
})