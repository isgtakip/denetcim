<template>
<div>
  <v-text-field
            v-model="search"
            label="Denetleme Ara"
            append-icon="mdi-magnify"
            outlined
            single-line
            dense
            small
            class="mb-2"
            hide-details="true"
            @input="debounceInput"
          ></v-text-field>
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
<div class="mt-3 text-center">
   <v-pagination
      v-model="page"
      :length="getauditslastpage"
      @input="onPageChange"
      circle>
      </v-pagination>
</div>
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
              getauditslastpage: "audits/getauditslastpage",
      }),
  },
   created() {
      let obj =
            {
            arama:"",
            page:1,
            status:"Active"
            };

    this.getAuditsWithPage(obj);
  },
   methods:{
      ...mapActions({
      getAuditsWithPage: "audits/getAuditsWithPage",
    }),
    debounceInput: _.debounce(function () {
    this.handleOptions(this.page,this.search,"Active");
    }, 300),
    onPageChange(page){
      this.page=page;
      this.handleOptions(page,this.search,"Active")
    },
    handleOptions(page, search,status) {

            let obj =
            {
            arama:search,
            page:page,
            status:status
            };


            this.getAuditsWithPage(obj).then(result => {
                  console.log(result)
            })
          },
   },
  data(){
    return{
      page:1,
      search:""
    }
  }
}
</script>