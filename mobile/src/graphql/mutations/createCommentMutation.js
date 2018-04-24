import gql from 'graphql-tag';

export default gql`
  mutation createComment($photoId: ID!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      id
      text
      insertedAt
      user {
        avatar
        id
        username
      }
    }
  }
`;
