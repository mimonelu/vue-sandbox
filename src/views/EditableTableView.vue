<template>
  <div class="editable-table-view">
    ok
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
export default class EditableTableView extends Vue {}
</script>

<style lang="scss" scoped>
</style>
