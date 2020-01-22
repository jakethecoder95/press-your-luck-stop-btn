<template>
  <div id="app">
    <!-- <ul>
      <li v-for="team in match.teams"> 
        
      </li>
    </ul> -->
    <button v-on:click="stop" v-bind:disabled="!shuffling" class="stop-btn">
      <h1>{{ match.pressYourLuck.teams[active].name }}</h1>
      <h3>Spins Left: {{ match.pressYourLuck.teams[active].spins }}</h3>
    </button>
  </div>
</template>

<script>
import openSocket from "socket.io-client";
import MatchService from "./MatchService";

export default {
  name: "app",
  data: function() {
    return {
      match: {},
      active: 0,
      shuffling: false
    };
  },
  methods: {
    async stop() {
      try {
        const result = await MatchService.stop();
        // eslint-disable-next-line no-console
        console.log(result);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  },
  async created() {
    try {
      this.match = await MatchService.getMatch();
      this.active = this.match.pressYourLuck.activeTeam;
      // const socket = openSocket("https://game-show.herokuapp.com");
      const socket = openSocket("http://localhost:8000");
      socket.on("pressYourLuck", data => {
        const { action } = data;
        if (action === "start") {
          const { spins } = data;
          this.match.pressYourLuck.teams[
            this.match.pressYourLuck.activeTeam
          ].spins = spins;
          this.shuffling = true;
        }
        if (action == "stop") {
          if (this.shuffling) {
            this.shuffling = false;
          }
        }
        if (action === "generalUpdate") {
          // eslint-disable-next-line no-console
          console.log("im here");
          const { pressYourLuck } = data;
          this.match.pressYourLuck = pressYourLuck;
          this.active = this.match.pressYourLuck.activeTeam;
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
};
</script>

<style>
body {
  background: #333;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #252525;
}
.stop-btn {
  height: 90vh;
  width: 90vw;
  margin: 5vh auto;
  background: #555;

  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 40px #000000;
  border: solid 3px #000000aa;
}

.stop-btn:disabled {
  background: #333;
}
</style>
