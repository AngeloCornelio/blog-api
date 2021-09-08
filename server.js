import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/blogs', (req, res) => res.sendStatus(200));

app.listen(port, () => console.log(`blog-api listening on port ${port}`));
