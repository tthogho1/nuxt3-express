<script setup lang="ts">
import { pushMsgButton } from "~~/composables/pushMessage";
import { userInformation } from '../composables/userInformation'

const {user,setUser,getUser} = userInformation();
const { init,broadcast, subscribe , unsubscribe } = pushMsgButton();
// const {data: articles, refresh} = await useFetch('/api/blogs');

onMounted(() => {
 // window:onload = () => {
 //   alert('test2');
    let sub =document.getElementById('subscribed');
    let unsub =document.getElementById('unsubscribed');  
    init(sub,unsub);
//  };   
});

const wrapSubscribe = () => {
  const tuser = getUser();
  subscribe(tuser.user.authId);
};

definePageMeta({
  pageTransition: false,
}) 
</script>

<template>
<div>
  <h1>Push notification center</h1>
  <h3 id="subscribed">You are subscribed</h3>
  <h3 id="unsubscribed">You are not subscribed</h3>
  <button @click="broadcast()">Send push notification</button>
  <button @click="wrapSubscribe()">Subscribe</button>
  <button @click="unsubscribe()">Unsubscribe</button>
</div>
</template>