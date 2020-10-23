<template>
    <div class="header">
        <img :src='url' class='title' />
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data(){
            return {
                url: require('../assets/header/title.png'),
            }
        }        
    }
    

</script>

<style>
    .header {
        height : 10rem;
        top : 0;
        text-align: center;
    }


    .title {
        text-align: center;
        height : 100%;
    }

</style>