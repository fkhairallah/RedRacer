<template>
  <v-container fluid fill-height class="backImage ma-0 pa-0">
    <v-layout column class="transparent">
      <v-layout row justify-space-around>
        <v-flex xs8 md6>
          <v-card
            outlined
            tile
            elevation="5"
            class="pa-2 my-5"
            v-for="link in links"
            :key="link.title"
            router
            :to="link.route"
          >
            <p class="caption">{{ link.description }}-{{ $globals.name }}</p>
            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-btn outlined block dark :class="link.color" :to="link.route">{{
                link.title
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  mounted: function () {
    console.log("Route is", this.$route);
    console.log(this.$globals.name);
  },
  data() {
    return {
      links: [
        {
          icon: "view-dashboard",
          title: "On Land",
          description: "Configure the boat and app",
          color: "primary",
          route: "/configuration",
        },
        {
          icon: "view-dashboard",
          title: "Start Line",
          description: "Marks and course configured",
          color: "red",
          route: "/start",
        },
        {
          icon: "view-dashboard",
          title: "Race Course",
          description: "Race course",
          color: "green",
          route: "/race",
        },
      ],
    };
  },
};
</script>

<style scoped>
.backImage {
  background-image: url("../assets/Sunrise.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
