import appApi from '../appApi';
import {ISuccess} from '../../types';
import {ISignUpParams, ILogin, ILoginParams} from '../../types/auth';
import {IUser} from '../../types/user';
import {apiTags, HttpMethods, UserUrls} from '../../constants/api';

const authEndPoints = appApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<ISuccess, ISignUpParams>({
      query: (auth) => ({
        url: UserUrls.SIGN_UP,
        method: HttpMethods.POST,
        body: auth
      }),
      invalidatesTags: [apiTags.user]
    }),
    login: build.mutation<ILogin, ILoginParams>({
      query: (auth) => ({
        url: UserUrls.LOGIN,
        method: HttpMethods.POST,
        body: auth
      }),
      invalidatesTags: [apiTags.user]
    }),
    getMe: build.mutation<IUser, void>({
      query: () => ({
        url: UserUrls.GET_ME,
        method: HttpMethods.POST,
      }),
      invalidatesTags: [apiTags.user]
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: UserUrls.LOGOUT,
        method: HttpMethods.POST
      }),
      invalidatesTags: [apiTags.user]
    }),
    refreshToken: build.mutation<ILogin, void>({
      query: () => ({
        url: UserUrls.REFRESH,
        method: HttpMethods.POST
      }),
      invalidatesTags: [apiTags.user]
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