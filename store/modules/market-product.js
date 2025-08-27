const MARKETING_PRODUCT_MGR_FINDALLDISPLAY =
  'MARKETING_PRODUCT_MGR_FINDALLDISPLAY'
const MARKETING_PRODUCT_MGR_FINDALLBYFUNDMANAGERCHANNEL =
  'MARKETING_PRODUCT_MGR_FINDALLBYFUNDMANAGERCHANNEL'
const MARKETING_PRODUCT_MGR_FINDBYID = 'MARKETING_PRODUCT_MGR_FINDBYID'
const MARKETING_PRODUCT_FINDBYID = 'MARKETING_PRODUCT_FINDBYID'
const MARKETING_PRODUCT_FINDALLBYFUNDCHANNEL =
  'MARKETING_PRODUCT_FINDALLBYFUNDCHANNEL'
const MARKETING_PRODUCT_FINDFUNDDETAIL = 'MARKETING_PRODUCT_FINDFUNDDETAIL'
const MARKETING_PRODUCT_FINDALLEXCLUSCHANNEL =
  'MARKETING_PRODUCT_FINDALLEXCLUSCHANNEL'
const MARKETING_PRODUCT_FINDFUNDRATELIST = 'MARKETING_PRODUCT_FINDFUNDRATELIST'
const MARKETING_PRODUCT_FINDCONTENT = 'MARKETING_PRODUCT_FINDCONTENT'
const MARKETING_PRODUCT_LABELFIND = 'MARKETING_PRODUCT_LABELFIND'
const MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE_SEARCH =
  'MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE_SEARCH'
const MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE =
  'MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE'
const MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE_GETFUNDLISTBYORGID =
  'MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE_GETFUNDLISTBYORGID'
const MARKETING_PRODUCT_GETFUNDTYPECONDITION =
  'MARKETING_PRODUCT_GETFUNDTYPECONDITION'
const MARKETING_PRODUCT_FUNDMANAGER_DETAILSBUJOBNUMBER =
  'MARKETING_PRODUCT_FUNDMANAGER_DETAILSBUJOBNUMBER'
const MARKETING_PRODUCT_FUNDMANAGER_FINDBYJOBNUMBER =
  'MARKETING_PRODUCT_FUNDMANAGER_FINDBYJOBNUMBER'
const MARKETING_PRODUCT_H5_FINDBYID = 'MARKETING_PRODUCT_H5_FINDBYID'
const MARKETING_PRODUCT_FUNDACTIVE = 'MARKETING_PRODUCT_FUNDACTIVE'
const MARKETING_PRODUCT_INFOMATIONACTIVE = 'MARKETING_PRODUCT_INFOMATIONACTIVE'
const MARKETING_PRODUCT_GET_SUBSCRIBE_STATUS =
  'MARKETING_PRODUCT_GET_SUBSCRIBE_STATUS'
const MARKETING_PRODUCT_REVIEWFUNDREPORT = 'MARKETING_PRODUCT_REVIEWFUNDREPORT'
const MARKETING_PRODUCT_GENERATEREPORT = 'MARKETING_PRODUCT_GENERATEREPORT'
const MARKETING_PRODUCT_FINDFUNDGENERATEREPORT =
  'MARKETING_PRODUCT_FINDFUNDGENERATEREPORT'
const MARKETING_PRODUCT_CALENDERLIST = 'MARKETING_PRODUCT_CALENDERLIST'
const MARKETING_PRODUCT_FINDSUBSCRIBEFUNDBYCHANNEL =
  'MARKETING_PRODUCT_FINDSUBSCRIBEFUNDBYCHANNEL'
const MARKETING_PRODUCT_QUERYLIST = 'MARKETING_PRODUCT_QUERYLIST'
const MARKETING_PRODUCT_EVENT_CHANNEL_FINDALL =
  'MARKETING_PRODUCT_EVENT_CHANNEL_FINDALL'
const MARKETING_PRODUCT_EVENT_PAGELIST = 'MARKETING_PRODUCT_EVENT_PAGELIST'
const MARKETING_PRODUCT_EVENT_DETAIL = 'MARKETING_PRODUCT_EVENT_DETAIL'
const MARKERING_FUND_FIND_DETAIL = 'MARKERING_FUND_FIND_DETAIL'
const MARKETING_PRODUCT_GETFUNDTYPE = 'MARKETING_PRODUCT_GETFUNDTYPE'
const MARKETING_PRODUCT_FIND_SUBSCRIBE_EXCLUSIVE_FUND_BYCHANNEL =
  'MARKETING_PRODUCT_FIND_SUBSCRIBE_EXCLUSIVE_FUND_BYCHANNEL'
