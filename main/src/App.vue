<template>
  <div id="app">
    <div class="wrapper">
      <div class="menu">
        <div
          class="menu_item"
          v-for="item in currentMenus"
          :key="item.key"
          :to="{ path: item.path }"
        >
          <router-link :to="{ path: item.path }"> {{ item.title }}</router-link>
        </div>
      </div>
      <div class="main">
        <!-- <router-view></router-view> -->
        <router-view v-show="$route.name" />
        <section v-show="!$route.name" id="frame"></section>
      </div>
    </div>
  </div>
</template>

<script>
import { currentMenus } from "./router";
export default {
  name: "App",
  data() {
    return {
      currentMenus,
    };
  },
  methods: {
    handleClick(path) {
      console.log(path, "kkkkkkk");
      this.$router.push(path);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
.left {
  height: 100%;
  width: 300px;
}
.right {
  flex: 1;
  height: 100%;
}
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
.menu {
  width: 250px;
  height: 100%;
  background: #000;
}
.menu_item {
  color: #fff;
  padding: 15px 0;
}
.main {
  flex: 1;
  /* background: #bbb; */
}
.common {
  color: yellow !important;
}
.el-button--primary {
  background-color: yellow !important;
}
</style>
