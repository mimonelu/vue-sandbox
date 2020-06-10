<template>
  <tr>
    <th v-if="numberOfLines">{{ rowIndex + 1 }}</th>
    <editable-table-cell
      v-for="cell, columnIndex of columns"
      :key="`body__${rowIndex}__${columnIndex}`"
      :cell="columns[columnIndex]"
      :regulation="columnRegulations[columnIndex]"
      :row-index="rowIndex"
      :column-index="columnIndex"
      :disabled="disabled"
      :focused-row-index="focusedRowIndex"
      :focused-column-index="focusedColumnIndex"
      @cellOnClick="cellOnClick"
    />
  </tr>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import EditableTableCell from '@/components/editable-table/EditableTableCell.vue'
import { TObject } from '@/components/editable-table/types'

@Component({
  components: {
    EditableTableCell,
  },
})
export default class EditableTableRow extends Vue {
  @Prop({ required: true })
  columns?: any

  @Prop({ required: true })
  columnRegulations?: any

  @Prop({ required: true })
  rowIndex?: number

  @Prop({ required: true })
  numberOfLines?: boolean

  @Prop({ required: true })
  disabled?: boolean

  @Prop({ required: true })
  focusedRowIndex?: number

  @Prop({ required: true })
  focusedColumnIndex?: number

  @Emit('cellOnClick')
  cellOnClick (params: TObject) {
    return params
  }
}
</script>
