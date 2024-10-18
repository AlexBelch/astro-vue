<script setup>
import { ref } from "vue";
import EventsList from "./EventsList.vue";

const loading = ref(false);
const error = ref(null);

const searchText = ref("");
const data = ref([]);

const pageSize = ref(12);
const pageNumber = ref(1);
const totalRow = ref(100);

function getUrl(pageSize, pageNumber, searchText) {
  return `https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image,location,eventSchedule,dc:classification.skos:inScheme&token=9962098a5f6c6ae8d16ad5aba95afee0&page[size]=${pageSize}&page[number]=${pageNumber}&filter[q]=${searchText}`;
}

async function fetchData(url) {
  error.value = null;
  loading.value = true;
  data.value = null;

  try {
    const responce = await fetch(url).then((response) => response.json());
    console.log("responce=", responce);
    data.value = [...responce["@graph"]];
    totalRow.value = responce?.meta.total;
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

const url = getUrl(pageSize.value, pageNumber.value, searchText.value);

fetchData(url);
</script>

<template>
  <div class="main">
    <h1>Veranstaltungen in Kärnten</h1>
    <div class="subtitle">Das vielfältige Kulturangebot im Süden</div>
    <p>Search Text: {{ searchText }}</p>
    <input type="text" v-model.lazy="searchText" />
    <button @click="search">&#128269; Search</button>

    <EventsList v-if="data !== null" :searchQuery="searchText" :data="data" />

    <div v-if="loading" class="load">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style>
.main {
  text-align: center;

  h1 {
    font-size: 50px;
    margin-top: 0;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 32px;
  }
}
</style>
