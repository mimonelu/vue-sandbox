<template>
  <div class="editable-table">
    <table>
      <thead v-if="headers.length > 0">
        <tr
          v-for="headerRow, headerRowIndex of headers"
          :key="`header__${headerRowIndex}`"
        >
          <th
            v-if="numberOfLines && headerRowIndex === 0"
            :rowspan="headers.length"
          />
          <th
            v-for="headerCell, headerCellIndex of headerRow"
            :key="`header__${headerRowIndex}__${headerCellIndex}`"
            v-bind="headerCell.attrs"
          >{{ headerCell.value }}</th>
        </tr>
      </thead>
      <tbody v-if="bodies.length > 0">
        <editable-table-row
          v-for="bodyRow, bodyRowIndex of bodies"
          :key="`body__${bodyRowIndex}`"
          :columns="bodyRow"
          :column-regulations="columnRegulations"
          :row-index="bodyRowIndex"
          :number-of-lines="numberOfLines"
          :disabled="disabled"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import EditableTableRow from '@/components/editable-table/EditableTableRow.vue'

@Component({
  components: {
    EditableTableRow,
  },
})
export default class EditableTable extends Vue {
  @Prop({ required: false, default: () => ([]) })
  headers: any

  @Prop({ required: false, default: () => ([]) })
  bodies: any

  @Prop({ required: false, default: () => ([]) })
  columnRegulations: any

  @Prop({ required: false, default: true })
  numberOfLines?: boolean

  @Prop({ required: false, default: false })
  disabled?: boolean
}
</script>

<style lang="scss">
.editable-table {
  $border-color: #c0c0c0 !default;
  font-size: 1rem;

  & > table {
    border-collapse: collapse;

    & > thead,
    & > tbody {
      & > tr {
        &:hover {
          background-color: #f0f0f0;
        }

        & > th,
        & > td {
          border: 1px solid $border-color;
          height: 1em; // NOTICE: テーブルセルの height で % 指定を有効にする
          padding: 0;
          vertical-align: middle;
          white-space: pre;
        }

        & > th {
          background-color: #f0f0f0;
          padding: 0.25em 0.5em;
        }

        & > td {
          position: relative;
          &[data-required-type="boolean"] {
            text-align: center;
          }
          &[data-required-type="number"] {
            text-align: right;
          }
          &[data-type-is-valid="false"] {
            background-color: #f08000;
          }
          &[data-is-required="true"][data-is-empty="true"] {
            background-color: #f00000;
            color: #f0f0f0;
          }
          &[data-is-ruled="false"] {
            background-color: #f000f0;
            color: #f0f0f0;
          }
          &[data-is-focused="true"]::after,
          &:focus-within::after {
            background-color: rgba(#0080f0, 0.125);
            border: 3px solid #0080f0;
            box-shadow: 0 0 0.25em 1px rgba(#0080f0, 0.5);
            box-sizing: border-box;
            content: "";
            display: block;
            pointer-events: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
