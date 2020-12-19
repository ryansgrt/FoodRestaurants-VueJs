<template>
  <div class="cart">
    <Navbar :updateCart="carts" />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            Cart
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.id">
                  <th>{{index+1}}</th>
                  <td>
                    <img
                      :src=" '../assets/images/' + cart.products.gambar "
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ cart.products.nama }}</strong>
                  </td>
                  <td>{{ cart.keterangan ? cart.keterangan : "-" }}</td>
                  <td>{{ cart.jumlah_pemesanan }}</td>
                  <td align="right">Rp. {{ cart.products.harga }}</td>
                  <td align="right">
                    <strong>Rp. {{ cart.products.harga*cart.jumlah_pemesanan }}</strong>
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="hapusCart(cart.id)"></b-icon-trash>
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalHarga }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input type="text" class="form-control" v-model="pesan.nama" />
            </div>
            <div class="form-group">
              <label for="noMeja">Nomor Meja :</label>
              <input type="text" class="form-control" v-model="pesan.noMeja" />
            </div>

            <button type="submit" class="btn btn-success float-right" @click="checkout">
              <b-icon-cart></b-icon-cart>Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
export default {
  name: "Cart",
  components: {
    Navbar,
  },
  data() {
    return {
      carts: [],
      pesan: {},
    };
  },
  methods: {
    setcarts(data) {
      this.carts = data;
    },
    hapusCart(id) {
      axios
        .delete("http://localhost:9000/carts/" + id)
        .then(() => {
          this.$toast.error("Sukses Hapus cart", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          // Update Data Cart
          axios
            .get("http://localhost:9000/carts")
            .then((response) => this.setcarts(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.carts = this.carts;
        axios
          .post("http://localhost:9000/pesanans", this.pesan)
          .then(() => {
            // Hapus Semua cart 
            this.carts.map(function (item) {
              return axios
                .delete("http://localhost:9000/carts/" + item.id)
                .catch((error) => console.log(error));
            });
            this.$router.push({ path: "/pesanan-sukses" });
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Nama dan Nomor Meja Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:9000/carts")
      .then((response) => this.setcarts(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    totalHarga() {
      return this.carts.reduce(function (items, data) {
        return items + data.products.harga * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>

<style>
</style>