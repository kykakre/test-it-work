import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["GET"],
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: (limit = 6) => ({
        url: "/users",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});
export const { useFetchAllUsersQuery } = userAPI;
