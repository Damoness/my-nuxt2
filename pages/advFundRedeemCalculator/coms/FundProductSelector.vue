<template>
  <Popup
    v-model="showPopup"
    position="bottom"
    class="advFundRedeemCalculator-fund-product-select-container"
    @opened="handleOpenPopup"
    @closed="handleClosePopup"
  >
    <NavBar
      class="header"
      title="选择基金产品"
      right-text="确定"
      left-arrow
      @click-left="onClickCancel"
      @click-right="onClickConfirm"
    />

    <Search
      v-model="value"
      placeholder="请输入基金产品或代码"
      shape="round"
      @search="handleSearch"
      @clear="handleSearchClear"
    >
      <template #left-icon>
        <img class="search-left-icon" src="../assets/search-icon.png" />
      </template>

      <template #right-icon>
        <div class="search-button-container" @click="handleSearch(value)">
          <div class="line" />
          <div class="search-button">搜索</div>
        </div>
      </template>
    </Search>

    <Tabs
      v-show="!name.length"
      v-if="tabs && tabs.length > 0"
      v-model="idx"
      @change="onChangeTab"
    >
      <Tab v-for="(tab, index) in tabs" :key="index" :title="tab.name" />
    </Tabs>

    <List
      v-if="showList"
      :key="idx"
      v-model="loading"
      class="content"
      :finished="finished"
      error-text="请求失败，点击重新加载"
      @load="handleListLoad"
    >
      <div
        v-for="item in list"
        :key="item.id"
        :class="{
          'fund-item': true,
          'fund-item-selected': item.id === selectedFund?.id,
        }"
        @click="selectFund(item)"
      >
        <div class="left">
          <img
            :src="
              item.id === selectedFund?.id
                ? require('../assets/selected.png')
                : require('../assets/unselected.png')
            "
            class="icon"
          />
          <div class="column">
            <div class="fund-name-container">
              <div class="fund-name">
                {{ item.fundShortName ? item.fundShortName : '-' }}
              </div>
              <img
                v-if="item.isRecommendedFund"
                src="../assets/recommend.png"
                class="recommend"
              />
            </div>

            <div class="fund-code">{{ item.fundCode }}</div>
          </div>
        </div>

        <div class="right">
          <div class="value" :class="judgeUpDown(item.last1YRange)">
            {{
              item.last1YRange
                ? (Number(item.last1YRange) * 100).toFixed(2) + '%'
                : '-'
            }}
          </div>
          <div class="label">近1年涨跌</div>
        </div>
      </div>
    </List>
  </Popup>
</template>

<script>
import { Popup, Tab, Tabs, NavBar, Search, List } from 'vant'
import { judgeUpDown, judgeUpDownNum } from '@/utils/com-methods'

export default {
  components: {
    Popup,
    Tab,
    Tabs,
    NavBar,
    Search,
    List,
  },
  props: {},
  data() {
    return {
      showPopup: false,
      tabs: [],
      idx: 0,
      themeColor: '',

      showList: false,
      list: [],
      loading: false,
      finished: false,
      error: false,
      pageNum: 0,
      pageSize: 20,
      name: '',
      selectedFund: null,

      value: '',
    }
  },
  // watch: {
  //   '$store.state.theme.color': {
  //     deep: true,
  //     handler(val) {
  //       this.themeColor = val
  //     },
  //   },
  // },
  // created() {
  //   this.themeColor = this.$store.state.theme.color
  // },
  methods: {
    judgeUpDown,
    judgeUpDownNum,
    onChangeTab(index) {
      console.log('onChangeTab-index', index)
      this.idx = index
      this.initListData()
    },

    async getListData() {
      const params = {
        tabType: 'GLAD_REPORT',
        etf: true,
        page: this.pageNum,
        pageSize: this.pageSize,
      }
      if (this.name) {
        params.fundName = this.name
        params.fundCode = this.name
        params.fundShortName = this.name
      } else if (this.tabs[this.idx]?.type === 'fundTypeTab') {
        params.fundChannelId = this.tabs[this.idx]?.code
      } else if (this.tabs[this.idx]?.type === 'recommendedFundTab') {
        params.isRecommendedFund = true
        params.placedTop = true
      }

      const apiName = 'MARKETING_PRODUCT_FIND_ALL_BY_FUND_TYPE'

      this.loading = true

      // /* 分类数据 */
      const res = await this.$store.dispatch(apiName, params)
      if (res.code !== 0) {
        return
      }

      this.loading = false

      const arr = (res.data && res.data.content) || []
      this.list = [...this.list, ...arr]

      if (arr.length < this.pageSize) {
        this.finished = true
      } else {
        this.pageNum++
      }
    },
    async getTabsData() {
      console.log('getTabsData--')
      const res = await this.$store.dispatch('MARKETING_PRODUCT_GETFUNDTYPE', {
        tabId: 'other',
      })
      if (res.code === 0) {
        this.tabs = res.data
      } else {
        this.$toast('产品分类查询失败！')
      }
    },
    handleListLoad() {
      console.log('handleListLoad--', this.idx)
      // // 异步更新数据
      this.getListData()
    },
    handleSearch(val) {
      if (!val) {
        return
      }

      console.log('handleSearch--', val)
      this.name = val
      this.initListData()
    },
    handleSearchClear() {
      this.name = ''
      this.initListData()
    },
    async show() {
      await this.getTabsData()
      this.showPopup = true
      this.initListData()
    },

    initListData() {
      this.showList = false
      this.list = []
      this.loading = false
      this.finished = false
      this.error = false
      this.pageNum = 0
      this.pageSize = 20

      this.$nextTick(() => {
        this.showList = true
      })
    },

    handleOpenPopup() {},
    handleClosePopup() {},
    onClickCancel() {
      this.showPopup = false
    },
    onClickConfirm() {
      this.showPopup = false
      this.$emit('confirm', this.selectedFund)
    },
    selectFund(item) {
      if (this.selectedFund?.id === item.id) {
        this.selectedFund = null
        return
      }
      this.selectedFund = item
    },
  },
}
</script>

