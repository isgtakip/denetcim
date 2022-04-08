<template>
 <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="title"
            prepend-inner-icon="mdi-calendar"
            readonly
            outlined
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
          @change="change_date()"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
</template>
<script>
/*eslint-disable*/
  export default {
    props:{     
    title: {
      type: String,
      default: null
    },
    },
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }),
     watch: {
      date(){ 
        this.$emit('update', this.date)
      }
    },
    methods:{
      change_date(){
        this.$emit('changed-date', this.date)
      }
    }  
  }
</script>
