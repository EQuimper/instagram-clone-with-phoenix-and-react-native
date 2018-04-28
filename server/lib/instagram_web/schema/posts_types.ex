defmodule InstagramWeb.Schema.PostsTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Instagram.Repo

  import Ecto.Query

  alias InstagramWeb.Resolvers

  object :photo do
    field :id, non_null(:id)
    field :image_url, non_null(:string)
    field :caption, :string
    field :viewer_like, non_null(:boolean) do
      resolve &Resolvers.Reactions.viewer_like_photo/3
    end

    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
  end

  object :presign_url do
    field :url, non_null(:string)
    field :upload_url, non_null(:string)
  end

  object :comment do
    field :id, non_null(:id)
    field :text, non_null(:string)
    field :user, non_null(:user), resolve: assoc(:user)

    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
  end
end