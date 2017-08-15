/**
 * Created by Administrator on 2017/6/5.
 */
export default{
  user(state){
    let userJson = window.localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : {};
  }
};
