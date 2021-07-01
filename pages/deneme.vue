<template>
    <Upload :exitingfiles="icons"/>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
    computed:{
      ...mapState({
        icons : state=> state.icons.icons,
    }),
    },
     methods:{
      ...mapActions({
        getIcons:'icons/getIcons',
        }),
    },
    async created() {
      await this.getIcons();
    },
    data(){
        return{

        }
    }
}
</script>