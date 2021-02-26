  <template>
  <v-container>
    <v-row>
      <v-col>
        <EditWaypoint :waypointIndex="55" :waypoint="myc" />
      </v-col>
      <v-col>
        <p>
          Global: {{ $globals.count }} -- VueX {{ myGlobalCount }}/{{ $store.state.count }}
           
        </p>
        <p>Getter(double):  {{$store.getters.doubleCount}} </p>
        <v-btn @click="$store.dispatch('reset')">VueX Action delayed Reset</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
              Click Me
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Privacy Policy
            </v-card-title>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col>
        <p>{{ nice }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditWaypoint from "../components/Waypoint";
import * as dTools from "../plugins/GPSPoint";

export default {
  name: "Starting",
  components: {
    EditWaypoint,
  },
  mounted: function () {
    console.log("mounted");
    this.intrvl = setInterval(() => {
      console.log(this.$globals.count++);
      this.$store.commit("increment",this.$globals.count);
    }, 1000);
  },
  beforeDestroy: function () {
    clearInterval(this.intrvl);
    console.log("interval cleared");
  },
  computed: {
    nice() {
      var ptCoord = this.myc.lat;
      var d = Math.trunc(ptCoord); // integer part is Degrees
      var m = (ptCoord - d) * 60; // fractional part in minutes
      //return d.toString() + "° " + Math.abs(m).toFixed(3) + "'";
      return dTools.GPSPoint.latString(this.myc.lat);
    },
    myGlobalCount() {
      return this.$store.state.count;
    },
  },
  data() {
    return {
      dialog: false,
      myc: {
        name: "Z",
        description: null,
        time: null,
        extensions: {
          ismark: "true",
          isrelativ: "true",
          relativeName: "NH West Brkr",
          relativeRange: "0",
          relativeBearing: "0",
        },
        lat: "41.22121666700001",
        lon: "-72.942335",
        intrvl: null,
      },
    };
  },
};
</script>


<style>
</style>
