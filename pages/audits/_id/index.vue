<template>
    <div><AuditCards :items="audit_form" :colLength="12" :searchShow="false" :mode="true"/></div>
</template>
<script>
/*eslint-disable*/
export default {
     async asyncData ({ params,$axios }) {
    $axios.defaults.withCredentials = true
      const [audit_form] = await Promise.all([
      $axios.get(`https://akeldenetcim.com/api/public/api/audits/${params.id}`),
    ])
    
     return {audit_form}
  },
  /*
     async asyncData({ params, $denetcimApi }) {
      const audit_form = await $denetcimApi.$get(`audits/${params.id}`)
      return {audit_form}
    },
    */
}
</script>