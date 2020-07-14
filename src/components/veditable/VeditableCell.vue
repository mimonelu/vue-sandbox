<template>
  <td
    v-bind="cell.attrs"
    :class="classes"
    :data-required-type="requiredValueType"
    :data-type-is-valid="'' + isTypeValid"
    :data-is-required="'' + isRequired"
    :data-is-empty="'' + isEmpty"
    :data-is-ruled="'' + isRuled"
    :data-rule-type="ruleType"
    :data-is-disabled="'' + isDisabled"
    :data-is-floating="'' + floating"
    :data-is-focused="'' + focused"
    :data-is-editing="'' + editing"
    @click="onClick"
    @dblclick="onDoubleClick"
  >
    <div
      v-if="isRequired && isEmpty"
      class="veditable--error"
    >入力必須項目です</div>
    <div
      v-if="!isRuled"
      class="veditable--error"
    >{{ rule && rule.message }}</div>
    <div
      v-if="!isTypeValid"
      class="veditable--error"
    >データが不正です</div>
    <array-extension
      v-if="requiredValueType === 'array' && !extension"
      :cell="cell"
      :suffix="getProp('suffix')"
    />
    <boolean-extension
      v-else-if="requiredValueType === 'boolean'"
      :cell="cell"
      :disabled="isDisabled"
      @change="onChange"
    />
    <button-extension
      v-else-if="extension && extension.type === 'button'"
      :label="extension.label || valueLabel"
      :disabled="isDisabled"
      @click="extension.callback({ cell, row: rowIndex, column: columnIndex })"
    />
    <checkbox-extension
      v-else-if="extension && extension.type === 'checkbox'"
      :options="extension.options"
      :cell="cell"
      :disabled="isDisabled"
      @change="onChange"
    />
    <radio-extension
      v-else-if="extension && extension.type === 'radio'"
      :options="extension.options"
      :cell="cell"
      :disabled="isDisabled"
      @change="onChange"
    />
    <link-extension
      v-else-if="extension && extension.type === 'link'"
      :href="cell.value"
      :target="extension.target"
      :label="extension.label || valueLabel"
      :disabled="isDisabled"
    />
    <template v-else-if="focused && editing">
      <list-extension
        v-if="extension && extension.type === 'list'"
        :type="requiredValueType"
        :cell="cell"
        :list="extension.options"
        :list-id="`list--${rowIndex}--${columnIndex}`"
        :disabled="isDisabled"
        @change="onChange"
      />
      <select-extension
        v-else-if="extension && extension.type === 'select'"
        :options="extension.options"
        :cell="cell"
        :disabled="isDisabled"
        @change="onChange"
      />
      <number-extension
        v-else-if="requiredValueType === 'number'"
        :type="requiredValueType"
        :cell="cell"
        :disabled="isDisabled"
        @change="onChange"
      />
      <text-extension
        v-else-if="requiredValueType === 'string' && getProp('multiline')"
        :cell="cell"
        :disabled="isDisabled"
        @change="onChange"
      />
      <string-extension
        v-else
        :type="requiredValueType"
        :cell="cell"
        :disabled="isDisabled"
        @change="onChange"
      />
    </template>
    <div
      v-else
      class="veditable--label"
    >{{ valueLabel }}</div>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ArrayExtension from '@/components/veditable/extensions/ArrayExtension.vue'
import BooleanExtension from '@/components/veditable/extensions/BooleanExtension.vue'
import ButtonExtension from '@/components/veditable/extensions/ButtonExtension.vue'
import CheckboxExtension from '@/components/veditable/extensions/CheckboxExtension.vue'
import LinkExtension from '@/components/veditable/extensions/LinkExtension.vue'
import ListExtension from '@/components/veditable/extensions/ListExtension.vue'
import NumberExtension from '@/components/veditable/extensions/NumberExtension.vue'
import RadioExtension from '@/components/veditable/extensions/RadioExtension.vue'
import SelectExtension from '@/components/veditable/extensions/SelectExtension.vue'
import StringExtension from '@/components/veditable/extensions/StringExtension.vue'
import TextExtension from '@/components/veditable/extensions/TextExtension.vue'
import { TObject } from '@/components/veditable/types'

const stringTypes: TObject = {
  date: true,
  'datetime-local': true,
  email: true,
  month: true,
  password: true,
  search: true,
  tel: true,
  time: true,
  url: true,
  week: true,
}

@Component({
  components: {
    ArrayExtension,
    BooleanExtension,
    ButtonExtension,
    CheckboxExtension,
    LinkExtension,
    ListExtension,
    NumberExtension,
    RadioExtension,
    SelectExtension,
    StringExtension,
    TextExtension,
  },
})
export default class VeditableCell extends Vue {
  @Prop({ required: true })
  cell!: any

