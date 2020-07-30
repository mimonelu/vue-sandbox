<template>
  <div class="veditable-view">
    <veditable
      v-bind="veditableProps1"
      ref="veditable1"
    />
    <veditable
      v-bind="veditableProps2"
      ref="veditable2"
    />
    <veditable
      v-bind="veditableProps3"
      ref="veditable3"
    />
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

  veditableProps3: TVeditable = {}

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
        { name: 'checkButton', extension: { type: 'button', label: 'Check', callback: this.showData1 } },
        { name: 'booleanItem', type: 'boolean' },
        { name: 'numberItem', type: 'number', disabled: true, rule: { callback (value: any) { return value <= 50 }, message: '値は50以下でなければなりません' } },
        { name: 'stringItem', type: 'string', required: true, classes: 'center', rule: { type: 'warn', callback (value: any, params: any) { return !!value.match(params) }, params: /\d/, message: '数字を含んでいません' } },
        { name: 'multilineStringItem', type: 'string', multiline: true },
        { name: 'arrayItem', type: 'array', suffix: '件' },
        { name: 'filterDemo', type: 'number', filter: this.filterSample, required: true },
        { name: 'linkExtension', extension: { type: 'link', label: 'Open URL', target: '_blank' } },
        { name: 'buttonExtension', extension: { type: 'button', label: 'Click me!', callback (params: TVeditableButtonParams) { alert(`${params.cell.value} This cell is (${params.row}, ${params.column}).`) } } },
        { name: 'radioExtension', type: 'number', extension: { type: 'radio', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { name: 'selectExtension', type: 'number', extension: { type: 'select', options: [ { label: 'No.1', value: 1 }, { label: 'No.2', value: 2 }, { label: 'No.3', value: 3 } ] } },
        { name: 'listExtension', type: 'string', extension: { type: 'list', options: [ 'apple', 'bug', 'cupid' ] } },
        { name: 'removeButton', extension: { type: 'button', label: 'Remove', callback: this.remove } },
        { name: 'addUpButton', extension: { type: 'button', label: 'Add up', callback: this.addUp } },
        { name: 'addDownButton', extension: { type: 'button', label: 'Add down', callback: this.addDown } },
      ],
      disabled: false,
      headerColumn: 0,
      floatingThead: true,
      floatingColumns: 2,
      numberOfLines: true,
      focusable: true,
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

    const options = [
      [ { label: 'One', value: 'One' }, { label: 'Two', value: 'Two' }, { label: 'Three', value: 'Three' } ],
      [ { label: 'Red', value: 'Red' }, { label: 'Green', value: 'Green' }, { label: 'Blue', value: 'Blue' } ],
      [ { label: 'Apple', value: 'Apple' }, { label: 'Banana', value: 'Banana' }, { label: 'Cherry', value: 'Cherry' } ],
    ]
    const onChange = () => {
      this.veditableProps3.columnRegulations[2].extension.options = options[this.veditableProps3.bodies[0][1].value]
    }
    this.veditableProps3 = {
      headers: [
        [
          { value: 'Check' },
          { value: 'Category 1' },
          { value: 'Category 2' },
        ],
      ],
      bodies: [
        [
          { value: '' },
          { value: 0 },
          { value: 'One' },
        ],
      ],
      columnRegulations: [
        { extension: { type: 'button', label: 'Check', callback: this.showData3 } },
        { type: 'number', extension: { type: 'select', options: [ { label: 'Number', value: 0 }, { label: 'Colors', value: 1 }, { label: 'Fruits', value: 2 } ], change: onChange } },
        { type: 'string', extension: { type: 'select', options: options[0] } },
      ],
    }
  }

  makeSampleRow (): any {
    const result = [
      { value: irandom(1, 1000) },
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

  showData1 (params: TVeditableButtonParams) {
    console.log((this.$refs.veditable1 as Veditable).getValueByName(params.row, 'stringItem'))
    alert(JSON.stringify(this.veditableProps1.bodies[params.row]))
  }

  showData3 (params: TVeditableButtonParams) {
    alert(JSON.stringify(this.veditableProps3.bodies[params.row]))
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

  .veditable:nth-child(1),
  .veditable:nth-child(2) {
    margin: 1em 0;
    height: 320px;
  }
  .veditable:nth-child(3) {
    width: 50%;
  }

  .veditable::v-deep {
    .center {
      text-align: center;
    }
  }
}
</style>
