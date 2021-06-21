<template>
<div>
<v-card
    elevation="1"
    outlined>
 <v-list
      subheader
      two-line
      class="pt-2"
    >
      <v-list-item
        v-for="file in files"
        :key="file.title"
      >
        <v-avatar class="mr-5" size="55">
      <img
        src="https://s3-symbol-logo.tradingview.com/migros-ticaret--600.png"
        alt="John"
      >
    </v-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="file.title" ><b>asdasd</b></v-list-item-title>

          <v-list-item-subtitle v-text="file.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
         <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="55"
      :width="3"
      :value="value"
      color="blue"
    >
      {{ value }}%
    </v-progress-circular></div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
</v-card>
<v-card
    elevation="1"
    outlined
    class="mt-3">
 <v-list
      subheader
      two-line
      class="pt-2"
    >
      <v-list-item
        v-for="file in files"
        :key="file.title"
      >
        <v-avatar class="mr-5" size="55" border>
      <img
        src="data:image/jpeg;base64,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"
        alt="John"
      >
    </v-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="'Defacto Maltepe'" ><b>asdasd</b></v-list-item-title>

          <v-list-item-subtitle v-text="'Cevizli, Tugay Yolu Cd. No:67, 34846 Maltepe/İstanbul'"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
         <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="55"
      :width="3"
      :value="value"
      color="blue"
    >
      {{ value }}%
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
    data() {
        return {
            value:20,
             files: [
    
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Ataşehir Blv. No:18/1 · (0216) 579 30 50',
          title: '3M Migros Ataşehir',
        },
      ],
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
  
      ],
        }
    }
}
</script>
