import router from "./router"
import {getCookie} from "./utils/cookie";

router.beforeEach((from, to, next) => {

    let hasUser = getCookie('userInfo')

    if(hasUser){

        if(to.path==="/login"){
            next();
        }else{

        }


    }else{
        next("/login")
    }

})
