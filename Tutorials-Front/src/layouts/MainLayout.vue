<template>
    <BaseLayout>
        <template #mainmenu>
            <MainMenu/>
        </template>

        <template #default>
            <div  class="container mt-3 col-lg-6 ">
           
  <router-view/>
    </div>
          
        </template>
    </BaseLayout>

</template>

<script>
import MainMenu from '../components/mainmenu/Index'
import BaseLayout from '../layouts/BaseLayout.vue'
export default {
    name: 'MainLayout',
    components: {
        MainMenu,
        BaseLayout
    },
}
</script>

<style>

</style>