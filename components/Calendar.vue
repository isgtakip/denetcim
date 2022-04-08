<template>
  <div class='app'>
    <FullCalendar :options='calendarOptions'  />
  </div>
</template>

<script>
/*eslint-disable*/
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
  components: {
    FullCalendar
  },
   computed: {
        ...mapState({
            audits: (state) => state.audits.audits,
        }),
         ...mapGetters({
              // you won't need to destructure if
              getauditscount: "audits/getauditscount",
              getauditsperpage: "audits/getauditsperpage",
              getallaudits: "audits/getallaudits",
      }),
      },
         data() {
    return {
      calendarOptions: {
        plugins: [interactionPlugin, timeGridPlugin,dayGridPlugin,listPlugin ],
        initialView: 'dayGridMonth',
        themeSystem: 'standard',
        nowIndicator: true,
        editable: true,
        height: 500,
        fixedWeekCount:false,
        showNonCurrentDates:false,
        locale: 'tr',
        initialEvents: [
          { title: 'Rize Denetlemesi', start: '2022-03-03' }
        ],
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listMonth'
        },
      }
    }
  }
}
</script>

<style>
  .app {
   /*font-family: Arial, Helvetica Neue, Helvetica, sans-serif;*/
    font-size: 12px;
  }
  .fc-icon-chevron-left{
    /* vertical-align: middle; */
    /* font-size: 1.5em; */
    vertical-align: top !important;
    font-size:10px;
}
.fc-icon-chevron-right{
    /* vertical-align: middle; */
    /* font-size: 1.5em; */
    vertical-align: top !important;
    font-size:10px;
}
.fc .fc-daygrid-day-number {
    position: relative;
    z-index: 4;
    padding: 3px;
    font-size: 10px;
    color: #000;
}
.fc-scrollgrid-sync-inner a{
    color:#000;
    
}
h2.fc-toolbar-title{
    font-size:14px !important;
}
</style>