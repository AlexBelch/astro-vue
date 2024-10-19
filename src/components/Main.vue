<script setup>
import { ref } from "vue";
import { PaginationBar } from "v-page";
import EventsList from "./EventsList.vue";
import Search from "./Search.vue";

const loading = ref(true);
const error = ref(null);

const searchText = ref("");
const data = ref([]);

const pageSize = ref(12);
const pageNumber = ref(1);
const totalRow = ref(0);

function getUrl(pageSize, pageNumber, searchText) {
  return `https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image,location,eventSchedule,dc:classification.skos:inScheme&token=9962098a5f6c6ae8d16ad5aba95afee0&page[size]=${pageSize}&page[number]=${pageNumber}&filter[q]=${searchText}`;
}

async function fetchData(url) {
  error.value = null;
  loading.value = true;
  data.value = null;

  try {
    const responce = await fetch(url).then((response) => response.json());
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
  searchText.value = searchValue;

  const url = getUrl(pageSize.value, pageNumber.value, searchText.value);

  fetchData(url);
};

function paginationChange(data) {
  pageNumber.value = data?.pageNumber;
  pageSize.value = data?.pageSize;
  fetchData(getUrl(pageSize.value, pageNumber.value, searchText.value));
}
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

    <Search @search="search" client:load />

    <PaginationBar
      align="center"
      border
      :page-size-menu="[12, 24, 50, 100]"
      :page-size="pageSize"
      hide-on-single-page
      v-model="pageNumber"
      :totalRow="totalRow"
      @change="paginationChange"
    />

    <EventsList v-if="data !== null" :searchQuery="searchText" :data="data" />

    <span v-if="loading" class="load"></span>
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

  .v-pagination.v-pagination--border {
    height: 40px;
    ul {
      li.active a {
        color: red;
        background-color: var(--yellow);
      }

      li {
        a {
          font-size: 18px;
          border-color: var(--yellow);
        }

        select {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
