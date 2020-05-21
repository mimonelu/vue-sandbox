<template>
  <div class="home">
    <editable-tree :source="treeSource" />
    <pre>{{ treeSource }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditableTree from '@/components/EditableTree.vue'

@Component({
  components: {
    EditableTree,
  },
})
export default class Home extends Vue {
  treeSource = {
    children: [
      {
        label: 'フォルダ 1',
        children: [
          {
            label: 'フォルダ 1-1',
            children: [
              {
                label: 'フォルダ 1-1-1',
                children: [
                  { label: 'ノード 1' },
                  { label: 'ノード 2' },
                ],
              },
              {
                label: 'フォルダ 1-1-2',
                children: [
                  { label: 'ノード 1' },
                ],
              },
              { label: 'ノード 1' },
            ],
          },
          {
            label: 'フォルダ 1-2',
            children: [],
          },
          { label: 'ノード 1' },
        ],
      },
      {
        label: 'フォルダ 2',
        children: [],
      },
    ],
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  position: relative;
  height: 100vh;

  .editable-tree {
    border: 1px solid #c0c0c0;
    flex-basis: 50%;
    margin-right: 1rem;
    padding: 0.25rem 0;
  }

  pre {
    border: 1px solid #c0c0c0;
    flex-basis: 50%;
    margin: 0;
    overflow: scroll;
    height: 100%;
    padding: 1rem;
  }
}
</style>
