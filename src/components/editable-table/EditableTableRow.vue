<template>
  <tr>
    <th v-if="numberOfLines">{{ rowIndex + 1 }}</th>
    <editable-table-cell
      v-for="cell, columnIndex of columns"
      :key="columnIndex"
      :cell="columns[columnIndex]"
      :regulation="columnRegulations[columnIndex]"
      :row-index="rowIndex"
      :column-index="columnIndex"
      :disabled="disabled"
      :is-last-row="isLastRow"
      :is-last-column="columnIndex === columns.length - 1"
      @lastCellLoaded.once="$emit('lastCellLoaded')"
    />
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditableTableCell from '@/components/editable-table/EditableTableCell.vue'

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
  isLastRow?: boolean
}
</script>
