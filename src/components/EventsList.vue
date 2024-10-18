<script setup>
import Event from "./Event.vue";

const props = defineProps({
  searchQuery: String,
  data: Array,
});
</script>

<template>
  <h1>Karnten events: {{ data?.length }}</h1>

  <div class="event-list">
    <template
      v-if="data?.length > 0"
      v-for="event in data"
      :key="event?.['@id']"
    >
      <Event :event="event" />
    </template>
  </div>

  <div v-if="data?.length === 0" class="nothing">
    Keine Veranstaltungen gefunden
  </div>
</template>

<style>
.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

.nothing {
  font-size: 35px;
  text-align: center;
  background-image: linear-gradient(
    45deg,
    rgb(136, 58, 234),
    rgb(224, 204, 250) 30%,
    white 60%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  background-position: 0%;

  animation: blink 3.5s infinite;
  animation-fill-mode: both;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
