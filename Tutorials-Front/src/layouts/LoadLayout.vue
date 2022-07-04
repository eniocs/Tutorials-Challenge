<template>
  <div class="loading-layout">
    <slot :TextFromBaseLoading="TextFromBaseLoading"></slot> 
    <!-- Requirement: this Scoped Slot makes TextFromBaseLoading avaliable from App.vue -->
  </div>
</template>

<script>

export default {
  name: 'LoadLayout',
   data (){
    return {
      TextFromBaseLoading:"Cargando"
    }
  }
}
</script>
