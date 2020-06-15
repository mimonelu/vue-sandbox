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
  focus: any

  mounted () {
    window.addEventListener('keydown', this.onKeyDown, false)
  }

  onKeyDown (event: KeyboardEvent) {
    const editing = !Vue.prototype.$currentCell || Vue.prototype.$currentCell.editing
    if (!editing) {
      switch (event.key) {
        case 'ArrowUp': {
          this.addFocus(0, - 1)
          event.preventDefault()
          break
        }
        case 'ArrowRight': {
          this.addFocus(1, 0)
          event.preventDefault()
          break
        }
        case 'ArrowDown': {
          this.addFocus(0, 1)
          event.preventDefault()
          break
        }
        case 'ArrowLeft': {
          this.addFocus(- 1, 0)
          event.preventDefault()
          break
        }
      }
    }
  }

  addFocus (addingX: number, addingY: number) {
    if (Vue.prototype.$currentCell && !Vue.prototype.$currentCell.editing) {
      const x = Vue.prototype.$currentCell.columnIndex + addingX
      const y = Vue.prototype.$currentCell.rowIndex + addingY
      if (this.$children[y] && this.$children[y].$children[x]) {
        Vue.prototype.$currentCell.focused = false
        Vue.prototype.$currentCell = this.$children[y].$children[x]
        Vue.prototype.$currentCell.focused = true
        Vue.prototype.$currentCell.$el.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/components/editable-table/styles/editable-table";
</style>
