<script setup lang="ts">
import { pushMsgButton } from "~~/composables/pushMessage";
import { userInformation } from '../composables/userInformation'
import { setlocalStream ,  skyWayInformation} from '../composables/skyway'

const {openPeerId , getPeerId, answerPeerId} = skyWayInformation();
const {user,setUser,getUser} = userInformation();
const { init, broadcast, subscribe ,subscribeAsync, unsubscribe , sendmessage } = pushMsgButton();
// const {data: articles, refresh} = await useFetch('/api/blogs');
let localstream : MediaStream ;

onMounted(() => {

  const tuser = getUser();
    if (!tuser.user.name){
      window.location.href = '/';
    }

    let sub =document.getElementById('subscribed');
    let unsub =document.getElementById('unsubscribed');  
    init(sub,unsub);
    getOtherUsers(tuser.user.name);

});

const wrapSubscribe = async() => {
  const tuser = getUser();
  
  try {
    const res = await subscribeAsync(tuser.user.name);
    console.log(res);
    getOtherUsers(tuser.user.name);
    //getUsers();
  } catch (error) {
    console.log(error);
    alert("登録に失敗しました");  
  }

};

const wrapBroadcast = () => {
  const message = (document.getElementById('broadMessage') as HTMLInputElement).value;
  broadcast(message);
};

const wrapSendmessage = (event) => {
  const tuser = getUser();
  const from = tuser.user.name;

  const target = event.target.text;
  window.open("./skyway?from=" + from + "&target=" + target,"_blank");

};

definePageMeta({
  pageTransition: false,
}) 

const usersData = ref([]);

const getOtherUsers = async (name:string) => {
  console.log("get other Users after login");

  const params = new URLSearchParams();
  params.append('name', name);
  
  try {
    const res = await fetch('/api/getAllOtherUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
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
  <p id="my-peerId"></p>
  <div class="row">
    <input class="col-12" id="broadMessage" value="">
  </div>
  <div class="row">
    <button class="col-4" @click="wrapBroadcast()">Send push notification</button>
    <button class="col-4" @click="wrapSubscribe()">Subscribe</button>
    <button class="col-4" @click="unsubscribe()">Unsubscribe</button>
  </div>

  <div v-for="userdata in usersData" :key="userdata._id">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-11"><a href="#" @click="wrapSendmessage">{{userdata.name}}</a></div>
    </div>
  </div>
</div>
  <!--div>
    <video width="320" height="240" id="my-video" autoplay muted playsinline></video>
    <video width="320" height="240" id="their-video" autoplay muted playsinline></video>
  </div -->
</template>