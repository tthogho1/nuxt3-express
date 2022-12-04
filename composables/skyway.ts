import Peer from 'skyway-js';
const peer = new Peer({key: '2bda16ac-ebdf-4007-bcb4-28be1fa0a379'});
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

export const setlocalStream = async (localStream:MediaStream,videoElement:HTMLVideoElement) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        const video = videoElement ;
        video.srcObject = stream;
        video.play();
        localStream = stream;        
    } catch (error) {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    }
}

export const getPeer = () => {
  return peer;
}