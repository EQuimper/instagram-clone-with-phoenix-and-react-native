defmodule InstagramWeb.Schema.PostsTypes do
  use Absinthe.Schema.Notation

  object :photo do
    field :id, non_null(:id)
    field :image_url, non_null(:string)
    field :caption, :string

    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
  end
end