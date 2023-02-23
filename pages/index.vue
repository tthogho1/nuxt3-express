<template>
    <div class="login">
      <h2>Sign in</h2>
      <div class="container" style="width:500px">
        <div class="row align-items-center">
          <div class="col-md-12">
            {{ error_message }}
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-4">ユーザ名</div>
          <div class="col-md-3">
            <input v-model="name" type="text" placeholder="Username">
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-4">パスワード</div>
          <div class="col-md-3">
            <input v-model="password" type="password" placeholder="Password">
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-12">
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-4">
            <button class="btn btn-info btn-block login" v-on:click="create">アカウント作成</button>
          </div>
          <div class="col-md-3">
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
import vm from 'vm'
import { userInformation } from '../composables/userInformation'
const {user,setUser,getUser} = userInformation();


let name = '';
let password = '' ;
const error_message =ref<string>('');

let request =  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    };

const login = async () => {
    console.log("login user");
    request.body = JSON.stringify({
        name: name,
        password: password
    });
    try {
        const res = await fetch('/api/login', request);
        const data = await res.json();
        if (data.name == null){
           error_message.value = "Name or Password is wrong";
           return;
        }
        setUser(data.name);

        await navigateTo('/menu');
    } catch (error) {   
        console.log(error);
        alert("failed to login");
    }   
};


const create = async () => {
    console.log("create user");
    request.body = JSON.stringify({
        name: name,
        password: password
    });
    try {
        const res = await fetch('/api/create', request);
        if (res.status != 200){
          let msg = await res.text();

          console.error("error : " + msg);
          error_message.value = "Server Error Occure";
          return ;
        }
        const data = await res.json();
        setUser(data.name);

        await navigateTo('/menu');
    } catch (error) {   
        console.log(error);
        alert("failed to create account");
    }   
};

</script>