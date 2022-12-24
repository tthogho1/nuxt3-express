<script setup lang="ts">
import { setlocalStream ,  skyWayInformation} from '../../composables/skyway'

const route = useRoute();
const { id } = route.params;
console.log( id + 'を取得しました');

const { callPeerId } = skyWayInformation();
let localstream : MediaStream ;

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
  mediaConnection.on('stream', stream => {
    // video要素にカメラ映像をセットして再生
    const videoElm = document.getElementById('their-video') as HTMLVideoElement;
    videoElm.srcObject = stream;
    videoElm.play();
  });
}

onMounted(() => {

    let video = document.getElementById('call-video') as HTMLVideoElement;
    setlocalStream(localstream,video);
    // let peerId = document.getElementById('my-peerId') as HTMLElement;
    //  openPeerId();
    console.log("call peerId to " + id);
    let to_id = id as string;
    let mediaConnection = callPeerId( to_id , localstream);

    setEventListener(mediaConnection);
});


definePageMeta({
  pageTransition: false,
}) 

</script>

<template>
<div class="container">
  <h1>Video Call</h1>
  <div>
    <video width="320" height="240" id="call-video" autoplay muted playsinline></video>
    <video width="320" height="240" id="their-video" autoplay muted playsinline></video>
  </div>
</div>
</template>