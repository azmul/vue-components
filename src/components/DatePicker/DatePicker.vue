<template>
  <div id="app">
    <datepicker v-model="date"></datepicker>
  </div>
</template>

<script>
import Datepicker from 'simple-vue-datepicker';

export default {
  name: "datepicker",
  components: {
    Datepicker
  },
  data() {
    return{
      date: new Date(2016, 9,  16),
      disabled: {
        to: new Date(2016, 0, 5), // Disable all dates up to specific date
        from: new Date(2016, 0, 26), // Disable all dates after specific date
        days: [6, 0], // Disable Saturday's and Sunday's
        dates: [ // Disable an array of dates
            new Date(2016, 9, 16),
            new Date(2016, 9, 17),
            new Date(2016, 9, 18)
        ]
    }
    }
  },
};
</script>

