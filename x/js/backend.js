var connection = new RTCMultiConnection();

// socket signaling server
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
//set session type audio and video both
var localVideosContainer = document.getElementById('local-videos-container');
var remoteVideosContainer = document.getElementById('remote-videos-container');
//on stream appends
connection.onstream = function(event) {
  var video = event.mediaElement;
  //for local
  if (event.type === 'local') {
    localVideosContainer.appendChild(video);
  }
  //for remote
  if (event.type === 'remote') {
    remoteVideosContainer.appendChild(video);
  }
};
//session for both audio and video
connection.session = {
  audio: true,
  video: true
};
//constraints for both recieve of audio and video
connection.sdpConstraints.mandatory = {
  OfferToReceiveAudio: true,
  OfferToReceiveVideo: true
};
//initially roomid if not generated
var predefinedRoomId = 'subham';
var roomid = document.getElementById('roomid');
//generates random token
roomid.value = connection.token();
//for buttons open
document.getElementById('open').onclick = function() {
  this.disabled = true;
  connection.open('predefinedRoomId' || roomid.value);
};
//for buttons join
document.getElementById('join').onclick = function() {
  this.disabled = true;
  connection.join('predefinedRoomId' || roomid.value);
};
