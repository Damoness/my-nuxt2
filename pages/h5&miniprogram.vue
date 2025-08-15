<template>
  <div class="container">
    <h1 class="title">H5与小程序交互示例</h1>

    <div class="interaction-section">
      <h2 class="section-title">基础信息</h2>
      <van-cell-group>
        <van-cell title="当前环境" :value="platform" />
        <van-cell title="系统信息" :value="systemInfo" />
      </van-cell-group>

      <h2 class="section-title">交互功能</h2>
      <div class="button-group">
        <van-button type="primary" @click="getLocation">获取位置</van-button>
        <van-button type="info" @click="scanQRCode">扫描二维码</van-button>
        <van-button type="warning" @click="chooseImage">选择图片</van-button>
        <van-button type="danger" @click="share">分享</van-button>
      </div>

      <div v-if="result" class="result-section">
        <h3>操作结果：</h3>
        <van-cell-group>
          <van-cell title="结果信息" :value="result" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platform: '浏览器',
      systemInfo: '-',
      result: '',
    }
  },
  mounted() {
    this.checkPlatform()
    this.getSystemInfo()
  },
  methods: {
    checkPlatform() {
      // 检查运行环境
      if (typeof wx !== 'undefined') {
        this.platform = '微信小程序'
      } else if (typeof my !== 'undefined') {
        this.platform = '支付宝小程序'
      }
    },
    getSystemInfo() {
      // 获取系统信息
      this.systemInfo = window.__wxjs_environment
    },
    getLocation() {
      if (typeof wx !== 'undefined') {
        wx.getLocation({
          type: 'gcj02',
          success: (res) => {
            this.result = `纬度：${res.latitude}，经度：${res.longitude}`
          },
          fail: () => {
            this.result = '获取位置失败'
          },
        })
      } else if (typeof my !== 'undefined') {
        my.getLocation({
          success: (res) => {
            this.result = `纬度：${res.latitude}，经度：${res.longitude}`
          },
          fail: () => {
            this.result = '获取位置失败'
          },
        })
      } else {
        this.result = 'H5环境不支持该功能'
      }
    },
    scanQRCode() {
      if (typeof wx !== 'undefined') {
        wx.scanQRCode({
          success: (res) => {
            this.result = `扫码结果：${res.result}`
          },
          fail: () => {
            this.result = '扫码失败'
          },
        })
      } else if (typeof my !== 'undefined') {
        my.scan({
          success: (res) => {
            this.result = `扫码结果：${res.code}`
          },
          fail: () => {
            this.result = '扫码失败'
          },
        })
      } else {
        this.result = 'H5环境不支持该功能'
      }
    },
    chooseImage() {
      if (typeof wx !== 'undefined') {
        wx.chooseImage({
          count: 1,
          success: (res) => {
            this.result = `已选择图片：${res.tempFilePaths[0]}`
          },
          fail: () => {
            this.result = '选择图片失败'
          },
        })
      } else if (typeof my !== 'undefined') {
        my.chooseImage({
          count: 1,
          success: (res) => {
            this.result = `已选择图片：${res.apFilePaths[0]}`
          },
          fail: () => {
            this.result = '选择图片失败'
          },
        })
      } else {
        this.result = 'H5环境不支持该功能'
      }
    },
    share() {
      if (typeof wx !== 'undefined') {
        wx.showShareMenu({
          withShareTicket: true,
          success: () => {
            this.result = '已开启分享'
          },
          fail: () => {
            this.result = '开启分享失败'
          },
        })
      } else if (typeof my !== 'undefined') {
        my.showSharePanel()
        this.result = '已调用分享面板'
      } else {
        this.result = 'H5环境不支持该功能'
      }
    },
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.title {
  font-size: 24px;
  color: #323233;
  margin-bottom: 30px;
  text-align: center;
}

.section-title {
  font-size: 18px;
  color: #323233;
  margin: 20px 0 10px;
}

.interaction-section {
  margin-top: 20px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;
}

.button-group .van-button {
  flex: 1;
  min-width: 120px;
}

.result-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f7f8fa;
  border-radius: 8px;
}

.result-section h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #323233;
}
</style>
