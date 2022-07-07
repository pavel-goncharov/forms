import {ISignUp, ISignUpParams, ILogin, ILoginParams} from "../../models/auth";
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
    fetchNickname: build.query<string, number>({
      query: (id) => UserUrls.NICKNAME + id
    })
  })
});

export default userApi;