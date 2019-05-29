<style>
.date-picker {
  margin: 10px;
}

.date-picker-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px;
}

.date-picker-caption {
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  grid-gap: 4px;
}

.date-picker-body .outside {
  color: rgba(92, 112, 128, 0.5);
}

.date-picker-body .weekday {
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
}

.date-picker-day {
  position: absolute;
}
</style>

<template>
  <div class="date-picker">
    <div class="date-picker-caption">
      <Button class="minimal" @click="decrementMonth">
        <i class="fas fa-chevron-left icon"/>
      </Button>
      <Button :class="{minimal: true, active: isMonthsOpen}">
        <Popover trigger="click" ref="monthsPopover" @show="isMonthsOpen = true" @hide="isMonthsOpen = false">
          <ul class="menu" :style="{maxHeight: '300px', overflow: 'auto'}">
            <li :class="{'menu-item': true, fill: true, primary: displayDate.getMonth() === index}" @click="setDisplayMonth(index)" :key="index" v-for="(name, index) in months">
              <span style="text-transform: capitalize">{{name}}</span>
            </li>
          </ul>
        </Popover>
        <span style="text-transform: capitalize; font-weight: bold">{{months[displayDate.getMonth()]}}</span>
      </Button>
      <Button :class="{minimal: true, fill: true, active: isYearsOpen}">
        <Popover trigger="click" ref="yearsPopover" @show="isYearsOpen = true" @hide="isYearsOpen = false">
          <ul class="menu" :style="{maxHeight: '300px', overflow: 'auto'}">
            <li :class="{'menu-item': true, fill: true, primary: displayDate.getFullYear() === year}" @click="setDisplayYear(year)" :key="year" v-for="year in years">
              <span style="text-transform: capitalize">{{year}}</span>
            </li>
          </ul>
        </Popover>
        <span style="font-weight: bold">{{displayDate.getFullYear()}}</span>
      </Button>
      <Button class="minimal" @click="incrementMonth">
        <i class="fas fa-chevron-right icon"/>
      </Button>
    </div>
    <div class="divider" />
    <div class="date-picker-body">
      <div class="weekday" :key="weekday" v-for="weekday in weekdays">
        {{weekday}}
      </div>
      <Button :class="{minimal: !day.isSelected, primary: day.isSelected || day.isToday, outside: day.isOutside}" @click="select(day.date)" :disabled="day.isDisabled" :key="day.date.toLocaleDateString()" v-for="day in days">
        <span class="date-picker-day">{{day.date.getDate()}}</span>
      </Button>
    </div>
  </div>
</template>

<script>
const years = Array.from(Array(61), (v, k) => 2030 - k);

export default {
  props: {
    value: {
      type: Date,
      required: false
    },
    min: {
      type: Date,
      required: false
    },
    max: {
      type: Date,
      required: false
    }
  },
  computed: {
    years: function() {
      return years;
    },
    months: function() {
      return [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
      ];
    },
    days: function() {
      var currentDay = this.displayDate
        .clone()
        .startOfMonth()
        .startOfWeek();

      var days = [];

      for (var i = 0; i < 42; ++i) {
        const day = currentDay.clone();

        days.push({
          date: day,
          isToday: this.today.isSameDay(day),
          isOutside: !this.displayDate.isSameMonth(day),
          isSelected: day.isSameDay(this.value),
          isDisabled: (this.min && day.isLessThan(this.min)) || (this.max && day.isGreaterThan(this.max))
        });

        currentDay.addDays(1);
      }

      return days;
    },
    weekdays: function() {
      return ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
    }
  },
  data() {
    return {
      isMonthsOpen: false,
      isYearsOpen: false,
      today: new Date(),
      displayDate: new Date().startOfMonth()
    };
  },
  watch: {
    value(newVal) {
      if (newVal !== null) {
        this.displayDate = newVal.clone().startOfMonth();
      }
    }
  },
  methods: {
    select(val) {
      this.$emit("input", val);
    },
    incrementMonth() {
      this.displayDate = this.displayDate.clone().addMonths(1);
    },
    decrementMonth() {
      this.displayDate = this.displayDate.clone().addMonths(-1);
    },
    setDisplayMonth(val) {
      var clone = this.displayDate.clone();

      clone.setMonth(val);

      this.displayDate = clone;
      this.$refs.monthsPopover.close();
    },
    setDisplayYear(val) {
      var clone = this.displayDate.clone();

      clone.setYear(val);

      this.displayDate = clone;

      this.$refs.yearsPopover.close();
    }
  }
};
</script>