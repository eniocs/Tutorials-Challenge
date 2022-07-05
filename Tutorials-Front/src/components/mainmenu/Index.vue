<template>
    <section id="top" >
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
    </section>
</template>

<script>
export default {
    name: 'MainMenu',
}
</script>

<style>

</style>