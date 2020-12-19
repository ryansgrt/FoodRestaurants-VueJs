<template>
  <div class="order-success">
    <Navbar />
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img src="../assets/image/wait.png" width="300" />
          <h2><strong>Success!!</strong></h2>
          <h4>Orderan Anda segera diproses <br> Selamat Menunggu</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "OrderSuccess",
  components: {
    Navbar,
  },
};
</script>

<style>
</style>