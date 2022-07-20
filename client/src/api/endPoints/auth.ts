import appApi from '../appApi';
import {ISuccess} from '../../types';
import {ISignUpParams, ILogin, ILoginParams} from '../../types/auth';
import {IUser} from '../../types/user';
import {HttpMethods, UserUrls} from '../../constants/api';

const authEndPoints = appApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<ISuccess, ISignUpParams>({
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
    getMe: build.mutation<IUser, void>({
      query: () => ({
        url: UserUrls.GET_ME,
        method: HttpMethods.POST,
      }) 
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: UserUrls.LOGOUT,
        method: HttpMethods.POST
      }),
    }),
    refreshToken: build.mutation<ILogin, void>({
      query: () => ({
        url: UserUrls.REFRESH,
        method: HttpMethods.POST
      })
    })
  })
});

export const {
  useSignUpMutation, 
  useLoginMutation,
  useGetMeMutation, 
  useLogoutMutation, 
  useRefreshTokenMutation
} = authEndPoints;