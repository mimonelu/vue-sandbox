<template>
  <div class="veditable-view">
    <veditable v-bind="veditableProps1" />
    <veditable v-bind="veditableProps2" />
    <button @click="change">Change</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Veditable from '@/components/veditable/Veditable.vue'
import { TVeditable, TVeditableButtonParams } from '@/components/veditable/types'

const irandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

@Component({
  components: {
    Veditable,
  },
})
export default class VeditableView extends Vue {
  veditableProps1: TVeditable = {}

  veditableProps2: TVeditable = {}

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
    'veditable@veditable.com',
    '2020-01',
    'veditable',
    'Editable Table',
    '012-345-6789',
    '02:34',
    'https://veditable.com',
    '2020-W04',
  ]

  mounted () {
    this.veditableProps1 = {
      headers: [
        [
          { value: 'Check' },
          { value: 'Primitives', attrs: { colspan: 5 } },
          { value: 'Filter\nDemo', attrs: { rowspan: 2 } },
          { value: 'Extensions', attrs: { colspan: 5 } },
          { value: 'Controls', attrs: { colspan: 3 } },
        ], [
          { value: '' },
          { value: 'Boolean' },
          { value: 'Number' },
          { value: 'String' },
          { value: 'Multiline string' },
          { value: 'Array' },
          { value: 'Link' },
          { value: 'Button' },
          { value: 'Radio' },
          { value: 'Select' },
          { value: 'List' },
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
        { type: 'string', multiline: true },
        { type: 'array', suffix: '件' },
        { type: 'number', filter: this.filterSample },
        { extension: { type: 'link', label: 'Open URL', target: '_blank' } },
        { extension: { type: 'button', label: 'Click me!', callback (params: TVeditableButtonParams) { alert(`${params.cell.value} This cell is (${params.row}, ${params.column}).`) } } },
        { type: 'number', extension: { type: 'radio', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { type: 'number', extension: { type: 'select', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { type: 'string', extension: { type: 'list', options: [ 'apple', 'bug', 'cupid' ] } },
        { extension: { type: 'button', label: 'Remove', callback: this.remove } },
        { extension: { type: 'button', label: 'Add up', callback: this.addUp } },
        { extension: { type: 'button', label: 'Add down', callback: this.addDown } },
      ],
      disabled: false,
      floatingThead: true,
      floatingColumns: 2,
      numberOfLines: true,
      focus: {
        x: 0,
        y: 0,
      },
      focused: true,
    }
    this.veditableProps2 = {
      headers: [
        [
          { value: 'Other string' },
          { value: 'Checkbox' },
          { value: 'Radio' },
        ],
      ],
      bodies: Array(100).fill(0).map((item: any, index: number) => ([
        {
          type: this.otherStringTypes[index % this.otherStringTypes.length],
          value: this.otherStringValues[index % this.otherStringValues.length],
        },
        { value: [ 1, 2, 3 ].sort(() => Math.random() - 0.5).splice(irandom(0, 3)) },
        { value: irandom(1, 3) },
      ])),
      columnRegulations: [
        { type: 'string', required: true },
        { type: 'array', extension: { type: 'checkbox', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { type: 'number', extension: { type: 'radio', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
      ],
    }
  }

  makeSampleRow (): any {
    const result = [
      { value: null },
      { value: irandom(0, 1) === 1 },
      { value: this.serialNumber },
      { value: [ ...Array(8).keys() ].map(() => Math.floor(Math.random() * 36).toString(36)).join('') },
      { value: 'Hello, world!' },
      { value: [ 0, 1, 2 ] },
      { value: irandom(0, 65535) },
      { value: `https://google.com/search?q=${this.serialNumber}` },
      { value: 'Hello, Veditable!' },
      { value: irandom(1, 3) },
      { value: irandom(1, 3) },
      { value: [ 'apple', 'bug', 'cupid' ][irandom(0, 2)] },
      { value: '' },
      { value: '' },
      { value: '' },
    ]
    this.serialNumber ++
    return result
  }

  showData (params: TVeditableButtonParams) {
    alert(JSON.stringify(this.veditableProps1.bodies[params.row]))
  }

  filterSample (value: any): string {
    return `$ ${value.toLocaleString()}`
  }

  remove (params: TVeditableButtonParams) {
    this.veditableProps1.bodies.splice(params.row, 1)
  }

  addUp (params: TVeditableButtonParams) {
    this.veditableProps1.bodies.splice(params.row, 0, this.makeSampleRow())
  }

  addDown (params: TVeditableButtonParams) {
    this.veditableProps1.bodies.splice(params.row + 1, 0, this.makeSampleRow())
  }

  change () {
    this.veditableProps1.headers[0][0].value = '???'
  }
}
</script>

<style lang="scss" scoped>
.veditable-view {
  margin: 1em;

  .veditable {
    margin: 1em 0;
    height: 320px;
  }
}
</style>
