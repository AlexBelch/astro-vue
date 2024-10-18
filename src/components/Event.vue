<script setup>
import {
  TagIcon,
  MapPinIcon,
  CalendarDaysIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  event: {},
});

const lastElementClassification =
  props.event?.["dc:classification"][
    props.event?.["dc:classification"].length - 1
  ];

const startDate = new Date(props?.event?.startDate);
const endDate = new Date(props?.event?.endDate);
const startTime = startDate.toLocaleTimeString("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Vienna",
});
const endTime = endDate.toLocaleTimeString("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Vienna",
});

const url = `/events/${props.event?.["dc:slug"]}`;
</script>

<template>
  <a :href="url" class="event">
    <div class="event__category">
      <TagIcon class="icon" />
      <div class="title">
        {{ lastElementClassification?.["skos:prefLabel"] }}
      </div>
    </div>

    <!-- <div>{{ event?.["@id"] }}</div>
    <h3>{{ event?.["@type"] }}</h3> -->
    <img :src="event?.image[0]?.thumbnailUrl" />
    <h2>{{ event?.name }}</h2>
    <div class="date-row">
      <CalendarDaysIcon class="icon" />
      <div class="date-wrap">
        <div class="date-period">
          {{ startDate.toLocaleDateString("de-DE") }} -
          {{ endDate.toLocaleDateString("de-DE") }}
        </div>
        <div v-if="startTime === endTime">
          {{ startTime }}
        </div>
        <div v-if="startTime !== endTime">{{ startTime }} - {{ endTime }}</div>
      </div>
    </div>
    <!-- <h3>
      {{ event?.eventSchedule[0]?.startDate }}
      {{ event?.eventSchedule[0]?.startTime }} -
      {{ event?.eventSchedule[0]?.endDate }}
      {{ event?.eventSchedule[0]?.endTime }}
    </h3> -->
    <div class="location">
      <MapPinIcon class="icon" />
      <div>
        <strong>{{ event?.location[0]?.name }}</strong>
      </div>
    </div>
    <div class="event-link">Details...</div>
    <!-- <h5>Slug - {{ event?.["dc:slug"] }}</h5>
    <h6>Id - {{ event?.["@id"] }}</h6>
    <div>Description: {{ event?.description }}</div>
    <div>Weitere Termine: {{ event?.eventSchedule[0]?.["@id"] }}</div> -->
  </a>
</template>

<style>
.event {
  flex: 1 1 30%;
  height: 100%;
  min-height: 600px;
  max-width: 515px;
  padding: 25px;
  background: var(--lightgrey);
  display: flex;
  flex-direction: column;
  transition:
    background-color 0.25s ease-out,
    color 0.25s ease-out;
  color: black;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background: #ffde00;

    text-decoration: underline;
  }

  .icon {
    height: 24px;
  }

  .event__category {
    display: flex;
    justify-content: center;

    .title {
      font-size: 18px;
      padding-left: 25px;
      margin: 0;
    }
  }

  img {
    /* width: 100%; */
    max-height: 250px;
    margin-top: 25px;
  }

  h2 {
    font-size: 24px;
    text-align: start;
    margin-top: 25px;
    margin-bottom: 16px;
  }

  .location,
  .date-row {
    font-size: 18px;
    display: flex;
    gap: 25px;
    align-items: center;
    padding-left: 25px;
  }

  .date-row {
    align-items: flex-start;
    margin-bottom: 8px;

    .date-wrap {
      text-align: start;

      .date-period {
        font-weight: 700;
      }
    }
  }

  .event-link {
    font-size: 20px;
    font-weight: 700;
    text-align: right;
    text-decoration: underline;
    margin-top: auto;
  }
}
</style>
