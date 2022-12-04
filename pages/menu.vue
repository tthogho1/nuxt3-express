<script setup lang="ts">
import { pushMsgButton } from "~~/composables/pushMessage";
import { userInformation } from '../composables/userInformation'

const {user,setUser,getUser} = userInformation();
const { init,broadcast, subscribe , unsubscribe , sendmessage } = pushMsgButton();
// const {data: articles, refresh} = await useFetch('/api/blogs');

onMounted(() => {
 // window:onload = () => {
 //   alert('test2');
    const tuser = getUser();
    if (!tuser.user.authId){
      window.location.href = '/';
    }
    let sub =document.getElementById('subscribed');
    let unsub =document.getElementById('unsubscribed');  
    init(sub,unsub);
    getUsers();
//  };   
});

const wrapSubscribe = async() => {
  const tuser = getUser();
  subscribe(tuser.user.authId);
  getUsers();
};

const wrapBroadcast = () => {
  const message = document.getElementById('broadMessage').value;
  broadcast(message);
};


definePageMeta({
  pageTransition: false,
}) 

const usersData = ref([]);

const getUsers = async () => {
  console.log("get Users");

  try {
    const res = await fetch('/api/getUsers', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });
    usersData.value = await res.json();
    console.log(usersData);
  } catch (error) {   
    console.log(error);
    alert("ユーザ情報取得に失敗しました");
  }   
};
/*
const sendmessage = async(event) => {
  console.log("test");
  console.log(event.target.text);
}*/

</script>

<template>
<div class="container">
  <h1>Push notification center</h1>
  <h3 id="subscribed">You are subscribed</h3>
  <h3 id="unsubscribed">You are not subscribed</h3>
  <div class="row">
    <input class="col-12" id="broadMessage" value="">
  </div>
  <div class="row">
    <button @click="wrapBroadcast()">Send push notification</button>
    <button @click="wrapSubscribe()">Subscribe</button>
    <button @click="unsubscribe()">Unsubscribe</button>
  </div>

  <div v-for="userdata in usersData" :key="userdata._id">
    <div><a href="#" @click="sendmessage">{{userdata.name}}</a></div>
  </div>
  <div>
    <video id="my-video" width="400px" autoplay muted playsinline></video>
  </div>
</div>
</template>