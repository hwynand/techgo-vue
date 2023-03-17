<template>
  <div id="header">
    <slot name="header"></slot>
  </div>
  <div id="main">
    <slot name="main"></slot>
  </div>
  <div id="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#main {
  min-height: 90vh;
}
</style>