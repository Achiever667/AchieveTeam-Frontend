<script setup lang="ts">
interface Props {
  direction?: 'row' | 'col'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'col',
})
</script>

<template>
  <div
    :class="[
      'gap-4',
      direction === 'row' ? 'flex flex-row' : 'flex flex-col'
    ]"
  >
    <slot />
  </div>
</template>