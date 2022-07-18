<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom-">
      <div class="container-fluid">
      <router-link to="/home" class="h4 sintd">💸Wallet</router-link>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse"
      data-bs-target="#MenuNavegacion">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="MenuNavegacion" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-3">
          <router-link to="/purchase"><li class="nav-item"><a class="nav-link"
          href="#">Comprar</a></li></router-link>
          <router-link to="/sell"><li class="nav-item"><a class="nav-link"
          href="#">Vender</a></li></router-link>
          <router-link to="/historial"><li class="nav-item"><a class="nav-link"
          href="#">Historial</a></li></router-link>
          <a href="#" class="nav-link dropdown-toggle" role="button"
          data-bs-toggle="dropdown">Analisis</a>
          <ul class="dropdown-menu">
          <router-link to="/analisis/actual"><li class="nav-item"><a class="nav-link"
          href="#">Analisis actual</a></li></router-link>
          <router-link to="/analisis/inversiones"><li class="nav-item"><a class="nav-link"
          href="#">Analisis de inversiones</a></li></router-link>
          </ul>
        </ul>
      </div>
      </div>
    </nav>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'HomeView',
  component: {
    NavBar,
  },
};
</script>

<style scoped>
.name{
  text-decoration: none;
}
</style>
