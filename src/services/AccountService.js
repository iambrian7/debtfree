import Api from '@/services/Api'

export default {
  index (search) {
    console.log("AccountService.js index (getting all accounts*********")
    return Api().get('accounts')
  },
  show (lunchId) {
    return Api().get(`lunches/${lunchId}`)
  },
  delete (accountId) {
    return Api().delete(`accounts/${accountId}`)
  },
  post (account) {
    console.log(`AccountService.js post (add account): ${JSON.stringify(account, null, 3)} `)
    // return account
   return Api().post('accounts', account)
  },
  put (payload) {
    return Api().put(`accounts/${payload.id}`, payload.lunch)
  }
}
