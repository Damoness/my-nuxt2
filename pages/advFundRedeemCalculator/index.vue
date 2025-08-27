<!-- eslint-disable camelcase -->
<!-- eslint-disable no-console -->
<!-- eslint-disable camelcase -->
<template>
  <div class="advFundRedeemCalculator-box">
    <div class="container">
      <img class="title" src="./assets/calculatorTitle.png" alt="持有计算器" />
      <div class="sub-title">赎回费率、持有时长一键查询</div>
      <div class="card">
        <div class="card-title">理财经理的专用客户维护工具</div>
        <div class="card-content">
          <div class="form-item">
            <span class="label">选择基金</span>
            <span
              :class="selectedFund ? 'value' : 'value-placeholder'"
              @click="showFundSelector"
              >{{ selectedFund ? selectedFund.fundName : '请选择' }} &gt;</span
            >
          </div>
          <div class="form-item">
            <span class="label">买入日期</span>
            <span
              :class="buyDate ? 'value' : 'value-placeholder'"
              @click="showDateSelector"
              >{{ buyDate ? buyDateStr : '请选择' }} &gt;</span
            >
          </div>
          <button class="calculate-btn" @click="startCalculation">
            开始测算
          </button>
        </div>
      </div>

      <div v-if="showResult" class="redeem-calculator-result">
        <img class="result-title" src="./assets/result-title.png" />
        <div class="result-fund-name">
          {{ selectedFund?.fundName + '（' + selectedFund?.fundCode + '）' }}
        </div>
        <div class="result-holding-day">
          {{
            isNormalFund
              ? `赎回申请日期：${moment(redeemDate, 'YYYYMMDD').format(
                  'YYYY年MM月DD日'
                )} | `
              : ''
          }}已持有天数：<span>{{ holdDay }}天</span>
        </div>

        <template v-if="Array.isArray(redeemDates) && redeemDates.length > 0">
          <div v-if="redeemDates.length === 1" class="redeemDateOne">
            预计最早可赎回日期：{{
              moment(redeemDates?.[0]?.redeemDate, 'YYYYMMDD').format(
                'YYYY年MM月DD日'
              )
            }}
          </div>
          <div v-else class="redeemDateTable">
            <div class="table-title">
              <div class="top" />
              预计可赎回时间
            </div>

            <div
              v-for="(item, index) in redeemDates.slice(0, 3)"
              :key="index"
              class="cell"
            >
              <div>预计第{{ convertToChinese(index + 1) }}个可赎回日期</div>
              <div>
                {{
                  moment(item.redeemDate, 'YYYYMMDD').format('YYYY年MM月DD日')
                }}
              </div>
            </div>
          </div>
        </template>

        <div
          v-if="Array.isArray(redeemDatesN) && redeemDatesN.length > 0"
          class="redeemDateNTable"
        >
          <div class="head">
            <div>赎回时间</div>
            <div>赎回费率</div>
          </div>
          <div v-for="(item, index) in redeemDatesN" :key="index" class="cell">
            <div
              :class="{
                highlight: index === 0 || index === redeemDatesN.length - 1,
              }"
            >
              {{
                item.holdDay === holdDay
                  ? '立即赎回'
                  : moment(item?.redeemCalendarDate, 'YYYYMMDD').format(
                      `YYYY-MM-DD 15:00后`
                    )
              }}
            </div>
            <div
              :class="{
                highlight: index === 0 || index === redeemDatesN.length - 1,
              }"
            >
              {{ item.rateNormal }}
            </div>
          </div>
        </div>

        <div v-if="resultTips" class="result-info">
          <img src="./assets/info.png" />
          <div>{{ resultTips }}</div>
        </div>

        <div class="result-tips">
          *
          展示结果中赎回日期涉及到跨年的部分，由于法定节假日可能尚未公布，和实际情况存在偏差，具体以真实交易结果为准，计算器仅供参考。持有期基金和滚动持有期基金的下一可赎回日期，其显示的日期均为交易日，若该交易日为节假日后的第一个交易日，则该交易日前的节假日同样可以发起赎回。在认购期买入的产品，持有期计算起始日为合同生效日，持有期计算=赎回发起日的确认日-合同生效日。
        </div>

        <div
          v-if="hasProductStandardRedemptionFeeRateTable"
          class="result-redeem-table"
        >
          <div class="table-title">
            <div class="top" />
            产品标准赎回费率表
          </div>
          <div class="content">
            <div class="head">
              <div>持有天数（N）</div>
              <div>赎回费率</div>
            </div>
            <div v-for="(item, index) in rateDetails" :key="index" class="cell">
              <div>{{ item.interval }}</div>
              <div>{{ item.rateNormal }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="fund-class">
        <div class="fund-class-title">基金交易知识小课堂</div>
        <div class="fund-class-content">
          <img class="fund-class-top-ad" src="./assets/class-top-ad.png" />
          <div
            v-for="item in fundClassData"
            :key="item.name"
            class="fund-class-item"
            @click="goToCourseDetail(item)"
          >
            <img :src="item.avatar" class="fund-class-image" />
            <div class="fund-class-text">
              <div class="fund-class-heading">{{ item.name }}</div>
              <div class="fund-class-date">
                {{ moment(item.timeLastUpdated).format('YYYY-MM-DD') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <Tips class="tips" :con="defaultTips" /> -->

      <FundProductSelector
        ref="fundProductSelector"
        @confirm="handleProductSelectorConfirm"
      />

      <DateSelector
        ref="dateSelector"
        :min-date="minBuyDate"
        :max-date="maxBuyDate"
        @confirm="handleDateSelectorConfirm"
        @cancel="handleDateSelectorCancel"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable camelcase
import moment from 'moment'
import { intervalToHoldDay } from './utils.ts'
// import Tips from '@/components/tips/index.vue'
// import logger from '@/utils/logs/logs'
import FundProductSelector from './coms/FundProductSelector.vue'
import DateSelector from './coms/DateSelector.vue'
// import { toError } from '@/utils/com-methods'
// import { toLink } from '@/utils/mixins/toLink'
// 格式化日期：yyyyMMdd
function formatDate(date, separator = '') {
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  return year + separator + month + separator + day
}

// 持有天数及赎回申请日期接口（普通基金/货币基金/定期开放基金）
// eslint-disable-next-line camelcase
const REDEEM_CALCULATOR_calFundHoldDays = 'REDEEM_CALCULATOR_calFundHoldDays'

// 持有天数及预计赎回申请日期接口（持有期/滚动持有期基金）
// eslint-disable-next-line camelcase
const REDEEM_CALCULATOR_qryPredRedeemDate =
  'REDEEM_CALCULATOR_qryPredRedeemDate'

// 费率节点赎回申请日查询
// eslint-disable-next-line camelcase
const REDEEM_CALCULATOR_qryRedeemDate = 'REDEEM_CALCULATOR_qryRedeemDate'

const MARKETING_COURSE_CATEGORY_NAME_LIST =
  'MARKETING_COURSE_CATEGORY_NAME_LIST'

export default {
  components: {
    // Tips,
    FundProductSelector,
    DateSelector,
  },
  mixins: [
    // toLink
  ],
  // async asyncData(ctx) {
  //   try {
  //     const resConfig = await ctx.store.dispatch('UCSYSTEM_API_CONFIG', {})
  //     console.log('获取配置信息成功-', resConfig)

  //     // 获取企业、渠道配置信息
  //     if (resConfig.code) {
  //       console.log(resConfig)
  //       toError({
  //         error: ctx.error,
  //         title: resConfig.msg,
  //         msg: '内容暂时无法查看(-3)',
  //       })
  //       return false
  //     }
  //     let { staff: channelInfo, enterprise: entInfo } = resConfig.data || {}

  //     if (!channelInfo || !entInfo) {
  //       console.log(resConfig)
  //       toError({
  //         error: ctx.error,
  //         title: resConfig.msg,
  //         msg: '渠道或者企业信息为空(-3)',
  //       })
  //       return false
  //     }
  //     channelInfo = JSON.parse(channelInfo)
  //     entInfo = JSON.parse(entInfo)
  //     return {
  //       entInfo,
  //       channelInfo,
  //     }
  //   } catch (err) {
  //     console.log('err', err)
  //     toError({
  //       error: ctx.error,
  //       title: '服务数据异常',
  //       msg: '服务数据异常',
  //     })
  //   } finally {
  //     console.log('error-')
  //     // logger.info(`${ctx.route.fullPath} - page end`)
  //   }
  // },
  data() {
    return {
      buyDate: null,
      timeFlag: '',
      maxBuyDate: new Date(),

      selectedFund: null,

      showResult: false,

      rateDetails: [],
      fundRemark: '',
      holdDay: '',
      redeemDate: '',

      redeemDatesN: [],
      redeemDates: [],

      fundClassData: [
        // {
        //   avatar: require('./assets/class-item-image.png'),
        //   name: '基金费率怎么算？基金交易费用一键get!',
        //   date: '2023-12-8'
        // },
      ],
      defaultTips: `风险提示:
本功能仅供渠道内部使用，计算结果仅供参考，请以真实交易结果为准。产品赎回费率信息来源于富国基金。
1. 赎回费=持有份额*赎回日单位净值*赎回费率。
2. 针对募集期产品，持有天数=赎回确认日-基金合同成立日。
3. 申购或定投份额，持有天数=赎回确认日-申购确认日。
4. 转换份额，转入基金的持有天数=赎回确认日-转换确认日。此计算器不包含转换出场景。
5. 一般情况下，红利再投资所得份额的持有天数计算：持有期基金和滚动持有期基金，原申购确认日/合同生效日开始计算持有天数；其他基金以红利转投确认日开始计算持有天数。
6. 若基金发生转型，持有天数和赎回费率计算可能存在偏差，具体以公告为准。
7. 本计算器暂不提供场内交易、后端收费基金的持有天数和赎回费率计算，计算过程暂未考虑QDII基金海外节假日、非港股通交易日，不同渠道赎回费率优惠等因素，计算结果可能存在偏差，仅供参考，请以真实交易结果为准。
8. 展示结果中赎回日期涉及到跨年的部分，由于法定节假日可能尚未公布，和实际情况存在偏差，具体以真实交易结果为准，计算器仅供参考。
`,
    }
  },
  head() {
    return {
      title: '持有计算器',
      script: [],
    }
  },
  computed: {
    minBuyDate() {
      if (this.selectedFund) {
        if (!this.selectedFund.saleStartDate) {
          this.$toast('基金销售开始日期为空')
          return
        }

        return new Date(this.selectedFund.saleStartDate)
      } else {
        return new Date()
      }
    },

    // 产品标准赎回费率表
    hasProductStandardRedemptionFeeRateTable() {
      return Array.isArray(this.rateDetails) && this.rateDetails.length > 0
    },
    // 普通基金
    isNormalFund() {
      // return this.selectedFund?.fundType === '01'
      return (
        (this.selectedFund?.fundOperationMode === '' ||
          this.selectedFund?.fundOperationMode === '0') &&
        this.selectedFund?.fundType !== '04'
      )
    },

    // 货币基金
    isMoneyMarketFund() {
      return this.selectedFund?.fundType === '04'
    },

    // 定期开放
    isRegularOpeningFund() {
      // return this.selectedFund?.fundType === '03' && this.selectedFund?.fundName.indexOf('定期开放') !== -1
      return this.selectedFund?.fundOperationMode === '1'
    },

    // 持有期
    isHoldingPeriodFund() {
      // return this.selectedFund?.fundType === '03' && this.selectedFund?.fundName.indexOf('持有期') !== -1
      return this.selectedFund?.fundOperationMode === '2'
    },

    // 滚动持有
    isRollingHoldingFund() {
      // return this.selectedFund?.fundType === '03' && this.selectedFund?.fundName.indexOf('滚动持有') !== -1
      return this.selectedFund?.fundOperationMode === '3'
    },

    resultTips() {
      if (this.isMoneyMarketFund) {
        return '本基金为货币市场基金，一般情况下不收取赎回费。'
      } else if (
        (this.isHoldingPeriodFund || this.isRollingHoldingFund) &&
        !this.hasProductStandardRedemptionFeeRateTable
      ) {
        return '产品无赎回费。'
      }

      return ''
    },
    buyDateStr() {
      const { buyDate, timeFlag } = this
      return buyDate
        ? `${formatDate(buyDate, '-')} ${
            timeFlag === '0' ? '15:00 前' : '15:00 后'
          }`
        : ''
    },
    enableButton() {
      return this.selectedFund && this.buyDate
    },
  },
  mounted() {
    this.$store.dispatch('UCSYSTEM_API_CONFIG', {})
    this.fetchCourseData()
  },
  methods: {
    goToCourseDetail(item) {
      const { protocol, host } = window.location

      const {
        courseId,
        relation: { categoryId },
      } = item

      // const webUrl = `${protocol}//${host}/share/AppAdvInvestorTrainCom?value=3750156956430370&shareConfig=true&categoryId=3240328136365324&isFirstPage=2&fromOrigin=MINI_PROGRAM&wechatInfoId=2c97808c95881d460195ac51ff480008&unionid=oZZ6KxOBYn3X_IBewbTX5moIi2fU`
      const url = `${protocol}//${host}/share/AppAdvInvestorTrainCom?value=${courseId}&shareConfig=true&categoryId=${categoryId}`

      console.log('goToCourseDetail', { url, item })

      // return

      this.redirect({
        url,
        needUnionid: false,
      })
    },
    moment,
    formatDate,
    convertToChinese(num) {
      // 数字到中文的映射对象
      const numToChinese = {
        0: '零',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九',
      }

      // 先转换为字符串以便索引映射
      const numStr = num.toString()
      let chinese = ''

      for (let i = 0; i < numStr.length; i++) {
        // 处理每一位数字
        chinese += numToChinese[numStr[i]] || ''
      }

      return chinese
    },
    handleProductSelectorConfirm(item) {
      console.log('handleConfirm', item)
      this.selectedFund = item
      this.buyDate = null
    },
    showFundSelector() {
      // Logic to show fund selector
      console.log('Show fund selector')
      this.$refs.fundProductSelector.show()
    },
    showDateSelector() {
      // Logic to show date selector
      console.log('Show date selector')
      if (!this.selectedFund) {
        this.$toast('请先选择基金')
        return
      }

      this.$refs.dateSelector.show()
    },
    handleDateSelectorConfirm(data) {
      console.log('handleDateTimeConfirm', data)
      this.buyDate = data.date
      this.timeFlag = data.timeFlag
    },
    handleDateSelectorCancel() {
      console.log('handleDateTimeCancel')
    },

    resetData() {
      this.rateDetails = []
      this.fundRemark = ''
      this.holdDay = ''
      this.redeemDatesN = []
      this.redeemDates = []
    },

    //
    async fetchCourseData() {
      const res = await this.$store.dispatch(
        MARKETING_COURSE_CATEGORY_NAME_LIST,
        {
          page: 0,
          pageSize: 3,
          categoryName: '音频-不可分',
        }
      )

      if (res.code !== 0) {
        this.$toast(res.msg)
        return
      }

      this.fundClassData = res.data.content || []
    },
    async startCalculation() {
      console.log('Start calculation')

      if (!this.selectedFund) {
        this.$toast('请选择基金')
        return
      }

      if (!this.buyDate) {
        this.$toast('请选择买入日期')
        return
      }

      this.resetData()

      const { fundCode } = this.selectedFund
      const applyDate = formatDate(this.buyDate)
      const applyFifteenFlag = this.timeFlag

      const now = new Date()
      const redeemDate = formatDate(now)
      const redeemFifteenFlag = now.getHours() < 15 ? '0' : '1'

      const [res1, res2] = await Promise.all([
        this.$store.dispatch('REDEEM_CALCULATOR_TRANSACTION_RATE', {
          fundCode,
          chargeTypes: ['4'],
        }),
        this.$store.dispatch(
          this.isHoldingPeriodFund || this.isRollingHoldingFund
            ? // eslint-disable-next-line camelcase
              REDEEM_CALCULATOR_qryPredRedeemDate
            : // eslint-disable-next-line camelcase
              REDEEM_CALCULATOR_calFundHoldDays,
          {
            fundCode,
            applyDate,
            applyFifteenFlag,
            redeemDate,
            redeemFifteenFlag,
          }
        ),
      ])

      if (res1.status !== '0' && res2.status !== '0') {
        return
      }

      const rateDetails = res1.data.Body.chargeDetails?.[0]?.rateDetails || []
      const fundRemark = res1.data.Body?.fundRemark

      const hasStandardRedemptionFeeRateTable =
        Array.isArray(rateDetails) && rateDetails.length > 0

      console.log('rateDetails', rateDetails)

      // 用于存储提取的“大于等于天数的数字”
      const redeemDatesN = rateDetails.map((item) => ({
        ...item,
        holdDay: intervalToHoldDay(item.interval),
      }))

      console.log('redeemDatesN', redeemDatesN)

      const redeemDates = res2.data.Body?.redeemDates || []

      const earliestRedeemableDate = redeemDates?.[0]?.redeemDate

      const currentData = moment().format('YYYYMMDD')

      if (
        this.isNormalFund ||
        (this.isHoldingPeriodFund &&
          hasStandardRedemptionFeeRateTable &&
          earliestRedeemableDate &&
          currentData >= earliestRedeemableDate)
      ) {
        try {
          const res3 = await this.$store.dispatch(
            REDEEM_CALCULATOR_qryRedeemDate,
            {
              fundCode,
              applyDate,
              applyFifteenFlag,
              holdDays: redeemDatesN.map((item) => item.holdDay + ''),
            }
          )

          if (res3.status !== '0' || res3.data?.Head?.resFlag === 'F') {
            this.$toast('qryRedeemDate:' + res3?.data?.Head?.msgInfo)
            return
          }

          if (res3.data.Body?.redeemDates?.length === 0) {
            this.$toast('qryRedeemDate:暂无数据')
            return
          }

          const result = (res3.data.Body?.redeemDates || []).map((x, i) => ({
            ...x,
            ...redeemDatesN[i],
          }))

          console.log(
            'redeemDatesN-result',
            result.map((x) => ({ ...x }))
          )

          const handledResult = []

          const holdDay = res2.data.Body?.holdDay

          for (let i = result.length - 1; i >= 0; i--) {
            const item = result[i]
            if (holdDay < item.holdDay) {
              handledResult.unshift(item)
            } else {
              item.holdDay = holdDay
              handledResult.unshift(item)
              break
            }
          }

          console.log(
            'redeemDatesN-handledResult',
            handledResult.map((x) => ({ ...x }))
          )

          this.redeemDatesN = handledResult
        } catch (error) {
          this.$toast('qryRedeemDate:' + error)
        }
      }

      this.showResult = true

      this.rateDetails = rateDetails
      this.fundRemark = fundRemark

      this.holdDay = res2.data.Body?.holdDay
      this.redeemDate = res2.data.Body?.redeemDate
      this.redeemDates = res2.data.Body?.redeemDates || []
    },
  },
}
</script>

<style lang="less" scoped>
.advFundRedeemCalculator-box {
  background-color: rgba(247, 247, 247, 1);
  .container {
    background-image: url(./assets/top-bg.png);
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 100% auto;
    // height: 100vh;

    .title {
      margin-top: 41px;
      margin-left: 28px;

      width: 173px;
      height: 48px;
    }

    .sub-title {
      color: rgba(113, 51, 11, 1);
      font-family: PingFang SC;
      font-size: 13px;
      font-weight: 400;
      line-height: 15px;
      letter-spacing: 0px;
      text-align: left;
      margin-top: 2px;
      margin-left: 28px;
    }

    .card {
      width: calc(100% - 25px);
      height: 226px;

      margin: 17px 13px 0px 12px;

      background-image: url('./assets/card.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;

      display: flex;
      flex-direction: column;

      .card-title {
        color: rgba(255, 255, 255, 1);
        font-family: PingFang SC;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.3px;
        text-align: left;
        margin-left: 12px;
        margin-top: 4px;
      }

      .card-content {
        flex: 1;
        margin: 8px;
        border-radius: 8px;
        backdrop-filter: blur(14px);
        background: linear-gradient(
          136.47deg,
          rgba(255, 255, 255, 0.81),
          rgba(255, 255, 255, 0.99) 30%,
          rgba(255, 255, 255, 1) 100%
        );

        padding: 12px;

        .form-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          padding: 15px 0;

          .label {
            color: rgba(29, 33, 41, 1);
            font-family: PingFang SC;
          }

          .value-placeholder {
            font-family: PingFang SC;
            color: rgba(187, 190, 196, 1);
          }

          .value {
            color: rgba(29, 33, 41, 1);
            font-family: PingFang SC;
            font-size: 15px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0px;
            text-align: right;
          }
        }

        .calculate-btn {
          margin-top: 20px;
          width: 100%;
          padding: 10px;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          border-radius: 22px;
          background: linear-gradient(
            180deg,
            rgba(252, 192, 126, 1),
            rgba(232, 144, 73, 1) 100%
          );

          &:disabled {
            background: gray;
          }
        }
      }
    }

    .fund-class {
      margin: 16px 12px 0 12px;

      .fund-class-title {
        color: rgba(29, 33, 41, 1);
        font-family: PingFang SC;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: left;
      }

      .fund-class-content {
        margin-top: 8px;
        padding: 8px 8px 0px 8px;

        display: flex;
        flex-direction: column;

        border-radius: 8px;
        background: rgba(255, 255, 255, 1);

        .fund-class-top-ad {
        }

        .fund-class-item {
          display: flex;
          padding: 12px 2px;

          .fund-class-image {
            width: 130px; // Adjust as needed
            height: 73px;
            // background-color: red;
            border-radius: 4px;
          }

          .fund-class-text {
            margin-left: 10px;

            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;

            .fund-class-heading {
              color: rgba(29, 33, 41, 1);
              font-family: PingFang SC;
              font-size: 14px;
              font-weight: 500;
              line-height: 22px;
              letter-spacing: 0px;
              text-align: left;
            }

            .fund-class-date {
              color: rgba(136, 144, 155, 1);
              font-family: PingFang SC;
              font-size: 12px;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: 0px;
              text-align: left;
            }
          }
        }

        .fund-class-item + .fund-class-item {
          border-top: 1px solid rgba(229, 230, 235, 1);
        }
      }
    }

    .redeem-calculator-result {
      margin: 16px 12px 0 12px;

      border-radius: 8px;
      box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 1);
      background: linear-gradient(
        180deg,
        rgba(255, 236, 221, 1),
        rgba(255, 255, 255, 1) 12%,
        rgba(255, 255, 255, 1) 100%
      );

      padding: 0 12px 12px 12px;

      display: flex;
      flex-direction: column;

      .result-title {
        align-self: center;

        width: 184px;
        height: 24px;
      }

      .result-fund-name {
        margin-top: 12px;

        color: rgba(29, 33, 41, 1);
        font-family: PingFang SC;
        font-size: 15px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: left;
      }

      .result-holding-day {
        margin-top: 4px;

        font-family: PingFang SC;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
        color: #88909b;

        > span {
          color: #1d2129;
        }
      }

      .redeemDateNTable {
        margin-top: 12px;

        border-radius: 4px;
        background: rgba(247, 248, 250, 1);
        padding: 8px 12px;

        .head {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          color: rgba(136, 144, 155, 1);
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0px;
          text-align: left;
        }

        .cell {
          margin-top: 6px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          color: rgba(29, 33, 41, 1);
          font-family: PingFang SC;
          font-size: 13px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0px;
          text-align: left;

          > div:nth-child(2) {
            color: rgba(119, 126, 136, 1);
          }

          .highlight {
            color: rgba(0, 86, 212, 1) !important;
            font-weight: 500;
          }
        }
      }

      .redeemDateOne {
        color: rgba(0, 86, 212, 1);
        font-family: PingFang SC;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0px;
      }

      .redeemDateTable {
        margin-top: 12px;

        border-radius: 4px;
        background: rgba(247, 248, 250, 1);

        .cell {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          margin: 0 12px;

          color: rgba(29, 33, 41, 1);
          font-family: PingFang SC;
          font-size: 13px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0px;
          text-align: left;

          margin-bottom: 6px;

          > div:nth-child(2) {
            color: rgba(119, 126, 136, 1);
            font-family: PingFang SC;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .result-info {
        margin-top: 12px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        border-radius: 4px;
        background: rgba(245, 248, 255, 1);

        padding: 2px 8px;

        img {
          height: 16px;
          width: 16px;
          margin-right: 2px;
          margin-top: 2px;
        }

        div {
          flex: 1;
          color: rgba(119, 126, 136, 1);
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0px;
          text-align: left;
        }
      }

      .result-tips {
        margin-top: 8px;

        color: rgba(187, 190, 196, 1);
        font-family: PingFang SC;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
      }

      .result-redeem-table {
        margin-top: 12px;

        border-radius: 4px;
        background: rgba(247, 248, 250, 1);

        padding-bottom: 8px;

        .content {
          margin-top: 12px;
          padding: 0 12px;
          display: flex;
          flex-direction: column;

          .head {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            color: rgba(136, 144, 155, 1);
            font-family: PingFang SC;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0px;
            text-align: left;
          }

          .cell {
            margin-top: 6px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            color: rgba(29, 33, 41, 1);
            font-family: PingFang SC;
            font-size: 13px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0px;
            text-align: left;

            > div:nth-child(2) {
              color: rgba(119, 126, 136, 1);
            }
          }
        }
      }
    }

    .table-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: rgba(29, 33, 41, 1);
      font-family: PingFang SC;
      font-size: 15px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
      margin: 12px 0;

      .top {
        width: 4px;
        height: 16px;
        border-radius: 0px 2px 2px 0px;
        background: rgba(63, 117, 255, 1);
        margin-right: 4px;
      }
    }

    .tips {
      white-space: break-spaces;
    }
  }
}
</style>
