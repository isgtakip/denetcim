<template>
  <div class="text-left mt-0 pt-0">
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="purple"
          dark
          v-bind="attrs"
          v-on="on"
          class="mt-0 ml-0 mb-4"
        >
         Yanıt Seti Seç
        </v-btn>
      </template>
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-item
          v-for="option_set in option_sets"
          :key="option_set.set_id"
          @click="yanit_seci_sec(option_set)"
        >
          </v-list-item-avatar>
          <v-list-item-title>{{ option_set.options }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
  export default {
    data: () => ({
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    }),
    computed:{
   ...mapState({
        option_sets:  state=> state.option_sets.option_sets,
   }),  
},
async created() {
       await this.getOptionSets();
},
methods:{
...mapActions(
        {
        getOptionSets:'option_sets/getOptionSets'
  }),
  yanit_seci_sec(option_set){
    this.sheet=false;
    this.$emit('option-sets', option_set);
  }
}
  }
</script>