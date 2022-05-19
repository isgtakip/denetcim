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
    <img :src="require('@/assets/images/logo/sari_elektronik.jpg')" alt="logo" max-width="40px" width="40px">
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
                to="/"
                @click="logout"
            >
          <v-list-item-title>Güvenli Çıkış</v-list-item-title>
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
    <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title><b>{{ $auth.user.name }}</b></v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item
        link
        to='/audits'>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Denetlemelerim</v-list-item-title>
      </v-list-item>
         <v-list-group
        prepend-icon="mdi-exclamation"
      >
        <template v-slot:activator>
          <v-list-item-title>Denetleme Yönetimi</v-list-item-title>
        </template>
          <v-list-item
            link
            to="/denetleme-listesi"
          >
            <v-list-item-title>Denetleme Takvimi</v-list-item-title>
          </v-list-item>
        </v-list-group>
         <v-list-group
        prepend-icon="mdi-cog"
        v-can="'template-access'"
      >
        <template v-slot:activator>
          <v-list-item-title>Şablon Yönetimi</v-list-item-title>
        </template>
          <v-list-item
            link
            to="/audit_forms"
            v-can="'template-access'"
          >
            <v-list-item-title>Denetleme Şablonları</v-list-item-title>
          </v-list-item>
        </v-list-group>
           <v-list-group
        prepend-icon="mdi-plus"
      >
        <template v-slot:activator>
          <v-list-item-title>Firma Yönetimi</v-list-item-title>
        </template>
          <v-list-item
            link
            to="/firms"
            v-can="'firms-access'"
          >
            <v-list-item-title>Firma Listesi</v-list-item-title>

          </v-list-item>
          <v-list-item
            link
            to="/nace_kodlari"
            v-can="'nace-access'"
          >
            <v-list-item-title>Nace Kodları</v-list-item-title>

          </v-list-item>
           <v-list-item
            link
            to="/locations"
            v-can="'location-access'"
          >
            <v-list-item-title>Lokasyonlar</v-list-item-title>

          </v-list-item>
        </v-list-group>
        <v-list-group
        prepend-icon="mdi-account"
        v-can="'role-access' || 'user-access'"
      >
        <template v-slot:activator>
          <v-list-item-title>Kullanıcı Yönetimi</v-list-item-title>
        </template>
          <v-list-item
            link
            to="/users"
            v-can="'user-access'"
          >
            <v-list-item-title>Kullanıcı Listesi</v-list-item-title>
          </v-list-item>
           <v-list-item
            link
            to="/roles"
            v-can="'role-access'"
          >
            <v-list-item-title>Roller</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group
        prepend-icon="mdi-account"
        v-can="'customer-access'"
      >
        <template v-slot:activator>
          <v-list-item-title>Müşteri Yönetimi</v-list-item-title>
        </template>
          <v-list-item
            link
            to="/customers"
          >
            <v-list-item-title>Müşteri Listesi</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <Nuxt/>
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
  middleware: 'auth',
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
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
