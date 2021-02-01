<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}


/* css reset */
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
ul,
ol {
  list-style: none;
}

/* 能用样式 */
.container {
  width: 1200px;
  height: 100%;
  margin: 0 auto;

}
</style>
