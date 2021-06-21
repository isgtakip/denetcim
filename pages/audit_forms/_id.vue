<template>
    <div>
        <AuditCards :items="audit_form" :colLength="12" :searchShow="false"/>
    <Modals
    :mdlText="MdlText"
    :showbtn="false"
    ref="modals"
    @clicked-save="clickedSave">
    </Modals>
    <v-row>
       <v-col
       cols="12"
        md="3"
        sm="12"
        lg="3"
        class="pt-7">
        <v-card
    elevation="0"
    outlined
    >
     <v-card-title class="white--text primary " style="font-size:16px;">
     Şablon Bölümleri
      <v-spacer></v-spacer>
      <v-btn
        color="white"
        class="text--primary"
        fab
        small
        dense
        @click="showModal"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
        <v-divider></v-divider>
         <Container
    @drop="onDrop"
    lock-axis="y"
    :drop-placeholder="dropPlaceholderOptions"
     drag-handle-selector=".column-drag-handle"
    ><Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item pt-5 pb-5" @click="activate(item.id)" :class="{ active : active_el == item.id }">
          <span class="column-drag-handle" style="float:left; padding:0 10px;"><v-icon color="red" class="handle mt-0">mdi-cursor-move</v-icon></span>
          <span>{{item.data}}</span>
          <span style="float:right;padding-right:10px;">
            <v-icon color="gray" class="handle mt-0">mdi-pencil</v-icon>
            <v-icon color="gray" class="handle mt-0">mdi-delete</v-icon></span>
        </div>
          </Draggable>
        </Container> </v-card></v-col>
    </v-row>
    </div>
</template>
<script>
/*eslint-disable*/
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from '../../src/utils'
export default {
     async asyncData({ params, $denetcimApi }) {
      const audit_form = await $denetcimApi.$get(`/audit_forms/${params.id}`)
      return { audit_form }
    },
    components: { Container, Draggable },
    data(){
        return{
            items:[
                { id: 1, data: "Draggable 1" },
                { id: 2, data: "Draggable 2" },
                { id: 3, data: "Draggable 3" },
                ],
                dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true,
            },
              active_el:0,
              MdlText:"Şablon Bölüm Ekle",
        }
    },
     methods: {  
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    },
    activate: function(id) {
      this.active_el=id;
      // some code to filter users
    },
    showModal(){
       this.$refs.modals.dialog = true;
    },
    clickedSave(){

    }
     }
}
</script>
<style>
.draggable-item{
    border-bottom:1px solid #efefef;
    cursor:pointer;
}
.column-drag-handle{
    cursor:move;
}
.active{
    background-color: #efefef;
}
</style>