<template>
    <div class="grid">
        <img class="maClasse" :src='counter'>
    </div>
</template>

<script>
    export default {
        name: 'Galerie',
        props: ['url'],
        data: function () {
            return {
                counter: this.url
            }
        }
    };
</script>

<style>
  .maClasse {
    height:  500px;
    width: auto; 
  }
</style>