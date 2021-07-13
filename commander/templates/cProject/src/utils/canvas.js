// 设备像素密度（解决不够清晰的问题）
let ratio = 2;
class Canvas {
  constructor() {}
  detailPost(params, callback) {
    // 绘制头图
    var headImg = new Image();
    headImg.crossOrigin = "Anonymous";
    headImg.src = params.img1;
    headImg.onload = function() {
      // 计算图片比例
      let headScale = headImg.width / headImg.height;
      // 计算图片宽高 375*headImgHei
      let headImgHei = 375 / headScale;
      // 整个canvas
      let canvasHei = headImgHei;

      // 获取canvas 并定义上下文
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      canvas.width = 375 * ratio;
      canvas.height = canvasHei * ratio;

      // 绘制白色背景
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 375 * ratio, canvasHei * ratio);
      ctx.restore();

      // 绘制头图
      ctx.save();
      ctx.beginPath();
      ctx.drawImage(headImg, 0, 0, 375 * ratio, headImgHei * ratio);
      ctx.restore();

      // 绘制微信小程序二维码
      var wxCodeImg = new Image();
      wxCodeImg.crossOrigin = "Anonymous";
      wxCodeImg.src = params.img2;
      wxCodeImg.onload = function() {
        // 绘制微信小程序二维码
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(wxCodeImg, (375 - 110) * ratio, (headImgHei - 150) * ratio, 80 * ratio, 80 * ratio);
        ctx.restore();

        // canvas转base64图片
        var base64 = canvas.toDataURL("image/png", 1);
        callback({
          isSuccess: true,
          url: base64
        });
      };
    };
  }
}

export default new Canvas();
