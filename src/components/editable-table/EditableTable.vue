<template>
  <div class="editable-table">
    <table>
      <thead v-if="headers.length > 0">
        <tr
          v-for="headerRow, headerRowIndex of headers"
          :key="`header__${headerRowIndex}`"
        >
          <th
            v-if="numberOfLines && headerRowIndex === 0"
            :rowspan="headers.length"
          />
          <th
            v-for="headerCell, headerCellIndex of headerRow"
            :key="`header__${headerRowIndex}__${headerCellIndex}`"
            v-bind="headerCell.attrs"
          >{{ headerCell.value }}</th>
        </tr>
      </thead>
      <tbody v-if="bodies.length > 0">
        <editable-table-row
          v-for="bodyRow, bodyRowIndex of bodies"
          :key="bodyRowIndex"
          :columns="bodyRow"
          :column-regulations="columnRegulations"
          :row-index="bodyRowIndex"
          :number-of-lines="numberOfLines"
          :disabled="disabled"
          :is-last-row="bodyRowIndex === bodies.length - 1"
          @lastCellLoaded.once="onLastCellLoaded"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditableTableRow from '@/components/editable-table/EditableTableRow.vue'

@Component({
  components: {
    EditableTableRow,
  },
})
export default class EditableTable extends Vue {
  @Prop({ required: false, default: () => ([]) })
  headers: any

  @Prop({ required: false, default: () => ([]) })
  bodies: any

  @Prop({ required: false, default: () => ([]) })
  columnRegulations: any

  @Prop({ required: false, default: true })
  numberOfLines?: boolean

  @Prop({ required: false, default: false })
  disabled?: boolean

  @Prop({ required: false, default: () => ({ x: 0, y: 0 }) })
  focus?: any

  lastCellLoaded = false

  mounted () {
    window.addEventListener('keydown', this.onKeyDown, false)
  }

  onLastCellLoaded () {
    if (!this.lastCellLoaded) {
      this.lastCellLoaded = true
      this.setFocus(this.focus.x, this.focus.y)
    }
  }

  onKeyDown (event: KeyboardEvent) {
    const currentCell = Vue.prototype.$currentCell
    const editing = !currentCell || currentCell.editing
    if (!event.isComposing) {
      switch (event.key) {
        case 'Tab': {
          if (currentCell && currentCell.editing) {
            currentCell.editing = false
          }
          this.addFocus(event.shiftKey ? - 1 : 1, 0)
          event.preventDefault()
          break
        }
      }
    }
    if (event.altKey || event.ctrlKey || event.shiftKey) {
      return
    }
    if (!editing) {
      switch (event.key) {
        case 'ArrowUp': {
          if (event.metaKey) {
            this.setFocusToTop()
          } else {
            this.addFocus(0, - 1)
          }
          event.preventDefault()
          break
        }
        case 'ArrowRight': {
          if (event.metaKey) {
            this.setFocusToRight()
          } else {
            this.addFocus(1, 0)
          }
          event.preventDefault()
          break
        }
        case 'ArrowDown': {
          if (event.metaKey) {
            this.setFocusToBottom()
          } else {
            this.addFocus(0, 1)
          }
          event.preventDefault()
          break
        }
        case 'ArrowLeft': {
          if (event.metaKey) {
            this.setFocusToLeft()
          } else {
            this.addFocus(- 1, 0)
          }
          event.preventDefault()
          break
        }
        case 'Enter':
        case 'F2':
        case ' ': {
          if (currentCell && currentCell.canEdit()) {
            currentCell.editing = true
            event.preventDefault()
          }
          break
        }
      }
    } else {
      if (!event.isComposing) {
        switch (event.key) {
          case 'Enter': {
            if (currentCell) {
              currentCell.editing = false
              event.preventDefault()
            }
            break
          }
          case 'Escape': {
            if (currentCell) {
              currentCell.editing = false
              event.preventDefault()
            }
            break
          }
        }
      }
    }
  }

  setFocus (x: number, y: number) {
    if (this.$children[y] && this.$children[y].$children[x]) {
      if (Vue.prototype.$currentCell) {
        Vue.prototype.$currentCell.editing = false
        Vue.prototype.$currentCell.focused = false
      }
      Vue.prototype.$currentCell = this.$children[y].$children[x]
      Vue.prototype.$currentCell.focused = true
      Vue.prototype.$currentCell.$el.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      })
      Vue.prototype.$currentCell.focus()
    }
  }

  setFocusToTop () {
    if (Vue.prototype.$currentCell) {
      this.setFocus(Vue.prototype.$currentCell.columnIndex, 0)
    }
  }

  setFocusToRight () {
    if (Vue.prototype.$currentCell) {
      const y = Vue.prototype.$currentCell.rowIndex
      if (this.$children[y]) {
        this.setFocus(this.$children[y].$children.length - 1, y)
      }
    }
  }

  setFocusToBottom () {
    if (Vue.prototype.$currentCell) {
      this.setFocus(Vue.prototype.$currentCell.columnIndex, this.$children.length - 1)
    }
  }

  setFocusToLeft () {
    if (Vue.prototype.$currentCell) {
      this.setFocus(0, Vue.prototype.$currentCell.rowIndex)
    }
  }

  addFocus (addingX: number, addingY: number) {
    if (Vue.prototype.$currentCell) {
      const x = Vue.prototype.$currentCell.columnIndex + addingX
      const y = Vue.prototype.$currentCell.rowIndex + addingY
      this.setFocus(x, y)
    }
  }
}
</script>

<style lang="scss">
@import "@/components/editable-table/styles/editable-table";
</style>
