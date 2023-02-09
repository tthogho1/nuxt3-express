import type { Ref } from 'vue';

//var user : Ref<String>;

export const userInformation = () => {
    const user  = useState<{name:string}>('user',()=> {
        console.log("userInformation");
        return {name:""};
    });

    const setUser = (user:Ref<{name:string}>) => (name:string) => {
        ///     let user = useState("login-user",() => name);
        console.log("set user info..." + name);
        user.value.name = name;
    }
    
    const getUser = (user:Ref<{name:string}>) =>()=> {
        console.log("get user info..." + user.value.name);
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
