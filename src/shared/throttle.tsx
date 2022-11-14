export const throttle = (fn:Function,time:number)=>{
    let timer :  number | undefined = undefined
    return ()=>{
        if(timer === undefined){
            fn()
            timer = setTimeout(() => {
                timer = undefined
            }, time);
        }else{
            return 
        }
    }
}




