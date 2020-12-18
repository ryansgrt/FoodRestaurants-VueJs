<template>
  <div class="home">
    <Navbar/>
    <div class="container">
      <Hero/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue' 


export default {
  name: 'Home',
  components: {
    Navbar,
    Hero
  }
}
</script>
