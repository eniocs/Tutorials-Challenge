<template>
  <!--Clases CSS de Bootstrap-->
  <div class="loading-wrapper text-center py-5">
    <div class="spinner-wrapper w-100">
    <h1 class="my-5">
       <pulse-loader></pulse-loader>
       </h1>  
     </div>
    
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'Loading',
  components: {
    PulseLoader
  },
}
</script>

<style>
  .spinner-wrapper
    .spinner {
      width :"4rem";
      height: "4rem";}
</style>
