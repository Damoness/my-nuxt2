const MARKETING_PRODUCT_QUERYFUNDSTAGERANGE =
  'MARKETING_PRODUCT_QUERYFUNDSTAGERANGE'
const MARKETING_FUND_QUERYFUNDSTAGERANGE = 'MARKETING_FUND_QUERYFUNDSTAGERANGE'
const MARKETING_FUND_QUERYFUNDNETVALYE = 'MARKETING_FUND_QUERYFUNDNETVALYE'
const MARKETING_PRODUCT_QUERYFUNDNETVALYE =
  'MARKETING_PRODUCT_QUERYFUNDNETVALYE'
const MARKETING_FUND_QUERYFUNDINFO = 'MARKETING_FUND_QUERYFUNDINFO'
const MARKETING_PRODUCT_QUERYFUNDINFO = 'MARKETING_PRODUCT_QUERYFUNDINFO'
const MARKETING_FUND_QUERYFUNDMGRINFO = 'MARKETING_FUND_QUERYFUNDMGRINFO'
const MARKETING_PRODUCT_QUERYFUNDMGRINFO = 'MARKETING_PRODUCT_QUERYFUNDMGRINFO'
const MARKETING_FUND_QUERYFUNDRANGEBYDAY = 'MARKETING_FUND_QUERYFUNDRANGEBYDAY'
const MARKETING_PRODUCT_QUERYFUNDRANGEBYDAY =
  'MARKETING_PRODUCT_QUERYFUNDRANGEBYDAY'
const MARKETING_PRODUCT_QUERYFUNDNETVALYEFORDRAW =
  'MARKETING_PRODUCT_QUERYFUNDNETVALYEFORDRAW'
const MARKETING_PRODUCT_QUERYFUNDINFO_YFD =
  'MARKETING_PRODUCT_QUERYFUNDINFO_YFD'
const MARKETING_FUND_QUERYFUNDPRIZE = 'MARKETING_FUND_QUERYFUNDPRIZE'
const MARKETING_FUND_QRY_FUND_PERFORMANCE =
  'MARKETING_FUND_QRY_FUND_PERFORMANCE'
const MARKETING_FUND_QRY_FUND_QUOTATIONS = 'MARKETING_FUND_QRY_FUND_QUOTATIONS'
const MARKETING_FUND_QRY_FUND_MARKET_LIST =
  'MARKETING_FUND_QRY_FUND_MARKET_LIST'
const MARKETING_FUND_QRY_FUND_MANAGER = 'MARKETING_FUND_QRY_FUND_MANAGER'
const MARKETING_FUND_QRY_PUB_NOTE = 'MARKETING_FUND_QRY_PUB_NOTE'
const MARKETING_FUND_QRY_FUND_BASE_INFO = 'MARKETING_FUND_QRY_FUND_BASE_INFO'
const MARKETING_FUND_QRY_TRANSACTION_RATE =
  'MARKETING_FUND_QRY_TRANSACTION_RATE'
const MARKETING_FUND_QRY_ZHONG_CANG_GU = 'MARKETING_FUND_QRY_ZHONG_CANG_GU'
const MARKETING_PRODUCT_FIND_RECOMMENDED_FUND_BY_TYPE =
  'MARKETING_PRODUCT_FIND_RECOMMENDED_FUND_BY_TYPE'
const MARKETING_PRODUCT_FIND_ALL_BY_FUND_TYPE =
  'MARKETING_PRODUCT_FIND_ALL_BY_FUND_TYPE'

const state = {}

const mutations = {}

