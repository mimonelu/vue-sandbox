<template>
  <div>
    <button
      v-if="hasSwapper('button')"
      @click="getSwapper().callback(body, row, column)"
    >{{ getSwapper().label || toValue() }}</button>
    <label
      v-else-if="hasSwapper('radio')"
      v-for="option, optionIndex in getSwapper().options"
      :key="`option__${optionIndex}`"
    >
      <input
        v-model="body.value"
        type="radio"
        :value="option.value"
      />{{ option.label }}
    </label>
    <select-swapper
      v-else-if="hasSwapper('select')"
      :options="getSwapper().options"
      :value="body.value"
    />
    <a
      v-else-if="hasSwapper('link')"
      :href="body.value"
      :target="getSwapper().target"
    >{{ getSwapper().label || toValue() }}</a>
    <input
      v-else-if="getValueType(body.value) === 'boolean'"
      v-model="body.value"
      type="checkbox"
    />
    <checkbox-swapper
      v-else-if="getValueType(body.value) === 'array'"
      :options="getProp('options')"
      :value="body"
      name="value"
    />
    <label
      v-else-if="getValueType(body.value) === 'array'"
      v-for="option, optionIndex in getProp('options')"
      :key="`option__${optionIndex}`"
    >
      <input
        v-model="body.value"
        type="checkbox"
        :value="option.value"
      />{{ option.label }}
    </label>
    <template v-else>{{ toValue() }}</template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CheckboxSwapper from '@/components/editable-table/CheckboxSwapper.vue'
import SelectSwapper from '@/components/editable-table/SelectSwapper.vue'

@Component({
  components: {
    CheckboxSwapper,
    SelectSwapper,
  },
})
export default class Cell extends Vue {
  @Prop({ required: true })
  body?: any

  @Prop({ required: true })
  regulation?: any

  @Prop({ required: true })
  row?: number

  @Prop({ required: true })
  column?: number

  getValueType (value: any): string {
    if (value == null) {
      return 'string'
    }
    if (Array.isArray(value)) {
      return 'array'
    }
    return typeof value
  }

  // TODO: リファクタリングすること。順番に気を付ける
  hasSwapper (type: string): boolean {
    if (this.body) {
      if (this.body.swapper === null) {
        return false
      }
      if (this.body.swapper !== undefined && this.body.swapper.type === type) {
        return true
      }
    }
    if (!this.body.swapper && this.regulation && this.regulation.swapper && this.regulation.swapper.type === type) {
      return true
    }
    return false
  }

  getSwapper (): any {
    if (this.body && this.body.swapper) {
      return this.body.swapper
    }
    if (this.regulation && this.regulation.swapper) {
      return this.regulation.swapper
    }
    return null
  }

  getProp (name: string): any {
    if (this.body && this.body[name]) {
      return this.body[name]
    }
    if (this.regulation && this.regulation[name]) {
      return this.regulation[name]
    }
    return null
  }

  toValue (): string {
    if (this.body.filter !== null) {
      if (this.body.filter !== undefined) {
        return this.body.filter(this.body.value)
      }
      if (this.regulation && this.regulation.filter) {
        return this.regulation.filter(this.body.value)
      }
    }
    return this.body.value
  }
}
</script>
