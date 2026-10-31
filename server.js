require('dotenv').config();
const app=require('./src/app');

const PORT=process.env.PORT||3000;

const server=app.listen(PORT,()=>{
    console.log(`Student API running on port ${PORT}`);
});
server.on('close', () => {
    console.log('SERVER WAS CLOSED!');
});

server.on('error', (err) => {
    console.log('SERVER ERROR:', err);
});