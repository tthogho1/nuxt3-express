<script setup lang="ts">
import { pushMsgButton } from "~~/composables/pushMessage";

const { init,broadcast, subscribe , unsubscribe } = pushMsgButton();
// const {data: articles, refresh} = await useFetch('/api/blogs');

onMounted(() => {
  init(); 
});
</script>

<template>
<div>
  <h1>Push notification center</h1>
  <h3 id="subscribed">You are subscribed</h3>
  <h3 id="unsubscribed">You are not subscribed</h3>
  <button @click="broadcast()">Send push notification</button>
  <button @click="subscribe('test')">Subscribe</button>
  <button @click="unsubscribe()">Unsubscribe</button>
</div>
</template>