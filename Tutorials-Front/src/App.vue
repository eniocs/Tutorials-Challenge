<template>
  <div id="app">
    <nav class="navbar navbar-expand">
      <router-link to="/" class="navbar-brand text-dark">Tutos.com</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link text-dark">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link text-dark">Agregar</router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3 col-lg-6 ">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "app"
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
    background-color: #f5f5f5;
}
</style>
