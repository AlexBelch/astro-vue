<script setup>
import { ref } from "vue";

const props = defineProps({
  search: Function,
});

const searchTextNew = ref("");
const searchDateNew = ref("");
const searchClassificationNew = ref("");
</script>

<template>
  <div class="search-wrap">
    <div class="search-bar">
      <select v-model="searchClassificationNew">
        <option value="" disabled>Kategorie</option>
        <option
          :value="'4dde2b88-66cf-4751-b13e-264dc6445e83'"
          :key="'4dde2b88-66cf-4751-b13e-264dc6445e83'"
        >
          Musik
        </option>
        <option
          value="39f5def2-0729-410b-8297-0de5b59707f0"
          :key="'39f5def2-0729-410b-8297-0de5b59707f0'"
        >
          Theater, Tanz & Performance
        </option>
        <option
          value="9a206c22-35bd-4f79-93be-98d23eb63c27"
          :key="'9a206c22-35bd-4f79-93be-98d23eb63c27'"
        >
          Literatur
        </option>
        <option
          value="25b31f4f-36f7-41da-aafd-be950c46367c"
          :key="'25b31f4f-36f7-41da-aafd-be950c46367c'"
        >
          Festivals & Feste
        </option>
        <option
          value="625acf56-0f08-4596-8641-4d579968de9a"
          :key="'625acf56-0f08-4596-8641-4d579968de9a'"
        >
          Ausstellungen & Galerien
        </option>
        <option
          value="deafc3b9-baaf-4bc3-886e-60147eaa191e"
          :key="'deafc3b9-baaf-4bc3-886e-60147eaa191e'"
        >
          Film- & Medienkunst
        </option>
        <option
          value="16847899-3257-4672-991c-c45852dd79a9"
          :key="'16847899-3257-4672-991c-c45852dd79a9'"
        >
          Kinder & Jugendkultur
        </option>
        <option
          value="328a9185-6298-498e-92b5-a9faa7e7aa4a"
          :key="'328a9185-6298-498e-92b5-a9faa7e7aa4a'"
        >
          Volkskultur
        </option>
        <option
          value="35e788a9-3878-494c-8310-1c7084c96d0e"
          :key="'35e788a9-3878-494c-8310-1c7084c96d0e'"
        >
          Crossover & Sonstiges
        </option>
      </select>
      <input
        type="date"
        :value="searchDateNew"
        @input="(e) => (searchDateNew = e.target.value)"
      />
      <input
        placeholder="SuchBegriff"
        :value="searchTextNew"
        @input="(e) => (searchTextNew = e.target.value)"
        v-on:keyup.enter="
          (e) => {
            searchTextNew = e.target.value;
            $emit(
              'search',
              searchTextNew,
              searchDateNew,
              searchClassificationNew,
            );
          }
        "
      />
      <button
        @click="
          $emit('search', searchTextNew, searchDateNew, searchClassificationNew)
        "
      >
        &#128269; Suchen
      </button>
      <button
        @click="
          () => {
            searchTextNew = '';
            searchDateNew = '';
            searchClassificationNew = '';
            $emit(
              'search',
              searchTextNew,
              searchDateNew,
              searchClassificationNew,
            );
          }
        "
      >
        &#10060;
      </button>
    </div>
  </div>
</template>

<style>
.search-wrap {
  max-width: 1600px;
  margin: auto;

  .search-bar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    background-color: var(--yellow);
    padding: 16px;
    margin-bottom: 32px;

    select,
    input {
      padding: 5.4px 8px;

      &:focus,
      &:focus-visible {
        border-color: #0000008f;
        outline-color: #0000008f;
      }
    }

    select,
    input,
    button {
      font-size: 16px;
      height: 36px;
      border-color: transparent;
      border-radius: 10px;
      cursor: pointer;
    }

    button:hover {
      background-color: #f2f2f2;
      border-color: #0000008f;
    }

    button:active,
    button:focus {
      background-color: #ebebeb;
      border-color: #0000008f;
    }
  }
}
</style>
