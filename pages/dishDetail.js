Page({
  data: {
    dish: {},
    coffeeData:[],

  },

  onLoad(options) {
    const dish = JSON.parse(decodeURIComponent(options.dish));
    console.log("received dish:",dish)
    this.setData({
      dish
    });  
    if(dish.chineseName.includes("|")){
      const result =this. getSplittedPrice(dish.chineseName, dish.englishName, dish.price)
    this.setData({coffeeData:result})
    console.log("coffeeData:",this.data.coffeeData)
    }
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


}
);
