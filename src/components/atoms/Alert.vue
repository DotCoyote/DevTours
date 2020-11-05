<template>
  <div :class="alertClasses" class="border border-solid rounded">
    <slot />
  </div>
</template>

<script lang="js">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'success',
    },
  },

  setup(props) {
    const alertClasses = computed(() => {
      switch (props.type) {
        case 'success':
          return 'bg-green-400 border-green-600';

        case 'error':
          return 'bg-red-300 border-red-700';

        default:
          return '';
      }
    });

    return {
      alertClasses,
    };
  },
});
</script>
