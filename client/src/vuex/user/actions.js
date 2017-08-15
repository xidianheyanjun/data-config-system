/**
 * Created by Administrator on 2017/6/5.
 */
import env from "@/env";
export default{
  userLogin(context, user){
    window.localStorage.setItem("user", JSON.stringify(user));
  }
};
