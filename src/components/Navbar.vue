<template>
    <b-navbar toggleable="lg" type="dark" variant="success">
     <div class="container"> 
          <b-navbar-brand href="/">Warteg</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <router-link class="nav-link" to="/"> Home</router-link>
            <router-link class="nav-link" to="/foods"> Foods</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

     

<b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">
                Cart
                <b-icon-bag></b-icon-bag>
                <span
                  class="badge badge-success ml-2"
                >{{ updateCart ? updateCart.length : jumlah_orders.length }}</span>
              </router-link>
            </li>
          </b-navbar-nav>
          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="/undermaintenance">Profile</b-dropdown-item>
            <b-dropdown-item href="/undermaintenance">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
     </div>
    </b-navbar>

</template>

<script>
import axios from "axios";
export default {
  name: "Navbar",
  data() {
    return {
      jumlah_orders: [],
    };
  },
  props: ["updateCart"],
  methods: {
    setJumlah(data) {
      this.jumlah_orders = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:9000/carts")
      .then((response) => this.setJumlah(response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>