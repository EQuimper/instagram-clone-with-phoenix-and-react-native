defmodule Instagram.Chats.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Instagram.Chats.Message


  schema "messages" do
    field :text, :string

    belongs_to :from, Instagram.Accounts.User
    belongs_to :channel, Instagram.Chats.Channel

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:from_id, :text, :channel_id])
    |> validate_required([:from_id, :text, :channel_id])
  end
end
