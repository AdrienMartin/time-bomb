<template>
    <div>
      <div class="alignCenter marginBottom20 marron">
        <p class="tour">Tour {{numeroTour}}</p>
        <p>Il reste {{this.theOtherPlayerHand.otherPlayerHand.length - nbCartesFlipped + 1}} fil<span v-if='this.theOtherPlayerHand.otherPlayerHand.length - nbCartesFlipped + 1>1'>s</span> à couper pour ce tour et {{this.theOtherPlayerHand.otherPlayerHand.length - nbCartesCouleursFlipped +1}} fil<span v-if='this.theOtherPlayerHand.otherPlayerHand.length - nbCartesCouleursFlipped +1>1'>s</span> de couleur à découvrir</p>
        <p v-if="this.theOtherPlayerHand.otherPlayerHand.length - nbCartesFlipped +1 > 0">C'est <span v-if='!myTurn'>PAS</span> ton tour !</p>
        <b-button variant="dark" v-if="this.newTurn" v-on:click="tourSuivant()">Tour suivant</b-button> 
      </div>
      <div class="row" style="width:100%; overflow: auto;">
        <div class="col-xs-12 col-md-12 col-lg-6">
         <!-- colonne de gauche -->
          <div class="row justify-content-md-center" v-for="playerHand in this.theOtherPlayerHand.otherPlayerHand.slice(0,this.theOtherPlayerHand.otherPlayerHand.length/2) " :key='playerHand._id'>
            <p class="pseudoCentrer">{{playerHand.username}}</p>
            <div v-for="card in playerHand.cardId" :key='card._id' class="col-auto mb-3 hvr-pulse" :id="card.id" :ref="card.id" :class="{'pause-hvr-pulse': !card.hover, 'card-hvr' : card.hover }" @click="revealCard(card)" @mouseover="mouseover(card)" @mouseleave="cardHoverEnd(card)">
              <img v-if="!card.isFlipped" class="tailleCarte" :src="urlFil">
              <transition name="fade">
                <img v-if="card.isFlipped" class="tailleCarte" :src="urlsFils[card.value]">
              </transition>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-12 col-lg-6">
          <!-- colonne de droite -->
          <div class="row justify-content-md-center" v-for="playerHand in this.theOtherPlayerHand.otherPlayerHand.slice(this.theOtherPlayerHand.otherPlayerHand.length/2)" :key='playerHand._id'>
            <p class="pseudoCentrer">{{playerHand.username}}</p>
            <div v-for="card in playerHand.cardId" :key='card._id' class="col-auto mb-3 hvr-pulse" :id="card.id" :ref="card.id" :class="{'pause-hvr-pulse': !card.hover, 'card-hvr' : card.hover }" @click="revealCard(card)" @mouseover="mouseover(card)" @mouseleave="cardHoverEnd(card)">
              <img v-if="!card.isFlipped" class="tailleCarte" :src="urlFil">
              <transition name="fade">
                <img v-if="card.isFlipped" class="tailleCarte" :src="urlsFils[card.value]">
              </transition>
            </div>
          </div>
        </div>
      </div>

      <div style="width:100%" class="borderBlack">
        <div style="float: left">
          <img :src='urlsRole[role.role][imageRole]' class='role tailleCarte' />
          <p class="pseudoCentrer">{{pseudo}}</p>
        </div>
          <div class="row justify-content-md-center">
              <img v-for="card in theMyHand" :key='card._id' :src='urlsFils[card.value]' class="col-auto tailleCarte hvr-pulse" :class="{'flippedMyCard': card.isFlipped, 'pause-hvr-pulse': !card.hover, 'card-hvr' : card.hover}"/>
          </div>
       </div>
    </div>
</template>

