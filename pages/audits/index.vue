<template>
<div>
<Todocard
v-for="audit in getallaudits"
:key="audit.audit_location_id"
:startDate="audit.start_date"
:locationName="audit.firma_tam_unvan"
:adres="audit.firm_adres"
:il="audit.il"
:ilce="audit.ilce"
:tamamlanmaOrani="audit.tamamlanma_orani"
:link="audit.audit_location_id"
class="mb-2"
/>
<div class="mt-3"></div>
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
  layout:"default",
  computed: {
    ...mapState({
      audits: (state) => state.audits.audits,
      }),
      ...mapGetters({
              // you won't need to destructure if
              getauditscount: "audits/getauditscount",
              getauditsperpage: "audits/getauditsperpage",
              getallaudits: "audits/getallaudits",
      }),
  },
   created() {
    this.getAuditsWithPage();
  },
   methods:{
      ...mapActions({
      getAuditsWithPage: "audits/getAuditsWithPage",
    }),
   },
  data(){
    return{
      
    }
  }
}
</script>