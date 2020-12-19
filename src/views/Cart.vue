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
              <strong>My</strong>
            Cart
            
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
                  <th scope="col">price</th>
                  <th scope="col">Total price</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.id">
                  <th>{{index+1}}</th>
                  <td>
                    <img
                      :src=" '../assets/images/' + cart.products.pictureFood "
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ cart.products.foodName }}</strong>
                  </td>
                  <td>{{ cart.keterangan ? cart.keterangan : "-" }}</td>
                  <td>{{ cart.jumlah_pemesanan }}</td>
                  <td align="right">Rp. {{ cart.products.price }}</td>
                  <td align="right">
                    <strong>Rp. {{ cart.products.price*cart.jumlah_pemesanan }}</strong>
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="deleteCart(cart.id)"></b-icon-trash>
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total price :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalprice }}</strong>
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
              <label for="foodName">Customer Name :</label>
              <input type="text" class="form-control" v-model="order.customerName" />
            </div>
            <div class="form-group">
              <label for="tableNumber">Table Number :</label>
              <input type="text" class="form-control" v-model="order.tableNumber" />
            </div>

            <button type="submit" class="btn btn-success float-right" @click="checkout">
              <b-icon-cart></b-icon-cart>Order
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
      order: {},
    };
  },
  methods: {
    setcarts(data) {
      this.carts = data;
    },
    deleteCart(id) {
      axios
        .delete("http://localhost:9000/carts/" + id)
        .then(() => {
          this.$toast.error("Success Delete cart", {
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
      if (this.order.customerName && this.order.tableNumber) {
        this.order.carts = this.carts;
        axios
          .post("http://localhost:9000/orders", this.order)
          .then(() => {
            // Delete All cart 
            this.carts.map(function (item) {
              return axios
                .delete("http://localhost:9000/carts/" + item.id)
                .catch((error) => console.log(error));
            });
            this.$router.push({ path: "/order-success" });
            this.$toast.success("Order Success", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Name and Table Number Must be filled", {
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
    totalprice() {
      return this.carts.reduce(function (items, data) {
        return items + data.products.price * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>

<style>
</style>