import express from 'express';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();
const app = express();
const port = 3000;
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`,
);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
  }).catch((err) => {
    console.error('Database connection failed:', err);
  });

const Blog = sequelize.define('blog', {
  // createdAt and updatedAt are automatically made by Sequelize
  userId: {
    type: Sequelize.UUID,
  },
  title: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.STRING,
  },
});

app.use(express.json());

app.post('/blogs', async (req, res) => {
  try {
    const newBlog = new Blog({
      userId: req.body.userId,
      title: req.body.blog.title,
      body: req.body.blog.body,
    });
    await newBlog.save();
    res.sendStatus(200);
  } catch (err) {
    console.error('Blog creation failed:', err);
  }
});

Blog.sync({ alter: true }).catch((err) => {
  console.error(`Model ${this} sync failed:`, err);
});

app.listen(port, () => console.log(`blog-api listening on port ${port}`));
