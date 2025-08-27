import Vue from 'vue'
import Vuex from 'vuex'
import ucSystem from './modules/uc-system'
import advGoldTradeZone from './modules/advGoldTradeZone'
import marketProduct from './modules/market-product'
import marketFund from './modules/market-fund'
Vue.use(Vuex)

export function store() {
  return new Vuex.Store({
    modules: {
      ucSystem,
      advGoldTradeZone,
      marketProduct,
      marketFund,
    },
    actions: {},
  })
}
export default store
