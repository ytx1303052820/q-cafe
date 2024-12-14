Component({
  properties: {
    dish: {
      type: Object,
      value: {}
    },
    coffeeData:{
      type:Array,
      value:[]
    }
  },
  data: {
  },

  methods: {
    testEvent: function(e) {
      console.log("事件触发了！", e); // 打印事件对象
    },
    previewImage: function(e) {
      console.log('点击图片，路径：', e); // 打印路径查看

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
  },

});
