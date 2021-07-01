<template>
    <div>
      <input
      type="file"
      @change="onFileSelected"
      style="display:none;"
      ref="fileInput"
      accept="image/*"
      />
      <v-container fluid>
          <v-row>
           <v-card
           v-for="(icon,index) in exitingfiles"
           :key="'A'+index"
            width="100"
            height="130"
            class="rounded-card mr-3 mb-3"
            >
            <v-card-actions class="justify-center text-center fill-height">
            <img :src="icon.icon_url" width="50" stye="object-fit:cover"/>
            </v-card-actions></v-card>
            <div
            v-for="(prog,index) in progressInfos"
           :key="index">
             <v-card
             v-if="prog.uploaded==false"
            width="100"
            height="130"
            class="rounded-card mr-3 mb-3"
            :loading="prog.uploaded==false"
            >
            <v-card-actions class="justify-center text-center fill-height">
            <img :src="getFileImage(prog.file)" width="50" stye="object-fit:cover"/>
            </v-card-actions></v-card></div>
            <v-card
            width="100"
            height="130"
            class="rounded-card"
            >
            <v-card-actions class="justify-center text-center fill-height">
              <v-btn
      :loading="loading"
      :disabled="loading"
      color="blue-grey"
      class="ma-2 white--text"
      fab
      small
      @click="inputBoxClicked()"
    >
      <v-icon dark>
        mdi-cloud-upload
      </v-icon></v-btn></v-card-actions></v-card></v-row>
        </v-container>
    </div>
</template>
<script>
/*eslint-disable*/
import { getFileImage } from '../src/utils'
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
   props:{
       exitingfiles:{
           type:Array,
           default:null,
       }
   },
   data(){
       return  {
           files:[],
           progressInfos: [],
           loading:false,
       };
   },
   created() {

   },
   methods:{
        ...mapActions({
        addIcon:'icons/addIcon'
        }),
        getFileImage(image){
            return getFileImage(image)
        },
     
       onFileSelected(event){

           let f = Array.prototype.slice.call(event.target.files)
           let index=this.files.length
         

           f.forEach(f => {

               if (!f.type.match("image.*")) return;

               this.files.push(f);
               this.progressInfos.push({percentage: 0, file: f, uploaded:false})

               this.onUpload(f,index);
               index++;
           });

       },
       inputBoxClicked(){
           this.$refs.fileInput.click();    

       },
       onUpload(f,index){
            let that=this

            const fd = new FormData();
            fd.append('file',f,f.name)


            const myUploadProgress = (index) => (progress) => {
            that.progressInfos[index].percentage = Math.floor((progress.loaded * 100) / progress.total)
            that.loading=true
            }

        
            var config = {
                onUploadProgress: myUploadProgress(index)
            };
            
                
            this.$denetcimApi.$post('/icons',fd,config)
            .then(res=>{
                console.log(res)
                that.progressInfos[index].uploaded=true
                that.loading=false
                that.addIcon(res.file)
            })
            .catch(e=>{
               console.log(e.response.status) // 401
               console.log(e.response.data.error.file)
            })
       }

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
.inputbox img{
    position:absolute
}
.close-button{
    box-shadow: 0 0 0.25em 0.25em rgba(0, 0, 0, 0.25);
    width:20px;
    height:20px;
    border-radius: 20px;
    background-color:rgb(240, 95, 95);
    position: absolute;
    display: flex;
    align-content: center;
    padding: 2px;
    color:white;

}
.rounded-card{
    border-radius:10px !important;
    background-color:#F5F5F6  !important;
}
</style>