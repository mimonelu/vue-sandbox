<template>
  <div
    class="editable-tree__children"
    :data-level="level"
  >
    <div
      v-if="level === 0"
      class="editable-tree__children__header"
    >
      <a @click="addParent(- 1)">最上位フォルダを追加</a>
      <a @click="addChild(- 1)">最上位ノードを追加</a>
    </div>
    <div
      v-for="child, index in source.children"
      :key="`editable-tree__${index}`"
    >
      <div
        class="editable-tree__children__contents"
        :data-added="child.added"
      >
        <a
          v-if="child.children != null"
          class="editable-tree__children__trigger"
          :data-closed="child.closed"
          @click="onClickTrigger(child)"
        />
        <div
          v-else
          class="editable-tree__children__node"
        />
        <div class="editable-tree__children__label">
          <input
            v-model="child.label"
            type="text"
            @focus="onFocusLabel"
          >
        </div>
        <div class="editable-tree__children__controllers">
          <a
            v-if="child.children"
            @click="addParent(child.id)"
          >フォルダを追加</a>
          <a
            v-if="child.children"
            @click="addChild(child.id)"
          >ノードを追加</a>
          <a
            :disabled="index === 0"
            @click="moveUp(child.id)"
          >↑</a>
          <a
            :disabled="index >= source.children.length - 1"
            @click="moveDown(child.id)"
          >↓</a>
          <a @click="remove(child.id)">削除</a>
        </div>
      </div>
      <editable-tree-children
        v-if="!child.closed"
        :source="child"
        :level="level + 1"
        @addParent="addParent"
        @addChild="addChild"
        @moveUp="moveUp"
        @moveDown="moveDown"
        @remove="remove"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EditableTreeChildren extends Vue {
  @Prop({ required: true })
  source: any

  @Prop({ required: false, default: 0 })
  level?: number

  onClickTrigger (child: any) {
    this.$set(child, 'closed', !child.closed)
  }

  onFocusLabel (event: any) {
    event.target.select()
  }

  @Emit('addParent')
  addParent (id: number): number {
    return id
  }

  @Emit('addChild')
  addChild (id: number): number {
    return id
  }

  @Emit('moveUp')
  moveUp (id: number): number {
    return id
  }

  @Emit('moveDown')
  moveDown (id: number): number {
    return id
  }

  @Emit('remove')
  remove (id: number): number {
    return id
  }
}
</script>

<style lang="scss" scoped>
.editable-tree__children {
  font-size: 1rem;

  &__header,
  &__controllers {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 0.5em;

    & > a {
      background-color: #ffffff;
      border: 1px solid #c0c0c0;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-left: 0.5em;
      min-height: 1.5em;
      padding: 0 0.5em;
      user-select: none;
      white-space: nowrap;
      &[disabled] {
        opacity: 0.25;
      }
    }
  }

  &__header {
    padding: 0.25em 0.5em;
  }

  &__contents {
    display: flex;
    align-items: center;
    line-height: 1;
    padding: 0.25em 0.5em;
    // NOTICE: 20 階層まで対応
    @for $i from 1 through 20 {
      [data-level="#{$i}"] & {
        padding-left: #{$i + 0.5}em;
      }
    }
    &[data-added="true"] {
      background-color: #ffff00;
    }
    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__trigger,
  &__node {
    margin-right: 0.5em;
    width: 1.5em;
    height: 1.5em;
  }

  &__trigger {
    background-color: #000000;
    cursor: pointer;
    display: block;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="%23000000" d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>') no-repeat center center;
    &[data-closed="true"] {
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="%23000000" d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" /></svg>') no-repeat center center;
    }
  }

  &__node {
    background-color: #000000;
    mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="%23000000" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>') no-repeat center center;
  }

  &__label {
    flex-grow: 1;

    & > input {
      background-color: transparent;
      border: 1px solid transparent;
      display: block;
      font-size: 1em;
      padding: 0 0.25em;
      width: 100%;
      min-height: 1.5em;
    }
  }
  &__contents:hover &__label > input,
  &__label > input:focus {
    background-color: #ffffff;
    border-color: #c0c0c0;
  }
}
</style>
