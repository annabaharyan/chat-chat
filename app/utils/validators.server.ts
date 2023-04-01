export const emailValidation=(email:string):string|undefined=>{
    const validEmail=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!email.length || !validEmail.test(email)){
        return "Please type a valid email"
    }

}
export const passwordValidation=(password:string):string|undefined=>{
    const validPass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!validPass.test(password)){
        return "Please type a password, that has minimum eight characters, at least one letter and one number "
    }
    
}
export const nameValidation=(name:string):string|undefined=>{
    if(name.trim().length>1){
        return "Please fill the field"
    }
}