<template>
    <div class="login">
      <h2>Sign in</h2>
      <div class="container" style="width:500px">
        <div class="row align-items-center">
          <div class="col-md-4">アカウント名</div>
          <div class="col-md-3">
            <input v-model="authId" type="text" placeholder="Username">
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-12">
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-12">
            <button class="btn btn-info btn-block login" v-on:click="login">ログイン</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .login {
    margin-top: 20px;
  
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  input {
    margin: 10px 0;
    padding: 10px;
  }
</style>
<script setup lang="ts">
const authId = 'test';

const login = async ()=>{
    console.log("login");
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authId: authId
            })
        });
    } catch (error) {   
        console.log(error);
        alert("ログインに失敗しました");
    }   
};
</script>