const actions = {
  [MARKETING_FUND_QUERYFUNDSTAGERANGE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: true },
      url: '/marketing-fund/msp/queryFundStageRange',
      method: 'GET',
      params: data,
    })
  },
  // 中融修改后新接口-阶段涨跌
  [MARKETING_PRODUCT_QUERYFUNDSTAGERANGE](_, data) {
    return this.$axios({
      // headers: {type: 'marketingApi', needUUID: true},
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-product/mobile/api/v1/fund/queryFundStageRange',
      // method: 'GET',
      // params: data
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QUERYFUNDNETVALYE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: true },
      url: '/marketing-fund/msp/queryFundNetValue',
      method: 'GET',
      params: data,
    })
  },
  // 中融修改后新接口-净值走势
  [MARKETING_PRODUCT_QUERYFUNDNETVALYE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/queryFundNetValue',
      method: 'POST',
      data,
    })
  },
  // 中融修改后新接口-净值走势  返回全部数据
  [MARKETING_PRODUCT_QUERYFUNDNETVALYEFORDRAW](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/getFundNetValueForDraw',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QUERYFUNDINFO](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: true },
      url: '/marketing-fund/msp/queryFundInfo',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_FUND_QUERYFUNDPRIZE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: true },
      url: '/marketing-fund/msp/queryFundPrize',
      method: 'GET',
      params: data,
    })
  },
  // 中融修改后的新接口-基金产品详情
  [MARKETING_PRODUCT_QUERYFUNDINFO](_, data) {
    return this.$axios({
      // headers: {type: 'marketingApi', needUUID: true},
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-product/mobile/api/v1/fund/queryCustomerFundInfo',
      // method: 'GET',
      // params: data
      method: 'POST',
      data,
    })
  },
  // 易方达修改后的新接口-基金产品详情
  [MARKETING_PRODUCT_QUERYFUNDINFO_YFD](_, data) {
    return this.$axios({
      // headers: {type: 'marketingApi', needUUID: true},
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-product/mobile/api/v1/fund/queryCustomerFundInfo',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_FUND_QUERYFUNDMGRINFO](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: true },
      url: '/marketing-fund/msp/queryFundMgrInfo',
      method: 'GET',
      params: data,
    })
  },
  // 中融修改后的新接口-基金经理详情
  [MARKETING_PRODUCT_QUERYFUNDMGRINFO](_, data) {
    return this.$axios({
      // headers: {type: 'marketingApi', needUUID: true},
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-product/mobile/api/v1/fundManager/queryFundMgrInfo',
      // method: 'GET',
      // params: data
      method: 'POST',
      data,
    })
  },

  [MARKETING_FUND_QUERYFUNDRANGEBYDAY](_, data) {
    return this.$axios({
      // headers: {type: 'marketingApi', needUUID: true},
      headers: { type: 'marketingApi', needUUID: true },
      url: '/marketing-fund/msp/queryFundRangeByDay',
      method: 'GET',
      params: data,
    })
  },
  // 中融修改后的接口-每日涨跌
  [MARKETING_PRODUCT_QUERYFUNDRANGEBYDAY](_, data) {
    return this.$axios({
      // headers: {type: 'marketingApi', needUUID: true},
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-product/mobile/api/v1/fund/queryFundRangeByDay',
      // method: 'GET',
      // params: data
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_FUND_PERFORMANCE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryFundPerformance',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_FUND_QUOTATIONS](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryFundQuotations',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_FUND_MARKET_LIST](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryFundMarketList',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_FUND_MANAGER](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryFundManager',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_PUB_NOTE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryPubNote',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_FUND_BASE_INFO](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryFundBaseInfo',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_TRANSACTION_RATE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryTransactionRate',
      method: 'POST',
      data,
    })
  },
  [MARKETING_FUND_QRY_ZHONG_CANG_GU](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi', needUUID: false },
      url: '/marketing-fund/openmarketapi/qryZhongcanggu',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FIND_RECOMMENDED_FUND_BY_TYPE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findRecommendedFundByType',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FIND_ALL_BY_FUND_TYPE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findAllByFundType',
      method: 'POST',
      data,
    })
  },
}

export default {
  state: () => state,
  mutations,
  actions,
}
