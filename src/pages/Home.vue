<template>
  <div class="centrer marron">
    <div v-if="!isEnregistrer && !partieEnCours" class="marginTop5">
      <b-form-input v-model="nomJoueur" placeholder="Ton pseudo" class="pseudo" />
      <b-button variant="dark" v-on:click="enregister()" class="marginLeft10">Valider </b-button>
    </div>
    <div v-if="isEnregistrer" class="marginTop5">
      <p>Connecté. En attente du début de partie.</p>
      <b-button variant="dark" v-if="joueursConnectes.length>3 && joueursConnectes.length<9" v-on:click="debuterPartie()">Commencer</b-button>
    </div>
    <p v-if="!partieEnCours" class="marginTop" >Nombre de joueurs dans la partie : {{joueursConnectes.length}}</p>
    <p v-if="!partieEnCours && joueursConnectes.length>0" class="marginTop">Liste des joueurs connectés : {{joueursConnectes.join(', ')}}</p>
    <div>
      <p v-for='event in events' :key='event._id'>{{event.name}} vient de {{event.action}} la partie. </p>
    </div>
    <p v-if="partieEnCours" class="marginTop5">Une partie est déjà en cours.</p>
    <Footer/>
  </div>  
</template>

<script>
import Footer from '../layouts/Footer.vue'

  export default {
    components: {
        Footer
    },
    data() {
        return {
          fil :  require('../assets/fil.jpg'),
          isConnected: false,
          nomJoueur: '',
          joueursConnectes: [],
          events: [],
          isEnregistrer : false,
          role : null,
          myHand : null,
          otherPlayerHand: null,
          myTurn: false,
          playerId: '',
          partieEnCours: false
        }
    },
     
    sockets: {
      connect() {
        console.log("connect");
        this.isConnected = true;
      },

      disconnect() {
        this.isConnected = false;
      },
      playerConnection(data) {
        this.events.push({name:data.username, action:'rejoindre'});
      },
      getPlayers(players) {
        this.joueursConnectes = players;
        console.log("joueursConnectes : " + this.joueursConnectes );
      },
      partieEnCours(enCours){
        this.partieEnCours = enCours;
      },
      playerDisconnection(data) {
        this.events.push({name:data.name, action:'quitter'});
      },
      roleAssigment(role) {
        this.role = role;
      },
      sendCard(hand) {
        this.myHand = hand;
      },
      otherCard(otherPlayerHand) {
        this.otherPlayerHand = otherPlayerHand;
        this.$router.push({ name: 'Game', params: { role: this.role, myHand: this.myHand.hand.cardId, otherPlayerHand: this.otherPlayerHand, turn : this.myTurn, playerId: this.myHand.hand.playerId, pseudo : this.myHand.hand.username }});
      }
    },
    methods: {
        enregister() {
         this.$socket.emit('register', this.nomJoueur);
         this.isEnregistrer = true;
        },
        debuterPartie() {
          this.myTurn = true;
          this.$socket.emit('startGame');
        }
    },
    created() {
      this.$socket.emit('getPlayers');
    }
  }
  
</script>

<style>
  .slide {
    margin-bottom: 0px;
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
  }
  .slide:hover {
    margin-bottom: -10px;
  }

  .imageRole {
    height: 450px;
    width: auto; 
  }

  .cartesJoueur {
    border: 2px solid black;
  }

  .centrer {
      text-align: center;
  }

  .marginTop {
    margin-top: 20px;
  }

  .marginTop5 {
    margin-top : 5%;
  }
  .marginLeft10 {
    margin-left: 10px;
  }

  .marron {
    color : rgb(103,65,36);
  }

  .pseudo {
    display: initial;
    width: 20%
  }
</style>
