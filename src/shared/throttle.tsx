//页面动画CD时间限制
export const throttle = (fn:Function,time:number)=>{
    let timer :  number | undefined = undefined
    return ()=>{
        if(timer === undefined){
            fn()
            timer = setTimeout(() => { //在time走完之前，settimeout 是数字，time走完后，timer才 = undefined
                timer = undefined
            }, time);
        }else{
            return 
        }
    }
}




