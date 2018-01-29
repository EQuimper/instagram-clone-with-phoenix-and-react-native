defmodule InstagramWeb.Schema.AccountsTypes do
  use Absinthe.Schema.Notation

  object :user_session do
    field :token, non_null(:string)
  end

  enum :provider do
    value :facebook
  end
end