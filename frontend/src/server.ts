import express from 'express';
import path from 'path';

const app = express();
const PORT : number = 8080;

app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/home.html'));
})

app.get('/results', (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/results.html'));
})


app.listen(PORT, ()=>{
    console.log(`Application is running on PORT ${PORT}`);
})