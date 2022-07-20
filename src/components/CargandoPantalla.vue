<template>
  <div class="spinner-border load" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="mt-3">Cargando <div class="spinner-grow first" role="status">
        <span class="visually-hidden">Loading...</span>
          </div> <div class="spinner-grow second" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> <div class="spinner-grow third" role="status">
        <span class="visually-hidden">Loading...</span>
    </div> <div class="spinner-grow fourth" role="status">
        <span class="visually-hidden">Loading...</span>
    </div></h2>
</template>

<script>
export default ({
  name: 'CargandoPantalla',
});
</script>

<style scoped>
.load{
  width: 10rem;
  height: 10rem;
}
.first{
  width: 0.75rem;
  height: 0.75rem;
}
.second{
  width: 1.25rem;
  height: 1.25rem;
}
.third{
  width: 1.75rem;
  height: 1.75rem;
}
.fourth{
  width: 2.25rem;
  height: 2.25rem;
}
.mt-3{
  margin-left: 2em;
}
</style>
