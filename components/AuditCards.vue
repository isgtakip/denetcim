<template>
<div>
   <v-container fluid>
     <v-row v-if="searchShow">
       <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
        class="pb-0 pl-0 pr-0 pt-5">
        <v-text-field
            label="Şablon ara..."
            clearable
            prepend-inner-icon="mdi-magnify"
            v-on:keyup="search"
            v-model="sablonAra"
            outlined
            dense
          ></v-text-field>
       </v-col>
     </v-row>
     <v-row>
          <transition-group name="fade" tag="div" class="layout row wrap">
      <v-col
        v-for="item in items"
        :key="item.audit_form_id"
        cols="12"
        :md="colLength"
        sm="12"
        :lg="colLength"
        class="mb-0 mt-0 pb-0 pt-2"
      >
      <div>
<v-card
    elevation="1"
    outlined
    class="mb-0 pt-0"
    :to="mode ? `/audits/${item.audit_location_id}/forms/${item.audit_form_id}` : ''"
    >
 <v-list
      subheader
      two-line
      class="pt-2"
    >
      <v-list-item>
        <img
        class="mr-3"
        :src="envfile+'/storage/files/'+item.icon_url"
        style="width: 49px; object-fit: contain; text-align: center;"
      >
              <v-list-item-content>
          <v-list-item-title v-text="item.audit_form_name" style="font-weight:bold !important;color:#333;">{{item.audit_form_name}}</v-list-item-title>

          <v-list-item-subtitle v-text="item.updated_at"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="mode">
         <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="55"
      :width="3"
      :value="parseInt(item.tamamlanma_orani)"
      color="blue"
    >
     {{ parseInt(item.tamamlanma_orani) }}%
    </v-progress-circular></div>
        </v-list-item-action>
        <v-list-item-action v-if="searchShow">
         <div class="text-center">
           <v-btn
      color="primary"
      small
      dense
      outlined
      link
      :to="`/audit_forms/${item.audit_form_id}`"
    >
      Form Oluştur
    </v-btn>
    <v-menu
            bottom
            left
            :offset-x=true
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                  <v-icon
                  color="green darken-2">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link @click="editAudit(item)">
                <v-list-item-title>Düzenle</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="deleteAudit(item)">
                <v-list-item-title>Sil</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
   </div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
</v-card>
      </div>
      </v-col> </transition-group>
      </v-row>
   </v-container>
</div>
</template>
<script>
/*eslint-disable*/
export default {
  computed: {
  classObject: function () {
    if (this.mode) return "`/audit_forms/${item.audit_form_id}`"
    else return false
  },
  envfile() {
      return process.env.baseURL;
  },
},
    props:{
      items:{
        type:Array,
        default:null,
      },
      colLength:{
        type:Number,
        default:6,
      },
      searchShow:{
        type:Boolean,
        default:true,
      },
      mode:{
        type:Boolean,
        default:false
      },

    },
    data() {
        return {
            value:20,
            sablonAra:"",
            tamamlanma_orani:0,
        }
    },
    methods:{
       search: function(event) {
       this.$emit('searched', this.sablonAra)
    },
      deleteAudit(item){
          this.$emit('clicked-delete', item)
      },
      editAudit(item){
          this.$emit('clicked-edit', item)
      }
    }
}
</script>
<style>
.fade-item {
  transition: all .2s;
}
.fade-enter-active  {
  transition: opacity .2s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  transition: transform .2s;
  position: absolute;
    
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-leave-to{
  opacity: 0;

}
.fade-move {
  transition: transform .8s;
}

</style>