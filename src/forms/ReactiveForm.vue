<script>
import Overlay from "@/components/Overlay.vue";
import Button from "@/components/Button.vue";
import TextInput from "@/components/TextInput.vue";
import DateInput from "@/components/DateInput.vue";
import RichTextInput from "@/components/RichTextInput.vue";
import Radio from "@/components/Radio.vue";
import Tabs from "@/components/Tabs.vue";
import InnerLoading from "@/components/InnerLoading.vue";
import Suggest from "@/components/Suggest.vue";
import { setTimeout } from "timers";

export default {
  props: {
    accept: {
      type: Function,
      required: true
    },
    reject: {
      type: Function,
      required: true
    },
    schema: {
      type: Function,
      required: true
    },
    initialState: {
      type: Object,
      required: false
    },
    save: {
      type: Function,
      required: true
    },
    header: {
      type: String
    }
  },
  methods: {
    async handleSaveClick() {
      this.validate();

      for (var e in this.errors) {
        if (this.errors.hasOwnProperty(e)) {
          return;
        }
      }

      this.loading = true;

      try {
        let result = await this.save(this.state);

        await this.accept(result);
      } catch (err) {
        for (var e in err) {
          if (err.hasOwnProperty(e)) {
            if (this.errors.hasOwnProperty(e)) {
              let errorList = this.errors[e];

              errorList.push(err[e]);
            } else {
              this.$set(this.errors, e, [err[e]]);
            }
          }
        }
      } finally {
        this.loading = false;
      }
    },
    validate() {
      let errors = {};

      for (let group of this.formSchema) {
        for (let field of group.fields) {
          let errorList = [];

          switch (field.type) {
            case "date":
              if (!field.optional && !this.state[field.name]) {
                errorList.push(`${field.label} é obrigatório`);
              }

              break;
            case "text":
              if (!field.optional && !this.state[field.name]) {
                errorList.push(`${field.label} é obrigatório`);
              }

              break;
            case "select":
              if (!field.optional && this.state[field.name] == null) {
                errorList.push(`${field.label} é obrigatório`);
              }
              break;

            case "html":
              if (!field.optional && this.state[field.name] == null) {
                errorList.push(`${field.label} é obrigatório`);
              }
              break;
          }

          if (errorList.length > 0) errors[field.name] = errorList;
        }
      }

      this.errors = errors;
    },
    renderFieldInput(field) {
      switch (field.type) {
        case "date":
          return (
            <DateInput
              onFocus={() => this.$delete(this.errors, field.name)}
              onInput={val => this.$set(this.state, field.name, val)}
              value={this.state[field.name]}
            />
          );
        case "text": {
          const directives = field.mask
            ? [
                {
                  name: "mask",
                  value: field.mask
                }
              ]
            : [];

          return (
            <TextInput
              {...{ directives }}
              onFocus={() => this.$delete(this.errors, field.name)}
              onInput={val => this.$set(this.state, field.name, val)}
              value={this.state[field.name]}
            />
          );
        }
        case "select":
          return field.options.length < 4 ? (
            <div class="button-group">
              {field.options.map(option => {
                return (
                  <Button
                    class={{ primary: this.state[field.name] === option.value }}
                    value={this.state[field.name] === option.value}
                    onFocus={() => this.$delete(this.errors, field.name)}
                    onClick={() =>
                      this.$set(this.state, field.name, option.value)
                    }
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          ) : (
            <Suggest
              inputValueRenderer={val => val != null ? val.label : ''}
              value={this.state[field.name] != null ? field.options.find(option => option.value === this.state[field.name]) : null}
              onFocus={() => this.$delete(this.errors, field.name)}
              onInput={val => this.$set(this.state, field.name, val.value)}
              search={query =>
                field.options.filter(option => option.label.includes(query))
              }
            />
          );
          break;
        case "html":
          return (
            <RichTextInput
              key={field.name}
              onFocus={() => this.$delete(this.errors, field.name)}
              onInput={val => this.$set(this.state, field.name, val)}
              value={this.state[field.name] || ""}
            />
          );
          break;
        default:
          return (
            <div>
              {field.options.map(option => {
                return (
                  <label>
                    <Radio
                      value={this.state[field.name] === option.value}
                      onClick={() =>
                        this.$set(this.state, field.name, option.value)
                      }
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          );
          break;
      }
    },
    renderHintOrError(field) {
      if (this.errors[field.name]) {
        return (
          <div class="field-bottom">
            {this.errors[field.name].map(error => {
              return <div class="field-error">{error}</div>;
            })}
          </div>
        );
      } else if (field.hint) {
        return <div class="field-bottom field-hint">{field.hint}</div>;
      } else return null;
    },
    renderFormGroup(group) {
      return group.fields.map(field => {
        return (
          <div class={`form-field ${field.type}`} key={field.name}>
            <label>{field.label}</label>
            <div>
              {this.renderFieldInput(field)}
              {this.renderHintOrError(field)}
            </div>
          </div>
        );
      });
    }
  },

  render(h) {
    return (
      <Overlay
        onClose={() => {
          this.reject();
        }}
        scopedSlots={{
          header: () => this.header,
          body: () => {
            return (
              <Tabs
                onInput={val => (this.tab = val)}
                value={this.tab}
                tabs={this.tabs}
                scopedSlots={this.formSchema.reduce((acc, group) => {
                  acc[group.label] = () => (
                    <div class="form">{this.renderFormGroup(group)}</div>
                  );

                  return acc;
                }, {})}
              />
            );
          },
          footer: () => [
            <Button onClick={() => this.reject("kkk")}>Cancelar</Button>,
            <Button onClick={this.handleSaveClick} class="primary">
              Salvar
            </Button>
          ],
          default: () => <InnerLoading visible={this.loading} />
        }}
      />
    );
  },
  computed: {
    formSchema() {
      return this.schema(this.state);
    },
    tabs() {
      return this.formSchema.map(group => ({
        id: group.label,
        title: group.label,
        error: group.fields.some(field => this.errors[field.name])
      }));
    }
  },
  created() {
    this.tab = this.tabs[0]["id"];
    this.state = this.initialState || {};
  },
  data() {
    return {
      tab: null,
      loading: false,
      errors: {},
      state: null
    };
  }
};
</script>
