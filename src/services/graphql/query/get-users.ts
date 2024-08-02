import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Users($limit: Int!, $offset: Int!, $registerStatus: String) {
    users(limit: $limit, offset: $offset, registerStatus: $registerStatus) {
      result {
        userId
        registerStatus
        userName
        createdAt
        updatedAt
        deletedAt

        avatar {
          url
        }
      }
    }
  }
`;
