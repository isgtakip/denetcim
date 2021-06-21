<template>
    <div>
      <input type="file" @change="onFileSelected" style="display:none;" ref="fileInput" accept="image/*"/>
      <v-container fluid>
          <Container
          @drop="onDrop"
          lock-axis="x"
          orientation="horizontal"><Draggable v-for="image in image_previews" :key="image">
      <div class="inputBox">
        <v-img
        :aspect-ratio="1/1"
        :src="image"
        max-width="50"
        ></v-img>
          </div></Draggable>
           <div class="inputBox" @click="inputBoxClicked()">
              <v-icon>mdi-plus</v-icon>
          </div></Container>
      </v-container>
    </div>
</template>
<script>
/*eslint-disable*/
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from '../src/utils'
export default {
   components: { Container, Draggable },
   data(){
       return{
           image_previews:[],
       }
   },
   methods:{
       onFileSelected(event){
           let files = Array.prototype.slice.call(event.target.files)

           files.forEach(f => {
               if (!f.type.match("image.*")) return;

               let reader= new FileReader();
               let that = this;
               reader.onload = function (event) {
               that.image_previews.push(event.target.result);
               }
               reader.readAsDataURL(f); 
           });
       },
       inputBoxClicked(){
           this.$refs.fileInput.click();
       },
       onDrop(dropResult) {
        this.image_previews = applyDrag(this.image_previews, dropResult);
        },
   } 
}
</script>
<style>
.inputBox{
    display: flex;
    align-items: center;
    justify-content: center;    
    border:2px dashed #ccc;
    width:100px;
    height:100px;
    float:left;
    margin-right: 10px;
    cursor:pointer;
}
</style>