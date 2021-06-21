<template>
<v-app>
  <v-app-bar
  app
  dense
  color="white"
  fixed
  flat
  >
  <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-avatar :tile="true">
    <img :src="require('@/assets/images/logo/sari_elektronik.jpg')" alt="logo">
  </v-avatar>
    <v-toolbar-title>
      Denetçim <span style="font-weight:bold;">v0.1</span></v-toolbar-title>
    <!-- -->

    <v-spacer></v-spacer>

<v-menu offset-y>
    <template v-slot:activator="{ on }">
        <v-btn text v-on="on" color="grey" class="text--darken-2">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>Menu</span>
        </v-btn>
    </template>
        <v-list>
            <v-list-item
                v-for="(link,idx) in links"
                :key="idx"
                :to="link.route"
            >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
     <v-navigation-drawer
      v-model="drawer"
      left
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item
        link
        to='/'>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Anasayfa</v-list-item-title>
      </v-list-item>

         <v-list-group
        :value="true"
        prepend-icon="mdi-cog"
      >
        <template v-slot:activator>
          <v-list-item-title>Ayarlar</v-list-item-title>
        </template>
          <v-list-item
            link
            to="/audit_forms"
          >
            <v-list-item-title>Denetleme Şablonları</v-list-item-title>

          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <nuxt />
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
/*eslint-disable*/
export default {
  name:"default",
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
       links: [
          { text: 'Ayarlar',route:'/ayarlar' },
        ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
