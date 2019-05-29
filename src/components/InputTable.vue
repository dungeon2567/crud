<template>
  <div class="input-table">
    <div class="input-table-header">
      <div class="input-table-header-cell"/>
      <div v-for="col in columns" :key="col.field" class="input-table-header-cell">{{col.label}}</div>
    </div>
    <div class="input-table-body">
      <div
        class="input-table-body-row"
        @mouseover="mouseMove($event, index)"
        @mousemove="mouseMove($event, index)"
        :style="getStyle(index)"
        v-for="(row, index) in rows"
        :key="row.id"
      >
        <div class="input-table-body-cell">
          <i
            class="fas fa-grip-vertical drag-handle"
            @mousedown="drag($event, row, index, $event.target.parentNode.parentNode)"
          />
        </div>
        <InputTableBodyCell
          :type="col.type"
          v-for="col in columns"
          :key="col.field"
          v-model="row[col.field]"
        />
      </div>
      <div class="input-table-body-row">
        <div class="input-table-body-cell">#</div>
        <InputTableBodyCell
          :type="col.type"
          v-for="col in columns"
          :key="col.field"
          @blur="create"
          v-model="editing[col.field]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputTableBodyCell from "./InputTableBodyCell.vue";

export default {
  props: {
    columns: {
      type: Array
    },
    rows: {
      type: Array
    }
  },
  components: {
    InputTableBodyCell
  },
  data() {
    return {
      editing: this.createEmptyModel(),
      isDragging: false,
      hoverIndex: 0,
      draggedIndex: 0,
      draggedHeight: 0
    };
  },
  methods: {
    createEmptyModel() {
      const model = {};

      for (let col of this.columns) {
        model[col.field] = null;
      }

      return model;
    },
    create() {
      for (let col of this.columns) {
        if (this.editing[col.field] == null) {
          return;
        }
      }

      this.rows.push(this.editing);

      this.editing = this.createEmptyModel();
    },
    getStyle(index) {
      if (this.isDragging) {
        if (this.draggedIndex > this.hoverIndex) {
          return {
            transition: "transform 0.3s ease",
            transform: `translate3d(0, ${
              index >= this.hoverIndex && this.draggedIndex > index
                ? this.draggedHeight
                : 0
            }px, 0)`
          };
        } else {
          return {
            transition: "transform 0.3s ease",
            transform: `translate3d(0, -${
              index < this.hoverIndex && this.draggedIndex < index
                ? this.draggedHeight
                : 0
            }px, 0)`
          };
        }
      } else {
        return {};
      }
    },
    mouseMove(e, index) {
      if (!this.isDragging) return;

      var rect = e.target.getBoundingClientRect();
      var y = e.pageY - rect.top;

      if (y <= rect.height / 2) {
        this.hoverIndex = index;
      } else {
        this.hoverIndex = index + 1;
      }
    },
    drag(event, row, index, node) {
      event.preventDefault();

      this.draggedIndex = index;
      this.hoverIndex = index;
      this.isDragging = true;

      const rect = node.getBoundingClientRect();

      var x = event.pageX - rect.left;
      var y = event.pageY - rect.top;

      const height = rect.height;
      const width = rect.width;

      this.draggedHeight = height;

      var clone = node.cloneNode(true);
      var baseStyle = `position: fixed; z-index: 999; width: ${width}px; height: ${height}px; left: -${x}px; top: -${y}px; pointer-events: none`;

      clone.style = `${baseStyle}; transform: translate3d(${event.pageX}px, ${
        event.pageY
      }px, 0);`;

      document.body.appendChild(clone);

      node.classList.add("invisible");

      var mouseMoveHandler = ev => {
        clone.style = `${baseStyle}; transform: translate3d(${ev.pageX}px, ${
          ev.pageY
        }px, 0);`;
      };

      var mouseUpHandler = ev => {
        node.classList.remove("invisible");
        document.body.removeChild(clone);

        if (this.draggedIndex != this.hoverIndex) {
          const row = this.rows[this.draggedIndex];

          this.rows.splice(this.draggedIndex, 1);
          this.rows.splice(this.hoverIndex, 0, row);
        }

        document.body.removeEventListener("mousemove", mouseMoveHandler);
        document.body.removeEventListener("mouseup", mouseUpHandler);

        this.isDragging = false;
      };

      document.body.addEventListener("mousemove", mouseMoveHandler);
      document.body.addEventListener("mouseup", mouseUpHandler);
    }
  }
};
</script>

<style>
.input-table {
  width: auto;
}

.drag-handle {
  cursor: drag;
  margin: auto;
}

.input-table-body-row {
  display: flex;
}

.input-table-header {
  display: flex;
  z-index: 2;
}

.input-table-header-cell,
.input-table-body-cell {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 30px;
  overflow: hidden;
}

.input-table-header-cell {
  padding: 4px;
}

.input-table-header-cell,
.input-table-body-cell,
.input-table-footer-cell {
  width: 120px;
  flex-shrink: 0;
  flex-grow: 0;
}

.input-table-header-cell:first-child,
.input-table-body-cell:first-child,
.input-table-footer-cell:first-child {
  width: 30px;
  background: #f5f8fa;
}

.input-table-header-cell:nth-child(2),
.input-table-body-cell:nth-child(2),
.input-table-footer-cell:nth-child(2) {
  flex-grow: 1;
}

.input-table-body-cell {
  background: #fff;
  border: 1px solid #cccccc;
  margin-bottom: -1px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.input-table-body-cell > *:not(:last-child)::after {
  content: ",";
  margin-right: 4px;
}

.input-table-body-cell:not(:first-child) {
  margin-left: -1px;
}

.input-table-header-cell {
  background: var(--table-header-color);
  font-weight: bold;
  color: var(--contranst-color);
  border: 1px solid #cccccc;
  margin-bottom: -1px;
  z-index: 2;
  position: sticky;
  text-align: center;
  justify-content: center;
  top: 0;
}

.input-table-footer {
  background: var(--table-header-color);
  font-weight: bold;
  color: var(--default-color-contrast);
  border: 1px solid #cccccc;
  z-index: 1;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 2px;
}

.input-table-footer > * {
  margin: 2px;
}

.input-table-header-cell:not(:first-child) {
  margin-left: -1px;
}

.table-cell-icon {
  font-size: 16px;
  width: 20px;
}

.input-table-body-cell:not(.focused) {
  cursor: text;
}

.input-table-body-cell.focused {
  z-index: 9999;
  background: white !important;
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px rgba(19, 124, 189, 0.3),
    inset 0 1px 1px rgba(16, 22, 26, 0.2);
}
</style>