  @Prop({ required: true })
  regulation!: any

  @Prop({ required: true })
  rowIndex!: number

  @Prop({ required: true })
  columnIndex!: number

  @Prop({ required: true })
  disabled!: boolean

  @Prop({ required: true })
  floating!: boolean

  @Prop({ required: true })
  focusable!: boolean

  @Prop({ required: true })
  isLastRow!: boolean

  @Prop({ required: true })
  isLastColumn!: boolean

  editing = false

  focused = false

  get classes (): string {
    return this.getProp('classes')
  }

  get actualValueType (): string | null {
    const cell = this.cell
    if (cell.value == null) {
      return 'string'
    }
    if (Array.isArray(cell.value)) {
      return 'array'
    }
    const extension = this.extension
    if (extension && extension.type === 'select' && this.getOption(extension.options, cell.value) === null) {
      return null
    }
    return typeof cell.value
  }

  get requiredValueType (): string {
    const cell = this.cell
    if (cell.type != null) {
      return cell.type
    }
    const regulation = this.regulation
    if (regulation && regulation.type != null) {
      return regulation.type
    }
    return 'string'
  }

  get isTypeValid (): boolean {
    if (stringTypes[this.requiredValueType] === true) {
      return this.actualValueType === 'string'
    }
    return this.actualValueType === this.requiredValueType
  }

  get isRequired (): boolean {
    const cell = this.cell
    if (cell.required != null) {
      return cell.required
    }
    const regulation = this.regulation
    if (regulation && regulation.required != null) {
      return regulation.required
    }
    return false
  }

  get isEmpty (): boolean {
    const cell = this.cell
    return cell.value == null || cell.value === ''
  }

  get isRuled (): boolean {
    const rule = this.rule
    if (rule != null && rule.callback != null) {
      return rule.callback(this.cell.value, rule.params)
    }
    return true
  }

  get ruleType (): string | null {
    const rule = this.rule
    if (rule != null) {
      return rule.type || 'error'
    }
    return null
  }

  get rule (): any {
    return this.getProp('rule')
  }

  get isDisabled (): boolean {
    if (this.disabled) {
      return true
    }
    const cell = this.cell
    if (cell.disabled != null) {
      return cell.disabled
    }
    const regulation = this.regulation
    if (regulation && regulation.disabled != null) {
      return regulation.disabled
    }
    return false
  }

  get valueLabel (): string {
    const cell = this.cell
    const value = this.getLabel(cell)
    if (cell.filter !== null) {
      if (cell.filter !== undefined) {
        return cell.filter(value)
      }
      const regulation = this.regulation
      if (regulation && regulation.filter) {
        return regulation.filter(value)
      }
    }
    return value
  }

  getLabel (cell: any): any {
    const extension = this.extension
    if (extension && extension.type === 'select') {
      const option = this.getOption(extension.options, cell.value)
      if (option != null) {
        return option.label
      }
    } else {
      return cell.value
    }
    return null
  }

  getOption (options: any, value: any): any {
    for (let i = 0; i < options.length; i ++) {
      if (options[i].value === value) {
        return options[i]
      }
    }
    return null
  }

  get extension (): any {
    const cell = this.cell
    if (cell && cell.extension) {
      return cell.extension
    }
    const regulation = this.regulation
    if (regulation && regulation.extension) {
      return regulation.extension
    }
    return null
  }

  getProp (name: string): any {
    const cell = this.cell
    if (cell && cell[name]) {
      return cell[name]
    }
    const regulation = this.regulation
    if (regulation && regulation[name]) {
      return regulation[name]
    }
    return null
  }

  mounted () {
    if (this.isLastRow && this.isLastColumn) {
      this.$emit('lastCellLoaded')
    }
  }

  // TODO: 要リファクタリング
  canEdit (): boolean {
    return this.focusable && !this.isDisabled && (!this.extension || this.extension.type === 'select' || this.extension.type === 'list') && this.requiredValueType !== 'array' && this.requiredValueType !== 'boolean'
  }

  onChange () {
    const extension = this.extension
    if (extension && extension.change != null) {
      extension.change({
        x: this.columnIndex,
        y: this.rowIndex,
      })
    }
  }

  onClick () {
    if (!this.focused) {
      this.focused = this.focusable
      this.$emit('cellClicked', {
        x: this.columnIndex,
        y: this.rowIndex,
      })
    }
  }

  onDoubleClick () {
    if (this.canEdit()) {
      this.editing = true
      this.$emit('cellEditing')
    }
  }
}
</script>
