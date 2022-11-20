<script setup lang="ts">
const ads = ref<{ id: number, title: string, url: string }[]>([]);
ads.value = [{
  id: 1,
  title: "エンジニア募集中",
  url: "https://wwwrecruit.mamezou.com/"
}, {
  id: 2,
  title: "オンラインセミナー開催のお知らせ",
  url: "https://mamezou.connpass.com/"
}];
</script>

<template>
  <hr />
  <p style="margin: 0.2em 0">広告</p>
  <ul style="list-style-type:none;padding-left:0;">
    <li v-for="ad in ads" :key="ad.id"><a :href="ad.url">{{ ad.title }}</a></li>
  </ul>
</template>