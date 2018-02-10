import gql from 'graphql-tag';

export default gql`
  mutation($photoId: ID!) {
    likePhoto(photoId: $photoId)
  }
`;
