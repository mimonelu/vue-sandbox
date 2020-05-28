<template>
  <div class="editable-table-view">
    <editable-table v-bind="editableTableProps" />
    <button @click="change">Change</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditableTable from '@/components/editable-table/EditableTable.vue'

@Component({
  components: {
    EditableTable,
  },
})
export default class EditableTableView extends Vue {
  editableTableProps = {
    headers: [
      [
        { value: 'Header 1' },
        { value: 'Header 2', attrs: { colspan: 3 } },
        { value: 'Header 3' },
      ],
      [
        { value: 'Header A' },
        { value: 'Header B' },
        { value: 'Header C' },
        { value: 'Header D' },
        { value: 'Header E' },
      ],
    ],
    bodies: [
      [ { value: 'Cell 1, 0' }, { value: 'Cell 2, 0' }, { value: 'https://google.com' }, { value: 'Cell 4, 0' }, { value: 1 } ],
      [ { value: 'Cell 1, 1', swapper: null }, { value: 'Cell 2, 1' }, { value: 'https://google.com' }, { value: 'Cell 4, 1', filter: null }, { value: 2, filter: this.filterYen } ],
      [ { value: 'Cell 1, 2' }, { value: 'Cell 2, 2' }, { value: 'https://google.com' }, { value: 'Cell 4, 2' }, { value: 3, swapper: { type: 'link', label: 'Open URL', target: '_blank' } } ],
    ],
    columnRegulations: [
      { swapper: { type: 'button', label: 'Remove', callback: this.remove } },
      { filter: this.filterYen, swapper: { type: 'button', callback (cell: any, row: number, column: number) { alert(`${cell.value} ${row} ${column}`) } } },
      { swapper: { type: 'link', label: 'Open URL', target: '_blank' } },
      { filter: this.filterYen },
      { swapper: { type: 'select', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
    ],
    numberOfLines: true,
  }

  filterYen (value: any): string {
    return `$ ${value.toLocaleString()}`
  }

  remove (cell: any, row: number, column: number) {
    console.log(column)
    this.editableTableProps.bodies.splice(row, 1)
  }

  change () {
    this.editableTableProps.headers[0][0].value = '???'
  }
}
</script>

<style lang="scss" scoped>
</style>
