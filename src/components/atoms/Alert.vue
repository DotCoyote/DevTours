<template>
  <div :class="alertClasses" class="alert border border-solid rounded text-red-900 px-6 py-3">
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

<style lang="scss">
.alert {
  + * {
    margin-top: 20px;
  }
}
</style>
