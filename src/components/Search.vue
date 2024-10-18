<script setup>
import { ref } from "vue";

const props = defineProps({
  search: Function,
});

const searchTextNew = ref("");
</script>

<template>
  <div class="search-wrap">
    <div class="search-bar">
      <input
        placeholder="SuchBegriff"
        :value="searchTextNew"
        @input="(e) => (searchTextNew = e.target.value)"
        v-on:keyup.enter="
          (e) => {
            searchTextNew = e.target.value;
            $emit('search', searchTextNew);
          }
        "
      />
      <button @click="$emit('search', searchTextNew)">&#128269; Suchen</button>
      <button
        @click="
          () => {
            searchTextNew = '';
            $emit('search', searchTextNew);
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
    column-gap: 16px;
    background-color: #ffde00;
    padding: 16px;
    margin-bottom: 32px;

    input {
      padding: 5.4px 8px;

     &:focus, &:focus-visible {
        border-color: #0000008f;
        outline-color: #0000008f;
     }
    }

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
