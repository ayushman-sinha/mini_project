const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(cors())
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

const URL="mongodb+srv://ayush69:ayush69@cluster0.6lnrl.mongodb.net/mini_project";
mongoose.set('strictQuery', false);
mongoose.connect(URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {"Connected to MongoDb"}).catch((error) => { console.log(error) });

app.use('/api/auth', require('./routes/auth'));
// app.use('/api/student', require('./routes/student'));
// app.use('/api/teacher', require('./routes/teacher'));
app.use('/api/subject', require('./routes/subject'));
// app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/coordinate', require('./routes/coordinate'));

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
