import {request} from "@/network/request";

export function Login(payload) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      user_email: payload.user_email,
      user_password:  payload.user_password,
    }
  });
}

export function getEmailCode(userEmail) {
  return request({
    url: '/mail/send',
    method: 'get',
    params: {
      'user_email': userEmail
    }
  });
}

export function Register(payload) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      'user_name': payload.name,
      'user_email': payload.email,
      'user_password': payload.password,
    }
  });
}

export function loginByToken(token) {
  return request({
    url: '/token_login',
    method: 'post',
    data: {
      'user_token': token,
    }
  });
}