import {ISignUp, ISignUpParams, ILogin, ILoginParams, IFastSignUp, ILoginError} from "../../models/auth";
import { IUser } from "../../models/user";
import {UserUrls, HttpMethods} from "../../utils/constants";
import appApi from "../appApi";

const userApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<ISignUp, ISignUpParams>({
      query: (auth) => ({
        url: UserUrls.SIGN_UP,
        method: HttpMethods.POST,
        body: auth
      }),
    }),
    login: build.mutation<ILogin, ILoginParams>({
      query: (auth) => ({
        url: UserUrls.LOGIN,
        method: HttpMethods.POST,
        body: auth
      }),
    }),
    checkAuth: build.query<ILogin, void>({
      query: () => UserUrls.AUTH
    }),
    getMe: build.mutation<IUser, void>({
      query: () => ({
        url: UserUrls.GET_ME,
        method: HttpMethods.POST,
      }) 
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/user/logout',
        method: HttpMethods.POST
      }),
    }),
    refreshToken: build.mutation<ILogin, void>({
      query: () => ({
        url: '/user/refresh',
        method: HttpMethods.POST
      })
    })
  })
});

export default userApi;