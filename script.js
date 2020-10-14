 var firebaseConfig = {
    apiKey: "AIzaSyDdDCIiDJ3EOdzkog1kN-fSQmPlto2OyWU",
    authDomain: "chatroom-1eb1b.firebaseapp.com",
    databaseURL: "https://chatroom-1eb1b.firebaseio.com",
    projectId: "chatroom-1eb1b",
    storageBucket: "chatroom-1eb1b.appspot.com",
    messagingSenderId: "1016840419831",
    appId: "1:1016840419831:web:dbb61da8e20a08a51756f2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var publish_msg = function(msgObj, callback){
        console.log(msgObj);
        let chatRef = firebase.database().ref("/chat");
        let msgRef = chatRef.push();
        msgRef.set(msgObj).then(callback)
      };
    
      var display_msg = function(msg){
        $("#chatter").prepend(`<li><span>${msg.user}:</span> ${msg.msg}</li>`);
      };
      
      var loader = function(){
        $("#chatbox").on('submit', function(evt){
          evt.preventDefault();
          let user = $("#myname").val();
          let msg = $("#msg").val();
          publish_msg({user, msg}, ()=>{
            $("#myname").val('');
            $("#msg").val('');
          });
          return false;
        });
        
        let chatRef = firebase.database().ref("/chat");
        chatRef.on("child_added", function(msg){
          if (!!msg){
            display_msg(msg.val());
          }
        });
      };

      $(document).ready(loader);