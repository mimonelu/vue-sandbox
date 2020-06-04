<template>
  <div class="editable-table-view">
    <editable-table v-bind="editableTableProps" />
    <button @click="change">Change</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditableTable from '@/components/editable-table/EditableTable.vue'
import { TEditableTable, TEditableTableButtonParams } from '@/components/editable-table/types'

const irandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

@Component({
  components: {
    EditableTable,
  },
})
export default class EditableTableView extends Vue {
  editableTableProps: TEditableTable = {}

  serialNumber = 0

  otherStringTypes = [
    'date',
    'datetime-local',
    'email',
    'month',
    'password',
    'search',
    'tel',
    'time',
    'url',
    'week',
  ]

  otherStringValues = [
    '2020-01-23',
    '2020-01-23T02:34',
    'editable-table@editable-table.com',
    '2020-01',
    'editable-table',
    'Editable Table',
    '012-345-6789',
    '02:34',
    'https://editable-table.com',
    '2020-W04',
  ]

  mounted () {
    this.editableTableProps = {
      headers: [
        [
          { value: 'Check', attrs: { rowspan: 2 } },
          { value: 'Primitives', attrs: { colspan: 6 } },
          { value: 'Filter\nDemo', attrs: { rowspan: 2 } },
          { value: 'Swappers', attrs: { colspan: 4 } },
          { value: 'Controls', attrs: { colspan: 3 } },
        ],
        [
          { value: 'Boolean' },
          { value: 'Number' },
          { value: 'String' },
          { value: 'Other string' },
          { value: 'List' },
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
      bodies: Array(100).fill(0).map(() => this.makeSampleRow()),
      columnRegulations: [
        { extension: { type: 'button', label: 'Check', callback: this.showData } },
        { type: 'boolean' },
        { type: 'number', disabled: true, rule (value: any) { return value <= 50 } },
        { type: 'string', required: true },
        null,
        { list: [ 'apple', 'bug', 'cupid' ] },
        { type: 'array', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] },
        { type: 'number', filter: this.filterSample },
        { extension: { type: 'link', label: 'Open URL', target: '_blank' } },
        { extension: { type: 'button', label: 'Click me!', callback (params: TEditableTableButtonParams) { alert(`${params.cell.value} This cell is (${params.row}, ${params.column}).`) } } },
        { type: 'number', extension: { type: 'radio', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { type: 'number', extension: { type: 'select', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { extension: { type: 'button', label: 'Remove', callback: this.remove } },
        { extension: { type: 'button', label: 'Add up', callback: this.addUp } },
        { extension: { type: 'button', label: 'Add down', callback: this.addDown } },
      ],
      disabled: false,
      numberOfLines: true,
    }
  }

  makeSampleRow (): any {
    const result = [
      { value: null },
      { value: irandom(0, 1) === 1 },
      { value: this.serialNumber },
      { value: [ ...Array(8).keys() ].map(() => Math.floor(Math.random() * 36).toString(36)).join('') },
      {
        type: this.otherStringTypes[this.serialNumber % this.otherStringTypes.length],
        value: this.otherStringValues[this.serialNumber % this.otherStringValues.length],
      },
      { value: [ 'apple', 'bug', 'cupid' ][irandom(0, 2)] },
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

  showData (params: TEditableTableButtonParams) {
    alert(JSON.stringify(this.editableTableProps.bodies[params.row]))
  }

  filterSample (value: any): string {
    return `$ ${value.toLocaleString()}`
  }

  remove (params: TEditableTableButtonParams) {
    this.editableTableProps.bodies.splice(params.row, 1)
  }

  addUp (params: TEditableTableButtonParams) {
    this.editableTableProps.bodies.splice(params.row, 0, this.makeSampleRow())
  }

  addDown (params: TEditableTableButtonParams) {
    this.editableTableProps.bodies.splice(params.row + 1, 0, this.makeSampleRow())
  }

  change () {
    this.editableTableProps.headers[0][0].value = '???'
  }
}
</script>

<style lang="scss" scoped>
</style>
