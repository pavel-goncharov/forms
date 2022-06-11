import jwtDecode from "jwt-decode";
import {$host} from "./index";
import {Urls} from "../utils/constants";
import {LocalStorage} from "../utils/constants";

// объединить в один метод

export async function signUp(nickname: string, email: string, password: string) {
  const reqData = {nickname, email, password};
  const {data} = await $host.post(Urls.SIGN_UP, reqData);
  localStorage.setItem(LocalStorage.TOKEN, data.token);
  return jwtDecode(data.token);
}

export async function login(email: string, password: string) {
  const reqData = {email, password};
  const {data} = await $host.post(Urls.LOGIN, reqData);
  localStorage.setItem(LocalStorage.TOKEN, data.token);
  return jwtDecode(data.token);
}