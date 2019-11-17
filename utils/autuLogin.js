import util from './util.js';
import { login } from './../api/user.js';
import { logout } from './../api/api.js';

export default function authLogin(login_type){
  return new Promise((reslove, reject) => {
    util.autoLogin().then(userInfo => {
      if (login_type !== undefined) userInfo.login_type = 'routine';
      const params = {
        code: userInfo.code.code
      }
      login(params).then(res => {
        getApp().globalData.token = res.data.access_token_cookie;
        getApp().globalData.userInfo = res.data.userInfo;
        getApp().globalData.isLog = true;
        // getApp().globalData.expiresTime = res.data.expires_time; // 过期时间不设置
        // if (res.data.cache_key) wx.setStorage({ key: 'cache_key', data: res.data.cache_key }); // 没看懂
        reslove();
      }).catch(err=>{
        reject();
      });
    }).catch(err=>{
      reject();
    });
  })
}