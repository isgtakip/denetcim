<template>
    <div><AuditCards :items="audit_form" :colLength="12" :searchShow="false" :mode="true"/></div>
</template>
<script>
/*eslint-disable*/
export default {
    async asyncData({env,params,$axios}) {
      $axios.defaults.withCredentials = true
      const audit_form = await $axios.$get(env.apiURL+`/audits/${params.id}`)
      return { audit_form }
    }
}
</script>