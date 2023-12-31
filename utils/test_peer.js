const myIceServers = [
    {
      url: 'stun:global.stun.twilio.com:3478',
      urls: 'stun:global.stun.twilio.com:3478'
    },
    {
      url: 'turn:global.turn.twilio.com:3478?transport=udp',
      username: '80bc7477fafa210c13dbc6bbd70de64a504c8dd39330c0c3bfed99cf38bba83b',
      urls: 'turn:global.turn.twilio.com:3478?transport=udp',
      credential: 'ypX0cBMlEuobuRQxk+9BdtNfZebamfP7D6gYe7ui/rA='
    },
    {
      url: 'turn:global.turn.twilio.com:3478?transport=tcp',
      username: '80bc7477fafa210c13dbc6bbd70de64a504c8dd39330c0c3bfed99cf38bba83b',
      urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
      credential: 'ypX0cBMlEuobuRQxk+9BdtNfZebamfP7D6gYe7ui/rA='
    },
    {
      url: 'turn:global.turn.twilio.com:443?transport=tcp',
      username: '80bc7477fafa210c13dbc6bbd70de64a504c8dd39330c0c3bfed99cf38bba83b',
      urls: 'turn:global.turn.twilio.com:443?transport=tcp',
      credential: 'ypX0cBMlEuobuRQxk+9BdtNfZebamfP7D6gYe7ui/rA='
    }
]

const socket = io('/')
const myPeer = new Peer({iceServers: myIceServers}, {
    host: '/',
    port: 3001
});

let myId = 0;
myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
    myId = id;
})

const videoGrid = document.querySelector('#video-grid');
const myVideo = document.createElement('video')

myVideo.muted = true;
const peers = []

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);
    
    myPeer.on('call', call => {
        call.answer(stream);
        console.log(myId, ' is called and sent ', stream);
        initVideoForCall(call);
    });

    socket.on('user-connected', (userId) => {
        connectToUser(userId, stream);
    })

});
socket.on('user-disconnected', (userId) => {
    peers[userId]?.close()
})


function connectToUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    console.log(myId, " called ", userId);
    initVideoForCall(call);
    peers[userId] = call;
}

function initVideoForCall(call) {
    const video = document.createElement('video');
    console.log('Created new video for ', call, ' then assigned listeners accordingly');
    call.on('stream', theirStream => {
        addVideoStream(video, theirStream);
    })
    call.on('close', () => video.remove())
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}