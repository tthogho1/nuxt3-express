import type { Ref } from 'vue';

//var user : Ref<String>;

export const userInformation = () => {
    const user  = useState<{authId:string}>('user',()=> {
        console.log("userInformation");
        return {authId:""};
    });

    const setUser = (user:Ref<{authId:string}>) => (name:string) => {
        ///     let user = useState("login-user",() => name);
        console.log("set user info..." + name);
        user.value.authId = name;
       // alert(user.value.authId);
    }
    
    const getUser = (user:Ref<{authId:string}>) =>()=> {
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
