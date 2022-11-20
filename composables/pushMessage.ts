

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
  
const getSubscribedElement = () => document.getElementById('subscribed');
const getUnsubscribedElement = () => document.getElementById('unsubscribed');
  
const setSubscribeMessage : () => void = async () =>  {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    getSubscribedElement().setAttribute('style', `display: ${subscription ? 'block' : 'none'};`);
    getUnsubscribedElement().setAttribute('style', `display: ${subscription ? 'none' : 'block'};`);
};

export function pushMsgButton() {
    const init = () => {
        if ('serviceWorker' in navigator) {
           navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });
        } 
      }

    const broadcast : () => void = async () => {
        await fetch('/api/broadcast', {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
          });
        //alert("broadcast");
    };

    const subscribe : () => void = async () => {
        if (!('serviceWorker' in navigator)) return;

        const registration = await navigator.serviceWorker.ready;
      
        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
      
        const response = await fetch('/api/subscription', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json',
          },
        });
      
        if (response.ok) {
          setSubscribeMessage();
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
      }
    };

    return {
      init,
      broadcast,
      subscribe,
      unsubscribe,
    };
  }