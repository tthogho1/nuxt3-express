
const publicVapidKey = 'BMrfFtMtL9IWl9vchDbbbYzJlbQwplyZ_fbv8Pei8gPNna_Dr1O-Ng7U7fy0LLqz5RKIxEytTIzyk6TLrcKbN30';
  
const urlBase64ToUint8Array = (base64String : string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  
//const getSubscribedElement = () => document.getElementById('subscribed');
//const getUnsubscribedElement = () => document.getElementById('unsubscribed');
var getSubscribedElement ;
var getUnsubscribedElement ;

const setSubscribeMessage : () => void = async () =>  {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    getSubscribedElement.setAttribute('style', `display: ${subscription ? 'block' : 'none'};`);
    getUnsubscribedElement.setAttribute('style', `display: ${subscription ? 'none' : 'block'};`);
};

export function pushMsgButton() {
    const init = (sub,unsub) => {
        if ('serviceWorker' in navigator) {
           navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });
        } 
      //  alert(sub);
        getSubscribedElement = sub;
        getUnsubscribedElement = unsub;

        setSubscribeMessage();
      }

    const broadcast : (message:String) => void = async (message) => {
      const data = {
        message:message,
      }
      try{
        await fetch('/api/broadcast', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        alert("broadcast message");
      }catch(e){
        alert("broadcast error");
        console.log(e);
      }
      //alert("broadcast");
    };

    const subscribe : (name:String) => void = async (name) => {
        if (!('serviceWorker' in navigator)) return;

       // const user = getUser();
       // alert(user);
        console.log("Registering service worker..." + name);
        const registration = await navigator.serviceWorker.ready;
      
        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true, 
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
        
        const data = {
          name:name,
          subscription: subscription,
        }

        const response = await fetch('/api/subscription', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        });

        Notification.requestPermission(permission => {
            console.log(permission);
        });
      
        if (response.ok) {
          setSubscribeMessage();
          alert("subscribe data");
        }else{
          alert("subscribe data error");
        }
    };

    const unsubscribe :() => void  = async () => {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;
    
      const { endpoint } = subscription;
      const response = await fetch(`/api/subscription?endpoint=${endpoint}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
    
      if (response.ok) {
        await subscription.unsubscribe();
        setSubscribeMessage();
        alert("unsubscribe data");
      }else{
        alert("unsubscribe data failed");
      }
    };

    const sendmessage : (event,fromUser:string,peerId:string) => void 
      = async (event,fromUser:string,peerId:string) => {
      console.log(event);

      const name = event.target.text;
      let result = window.confirm("send message to " + name + " ?");
      if(!result){
        return;
      }

      const data = {
        target:name,
        fromUser:fromUser,
        peerId:peerId,
      }
      await fetch('/api/sendmessage', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        });
      //alert("broadcast");
    };

    const sendTest : (fromUser:string,target:string,peerId:string) => void 
    = async (fromUser:string,target:string,peerId:string) => {

    let result = window.confirm("send message to " +  target + " ?");
    if(!result){
      return;
    }

    const data = {
      target:target,
      fromUser:fromUser,
      peerId:peerId,
    }
    await fetch('/api/sendmessage', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
    //alert("broadcast");
  };

    return {
      init,
      broadcast,
      subscribe,
      unsubscribe,
      sendmessage,
      sendTest,
    };
  }