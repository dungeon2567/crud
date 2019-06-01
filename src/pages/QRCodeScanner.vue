<template>

</template>

<script>
import QRCodeScanner from "./../components/QRCodeScanner.vue";

export default {
  name: "QRCodeScanner",
  async created(){
    const result = await this.$root.openForm(QRCodeScanner);

    alert(result);
  }
};
</script>
