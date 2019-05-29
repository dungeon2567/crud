<style>
.inner-loading {
  z-index: 22;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: hsla(0, 0%, 100%, 0.6);
  align-items: center;
  justify-content: center;
  display: flex;
}

</style>


<script>
import Spinner from "@/components/Spinner.vue";

export default {
  props: {
    visible: Boolean,
  },

  render(h) {
    return <div class="inner-loading" v-show={this.visible}>
        <Spinner size={42}/>
    </div>
  },
};
</script>