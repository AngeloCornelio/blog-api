import express from 'express';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();
const app = express();
const port = 3000;
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`,
);

app.use(express.json());

app.post('/blogs', (req, res) => res.sendStatus(200));

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
  }).catch((err) => {
    console.error('Database connection failed:', err);
  });

app.listen(port, () => console.log(`blog-api listening on port ${port}`));
