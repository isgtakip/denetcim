<template>
    <div>
        <v-list
          subheader
        >
          <v-list-item class="pl-0" style="min-height:50px;">
            <v-list-item-content>
              <v-list-item-title class="mb-0 pb-0 pt-0">İcon</v-list-item-title>
              <v-list-item-subtitle class="mt-0 pt-1">İsterseniz kendi iconunuzu ekleyebilir veya hazır listeden seçebilirsiniz</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-row class="cont">
            <v-col
            cols="12"
            lg="12"
            xs="12"
            md="12"
            sm="12"
            class="cont">
            <input type="file" class="filePicker" @change="pickFile" ref="inputBox"/>
        <div class="inputBox rounded-lg"  v-bind:class="{ greenBrdr: this.loaded, redBrdr: hasError }" >
            <img
            style="width:99px;height:99px;display:block;min-width:95px;object-fit: contain;border:0;outline: none;"
            :src="imageSource"
            v-bind:class="{ opacityErr: hasError }"
            />
            <template v-if="hasError">
            <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="red"
          v-bind="attrs"
          v-on="on"
          style="position:absolute;left:68px;bottom:63px;"
          >
         mdi-alert-circle
        </v-icon>
      </template>
      <span>{{ErrorMessage}}</span>
    </v-tooltip>
            </template>
               <v-btn
      color="blue-grey"
      class="ma-2 white--text addBtn"
      fab
      x-small
      :loading="loading"
      @click="inputClick()"
    >
            <v-icon
            small
            color="#ccc"
            >mdi-plus</v-icon></v-btn>
        </div>
        <div v-for="(item,index) in items" :key="index" class="inputBox small rounded-lg">
            <img :src="item.icon_url" style="width:49px;object-fit:contain;text-align:center;" @click="iconSelect(item.icon_url)"/>
        </div>
        </v-col>
        </v-row>
    </div>
</template>
<script>
/*eslint-disable*/
import { getFileImage } from '../src/utils'
export default {
    props:{
        items:{
            type:Array,
            default:null
        }
    },
    data(){
        return {
            files:[],
            perctange:0,
            loading:false,
            btnIcon:['mdi-plus'],
            loaded:false,
            hasError:false,
            ErrorMessage:'',
            imageSource:'data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7'

        }
    },
    methods:{
        iconSelect(a){
            this.files=[]
            this.loaded=false;
            this.hasError=false;
            this.loading=false;
            this.imageSource=a
        },
        inputClick(){
            this.$refs.inputBox.click();
        },
         getFileImage(image){
            if (this.files.length>0)  return this.imageSource=getFileImage(image)
            else return this.imageSource='data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7'

        },
        pickFile(event){
            this.files=[]
            this.loaded=false;
            this.hasError=false;
          

            let f = Array.prototype.slice.call(event.target.files)
           
            f.forEach(f => {
                if (!f.type.match("image.*")) {
                     this.hasError=true
                     this.loaded=false
                     this.loading=false
                     this.ErrorMessage="Desteklenmeyen Dosya Biçimi"
                     this.getFileImage(f)
                    return;
                    }
                
                    this.files.push(f);
                    this.getFileImage(f)
                    this.uploadFile(f);
                
            });

        },
        async uploadFile(f){
            this.loading=true;
            let that = this 

            const fd = new FormData()
            fd.append('file',f,f.name)

            const myUploadProgress = () => (progress) => {
            that.perctange = Math.floor((progress.loaded * 100) / progress.total)
            that.loading=true
            }

        
            var config = {
                onUploadProgress: myUploadProgress()
            };

            const sleep = (ms) => {
                return new Promise((resolve) => setTimeout(resolve, ms));
            };


            await this.$denetcimApi.$post('/icons',fd,config)
            .then(res => new Promise(resolve => setTimeout(() => resolve(res), 1500)))
            .then(res=>{
                console.log(res)
                that.loading=false
                //that.addIcon(res.file)
                that.perctange=0
                that.loaded=true
                that.hasError=false
            })
            .catch(e=>{
               sleep(1000)
               this.ErrorMessage=e.response.data.error.file
               if (e.response.status ==413) this. ErrorMessage="Dosya boyutu 2MB ' tan fazla olamaz"
    
               that.hasError=true
               that.loaded=false
               that.loading=false

            })

            
        }

    }
}
</script>
<style>
.inputBox{
    border:2px dashed #ccc;
    height:100px;
    width:100px;
    display:flex;
    cursor:pointer;
    float:left;

}
.small{
    width:50px;
    height: 50px;
    position: relative;
    bottom:0;
    margin-left:10px;
}
.greenBrdr{
    border:2px dashed #12a03c
}
.redBrdr{
    border:2px dashed #cf1b24
}
.filePicker{
    display:none;
}
.addBtn{
    position: relative;;
     top:70%;
     left:-25px;
}
.opacityErr{
    opacity: .2;
}
</style>