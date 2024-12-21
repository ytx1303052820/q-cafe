Page({
  data: {
    categories: [],
    menuItems: [],
    activeCategory: 1,
    categoryHeights: [],
    scrollTop: 0,
    scrollIntoView: '',
    categoryScrollIntoView: '',
    coffeeData:[],
    softDrinkData:[],
    softMilk:[],
    asahi:[],
    branda:[],
    juice:[],
    redsweet:[],
    isClickingCategory: false  // 用于标记是否是通过点击触发的滚动
  },

  async onLoad() {
    const app = getApp();
    const menuData = await app.checkAndFetchEventData();
    const menuCategories = menuData.map(item => ({
      categoryId:item.categoryId,
      categoryChineseName: item.categoryChineseName,
      categoryEnglishName: item.categoryEnglishName
  }));

  const coffeeItemInOne = menuData.filter(item => item.categoryEnglishName === "Coffee")[0]
    .menuItemResponses
    .filter(menuItemResponse=>menuItemResponse.menuItemId===40)[0];

    const softItemsInOne = menuData.filter(item => item.categoryEnglishName === "Soft drinks")[0]
    .menuItemResponses
    .filter(menuItemResponse=>menuItemResponse.menuItemId===73)[0];

    const softMilkInOne = menuData.filter(item => item.categoryEnglishName === "Soft drinks")[0]
    .menuItemResponses
    .filter(menuItemResponse=>menuItemResponse.menuItemId===74)[0];
    
    const asahiInOne = menuData.filter(item => item.categoryEnglishName === "Beer & Fruity beers")[0]
    .menuItemResponses
    .filter(menuItemResponse=>menuItemResponse.menuItemId===79)[0];

    const brandaInOne = menuData.filter(item => item.categoryEnglishName === "Beer & Fruity beers")[0]
    .menuItemResponses
    .filter(menuItemResponse=>menuItemResponse.menuItemId===88)[0];

    const juiceInOne = menuData.filter(item => item.categoryEnglishName === "Hot drinks")[0]
    .menuItemResponses
     .filter(menuItemResponse=>menuItemResponse.menuItemId===59)[0];

     const redsweetInOne = menuData.filter(item => item.categoryEnglishName === "WINE & SPRITZER")[0]
     .menuItemResponses
      .filter(menuItemResponse=>menuItemResponse.menuItemId===103)[0];
  this.setData({
    coffeeData:this.getSplittedPrice(coffeeItemInOne.chineseName, coffeeItemInOne.englishName, coffeeItemInOne.price),
    softDrinkData:this.getSplittedPrice(softItemsInOne.chineseName, softItemsInOne.englishName, softItemsInOne.price),
    softMilk:this.getSplittedPrice(softMilkInOne.chineseName, softMilkInOne.englishName, softMilkInOne.price),
    asahi:this.getSplittedPrice(asahiInOne.chineseName, asahiInOne.englishName, asahiInOne.price),
    branda:this.getSplittedPrice(brandaInOne.chineseName, brandaInOne.englishName, brandaInOne.price),
    juice:this.getSplittedPrice(juiceInOne.chineseName, juiceInOne.englishName, juiceInOne.price),
    redsweet:this.getSplittedPrice(redsweetInOne.chineseName, redsweetInOne.englishName, redsweetInOne.price),
    categories: menuCategories,
    menuItems: menuData
  }, () => {
    setTimeout(() => {
      this.calculateCategoryHeights();  // 使用箭头函数，确保 `this` 保持正确
    }, 300);  // 延时300ms确保页面内容渲染完成
  }
    );
    },

  // 计算每个分类的高度
  calculateCategoryHeights() {
    const query = wx.createSelectorQuery();
    const categoryHeights = [];
    let heightSum = 0;

    query.selectAll('.menu-category').boundingClientRect()
    
    // ((rects) => {
    //   rects.forEach((rect) => {
    //     heightSum += rect.height;
    //     categoryHeights.push(heightSum);
    //   });
    let heightArr = [0]
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      res[0].map( val => {
        let result = val.height  + heightArr[heightArr.length - 1]
        console.log(result)
        // 拿后一个view盒子的高度加上前面的高度
        heightArr.push(result) 
      })
      console.log("heightArr:",heightArr)


    })
    console.log("categoryHeights:",this.data.categoryHeights)

    this.setData({ categoryHeights:heightArr });

  },

  // 右侧菜单滚动监听
  onMenuScroll(e) {
    if (this.data.isClickingCategory) {
      // 如果是点击触发的滚动，不执行逻辑
      return;
    }

    const scrollTop = e.detail.scrollTop;
    const categoryHeights = this.data.categoryHeights;
    let scrollTimeout = null;

    let st = e.detail.scrollTop
    console.log('st' + e.detail.scrollTop,this.data.categoryHeights)
    for(let i = 0; i < this.data.categoryHeights.length; i++){
      if(st >= this.data.categoryHeights[i] && st <= this.data.categoryHeights[i+1] - 5){
        this.setData({
                   activeCategory: this.data.categories[i].categoryId,
          categoryScrollIntoView: `category-name-${this.data.activeCategory}`
        })
        return
      }
    }
    // clearTimeout(scrollTimeout);
    // scrollTimeout = setTimeout(() => {
    //   for (let i = 0; i < categoryHeights.length; i++) {
    //     if (scrollTop < categoryHeights[i] && scrollTop < categoryHeights[i+1]) {
    //       console.log("scrollTop:",scrollTop, "categoryHeights:",categoryHeights)
    //       this.setData({
    //         activeCategory: this.data.categories[i].categoryId,
    //       categoryScrollIntoView: `category-name-${this.data.activeCategory}`
    //       });
    //       break;
    //     }
    //   }
    // }, 100);  // 设置防抖延时（100ms）

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

  getSplittedPrice(chineseName, englishName,price){
    const chineseNameArray = chineseName.split('|')
    const englishNameArray = englishName.split('|')
    const priceArray = price.split('|')

    const result = chineseNameArray.map((_, index) => ({
      itemChineseName: chineseNameArray[index],
      itemEnglishName: englishNameArray[index],
      itemPrice: priceArray[index]
    }));
    return result;
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
