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
}
</script>
