<template>
<div>
<v-card
    elevation="1"
    outlined
    :to="`/audits/${link}`">
 <v-list
      subheader
      two-line
      class="pt-2"
    >
      <v-list-item
      >
      <div class="audits_date1">
          <span class="single-line pl-1 pr-1">{{startDateDay(startDate)}}</span>
          <span class="single-line">{{ startDateMonth(startDate)}}</span>
      </div>
        <v-list-item-content>
          <v-list-item-title v-text="formatString(locationName)" ><b>asdasd</b></v-list-item-title>
          <v-list-item-subtitle class="pt-3" v-text="formatString(adres)"></v-list-item-subtitle>
          <v-list-item-subtitle>{{ il }} /{{ ilce}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
         <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="55"
      :width="3"
      :value="parseInt(tamamlanmaOrani1)"
      color="blue"
    >
      {{ parseInt(tamamlanmaOrani1) }}%
    </v-progress-circular></div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
</v-card>
</div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{
    startDate:{
      type: String,
      default:null,
    },
    locationName:{
      type:String,
      default:null,
    },
    adres:{
      type:String,
      default:null,
    },
     il:{
      type:String,
      default:null,
    },
     ilce:{
      type:String,
      default:null,
    },
     tamamlanmaOrani:{
       type:String,
       default:0
     },
     link:{
       type:Number,
       default:null,
     }
  },
    mounted(){
      var a = this.tamamlanmaOrani;
      this.tamamlanmaOrani1=0;
      setTimeout(() => {
                 this.tamamlanmaOrani1=a
      }, 100);
    },
    methods:{
      startDateMonth(str) {
        const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
          ];
        const now = new Date(str);
        return monthNames[now.getMonth()]
      },
      startDateDay(str){
      const now = new Date(str);
      if (now.getDate() < 10) return " 0"+ now.getDate();
      else return ""+now.getDate(); 
      },
      formatString(str) {
      if(str!=null) return str.replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/^[^ ]/g, match => (match.toUpperCase()));
      else return ''
   }
    },
    data() {
        return {
            value:0,
            tamamlanmaOrani1:0,
        }
    }
}
</script>
<style >
.audits_date1{
       /* border: 1px dashed #ccc; */
    padding: 2px;
    display: block;
    width: 68px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 6px;
    padding-right: 6px;
    padding-left: 7px;
    margin-right: 15px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    background-color: #2c9ddf;
}
.single-line{
    width:100%;
}
.sbtitle{
    color: white !important;
    padding: 5px;
    font-weight: bold;
    font-size: 12px;
    border-radius: 3px;
    background-color:#17a2b8;
    color:white;
    flex: none !important;
}
</style>