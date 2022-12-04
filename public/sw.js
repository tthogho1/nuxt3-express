self.addEventListener('push', (e) => {
  const data = e.data.json();

  const title = data.title;
  if (title=='$CALL$'){
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      actions: [
        {action: 'accept', title: 'Accept'},
      ]
    });
  }else{
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
    });
  }
});
