<template>
  <div>
    <MainLayout v-show="!IsLoading"/>
    <LoadLayout v-slot="{TextFromBaseLoading}" v-show="IsLoading">
        {{TextFromBaseLoading}}
        <BaseLoading/>
    </LoadLayout>
  </div>
</template>
<script>
//import { mapState } from 'vuex'
import LoadLayout from './layouts/LoadLayout'
import MainLayout from './layouts/MainLayout'
import BaseLoading from '@/components/BaseLoading.vue'

export default {
  name: "app",
  components: {
    MainLayout,
    LoadLayout,
    BaseLoading
  },
  computed: {
    IsLoading () {
     return  this.$store.state.isLoading
    }
  },
};




</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  
}

.navbar {
   background: rgba(255, 255, 255, 0.48);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.5px);
-webkit-backdrop-filter: blur(11.5px);
border: 1px solid rgba(255, 255, 255, 0.41);
}


</style>
