# Vuetify Week scheduler V3

![GitHub package.json version](https://img.shields.io/github/package-json/v/innovation-system/vuetify-week-scheduler-v3)
[![ci](https://github.com/innovation-system/vuetify-week-scheduler-v3/actions/workflows/ci.yml/badge.svg)](https://github.com/innovation-system/vuetify-week-scheduler-v3/actions/workflows/ci.yml)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png)](https://opensource.org/licenses/mit-license.php)

[![NPM Downloads](https://img.shields.io/npm/dm/vuetify-week-scheduler-v3.svg?style=flat)](https://www.npmjs.com/package/vuetify-week-scheduler-v3)

> A simple component to manage weekly events

Inspired by [jquery-schedule](https://github.com/Yehzuna/jquery-schedule).

## For Vue 2

See [Vuetify Week Scheduler V2](https://github.com/innovation-system/vuetify-week-scheduler).

## Installation

### NPM

```bash
npm install @innovation-system/vuetify-week-scheduler-3 --save
```

### Yarn

```bash
yarn add @innovation-system/vuetify-week-scheduler-v3
```

## Demo

Checkout a demo [here](https://innovation-system.github.io/vuetify-week-scheduler-v3/).

Demo source code is [here](/dev/)

## Usage

Import component and its styles

```javascript
import VueWeekScheduler from '@innovation-system/vuetify-week-scheduler-v3'
import '@innovation-system/vuetify-week-scheduler-v3/style.css'
```

Register the component in `main.js`

```javascript
// ... const app = createApp(App)
app.component('VuetifyWeekScheduler', VuetifyWeekScheduler)
// ... app.mount('#app')
```

Or directly in parent component

```javascript
// ... <script setup>
import VuetifyWeekScheduler from '@innovation-system/vuetify-week-scheduler-v3'
import '@innovation-system/vuetify-week-scheduler-v3/style.css'
// ... </script>
```

## Props

### `config`

- Type: `object`
- Defaults:

```javascript
{
     hour: 24, // hour format, 24/12
     days: 7, // number of days, 7/5
     periodDuration: 15, // event duration inteval 15/30/60
     periodTitle: "", // event default title
     periodBackgroundColor: "#F44336FF", // event default color
     periodBorderColor: "transparent", // event default border color
     periodTextColor: "#000", // event default text color
     periodRemoveButton: "Remove", // label of event remove button
     periodDuplicateButton: "Duplicate", // label of event duplicate button
     daysList: [    // list of days labels
       "Monday",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday",
       "Sunday",
     ],
     colors: [  // list of event's possible colors
       "#F44336",
       "#FF9800",
       "#FFEB3B",
       "#8BC34A",
       "#4CAF50",
       "#00BCD4",
       "#2196F3",
      ],
      inputType: "text" // usually set as text or number
}
```

### `value`

- Type: `array`
- Required: `true`

Array of events, two-way binding with (`v-model`). The format of events is:

```js
[
      {
        "day": 0,
        "periods": [
          {
            "start": "00:00",
            "end": "09:00",
            "title": 15,
            "backgroundColor": "#FF0000FF"
          },
          {
            "start": "09:00",
            "end": "20:00",
            "title": 22,
            "backgroundColor": "#008000FF"
          }
        ]
      },
      {
        "day": 1,
        "periods": []
      }
      ...
```

### `editable`

- Type: `boolean`
- Default: `false`

Whether or not the component permits to add/edit events

## Events

### `edit(obj)`

In desktop devices this event is emitted when user right clicks on double clicks on an event, in touch devices this is emitted when user long press on an event.

```javascript
obj: {
    day: number, // the day index
    index: number // the period index
}
```

### `error(err)`

- `err` error throwed during initialization
