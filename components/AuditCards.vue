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
      >
<v-card
    elevation="0"
    outlined
    >
 <v-list
      subheader
      two-line
      class="pt-2"
    >
      <v-list-item>
        <img
        class="mr-3"
        src="../assets/images/audits/audit_icon.png"
        alt="John"
      >
              <v-list-item-content>
          <v-list-item-title v-text="item.audit_form_name" style="font-weight:bold !important;color:#333;">{{item.audit_form_name}}</v-list-item-title>

          <v-list-item-subtitle v-text="item.updated_at"></v-list-item-subtitle>
        </v-list-item-content>

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
   </div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
</v-card>
      </v-col> </transition-group>
      </v-row>
   </v-container>
</div>
</template>
<script>
/*eslint-disable*/
export default {
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
      }

    },
    data() {
        return {
            value:20,
            sablonAra:""
        }
    },
    methods:{
       search: function(event) {
       this.$emit('searched', this.sablonAra)
    },
    }
}
</script>
<style>
.fade-item {
  transition: all 1s;
}
.fade-enter-active  {
  transition: opacity 1s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  transition: transform 1s;
  position: absolute;
    
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-leave-to{
  opacity: 0;

}
.fade-move {
  transition: transform 1s;
}

</style>