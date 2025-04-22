<template>
  <v-hover v-slot="{ hover }">
    <div
      class="vws-period"
      :style="{
        backgroundColor: options.backgroundColor,
        outlineColor: options.borderColor,
        textColor: options.textColor,
        color: options.textColor,
        top: period.top + 'px',
        height: period.height + 'px',
      }"
      @mousedown.stop="$emit('period-drag', $event)"
      @touchstart.stop="$emit('period-drag', $event)"
      @contextmenu.stop.prevent="$emit('edit', $event)"
      @dblclick.stop.prevent="$emit('edit', $event)"
    >
      <div class="vws-period-container">
        <v-icon
          v-show="editable && hover"
          size="small"
          class="vws-handle"
          @mousedown.stop="$emit('period-resize', { $event, isUp: true, $el })"
          @touchstart.stop="$emit('period-resize', { $event, isUp: true, $el })"
        >
          mdi-chevron-up
        </v-icon>
        <div class="vws-period-time">
          {{ options.start }} - {{ options.end }}
          <span v-show="shortPeriod" class="text--caption ml-2">{{
            options.title
          }}</span>
        </div>
        <div v-show="!shortPeriod" class="vws-period-title text-truncate">
          {{ options.title }}
        </div>
        <div
          v-show="editable && hover"
          class="vws-period-buttons"
          justify="end"
        >
          <v-btn
            icon
            size="x-small"
            :title="settings.periodRemoveButton"
            @click.stop="$emit('delete')"
            @mousedown.stop
            @touchstart.stop
          >
            <v-icon size="x-small">mdi-close</v-icon>
          </v-btn>
          <v-btn
            icon
            size="x-small"
            :title="settings.periodDuplicateButton"
            @click.stop="$emit('clone')"
            @mousedown.stop
            @touchstart.stop
          >
            <v-icon size="x-small">mdi-content-copy</v-icon>
          </v-btn>
        </div>
        <v-icon
          v-show="editable && hover"
          size="small"
          class="vws-handle"
          style="bottom: 0"
          @mousedown.stop="$emit('period-resize', { $event, isUp: false, $el })"
          @touchstart.stop="
            $emit('period-resize', { $event, isUp: false, $el })
          "
        >
          mdi-chevron-down
        </v-icon>
      </div>
    </div>
  </v-hover>
</template>

<script>
export default {
  name: "VuetifyWeekSchedulerPeriod",
  props: {
    period: Object,
    settings: Object,
    blockHeight: Number,
    editable: { type: Boolean, default: false },
  },
  computed: {
    options() {
      return this.period.options;
    },
    shortPeriod() {
      return this.period.height <= 30;
    },
  },
};
</script>