const MARKETING_PRODUCT_EVENT_FIND_SUBSCRIBE_HKFUND =
  'MARKETING_PRODUCT_EVENT_FIND_SUBSCRIBE_HKFUND'
const MARKERING_PRODUCT_FUND_FINDOTCFUNDLIST =
  'MARKERING_PRODUCT_FUND_FINDOTCFUNDLIST'

const state = {
  fundActive: 0,
  infomationActive: 0,
}

const mutations = {
  [MARKETING_PRODUCT_FUNDACTIVE](state, fundActive) {
    state.fundActive = fundActive
  },
  [MARKETING_PRODUCT_INFOMATIONACTIVE](state, infomationActive) {
    state.infomationActive = infomationActive
  },
}

const actions = {
  [MARKETING_PRODUCT_MGR_FINDALLDISPLAY](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fundManager/findAllDisplay',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_MGR_FINDALLBYFUNDMANAGERCHANNEL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fundManager/findAllByFundManagerChannel',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_MGR_FINDBYID](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fundManager/findByJobNumber',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_FINDBYID](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findAllDisplay',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_H5_FINDBYID](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/h5/findAllDisplay',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_FINDALLBYFUNDCHANNEL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findByFundChannel',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FINDFUNDRATELIST](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/fundRate/list',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_FINDFUNDDETAIL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findFundDetail',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_FINDALLEXCLUSCHANNEL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findAllExclusiveChannel',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FINDCONTENT](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/find/content',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_LABELFIND](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/label/find',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE_SEARCH](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/list/exclusive',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/list/exclusive/orgList',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FUND_LIST_EXCLUSIVE_GETFUNDLISTBYORGID](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/list/exclusive/getFundListByOrgId',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_GETFUNDTYPECONDITION](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/getFundTypeCondition',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_GETFUNDTYPE](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/getFundType',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_FUNDMANAGER_DETAILSBUJOBNUMBER](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fundManager/detailsByJobNumber',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_FUNDMANAGER_FINDBYJOBNUMBER](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fundManager/findByJobNumber',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_GET_SUBSCRIBE_STATUS](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/getSubscribeStatus',
      method: 'GET',
      params: data,
    })
  },
  [MARKETING_PRODUCT_REVIEWFUNDREPORT](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/reviewReport',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_GENERATEREPORT](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/generateReport',
      method: 'POST',
      data,
    })
  },
  [MARKETING_PRODUCT_FINDFUNDGENERATEREPORT](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findFundValueReport',
      method: 'POST',
      data,
    })
  },
  // 基金事件日历
  [MARKETING_PRODUCT_CALENDERLIST](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/event/calenderList',
      method: 'POST',
      data,
    })
  },
  // 基金订阅列表
  [MARKETING_PRODUCT_FINDSUBSCRIBEFUNDBYCHANNEL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findSubscribeFundByChannel',
      method: 'POST',
      data,
    })
  },
  // 专享基金订阅列表
  [MARKETING_PRODUCT_FIND_SUBSCRIBE_EXCLUSIVE_FUND_BYCHANNEL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findSubscribeFundByExclusiveChannel',
      method: 'POST',
      data,
    })
  },
  // 基金事件日历搜索
  [MARKETING_PRODUCT_QUERYLIST](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/event/queryList',
      method: 'GET',
      params: data,
    })
  },
  // 基金事件频道
  [MARKETING_PRODUCT_EVENT_CHANNEL_FINDALL](_) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/event/channel/findAll',
      method: 'POST',
    })
  },
  // 根据频道分页查询事件列表
  [MARKETING_PRODUCT_EVENT_PAGELIST](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/event/pageList',
      method: 'POST',
      data,
    })
  },
  // 基金事件详情
  [MARKETING_PRODUCT_EVENT_DETAIL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/event/detail',
      method: 'GET',
      params: data,
    })
  },
  // 基金事件详情-查询订阅的港股通产品
  [MARKETING_PRODUCT_EVENT_FIND_SUBSCRIBE_HKFUND](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/event/findSubscribeHKFund',
      method: 'GET',
      params: data,
    })
  },
  // 产品详情
  [MARKERING_FUND_FIND_DETAIL](_, data) {
    return this.$axios({
      headers: { type: 'marketingApiForm' },
      url: '/marketing-product/mobile/api/v1/fund/findDetailByFundCode',
      method: 'POST',
      data,
    })
  },
  // 查询场外基金交易
  [MARKERING_PRODUCT_FUND_FINDOTCFUNDLIST](_, data) {
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/marketing-product/mobile/api/v1/fund/findOTCFundList',
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
