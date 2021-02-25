<template>
  <v-container id="masterContainer" fluid class="ma-0 pa-3">
    <v-layout column class="transparent" align-start>
      <v-row>
        <v-flex class="px-2" align-self-center>
          <h1>Start Line</h1>
        </v-flex>
        <v-flex class="px-2" align-self-center>
          <h2>animation</h2>
        </v-flex>
      </v-row>
      <v-row class="ml-1">
        <canvas id="startLine" style="border: 1px solid #000000" />
      </v-row>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  mounted: function () {
    var m = document.getElementById("masterContainer").offsetWidth;
    var c = document.getElementById("startLine");
    c.width = m * 0.9;
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(c.offsetWidth / 5, c.offsetHeight / 2);
    ctx.lineTo((c.offsetWidth * 4) / 5, c.offsetHeight / 2);
    ctx.stroke();
    console.log(masterContainer.offsetWidth);
  },
};
</script>

<style>
</style>