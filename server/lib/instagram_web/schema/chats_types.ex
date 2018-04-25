defmodule InstagramWeb.Schema.ChatsTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Instagram.Repo

  import Ecto.Query

  object :channel do
    field :id, non_null(:id)
    field :messages, non_null(list_of(:message)), resolve: assoc(:messages)

    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
  end

  object :message do
    field :id, non_null(:id)
    field :from, non_null(:user), resolve: assoc(:from)
    field :text, :string
  end

end