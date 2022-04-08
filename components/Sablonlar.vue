<template>
<div>
  <Datatable
        :headers="headers"
        :items="getAuditFormsWithPages"
        :loading="loading"
        :items-length="getAuditFormsCount"
        @handle-options="handleOptions"
        :title="datatitle"
        ref="dt"
        :keyOfItem="keyItem"
        :showSelect="true"
        @clicked-row="clickedRow"
        />
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
      computed:{
      ...mapState({
        audit_forms_with_page : state=> state.audit_forms.audit_forms_with_page,   
        }),
        ...mapGetters({  // you won't need to destructure if 
        getAuditFormsCount: 'audit_forms/getAuditFormsCount',
        getAuditFormsPerPage :'audit_forms/getAuditFormsPerPage',
        getAuditFormsWithPages:'audit_forms/getAuditFormsWithPages',
        }),   
        },
         methods:{
          ...mapActions(
            {
            getAuditFormsWithPage:'audit_forms/getAuditFormsWithPage',
            }),
                    handleOptions(options,search){
                    let obj ={arama:search,page:options.page,per_page:options.itemsPerPage}
                    this.loading=true
                    this.getAuditFormsWithPage(obj).then(result => {
                        this.loading = false
                    })
                    },
                    clickedRow(val){
                            this.secilen_sablon=val
                    }
         },
          data () {
             return {
                headers: [
                {text: 'Şablon Adı', value: 'audit_form_name', sortable: false},
                {text: 'Şablon Form No', value: 'audit_form_no', sortable: false},
                ],
                loading:true,
                datatitle:'Şablonlar',
                keyItem:'audit_form_id',
                roles:[],
                userId:0,
                secilen_sablon:[],


          }
}
}
</script>