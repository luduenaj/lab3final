<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-md navbar-light bg-lightborder-bottom
    shadow-sm p-3 mb-5 bg-body rounded">
      <div class="container-fluid">
      <router-link to="/home" class="h4 sintd">💸Wallet</router-link>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse"
      data-bs-target="#MenuNavegacion">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="MenuNavegacion" class="collapse navbar-collapse" aria-haspopup="true"
      aria-expanded="false">
        <ul class="navbar-nav ms-3">
          <router-link to="/purchase"><li class="nav-item"><a class="nav-link"
          href="#">Comprar</a></li></router-link>
          <router-link to="/sell"><li class="nav-item"><a class="nav-link"
          href="#">Vender</a></li></router-link>
          <router-link to="/historial"><li class="nav-item"><a class="nav-link"
          href="#">Historial</a></li></router-link>
          <a href="#" class="nav-link dropdown-toggle" role="button"
          data-bs-toggle="dropdown">Analisis</a>
          <ul class="dropdown-menu text-center">
            <router-link to="/analisis/actual"><li class="nav-item"><a class="nav-link"
            href="#">Analisis actual</a></li></router-link>
            <router-link to="/analisis/inversiones"><a class="nav-link"
            href="#">Analisis de inversiones</a></router-link>
          </ul>
        </ul>
      </div>
      </div>
      <ul class="navbar-nav ml-auto nav-flex-icons me-5">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown"
              role="button" data-bs-toggle="dropdown"
              aria-current="page" href="#">Usuario</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" data-bs-toggle="modal"
                data-bs-target="#cerrarSesionMdl">Cerrar sesion</a>
              </div>
            </li>
        </ul>
    </nav>
  </div>
  <div class="modal fade" id="cerrarSesionMdl" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">¿Deseas cerrar sesión?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
            @click="cerrarSesion">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default ({
  name: 'NavBar',
  data() {
    return {
    };
  },
  methods: {
    cerrarSesion() {
      this.$router.push('/');
    },
  },
});
</script>

<style scoped>
a{
  text-decoration: none;
  font-weight: 700;
}
.sintd{
  text-decoration: none;
  color: black;
  font-weight: 700;
}
</style>
