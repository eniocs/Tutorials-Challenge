<template>
    
       <div  id="page-top" class="container mt-3 col-lg-6 ">
           <MainMenu/>
        <router-view/>
    </div>
    

</template>

<script>
import MainMenu from '../components/mainmenu/Index'

export default {
    name: 'MainLayout',
    components: {
        MainMenu,
    },
}
</script>

<style>

</style>