<template>
  <v-hover v-slot="{ isHovering, props }">
    <div
      ref="root"
      class="vws-period"
      :style="{
        backgroundColor: options.backgroundColor,
        outlineColor: options.borderColor,
        textColor: options.textColor,
        color: options.textColor,
        top: period.top + 'px',
        height: period.height + 'px',
      }"
      v-bind="props"
      @mousedown.stop="$emit('period-drag', $event)"
      @touchstart.stop="$emit('period-drag', $event)"
      @contextmenu.stop.prevent="$emit('edit', $event)"
      @dblclick.stop.prevent="$emit('edit', $event)"
    >
      <div class="vws-period-container">
        <v-icon
          v-show="editable && isHovering"
          size="small"
          class="vws-handle"
          @mousedown.stop="onPeriodResize($event, true)"
          @touchstart.stop="onPeriodResize($event, true)"
        >
          mdi-chevron-up
        </v-icon>
        <div class="vws-period-time">
          {{ options.start }} - {{ options.end }}
          <span v-show="shortPeriod" class="text--caption ml-2">{{ options.title }}</span>
        </div>
        <div v-show="!shortPeriod" class="vws-period-title text-truncate">
          {{ options.title }}
        </div>
        <div v-show="editable && isHovering" class="vws-period-buttons" justify="end">
          <v-btn
            class="mx-1 mb-1"
            icon="mdi-close"
            size="x-small"
            density="compact"
            variant="text"
            :title="settings.periodRemoveButton"
            @click.stop="$emit('delete')"
            @mousedown.stop
            @touchstart.stop
          >
          </v-btn>
          <v-btn
            class="mx-1 mb-1"
            icon="mdi-content-copy"
            size="x-small"
            density="compact"
            variant="text"
            :title="settings.periodDuplicateButton"
            @click.stop="$emit('clone')"
            @mousedown.stop
            @touchstart.stop
          >
          </v-btn>
        </div>
        <v-icon
          v-show="editable && isHovering"
          size="small"
          class="vws-handle"
          style="bottom: 0"
          @mousedown.stop="onPeriodResize($event, false)"
          @touchstart.stop="onPeriodResize($event, false)"
        >
          mdi-chevron-down
        </v-icon>
      </div>
    </div>
  </v-hover>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'VuetifyWeekSchedulerPeriod',
  props: {
    period: {
      type: Object,
      default: () => ({}),
    },
    settings: {
      type: Object,
      default: () => ({}),
    },
    editable: { type: Boolean, default: false },
  },
  emits: ['edit', 'delete', 'clone', 'period-drag', 'period-resize'],
  setup() {
    // this is needed to get the correct HTML element reference
    const root = ref(null)
    return { root }
  },
  computed: {
    options() {
      return this.period.options
    },
    shortPeriod() {
      return this.period.height <= 30
    },
  },
  methods: {
    onPeriodResize(e, isUp) {
      this.$emit('period-resize', {
        $event: e,
        isUp,
        $el: this.root,
      })
    },
  },
}
</script>
