import express from 'express';

const app = express();
l
app.get('/', async (req, res) => {
    res.send('Hello world!');
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});