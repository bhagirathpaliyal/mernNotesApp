const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const noteRoutes = require('./routes/notesRoutes');



const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    console.log('ifhgfdgfd')
    res.send('MERN Notes App Backend Running');
});


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
