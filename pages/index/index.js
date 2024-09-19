Page({
  data: {
    categories: [
      { id: 1, name: "炸肉排\nSchnitzel" },
      { id: 2, name: "香肠\nSausage" },
      { id: 3, name: "三明治\nSandwich" },
      { id: 4, name: "沙拉\nSalad" },
      { id: 5, name:"甜品\nDessert" },
      { id: 6, name: "汤类\nSoup" },
      { id: 7, name: "咖啡\nCoffee" },
      { id: 8, name: "鸡尾酒\nCocktail" },
      { id: 9, name: "啤酒\nBeer" },

    ],
    menuItems: [],
    activeCategory: 1,
    categoryHeights: [],
    scrollTop: 0,
    scrollIntoView: '',
    isClickingCategory: false  // 用于标记是否是通过点击触发的滚动
  },

  onLoad() {
    this.loadMenu();
  },

  // 加载菜单数据
  loadMenu() {
    const menuData = [
      {
        id: 1,
        name: "炸肉排\nSchnitzel",
        items: [
          { id: 1, name: "猪排汉堡\nSchnitzel Burger", price: 68, image: "https://sociallol.cn/QCafeTest/zhupaihanbao.jpg" },
          { id: 2, name: "炸肉排配土豆沙拉\nSchnitzel with potato salad", price: 78, image: "https://sociallol.cn/QCafeTest/zhupaitudoushala.jpg" },
          { id: 3, name: "炸肉排配土豆沙拉和黑胡椒\nSchnitzel with potato salad and black pepper sauce", price: 88, image: "https://sociallol.cn/QCafeTest/zhupaiheihujiao.jpg" }
        ]
      },
      {
        id: 2,
        name: "香肠\nSausage",
        items: [
          { id: 4, name: "法兰克福香肠\nFrankfurter", price: 30, image: "https://sociallol.cn/QCafeTest/sausage1.jpg" },
          { id: 5, name: "腊肠\nBratwurst", price: 32, image: "https://sociallol.cn/QCafeTest/sausage2.jpg" },
          { id: 6, name: "肝肠\nLeberwurst", price: 28, image: "https://sociallol.cn/QCafeTest/sausage3.jpg" }

        ]
      },
      {
        id: 3,
        name: "三明治\nSandwich",
        items: [
          { id: 7, name: "意大利风味恰巴塔面包三明治\nCiabatta bread sandwiches", price: 48, image: "https://sociallol.cn/QCafeTest/qiabata.jpg"  }
        ]
      },
      {
        id: 4,
        name: "沙拉\nSalad",
        items: [
          { id: 6, name: "什锦沙拉\nMixed salad", price: 40, image: "https://sociallol.cn/QCafeTest/salad.jpg" },
          { id: 7, name: "烤鸡肉沙拉\nGrilled Chicken Salad", price: 50, image: "https://sociallol.cn/QCafeTest/chickensalad.jpg" }
        ]
      }
      ,
      {
        id: 5,
        name: "甜品\nDessert",
        items: [
          { id: 9, name: "华夫饼\nWaffles", price: 12, image: "https://sociallol.cn/QCafeTest/waffle.jpg" },
        ]
      },
      {
        id: 6,
        name: "汤类\nSoup",
        items: [
          { id: 8, name: "奶油蘑菇汤\nMushroom Soup", price: 25, image: "https://sociallol.cn/QCafeTest/soup.jpg" }
        ]
      }
      ,
   
      {
        id: 7,
        name: "咖啡\nCoffee",
        items: [
          { id: 10, name: "卡布奇诺\nCappuccino", price: 25,image: "https://sociallol.cn/QCafeTest/kabuqinuo.jpg" },
          { id: 11, name: "爱尔兰咖啡\nIrish Coffee", price: 28,image: "https://sociallol.cn/QCafeTest/irish1.jpg" },
        ]
      },
      {
        id: 8,
        name: "鸡尾酒\nCocktail",
        items: [
          { id: 12, name: "莫吉托\nMojito", price: 30, image: "https://sociallol.cn/QCafeTest/mockito.jpg" },
          { id: 13, name: "莫斯科骡子\nMoscow Mule", price: 48, image: "https://sociallol.cn/QCafeTest/Moscowmule.jpg" },
        ]
      },
      {
        id: 9,
        name: "啤酒\nBeer",
        items: [
          { id: 14, name: "BPA", price: 25, image: "https://sociallol.cn/QCafeTest/bpa.jpg" },
          { id: 15, name: "Duvel", price: 30, image: "https://sociallol.cn/QCafeTest/duvel.jpg" },
        ]
      }
    ];

    this.setData({ menuItems: menuData }, () => {
      this.calculateCategoryHeights();
    });
  },

  // 计算每个分类的高度
  calculateCategoryHeights() {
    const query = wx.createSelectorQuery();
    const categoryHeights = [];
    let heightSum = 0;

    query.selectAll('.menu-category').boundingClientRect((rects) => {
      rects.forEach((rect) => {
        heightSum += rect.height;
        categoryHeights.push(heightSum);
      });

      this.setData({ categoryHeights });
    }).exec();
  },

  // 右侧菜单滚动监听
  onMenuScroll(e) {
    if (this.data.isClickingCategory) {
      // 如果是点击触发的滚动，不执行逻辑
      return;
    }

    const scrollTop = e.detail.scrollTop;
    const categoryHeights = this.data.categoryHeights;

    for (let i = 0; i < categoryHeights.length; i++) {
      if (scrollTop < categoryHeights[i]) {
        this.setData({ activeCategory: this.data.categories[i].id });
        break;
      }
    }
  },

  // 点击左侧分类时跳转到对应分类菜单
  selectCategory(e) {
    const categoryId = e.currentTarget.dataset.id;

    // 设置点击状态为 true，禁用滚动处理
    this.setData({
      isClickingCategory: true,
      activeCategory: categoryId,
      scrollIntoView: `category-${categoryId}`  // 设置右侧 scroll-view 跳转到对应分类位置
    });

    // 延迟一段时间后重新启用滚动处理
    setTimeout(() => {
      this.setData({
        isClickingCategory: false
      });
    }, 500);  // 延时500ms确保滚动动画完成
  },

  signUp() {
    wx.showToast({
      title: '报名成功',
      icon: 'success',
      duration: 2000
    });
  },
  goToDetail(e) {
    const dish = e.currentTarget.dataset.dish;
    console.log(dish)

    wx.navigateTo({
      url: `/pages/dishDetail?dish=${encodeURIComponent(JSON.stringify(dish))}`
    });
  },
  handleSignUp: function(e) {

    const current = e.currentTarget.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current], // 需要预览的图片http链接列表,
      success: function() {
        console.log('预览图片成功');
      },
      fail: function(err) {
        console.error('预览图片失败', err);
      }
    });
  },
});
