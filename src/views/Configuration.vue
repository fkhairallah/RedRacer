<template>
 
    <v-layout column class="transparent">
      <v-card v-for="(waypoint, i) in waypoints" :key="i" class="ma-2">
        <v-container>
        <v-row no-gutters justify="space-between">
          <v-col cols="2">
            <v-avatar v-if="waypoint.extensions" color="primary">
              <span class="white--text headline">W</span>
            </v-avatar>
            <v-avatar v-else color="orange">
              <span class="white--text headline">M</span>
            </v-avatar>
          </v-col>
          <v-col xs8 md6 class="ma-0 pa-0">
            <p class="ma-0">{{ waypoint.name }}</p>
            <span class="caption" v-if="waypoint.extensions"
              >{{ waypoint.extensions.relativeName }}:
              {{ waypoint.extensions.relativeRange }} nm @{{
                waypoint.extensions.relativeBearing
              }}</span
            >
            <p class="caption">{{dTools.GPSPoint.toDMDecimal(waypoint.lat)}} [*] {{ dTools.GPSPoint.toDMDecimal(waypoint.lon) }}</p>
          </v-col>

          <v-col cols="2">
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon outlined v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <EditWaypoint :waypoint="waypoint" :waypointIndex="i" />
                  </v-list-item>
                  <v-list-item>
                    <v-btn>FOO</v-btn>
                  </v-list-item>
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
        </v-container>
      </v-card>
    </v-layout>

</template>

<script>
import MYC from "../assets/waypoints.json";
import EditWaypoint from "../components/Waypoint";
import * as dTools from "red-regatta";


export default {
  name: "Configuration",
  mixins: [dTools],
  components: {
    EditWaypoint,
  },
  mounted: function () {
    console.log("Route is", this.$route, this.waypoints.name);
  },
  data() {
    return {
      dTools,
      waypoints: MYC.waypoints,
      items: [{ title: "Delete" }, { title: "Share..." }, { title: "xyz" }],

    };
  },
  computed: {
    parentMenu() {
      console.log(this.$refs.cMenu);
      return this.$refs.cMenu;
    },
  },
};
</script>

<style>
</style>