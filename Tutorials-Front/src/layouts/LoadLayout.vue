  <template>
    <BaseLayout>
        <template #mainmenu>
            <MainMenu/>
        </template>
        <template #default>
            <div  class="container mt-3 col-lg-6 ">
                  <div class="loading-layout">
                    <slot :TextFromBaseLoading="TextFromBaseLoading"></slot> 
                    <!-- Requirement: this Scoped Slot makes TextFromBaseLoading avaliable from App.vue -->
                  </div>
            </div>
        </template>
    </BaseLayout> 
</template>

<script>
import BaseLayout from '../layouts/BaseLayout.vue'
import MainMenu from '../components/mainmenu/Index'
export default {
  name: 'LoadLayout',
   data (){
    return {
      TextFromBaseLoading:"Cargando"
    }
  },
    components: {
        MainMenu,
        BaseLayout
    },
}
</script>
