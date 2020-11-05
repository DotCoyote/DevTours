<template>
  <header class="header border-b border-solid border-gray-300">
    <div class="text-center">
      <router-link
        to="/"
        class="logo inline-block w-full py-4 px-6 bg-teal-400 text-white font-bold"
      >
        DevTours
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHeader',
});
</script>

<style lang="scss">
#nav {
  a {
    display: inline-block;
    padding: 15px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
