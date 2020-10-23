<template>
  <div class="centrer marron"> 
    <div class="marginTop">
      <img v-if="isWin" :src="imageWin" />
      <img v-if="!isWin" :src="imageLose" />
      <div class="marginTop">
        <p v-if="winners==0">La bombe a été désamorcée !</p>
        <img v-if="winners==1" :src="imageBigBen" class="imageBigBen"/>
        <p class="marginTop">Gentils : {{listeGentils.join(', ')}}</p>
        <p>Méchant<span v-if="listeMechants.length>1">s</span> : {{listeMechants.join(', ')}}</p>
      </div>
      <b-button variant="dark" v-on:click="newGame()" class="marginTop">Nouvelle partie</b-button>
    </div>
    <Footer/>
  </div>  
</template>

<script>
import Footer from '../layouts/Footer.vue'

  export default {
    components: {
        Footer
    },
    props:  ['winners', 'isWin', 'allPlayers'],
    data() {
        return {
          imageWin: require('../assets/win.png'),
          imageLose: require('../assets/lose.png'),
          imageBigBen: require('../assets/bigBenExplose.jpg'),
          listeGentils: [],
          listeMechants: []
        }
    },
    methods: {
      newGame() {
        this.$router.push({ name: 'Home' });
      }
    },
    created() {
      console.log("this.allPlayers :" + this.allPlayers);
     for (let id in this.allPlayers) {
          console.log("role : " + this.allPlayers[id].role)
          if (this.allPlayers[id].role == 0 ){
            this.listeGentils.push(this.allPlayers[id].username);
          } else {
            this.listeMechants.push(this.allPlayers[id].username);
          }
        }
      } 
    
  }
  
</script>

<style>
  .centrer {
      text-align: center;
  }

  .imageBigBen {
    height:200px;
    width: auto;   
  }

  .marginTop{
    margin-top : 1%;
  }

  .marron {
    color : rgb(103,65,36);
  }


</style>
