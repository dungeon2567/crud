<script>
import FilterBuilder from "./FilterBuilder.vue";
import Dropdown from "./Dropdown.vue";
import Checkbox from "./Checkbox.vue";
import Button from "./Button.vue";

export default {
  props: {
    columns: {
      type: Array
    },
    rows: {
      type: Array
    }
  },
  data() {
    return {
      filters: [],
      selected: []
    };
  },
  computed: {
    visibleColumns() {
      return this.columns.filter(col => col.visible);
    },
    visibleRows() {
      const filters = this.filters;

      function applyFilter(row) {
        for (const filter of filters) {
          switch (filter.operator) {
            case "eq":
              if (row[filter.field] != filter.value) return false;
              break;
            case "ne":
              if (row[filter.field] == filter.value) return false;
              break;
            case "ge":
              if (+filter.value >= +row[filter.field]) return false;
              break;
            case "gt":
              if (+filter.value > +row[filter.field]) return false;
              break;
            case "le":
              if (+filter.value <= +row[filter.field]) return false;
              break;
            case "lt":
              if (+filter.value < +row[filter.field]) return false;
              break;
          }
        }

        return true;
      }

      return this.rows.filter(applyFilter);
    }
  },
  render(h) {
    return (
      <div class="data-table-container">
        <div class="data-table-filter-container">
          <FilterBuilder
            columns={this.columns}
            onInput={val => (this.filters = val)}
            value={this.filters}
          />
          <Button
            class="danger"
            onClick={this.deleteSelected}
            disabled={this.selected.length === 0}
          >
            <i class="fas fa-trash icon" />
          </Button>
          <Dropdown>
            <i class="fas fa-cog icon" />
            <ul class="menu" slot="content">
              {this.columns.map(col => (
                <li
                  class="menu-item"
                  key={col.field}
                  onClick={() => (col.visible = !col.visible)}
                >
                  <i class={`${col.visible ? "fas fa-check" : ""} icon`} />
                  <span>{col.label}</span>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
        <div
          class="data-table"
          style={{
            "grid-template-columns": `27px ${this.visibleColumns
              .map(col => "auto")
              .join(" ")} auto`
          }}
        >
          <div class="data-table-header">
            <div class="data-table-header-row">
              <div class="data-table-header-cell">
                <Checkbox
                  onClick={this.toggleSelections}
                  checked={
                    this.selected.length === 0
                      ? false
                      : this.selected.length === this.visibleRows.length
                      ? true
                      : null
                  }
                />
              </div>
              {this.visibleColumns.map(col => (
                <div class="data-table-header-cell" key={col.field}>
                  {col.label}
                </div>
              ))}
              <div class="data-table-header-cell">Ações</div>
            </div>
          </div>
          <div class="data-table-body">
            {this.visibleRows.map((row, index) => (
              <div key={row.id} class="data-table-body-row">
                <div class="data-table-body-cell">
                  <Checkbox
                    checked={this.selected.indexOf(row.id) !== -1}
                    onClick={() => this.toggleSelection(row)}
                  />
                </div>
                {this.visibleColumns.map(col => (
                  <div class="data-table-body-cell" key={col.field}>
                    {col.multiple
                      ? row[col.field].map(val => (
                          <span class="link">
                            {this.renderCellContent(col, val)}
                          </span>
                        ))
                      : this.renderCellContent(col, row[col.field])}
                  </div>
                ))}
                <div class="data-table-body-cell">
                  {this.$scopedSlots.actions({ row })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  methods: {
    deleteSelected() {
      this.$emit("delete", this.selected);
      this.selected = [];
    },
    renderCellContent(col, val) {
      switch (col.type) {
        case "text":
          return val;
        case "date":
          return [<i class="far fa-clock table-cell-icon" />, val.formatDate()];
        case "number":
          return val;
        default:
          return val;
      }
    },
    toggleSelection(row) {
      let index = this.selected.indexOf(row.id);

      if (index !== -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(row.id);
      }
    },
    toggleSelections() {
      if (this.selected.length === 0) {
        this.selected = this.visibleRows.map(row => row.id);
      } else {
        this.selected = [];
      }
    },
    filterEmpty(val) {
      return val === null || val === undefined || val === "";
    },
    toggleVisibility(col) {
      col.visible = !col.visible;
    }
  }
};
</script>

<style>
.data-table-container {
  display: flex;
  flex-direction: column;
}

.data-table-filter-container {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
}

.data-table-filter-container > *:first-child {
  flex-grow: 1;
}

.data-table-filter-container > *:not(:first-child) {
  margin-left: 8px;
}

.data-table {
  background: white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);

  display: grid;
  flex-grow: 1;
}

.drag-handle {
  cursor: grab;
}

.data-table-header,
.data-table-body {
  display: contents;
}

.data-table-body-row,
.data-table-header-row {
  display: contents;
}

.data-table-header-cell,
.data-table-body-cell {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: #f5f8fa;
}

.data-table-body-cell:first-child {
  background: var(--table-header-color);
}

.data-table-body-cell {
  background: #fff;
  border: 1px solid #cccccc;
  margin-bottom: -1px;
  display: flex;
  flex-wrap: wrap;
}

.data-table-body-cell > *:not(:last-child)::after {
  content: ",";
  margin-right: 4px;
}

.data-table-body-cell:not(:first-child) {
  margin-left: -1px;
}

.data-table-header-cell {
  background: var(--table-header-color);
  font-weight: bold;
  color: var(--contranst-color);
  border: 1px solid #cccccc;
  margin-bottom: -1px;
  z-index: 2;
  position: sticky;
  top: 0;
}

.data-table-header-cell:not(:first-child) {
  margin-left: -1px;
  min-width: 100px;
}

.table-cell-icon {
  font-size: 16px;
  width: 20px;
}
</style>
