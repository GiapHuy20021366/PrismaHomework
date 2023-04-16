const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { name, email, posts } = req.body;

  const postData = posts
    ? posts.map((post) => {
        return { title: post.title, content: post.content || undefined };
      })
    : [];

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  });
  return res.json(result);
};

const findAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

const findDrafts = async (req, res) => {
  const { id } = req.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    });

  return res.json(drafts);
};

const findUserWithOrders = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      orders: true,
    },
  });
  return res.json(user);
};

module.exports = {
  signup,
  findAllUsers,
  findDrafts,
  findUserWithOrders,
};
