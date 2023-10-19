<template>
  <div id="app">
    <TodoList />
    <vue-particles color="#dedede"></vue-particles>
  </div>
</template>

<script>
import TodoList from "../components/TodoList.vue";

export default {
  name: "Home",
  components: {
    TodoList,
  },
};
</script>

<style scoped></style>
