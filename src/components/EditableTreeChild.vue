<template>
  <div
    class="editable-tree__child"
    :data-level="level"
  >
    <div
      v-for="child, index in source.children"
      :key="`editable-tree__${index}`"
    >
      <div
        class="editable-tree__child__contents"
        :data-added="child.added"
      >
        <a
          v-if="child.children != null"
          class="editable-tree__child__closer"
          @click="close"
        >📂</a>
        <div
          v-else
          class="editable-tree__child__node"
        >📝</div>
        <div class="editable-tree__child__label">{{ child.label }}</div>
        <div class="editable-tree__child__controllers">
          <button
            v-if="child.children"
            @click="addParent(child.id)"
          >フォルダを追加する</button>
          <button
            v-if="child.children"
            @click="addChild(child.id)"
          >ノードを追加する</button>
          <button @click="remove(child.id)">削除する</button>
        </div>
      </div>
      <editable-tree-child
        :source="child"
        :level="level + 1"
        @addParent="addParent"
        @addChild="addChild"
        @remove="remove"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EditableTreeChild extends Vue {
  @Prop({ required: true })
  source: any

  @Prop({ required: false, default: 0 })
  level?: number

  close () { /**/ }

  @Emit('addParent')
  addParent (id: number): number {
    return id
  }

  @Emit('addChild')
  addChild (id: number): number {
    return id
  }

  @Emit('remove')
  remove (id: number): number {
    return id
  }
}
</script>

<style lang="scss" scoped>
.editable-tree__child {
  &__contents {
    display: flex;
    align-items: center;
    line-height: 1;
    padding: 0.25rem 0.5rem;
    // NOTICE: 20 階層まで対応
    @for $i from 1 through 20 {
      [data-level="#{$i}"] & {
        padding-left: #{$i + 0.5}rem;
      }
    }
    &[data-added="true"] {
      background-color: #ffff00;
    }
    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__closer,
  &__node {
    margin-right: 0.5rem;
    width: 1rem;
  }

  &__closer {
    cursor: pointer;
    display: block;
  }

  &__label {
    white-space: nowrap;
  }

  &__controllers {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;

    & > button {
      cursor: pointer;
      display: block;
      margin-left: 0.5rem;
    }
  }
}
</style>
