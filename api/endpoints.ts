import { Comment, Post, User } from "@/types/api.types";
import { baseApi } from "api";

export type NewPostPayload = Pick<Post, "body" | "title" | "userId">;

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query<User[], void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    userPosts: builder.query<Post[], string>({
      query: (userId) => ({
        url: "posts",
        method: "GET",
        params: {
          userId,
        },
      }),
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    addPost: builder.mutation<void, NewPostPayload>({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    post: builder.query<Post, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "GET",
      }),
    }),
    comments: builder.query<Comment[], string>({
      query: (postId) => ({
        url: `comments`,
        method: "GET",
        params: {
          postId,
        },
      }),
    }),
  }),
});

export const {
  usePostQuery,
  useUsersQuery,
  useCommentsQuery,
  useUserPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
} = usersApi;
