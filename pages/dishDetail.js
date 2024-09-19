Page({
  data: {
    dish: {}
  },

  onLoad(options) {
    const dish = JSON.parse(decodeURIComponent(options.dish));
    console.log("dish:",dish)
    this.setData({
      dish
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



  chooseImage: function () {
    wx.chooseImage({
      count: 1, // 允许选择的图片数量
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 从相册或相机选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          imageUrl: tempFilePaths[0] // 将图片路径保存到data中，显示在页面上
        });
      },
      fail: (err) => {
        console.error('选择图片失败', err);
      }
    });
  },

  // 上传图片
  uploadImage: function () {
    if (!this.data.imageUrl) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      });
      return;
    }

    wx.uploadFile({
      url: 'https://your-server-endpoint.com/upload', // 替换为你的服务器地址
      filePath: this.data.imageUrl, // 本地文件路径
      name: 'file', // 后端接收文件的字段名
      formData: {
        user: 'testUser' // 传递其他数据，如用户信息
      },
      success: (res) => {
        console.log('上传成功', res.data);
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('上传失败', err);
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        });
      }
    });
  }

});
