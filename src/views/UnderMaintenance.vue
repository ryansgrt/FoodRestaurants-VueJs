views folder, create a file named NotFound.vue. Add some basic text and images that makes it look like a 404 page.
<template>
  <center>
    <h1>Under Maintenance</h1>
    <p>
      <a href="/">Go home?</a>
    </p>
  </center>
</template>

<script>

  export default {
    name: 'UnderMaintenance'
  }

</script>

<style scoped>

  center {
    margin: 15vw;
  }

  h1 {
    color: var(--border);
    font-size: 2em;
  }

</style>