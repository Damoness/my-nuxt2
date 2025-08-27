const UCSYSTEM_API_CONFIG = 'UCSYSTEM_API_CONFIG'

const state = {}

const mutations = {}

const actions = {
  [UCSYSTEM_API_CONFIG](_, data) {
    // enterprise 企业  staff 渠道  employee 员工  knowledge 知识库
    return this.$axios({
      headers: { type: 'marketingApi' },
      url: '/uc-system/mobile/api/v1/config/findByType',
      method: 'GET',
      params: data,
    })
  },
}

export default {
  state: () => state,
  mutations,
  actions,
}
