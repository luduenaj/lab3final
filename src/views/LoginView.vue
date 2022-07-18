<template>
  <!--https://bootsnipp.com/snippets/7nk08-->
   <div class="container">
    <div class="row">
      <div class="col-6 bg shadow-sm p-3 mb-5 bg-body rounded"></div>
      <div class="col-md-6">
        <div class="login-form fade-in-text">
          <form class="shadow p-3 mb-5 bg-body rounded m-3" @submit="alerta">
            <h1 class="bd mb-4">Welcome!</h1>
            <div class="form-group">
              <label for="username" class="h5 mb-3">Usuario: <input id="username"
              type="text" class="form-control" placeholder="User Name" v-model="username"></label>
            </div>
            <div class="form-group">
              <label for="password" class="h5 mb-3">Contraseña: <input id="password"
              type="password" class="form-control w-100" placeholder="Password" v-model="password">
              </label>
            </div>
            <button type="submit" class="btn btn-secondary w-100">Login</button>
            <div class="my-3">
              <span>¿No tienes cuenta? <a href="#">Registrate</a></span><br>
              <span>¿Olvidaste la contraseña? <a href="#">Recupera tu contraseña</a></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    alerta(event) {
      event.preventDefault();
      alert(`${this.username} ${this.password}`);
    },
  },
  computed: {
  },
});
</script>

<style scoped>
.container{
  width: 75%;
}
.fade-in-text {
  animation: fadeIn 5s;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.bg{
  background-image: url('../assets/loginphoto2.jpg');
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
