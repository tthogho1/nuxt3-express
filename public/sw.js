let peerId = null;

//
// push通知を受け取った時の処理
//
self.addEventListener('push', (e) => {
  const data = e.data.json();
  const title = data.title;

  if (title=='$CALL$'){
    peerId = data.peerId;
    console.log('receive peerId: '+ peerId);
    
    self.registration.showNotification(data.title, {
      body: data.body, 
      icon: data.icon,
      actions: [
        {action: 'accept', title: 'Accept'},
        {action: 'decline', title: 'Decline'},
      ]
    });
  }else{
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
    });
  }
});

//
// ボタンを押した時の処理
//
self.addEventListener('notificationclick', (e) => {
  const data = e.notification.data;
  const action = e.action;
  e.notification.close();

  console.log('notificationclick: '+ action);
  if (action === 'accept') {
    console.log('accept');
    // do something
    clients.openWindow('./skyway?calltarget=' + peerId).then(
      (windowClient) => console.log("windowClient: " + windowClient));
     // window.open("http://localhost:8080/" + ,"_blank");
  } else if (action === 'decline') {
    console.log('decline');
    // do something
  }
});

