const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    name: "Giap Van Huy",
    email: "huygiapboy@gmail.com",
    posts: {
      create: [
        {
          title: "Hàng cứu trợ",
          content: "Thấy bạn hết tiền chính phủ cứu đói mỳ tôm",
          published: true,
        },
        {
          title: "Shopee 1 đồng",
          content: "Mỳ tôm 1 đồng cho người sắp chết đói",
          published: true,
        },
        {
          title: "Nước uống sống qua ngày",
          content:
            "1 lít nước uống giúp bạn vượt qua 7 ngày sống sót khi hết tiền",
          published: true,
        },
      ],
    },
    orders: {
      create: [
        {
          item: "Hàng cứu trợ",
          title: "Yêu cầu tiếp tế",
          content:
            "Em sắp chết đói vì hết tiền rồi, chính phủ tiếp tế pleaseee",
          note: "Cho mình x2 người thường được không ạ :((",
        },
        {
          item: "Mỳ tôm 1 đồng",
          title: "Mua hàng mỳ tôm 1 đồng",
          content: "Khách hàng order sản phẩm",
          note: "Có bao nhiêu anh lấy bấy nhiêu",
        },
        {
          item: "Nước lọc loại 1l",
          title: "Mua hàng nước lọc loại 1l",
          content: "Khách hàng order sản phẩm",
          note: "Khuyến mãi cho mình thêm 1l nữa được không ạ :3",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
