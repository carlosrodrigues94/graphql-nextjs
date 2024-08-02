import { gql } from "@apollo/client";

export const QUERY_USERS_PUBLIC = gql`
  query PublicUsers {
    publicUsers {
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
