import gql from 'graphql-tag';

export const FeedsPhotoFragment = gql`
  fragment feedsPhoto on Photo {
    id
    imageUrl
    caption
    viewerLike
  }
`;
