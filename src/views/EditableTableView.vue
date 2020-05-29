<template>
  <div class="editable-table-view">
    <editable-table v-bind="editableTableProps" />
    <button @click="change">Change</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditableTable from '@/components/editable-table/EditableTable.vue'

const irandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

@Component({
  components: {
    EditableTable,
  },
})
export default class EditableTableView extends Vue {
  editableTableProps = {}

  serialNumber = 0

  mounted () {
    this.editableTableProps = {
      headers: [
        [
          { value: 'Primitives', attrs: { colspan: 5 } },
          { value: 'Filter\nDemo', attrs: { rowspan: 2 } },
          { value: 'Swappers', attrs: { colspan: 4 } },
          { value: 'Controls', attrs: { colspan: 3 } },
        ],
        [
          { value: 'Null' },
          { value: 'Boolean' },
          { value: 'Number' },
          { value: 'String' },
          { value: 'Array' },
          { value: 'Link' },
          { value: 'Button' },
          { value: 'Radio' },
          { value: 'Select' },
          { value: 'Remove' },
          { value: 'Add up' },
          { value: 'Add down' },
        ],
      ],
      bodies: Array(100).fill(0).map((item: number, index: number) => this.makeSampleRow()),
      columnRegulations: [
        null,
        null,
        null,
        null,
        { options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] },
        { filter: this.filterSample },
        { swapper: { type: 'link', label: 'Open URL', target: '_blank' } },
        { swapper: { type: 'button', label: 'Click me!', callback (cell: any, row: number, column: number) { alert(`${cell.value} This cell is (${row}, ${column}).`) } } },
        { swapper: { type: 'radio', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { swapper: { type: 'select', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { swapper: { type: 'button', label: 'Remove', callback: this.remove } },
        { swapper: { type: 'button', label: 'Add up', callback: this.addUp } },
        { swapper: { type: 'button', label: 'Add down', callback: this.addDown } },
      ],
      numberOfLines: true,
    }
  }

  makeSampleRow (): any {
    const result = [
      { value: null },
      { value: irandom(0, 1) === 1 },
      { value: this.serialNumber },
      { value: [ ...Array(8).keys() ].map(() => Math.floor(Math.random() * 36).toString(36)).join('') },
      { value: [ 1, 2, 3 ].sort(() => Math.random() - 0.5).splice(irandom(0, 3)) },
      { value: irandom(0, 65535) },
      { value: `https://google.com/search?q=${this.serialNumber}` },
      { value: 'Hello, EditableTable!' },
      { value: irandom(1, 3) },
      { value: irandom(1, 3) },
      { value: '' },
      { value: '' },
      { value: '' },
    ]
    this.serialNumber ++
    return result
  }

  filterSample (value: any): string {
    return `$ ${value.toLocaleString()}`
  }

  remove (cell: any, row: number, column: number) {
    this.editableTableProps.bodies.splice(row, 1)
  }

  addUp (cell: any, row: number, column: number) {
    this.editableTableProps.bodies.splice(row, 0, this.makeSampleRow())
  }

  addDown (cell: any, row: number, column: number) {
    this.editableTableProps.bodies.splice(row + 1, 0, this.makeSampleRow(row))
  }

  change () {
    this.editableTableProps.headers[0][0].value = '???'
  }
}
</script>

<style lang="scss" scoped>
</style>
