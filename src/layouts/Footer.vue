<template>
    <div>
        <img v-if="this.windowHeight>600 || this.windowWidth>710" :src='url2' class='image mechant'/>
        <img v-if="this.windowHeight>600 || this.windowWidth>710" :src='url1' class='image gentil' />
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data(){
            return {
                url1: require('../assets/footer/gentil.png'),
                url2: require('../assets/footer/mechant.png'),
                windowHeight:0,
                windowWidth:0
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        methods: {
            handleResize() { 
                this.windowHeight = window.innerHeight;
                this.windowWidth = window.innerWidth;
            }
        }       
    }
    

</script>

<style>
    .image {
        height:  300px;
        width: auto;
    }
    
    .mechant {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .gentil {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .bigben {
        position: absolute;
        bottom: 0;
    }

</style>