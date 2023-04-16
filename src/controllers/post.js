const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  return res.json(result);
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return res.json(post);
  } catch (error) {
    return res.json({
      error: `Post with ID ${id} does not exist in the database`,
    });
  }
};

const publishPost = async (req, res) => {
  const { id } = req.params;

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    });

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData.published || undefined },
    });
    return res.json(updatedPost);
  } catch (error) {
    return res.json({
      error: `Post with ID ${id} does not exist in the database`,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(post);
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  return res.json(post);
};

module.exports = {
  createPost,
  updatePost,
  publishPost,
  deletePost,
  getPost,
};
