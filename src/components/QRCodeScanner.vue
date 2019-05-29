<script>
import Overlay from "@/components/Overlay.vue";
import Button from "@/components/Button.vue";
import { BrowserQRCodeReader } from "@zxing/library";

export default {
  props: {
    accept: {
      type: Function,
      required: true
    },
    reject: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      result: ""
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.codeReader = new BrowserQRCodeReader();

      this.codeReader
        .decodeFromInputVideoDevice(undefined, this.$refs.video)
        .then(result => {
          this.accept(result.text);
        })
        .catch(err => {
          this.reject(err);
        });
    });
  },

  render(h) {
    return (
      <Overlay
        maximized={true}
        onClose={() => {
          this.reject();
        }}
        scopedSlots={{
          header: () => "Escanear Código",
          body: () => {
            return (
              <div class="video-container">
                <video ref="video" muted="muted" />
              </div>
            );
          },
          footer: () => [
            <Button onClick={() => this.reject("kkk")}>Cancelar</Button>
          ]
        }}
      />
    );
  }
};
</script>

<style>
.video-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container > video {
  width: 100%;
  height: auto;
  flex-grow: 1;
}
</style>