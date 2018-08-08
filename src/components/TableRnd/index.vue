<template>
  <div>
    <table>
      <thead>
       <tr>
        <th>Id</th>
        <th>Body</th>
        <th>Title</th>
       </tr>
      </thead>
      <tbody>
       <tr>
        <td v-for="(row, rowIndex) in customFields" :key="rowIndex">
          <span v-html="row.formator ? row.formator(rowIndex): row.label"></span>
        </td>
       </tr>
      </tbody>
      
    </table>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fields: this.config.fields,
      customFields: [],
    };
  },
  created() {},
  mounted() {
    var result = Object.keys(this.fields).map(key => {
      this.customFields.push(this.fields[key]);
    });
    console.log(this.customFields);
  },
};
</script>

<style scoped>
 table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
