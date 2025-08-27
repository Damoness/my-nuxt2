/* eslint-disable camelcase */
const GOLDTRADEZONE_INTRODUCE = 'GOLDTRADEZONE_INTRODUCE'
const GOLDTRADEZONE_POINTS = 'GOLDTRADEZONE_POINTS'
const GOLDTRADEZONE_INDICATOR_PERFORMANCE =
  'GOLDTRADEZONE_INDICATOR_PERFORMANCE'
const GOLDTRADEZONE_RELATION_PRODUCTS = 'GOLDTRADEZONE_RELATION_PRODUCTS'

const REDEEM_CALCULATOR_TRANSACTION_RATE = 'REDEEM_CALCULATOR_TRANSACTION_RATE'

// 持有天数及赎回申请日期接口（普通基金/货币基金/定期开放基金）
const REDEEM_CALCULATOR_calFundHoldDays = 'REDEEM_CALCULATOR_calFundHoldDays'

// 持有天数及预计赎回申请日期接口（持有期/滚动持有期基金）
const REDEEM_CALCULATOR_qryPredRedeemDate =
  'REDEEM_CALCULATOR_qryPredRedeemDate'

// 费率节点赎回申请日查询
const REDEEM_CALCULATOR_qryRedeemDate = 'REDEEM_CALCULATOR_qryRedeemDate'

const MARKETING_COURSE_CATEGORY_NAME_LIST =
  'MARKETING_COURSE_CATEGORY_NAME_LIST'

const actions = {
  [MARKETING_COURSE_CATEGORY_NAME_LIST](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-course/mobile/api/v1/h5/course/categoryName/list',
      method: 'GET',
      params: data,
    })
  },

  [REDEEM_CALCULATOR_calFundHoldDays](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/calFundHoldDays',
      method: 'POST',
      data,
    })
  },
  [REDEEM_CALCULATOR_qryPredRedeemDate](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/qryPredRedeemDate',
      method: 'POST',
      data,
    })
  },
  [REDEEM_CALCULATOR_qryRedeemDate](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/qryRedeemDate',
      method: 'POST',
      data,
    })
  },
  [REDEEM_CALCULATOR_TRANSACTION_RATE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/queryTransactionRate',
      method: 'POST',
      data,
    })
  },
  [GOLDTRADEZONE_INTRODUCE](_) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/queryGoldIntroduce',
      method: 'POST',
      data: {},
    })
  },
  [GOLDTRADEZONE_POINTS](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/queryGoldLatesttext',
      method: 'POST',
      data,
    })
  },
  [GOLDTRADEZONE_INDICATOR_PERFORMANCE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/queryGoldMarketindicator',
      method: 'POST',
      data,
    })
  },
  [GOLDTRADEZONE_RELATION_PRODUCTS](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-fund/secret/openmarketapi/qrantifyGold/queryGoldRelatedproduct',
      method: 'POST',
      data,
    })
  },
}
export default {
  actions,
}
