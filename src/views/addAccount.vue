<template>
  <div class="new-account">
    <h1>NewAccount</h1>
       <table class="customers">
      <tr>
            <th>Name</th>
            <th>Due</th>
            <th>Date</th>
            <th>Bal</th>
            <th>New Bal</th>
            <th>Interest</th>
            <th>Paid</th>
            <th>Purchases</th>
            <th>Min Due</th>
          </tr>
        <tr>
              <td><input type="text" class="w1" v-model="newAccount.name"></td>
              <td><input type="text" class="w0" v-model="newAccount.datedue"></td>
              <td><input type="text" class="w1" v-model="newAccount.statement_date"></td>
              <td><input type="text" class="w1" v-model="newAccount.previous_balance"></td>
              <td><input type="text" class="w1" v-model="newAccount.new_balance"></td>
              <td><input type="text" class="w1" v-model="newAccount.interest"></td>
              <td><input type="text" class="w1" v-model="newAccount.payment"></td>
              <td><input type="text" class="w1" v-model="newAccount.purchases"></td>
              <td><input type="text" class="w1" v-model="newAccount.minimum"></td>
          </tr>
    </table>
  </div>
</template>

<script>
//  module.exports = {

export default {
data() {
  return {
    newAccount: {
              name: "",
              datedue: "",
              statement_date: "",
              previous_balance: "",
              new_balance: "",
              interest: "",
              payment: "",
              purchases: "",
              minimum: "",
            }
  }
}
}
</script>

<style>

</style>