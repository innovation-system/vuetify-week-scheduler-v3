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
      @mousedown.stop="onPeriodDown"
      @touchstart.stop="onPeriodTouchStart"
      @touchmove="onPeriodTouchMove"
      @touchend="clearLongPress"
      @touchcancel="clearLongPress"
      @contextmenu.stop.prevent="onEdit"
      @dblclick.stop.prevent="onEdit"
    >
      <div class="vws-period-container">
        <v-icon
          v-show="showControls(isHovering)"
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
        <div v-show="showControls(isHovering)" class="vws-period-buttons" justify="end">
          <v-btn
            class="mx-1 mt-1"
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
            class="mx-1 mt-1"
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
          v-show="showControls(isHovering)"
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
    controlsVisible: { type: Boolean, default: false },
  },
  emits: ['edit', 'delete', 'clone', 'period-drag', 'period-resize', 'show-controls'],
  setup() {
    // this is needed to get the correct HTML element reference
    const root = ref(null)
    return { root }
  },
  data() {
    return {
      longPressTimer: null,
      longPressStart: null,
      longPressDelay: 500,
      longPressMoveThreshold: 8,
      supportsHover: false,
    }
  },
  computed: {
    options() {
      return this.period.options
    },
    shortPeriod() {
      return this.period.height <= 30
    },
  },
  mounted() {
    this.supportsHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? true
  },
  beforeUnmount() {
    this.clearLongPress()
  },
  methods: {
    onPeriodDown(e) {
      this.clearLongPress()
      this.$emit('period-drag', e)
    },
    onPeriodTouchStart(e) {
      if (this.isInteractiveTouchTarget(e)) {
        this.clearLongPress()
        return
      }

      this.$emit('show-controls')
      this.clearLongPress()

      const touch = this.getTouch(e)
      if (touch) {
        this.longPressStart = {
          x: touch.clientX,
          y: touch.clientY,
        }

        this.longPressTimer = setTimeout(() => {
          const start = this.longPressStart
          this.longPressTimer = null
          this.longPressStart = null

          if (start) {
            e.preventDefault()
            this.$emit('edit', this.createTouchEditEvent(e, start))
          }
        }, this.longPressDelay)
      }

      this.$emit('period-drag', e)
    },
    onPeriodTouchMove(e) {
      if (!this.longPressTimer || !this.longPressStart) return

      const touch = this.getTouch(e)
      if (!touch) {
        this.clearLongPress()
        return
      }

      const dx = Math.abs(touch.clientX - this.longPressStart.x)
      const dy = Math.abs(touch.clientY - this.longPressStart.y)

      if (dx > this.longPressMoveThreshold || dy > this.longPressMoveThreshold) {
        this.clearLongPress()
      }
    },
    clearLongPress() {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer)
        this.longPressTimer = null
      }
      this.longPressStart = null
    },
    onEdit(e) {
      this.clearLongPress()
      this.$emit('edit', e)
    },
    getTouch(e) {
      return e.touches?.[0] || e.changedTouches?.[0]
    },
    isInteractiveTouchTarget(e) {
      return Boolean(
        e.target?.closest?.(
          '.vws-period-buttons, .vws-handle, button, a, input, textarea, select, [role="button"]',
        ),
      )
    },
    createTouchEditEvent(originalEvent, position) {
      return {
        type: 'longpress',
        clientX: position.x,
        clientY: position.y,
        originalEvent,
        preventDefault: () => originalEvent.preventDefault(),
        stopPropagation: () => originalEvent.stopPropagation(),
      }
    },
    showControls(isHovering) {
      return this.editable && (this.controlsVisible || (this.supportsHover && isHovering))
    },
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
