<script>
import { throttle } from "../utils.js";
import Suggest from "./Suggest.vue";
import DateInput from "./DateInput.vue";
import DateRangeInput from "./DateRangeInput.vue";
import TextInput from "./TextInput.vue";
import Button from "./Button.vue";

export default {
  props: {
    value: {
      type: Array,
      default: []
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Filtrar"
    },
    columns: {
      type: Array
    }
  },
  data() {
    return {
      filter: {
        column: null,
        operator: null,
        value: null
      },
      operators: {
        text: { eq: "=", ne: "<>" },
        default: { eq: "=", lt: "<", gt: ">", ne: "<>", ge: ">=", le: "<=" }
      }
    };
  },
  render(h) {
    return (
      <div class="tag-input filter-builder">
        <i class="fas fa-filter" slot="before" />
        <div class="tag-input-content">
          {this.value.map((predicate, index) => (
            <span class="tag" key={index}>
              <b class="margin-span">{this.getColumnHeader(predicate.field)}</b>
              <span class="margin-span">
                {this.renderOperator(
                  this.getColumnType(predicate.field),
                  predicate.operator
                )}
              </span>
              <b class="margin-span">{this.renderPredicateValue(predicate)}</b>
              <i
                class="fas fa-times tag-remove"
                onClick={() => this.remove(predicate)}
              />
            </span>
          ))}
          <div class="filter-builder-editor">
            {this.filter.column == null ? (
              <Suggest
                key="col"
                minimal
                placeholder={this.placeholder}
                onRemove={this.removeLast}
                onInput={event => this.setColumn(event)}
                ref="col"
                search={query => this.getColumns(query)}
              />
            ) : (
              [
                <b class="margin-span">{this.filter.column.text}</b>,
                this.filter.operator == null ? (
                  <Suggest
                    key="op"
                    ref="op"
                    minimal
                    onRemove={this.removeOperator}
                    onInput={event => this.setOperator(event)}
                    search={query => this.getOperators(query)}
                  />
                ) : (
                  [
                    <span class="margin-span">
                      {this.renderOperator(
                        this.getColumnType(this.filter.column),
                        this.filter.operator
                      )}
                    </span>,
                    this.renderFilterValue()
                  ]
                )
              ]
            )}
          </div>
        </div>
      </div>
    );
  },
  methods: {
    renderOperator(type, op) {
      return (this.operators[type] || this.operators.default)[op];
    },

    renderPredicateValue(predicate) {
      let type = this.getColumnType(predicate.field);
      let op = predicate.operator;

      switch (type) {
        case "date":
          return predicate.value.formatDate();
          break;
        default:
          return `"${predicate.value}"`;
      }
    },
    renderFilterValue() {
      let type = this.getColumnType(this.filter.column.id);
      let op = this.filter.operator;
      switch (type) {
        case "date":
          return (
            <DateInput
              placeholder="Valor"
              onRemove={this.removeValue}
              onBlur={() => this.filter.value && this.createPredicate()}
              minimal
              ref="val"
              onInput={event => (this.filter.value = event)}
              value={this.filter.value}
            />
          );
          break;
        default:
          return (
            <TextInput
              placeholder="Valor"
              onRemove={this.removeValue}
              onBlur={() => this.filter.value && this.createPredicate()}
              onKeydown={event =>
                event.keyCode === 13 &&
                this.filter.value &&
                this.createPredicate()
              }
              minimal
              ref="val"
              onInput={event => (this.filter.value = event)}
              value={this.filter.value}
            />
          );
          break;
      }
    },
    removeLast() {
      if (this.value.length > 0) {
        this.value.splice(this.value.length - 1, 1);
      }
    },
    createPredicate() {
      this.value.push({
        operator: this.filter.operator,
        field: this.filter.column.id,
        value: this.filter.value
      });

      this.filter = {
        column: null,
        operator: null,
        value: null
      };

      this.$nextTick(() => {
        this.focus();
      });
    },
    setColumn(col) {
      this.filter.column = col;

      this.$nextTick(() => {
        this.$refs.op.focus();
      });
    },
    setOperator(op) {
      this.filter.operator = op.id;

      this.$nextTick(() => {
        this.$refs.val.focus();
      });
    },
    removeValue() {
      this.filter.operator = null;
      this.filter.value = null;

      this.$nextTick(() => {
        this.$refs.op.focus();
      });
    },
    removeOperator() {
      this.filter.column = null;
      this.filter.operator = null;

      this.$nextTick(() => {
        this.$refs.col.focus();
      });
    },
    getColumnHeader(id) {
      for (let col of this.columns) {
        if (col.id === id) return col.label;
      }
    },
    getColumnType(id) {
      for (let col of this.columns) {
        if (col.id === id) return col.type;
      }
    },
    getColumns(query) {
      query = query.toLowerCase();

      let results = [];

      for (let col of this.columns) {
        if (col.label.toLowerCase().startsWith(query)) {
          results.push({
            id: col.id,
            text: col.label
          });
        }
      }

      return results;
    },
    getOperators(query) {
      query = query.toLowerCase();

      let results = [];
      let type = this.getColumnType(this.filter.column.id);

      for (let [key, val] of Object.entries(
        this.operators[type] || this.operators.default
      )) {
        if (val.startsWith(query)) {
          results.push({
            id: key,
            text: val
          });
        }
      }

      return results;
    },
    selected(item) {
      for (var i = 0; i < this.value.length; ++i) {
        const val = this.value[i];

        if (val.id === item.id) {
          return true;
        }
      }

      return false;
    },
    remove(item) {
      this.value.splice(this.value.indexOf(item), 1);
    },
    focus() {
      if (this.filter.column === null) {
        this.$refs.col.focus();
      } else if (this.filter.operator === null) {
        this.$refs.op.focus();
      } else {
        this.$refs.val.focus();
      }
    },
    onBlur() {
      this.focused = false;

      this.query = "";
    },
    onFocus() {
      this.focused = true;
      this.query = "";
      this.$refs.itemsPopover.show();
    },
    toggle(item) {
      for (var i = 0; i < this.value.length; ++i) {
        const val = this.value[i];

        if (val.id === item.id) {
          this.value.splice(i, 1);
          return;
        }
      }

      this.value.push(item);
    }
  }
};
</script>

<style>
.filter-builder > .fa-filter {
  margin-right: 4px;
  font-size: 16px;
  margin-left: 4px;
}

.filter-builder > {
  z-index: 3;
}

.filter-builder-editor {
  display: flex;
  margin-top: -3px;
  margin-bottom: -3px;
  flex-grow: 1;
}

.margin-span {
  margin-left: 4px;
  margin-right: 4px;
  height: 30px;
  line-height: 30px;
}
</style>