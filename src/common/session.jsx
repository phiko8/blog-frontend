const StoreInSession = (key, value) =>{
   return sessionStorage.setItem(key,value);
}

const lookInsession =(key) =>{
    return sessionStorage.getItem(key)
}

const removeFromSession = (key) => {
    return sessionStorage.removeItem(key)
}

const logoutUser =() =>{
    sessionStorage.clear();
}

export { StoreInSession, lookInsession, removeFromSession, logoutUser}