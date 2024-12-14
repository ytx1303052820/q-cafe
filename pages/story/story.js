Page({
  data: {
    // 可以添加一些动态内容的数组
    images: [
      'your-image-url-1.jpg',
      'your-image-url-2.jpg',
      'your-image-url-3.jpg'
    ],
    descriptions: [
      '欢迎来到我们的店铺！这里有丰富的商品和优质的服务。',
      '我们的特色商品包括...',
      '我们的位置...'
    ]
  },
  previewImage: function(e) {
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
  onLoad: function () {
    // 可以在这里执行一些初始化操作
  }
});
