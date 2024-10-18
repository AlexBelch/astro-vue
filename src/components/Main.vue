<script setup>
import { ref } from "vue";
import EventsList from "./EventsList.vue";
import Search from "./Search.vue";

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

const search = (searchValue) => {
  // alert(`${searchText.value}`);
  searchText.value = searchValue;
  console.log("searchText=", searchText.value);
  // const url = `https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image,location,eventSchedule&token=9962098a5f6c6ae8d16ad5aba95afee0&page[size]=10&page[number]=1&filter[q]=${searchText.value}`;
  const url = getUrl(pageSize.value, pageNumber.value, searchText.value);
  console.log("urlNew=", url);
  // const responce = await fetch(url).then((response) => response.json());
  // data.value.length = 0;
  // data.value.push(...responce["@graph"]);
  fetchData(url);
};
</script>

<template>
  <div class="main">
    <div class="title">
      <h1 v-if="searchText === ''">Veranstaltungen in Kärnten</h1>
      <div v-if="searchText === ''" class="subtitle">
        Das vielfältige Kulturangebot im Süden
      </div>
      <h1 v-if="searchText !== ''">Veranstaltungssuche</h1>
    </div>
    <!-- <p>Search Text: {{ searchText }}</p> -->
    <Search @search="search" client:load />

    <EventsList v-if="data !== null" :searchQuery="searchText" :data="data" />

    <div v-if="loading" class="load">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style>
.main {
  text-align: center;

  .title {
    padding: 25px;

    h1 {
      font-size: 50px;
      margin-top: 0;
      margin-bottom: 12px;
    }

    .subtitle {
      font-size: 32px;
    }
  }
}
</style>
