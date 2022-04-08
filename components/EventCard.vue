<template>
<div>
<v-card
    elevation="0"
    outlined
>
 <v-list
      subheader
      two-line
      class="pt-2 ml-0"
    >
      <v-list-item
        class="pr-1 ml-0 pl-2"
      >
      <div class="audits_date">
          <span class="single-line pl-1 pr-1">{{startDateDay(startDate)}}</span>
          <span class="single-line">{{ startDateMonth(startDate)}}</span>
      </div>
        <v-list-item-content class="mr-5" >
          <v-list-item-title v-text="formatString(locationName)" style="font-size:12px;" ></v-list-item-title>
          <v-list-item-subtitle v-text="'Planlandı'" class="sbtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
    <div class="text-center mr-1" style="font-size:8px;">
    <v-progress-circular
      :rotate="360"
      :size="40"
      :width="3"
      :value="parseInt(tamamlanmaOrani1)"
      color="blue"
    >
       {{ parseInt(tamamlanmaOrani1) }}%
    </v-progress-circular></div>
        </v-list-item-action>
        <v-list-item-action class="ml-0 mr-0">
            <div class="open_btn">
     <v-btn
        icon
        @click="show = !show"
        large
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
     <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        Düzenle
      </v-btn>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        SİL
      </v-btn>
    </v-card-actions>
      </div>
    </v-expand-transition>
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
            show: false,
            value:0,
            tamamlanmaOrani1:0,
        }
    }
}
</script>
<style >
.audits_date{
    border:1px dashed #ccc;
    padding:2px;
    display: block;
    width: 55px;
    text-align: center;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 6px;
    padding-right: 6px;
    padding-left: 8px;
    margin-right: 10px;
    font-size:11px;
  
    font-weight: bold;
    color: rgb(29, 29, 29);
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