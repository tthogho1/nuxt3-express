import Peer from 'skyway-js';
import type { Ref } from 'vue';

export const skyWayInformation = () => {
    const peer = new Peer({
        key: '2bda16ac-ebdf-4007-bcb4-28be1fa0a379',
        debug:3});

    const my_peerId  = useState<{peerId:string}>('peerId',()=> {
        return {peerId:""};
    });

    const openPeerId = () => ()=> {
        peer.on('open', () => {
            console.log("open peerId : " +  peer.id);
            my_peerId.value.peerId = peer.id;
        });
    } ;

    const getPeerId = (my_peerId:Ref<{peerId:string}>)=> () => {
        console.log("open peerId : " +  my_peerId.value.peerId);

        return my_peerId.value.peerId;
    } ;
    

    const callPeerId = () => (theirID:string,localStream:MediaStream) =>{

        peer.on('open', () => {
            console.log("open peerId for call : " +  peer.id);
            my_peerId.value.peerId = peer.id;
            console.log("call peerId : " +  theirID);
            const mediaConnection = peer.call(theirID, localStream);
            return mediaConnection;
        });
    };


    const answerPeerId = () =>(localStream:MediaStream,theirVideo:HTMLVideoElement) => {
        peer.on('call', mediaConnection => {
            mediaConnection.answer(localStream);
            mediaConnection.on('stream', stream => {
                // Show stream in some <video> element.
                theirVideo.srcObject = stream;
                theirVideo.play();
            });
        });
    };

    return {
        openPeerId: openPeerId(),
        getPeerId: getPeerId(my_peerId),
        callPeerId: callPeerId(),
        answerPeerId: answerPeerId(),
    }
}


/*
const call = async (peerId) => {
    const mediaConnection = peer.call(peerId, window.localStream);
    mediaConnection.on('stream', stream => {
        // Show stream in some <video> element.
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
    });
}

const answer = async () => {
    peer.on('call', mediaConnection => {
        mediaConnection.answer(window.localStream);
        mediaConnection.on('stream', stream => {
            // Show stream in some <video> element.
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
        });
    });
}*/

export const setlocalStream = async (localstream:MediaStream,videoElement:HTMLVideoElement) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        const video = videoElement ;
        video.srcObject = stream;
        video.play();

        //return stream;
    } catch (error) {
        console.error("mediaDevice.getUserMedia error:", error);
        return;
    }
}

export const getPeer = () => {
 // return peer;
}