<script>

 export default {
        name: 'Game',
        props:  ['role', 'myHand', 'otherPlayerHand', 'turn', 'playerId', 'pseudo'] ,
        data: function () {
            return {
                urlFil : require('../assets/fil.jpg'),
                urlsRole : [[require('../assets/gentil-depardieu.png'),require('../assets/gentil-danyboon.png'),require('../assets/gentil-jul.png'),require('../assets/gentil-mbappe.png'),require('../assets/gentil-mimy.png')], [require('../assets/mechant-benalla.png'),require('../assets/mechant-lepen.png'),require('../assets/mechant-macron.png')]],
                urlsFils : [require('../assets/fil-nul.jpg'), require('../assets/fil-couleur.jpg'), require('../assets/bigBen.jpg')],
                myTurn : false,
                myPlayerId : "",
                componentKey : 0,
                theOtherPlayerHand: {},
                theMyHand: {},
                numeroTour: 1,
                nbCartesFlipped: 0,
                nbCartesCouleursFlipped: 0,
                imageRole: 0,
                newTurn: false
            }
        },
        sockets: {
          cardHover(data) {
            // permet de faire une ptite animation quand le joueur qui doit jouer survole une carte
            console.log("cardHover : " + data.hover);
            var uneDeMesCartes = true;
            this.theOtherPlayerHand.otherPlayerHand.forEach((playerHand) => {
                playerHand.cardId.forEach((card) => {
                    if (card.id == data.hover) {
                      this.$set(card,'hover',true);
                      uneDeMesCartes = false;
                    }
                });
            });

            if (uneDeMesCartes) {
              this.theMyHand.forEach((card) => {
                  this.$set(card,'hover',true);
              });
            }
          },
          cardHoverEnd(data) {
            var uneDeMesCartes = true;
            this.theOtherPlayerHand.otherPlayerHand.forEach((playerHand) => {
              playerHand.cardId.forEach((card) => {
                  if (card.id == data.hover) {                
                    this.$set(card,'hover',false);
                    uneDeMesCartes = false;
                  }
              });

            if (uneDeMesCartes) {
              this.theMyHand.forEach((card) => {
                this.$set(card,'hover',false);
              });
            }
          });
          },
          revealCard(data) {
            // permet de retourner la carte choisie 
            console.log(data);
            this.theMyHand.forEach((card) => {
              this.$set(card,'hover',false);
            });
            this.theOtherPlayerHand.otherPlayerHand.forEach((playerHand) => {
                playerHand.cardId.forEach((card) => {
                    if (card.id == data.id) {
                      this.$set(card,'hover',false);
                      this.$set(card,'isFlipped',true);
                      card.value = data.value;
                    }
                });            
            });
            this.theMyHand.forEach((card) => {
              if (card.id == data.id) {
                this.$set(card,'isFlipped',true);
              }
            });
            this.nbCartesFlipped++;
            if (data.value == 1) {
              // un fil de couleur a été découvert
              this.nbCartesCouleursFlipped++;
            }
          },
          token(data) {
            console.log("token : " + data.token);
            // détermine le joueur qui doit jouer
            this.myTurn = (data.token == this.myPlayerId);
          },
          newTurn(data) {
            console.log("turn : " + data);
            this.numeroTour++;
            this.nbCartesFlipped = 0;
          },
          sendCard(data) {
            this.theMyHand = this.shuffle(data.hand);
            this.theMyHand.forEach((card) => {
              this.$set(card,'isFlipped',false);
             });
          },
          otherCard(data) {
            this.theOtherPlayerHand = data;
            this.theOtherPlayerHand.otherPlayerHand.forEach((playerHand) => {
              playerHand.cardId.forEach((card) => {
                this.$set(card,'isFlipped',false);
                this.$set(card,'hover',false);
            });
          });
          },
          GoodGuysWin(allPlayers) {
            this.$socket.emit('unregister');
            console.log("allPlayers" + allPlayers);
            this.$router.push({ name: 'EndGame',  params: { winners: 0, isWin : this.role.role==0, allPlayers : allPlayers}});
          },
          BadGuysWin(allPlayers) {
            this.$socket.emit('unregister');
            console.log("allPlayers" + allPlayers);
            this.$router.push({ name: 'EndGame', params: { winners: 1, isWin : this.role.role==1, allPlayers : allPlayers}});
          },
          endTurn() {
              this.newTurn = true;
          }
        },
        methods: {
            mouseover(card) {
              if (this.myTurn && card.isFlipped == false) {
                console.log("cardHover");
                this.$set(card,'hover',true);
                this.$socket.emit('cardHover', card.id);
              }
            },
            cardHoverEnd(card) {
              if (this.myTurn && card.isFlipped == false) {
                console.log("cardHoverEnd");
                this.$set(card,'hover',false);
                this.$socket.emit('cardHoverEnd', card.id);
              }
            },
            revealCard(card){
              if (this.myTurn && card.isFlipped == false)  {
                this.myTurn = false;
                this.$set(card,'hover',false);
                this.$socket.emit('revealCard', card.id);
              }
            },
            tourSuivant() {
              this.newTurn = false;
              this.$socket.emit('newTurn');
            },
            forceRerender() {
                this.componentKey += 1;
            },
             shuffle(a) {
              for (let i = a.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [a[i], a[j]] = [a[j], a[i]];
              }
              return a;
            }
        },
        created(){
          // initialisation
          this.myTurn = this.turn;
          this.myPlayerId = this.playerId;
          this.theOtherPlayerHand = this.otherPlayerHand;
          this.theMyHand = this.shuffle(this.myHand);
          
          this.theOtherPlayerHand.otherPlayerHand.forEach((playerHand) => {
                playerHand.cardId.forEach((card) => {
                  this.$set(card,'isFlipped',false);
                  this.$set(card,'hover',false);
                });
          });
          this.theMyHand.forEach((card) => {
            this.$set(card,'isFlipped',false);
            this.$set(card,'hover',false);
          });
          if (this.role.role==0) {
            // gentil
            this.imageRole = Math.floor(Math.random() * Math.floor(5));
          } else {
            // mechant
            this.imageRole = Math.floor(Math.random() * Math.floor(3));
          }
          

        }
    }

   
</script>


<style>
  /* Pulse */
  @-webkit-keyframes hvr-pulse {
    25% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    75% {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }
  }
  @keyframes hvr-pulse {
    25% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    75% {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }
  }
  .hvr-pulse {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-animation-name: hvr-pulse;
    animation-name: hvr-pulse;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .pause-hvr-pulse {
    animation-play-state: paused;
  }
  /* FIN Pulse */

  .alignCenter {
    text-align: center;
  }
  .pseudoCentrer {
    margin-top: auto;
    margin-bottom: auto;
    font-family: 'Pseudo font';
  }

  .marginLeft {
    margin-left :0;
  }
  .tailleCarte {
    height : 150px;
    width : auto;
  }
  .role {
    bottom : 0;
    left : 0;
  }
  .flippedMyCard{
    margin-top : 20px;
  }
  .card-hvr{
    cursor : pointer;
  }

  .marginBottom20{
    margin-bottom : 20px;
  }

  .positionFixed {
    position: fixed;
    bottom: 0;
  }
  .borderBlack {
    border : outset 7px;
    padding-bottom : 20px;
    padding-top : 20px;
  }
  .marron {
    color : rgb(103,65,36);
  }

  @font-face {
    font-family: 'Pseudo font';
    src: url('../assets/LittleZombie.ttf') format('truetype');
  }

  .tour {
    font-weight : bold;
    font-size: larger;
  }
  /* ANIMATION */
.fade-enter-active {
  transition: opacity 5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>