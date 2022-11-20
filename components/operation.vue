<template>
<div>
  <h1>Push notification center</h1>
  <h3 id="subscribed">You are subscribed</h3>
  <h3 id="unsubscribed">You are not subscribed</h3>
  <button onclick="broadcast()">Send push notification</button>
  <button onclick="subscribe()">Subscribe</button>
  <button onclick="unsubscribe()">Unsubscribe</button>
</div>
</template>
<script lang="ts">
export default defineComponent({
    setup() {
        
    },
})

</script>
