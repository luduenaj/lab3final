<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom-">
      <div class="container-fluid">
      <router-link to="/home" id="name">💸Wallet</router-link>
      <button type="button" class="navbar-toggler"
      data-bs-toggle="collapse" data-bs-target="#MenuNavegacion">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="MenuNavegacion" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-3">
          <li class="nav-item">Comprar</li>
        </ul>
      </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default ({
  name: 'NavBar',
});
</script>

<style scoped>
#wallet{
 text-decoration: none;
}

</style>