<style lang="less" scoped>
.advFundRedeemCalculator-fund-product-select-container {
  display: flex;
  flex-direction: column;
  // background: red;
  border-radius: 12px 12px 0 0;
  height: 80%;
  overflow: auto;
  .content {
    flex: 1;
    // background: blue;
    overflow: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px;

    .fund-item {
      padding: 8px;
      flex-shrink: 0;
      width: 100%;
      height: 70px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      // border-bottom: 1px solid #eee;

      .left {
        display: flex;
        flex-direction: row;
        align-items: center;

        .icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }

        .column {
          display: flex;
          flex-direction: column;

          .fund-name-container {
            display: flex;
            flex-direction: row;
            align-items: center;

            .fund-name {
              display: inline-block;
              color: rgba(29, 33, 41, 1);
              font-family: PingFang SC;
              font-size: 14px;
              font-weight: 500;
              line-height: 24px;
              letter-spacing: 0px;
              text-align: left;
              margin-right: 5px;
            }

            .recommend {
              /* 推荐 */
              width: 16px;
              height: 16px;
            }
          }

          .fund-code {
            color: rgba(136, 144, 155, 1);
            font-family: D-DIN-PRO;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0px;
            text-align: left;

            margin-top: 2px;
          }
        }
      }

      .right {
        display: flex;
        flex-direction: column;

        .value {
          font-family: D-DIN-PRO;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0px;
          text-align: right;
        }

        .label {
          color: rgba(136, 144, 155, 1);
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0px;
          text-align: right;
          margin-top: 2px;
        }

        .profit {
          color: rgba(239, 51, 68, 1);
        }
        .loss {
          color: rgba(0, 180, 42, 1);
        }
      }
    }

    .fund-item-selected {
      border-radius: 8px;
      background: rgba(240, 245, 255, 1);
    }
  }

  .search-left-icon {
    margin-top: 3px;
    width: 16px;
    height: 16px;
  }

  .search-button-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .line {
      width: 1px;
      height: 12px;
      background: rgba(200, 204, 226, 1);
      margin-right: 8px;
    }

    .search-button {
      color: rgba(63, 117, 255, 1);
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: center;
      margin-right: 4px;
    }
  }
}

/deep/ .van-nav-bar__arrow {
  color: rgba(69, 75, 86, 1);
}
/deep/ .van-nav-bar__text {
  color: rgba(63, 117, 255, 1);
  font-family: PingFang SC;
  font-size: 15px;
  font-weight: 400;
}

/deep/ .van-tab {
  margin: 9px 6px;
  height: 26px;
  border-radius: 15px;

  background-color: rgba(241, 242, 245, 1);

  color: rgba(29, 33, 41, 1);

  font-family: PingFang SC;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
}

/deep/ .van-tab--active {
  background: linear-gradient(
    180deg,
    rgba(78, 152, 255, 1),
    rgba(63, 117, 255, 1) 100%
  );

  color: rgba(255, 255, 255, 1);
}

/deep/ .van-tabs__line {
  width: 0;
}
</style>
