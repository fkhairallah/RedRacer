<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn icon :to="'/'">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            width="40"
        /></v-btn>
        <span>[RED] Racer</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn color="primary" depressed>
        <v-icon color="white">mdi-hammer-screwdriver</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
        <!-- If using vue-router -->
        <router-view></router-view>
    </v-main>

    <v-footer app height="30" class="grey" v-show="$route.name == 'Home'">
      <v-layout justify-space-around>
        <p xs12 class="caption">
          © Copyrights 2020 Deligent LLC, all rights reserved
        </p>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: "App",


  data: () => ({
    //
  }),
  methods: {

  },
};
</script>


