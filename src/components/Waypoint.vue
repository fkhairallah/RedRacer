  <template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small class="success" v-bind="attrs" v-on="on"> Edit </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ waypoint.name }}-{{ waypointIndex }}
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Name" v-model="waypoint.name"></v-text-field>
            <v-textarea
              label="Description"
              v-model="waypoint.description"
              rows="2"
              auto-grow
            ></v-textarea>
            <v-layout row>
              <v-text-field
                label="LAT"
                v-model="waypoint.lat"
                prepend-icon="mdi-crosshairs-gps"
              ></v-text-field>
              <v-text-field label="LON" v-model="waypoint.lon"></v-text-field>
            </v-layout>
            <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="waypoint.time"
                  label="Last Updated"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="waypoint.time"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"

              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn dark color="primary" @click="saveWaypoint"> Save </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark @click="dialog = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  name: "EditWaypoint",
  props: {
    waypoint: Object,
    waypointIndex: Number,
    container:Object,
  },
  emits: ["save", "cancel"], // Communication back to parent container
  data() {
    return {
      dialog: false,
      dateMenu: false,
    };
  },
  methods: {
    saveWaypoint(e) {
      console.log(this.waypoint);
      this.dialog = false;

      this.$emit("save", this.waypoint, this.waypointIndex);
    },

  },

  mounted() {
    //console.log(this.$options.name + " mounted!", waypointIndex);
    console.log("CONT:",this.container);
  },
};
</script>
