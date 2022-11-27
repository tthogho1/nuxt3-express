import type { Ref } from 'vue';


//var user : Ref<String>;

export const userInformation = () => {
    const user  = useState<{authId:String}>('user',()=> {
        console.log("userInformation");
        return {authId:"a"};
    });
    const setUser = (user:Ref<{authId:String}>) => (name:String) => {
        ///     let user = useState("login-user",() => name);
        console.log("set user info..." + name);
        user.value.authId = name;
        alert(user.value.authId);
    }
    
    const getUser = (user:Ref<{authId:String}>) =>()=> {
        console.log("get user info..." + user.value.authId);
        return{
            user:user.value,
        }
    }

    return {
        user: readonly(user),
        setUser: setUser(user) ,
        getUser: getUser(user),
    }
}
