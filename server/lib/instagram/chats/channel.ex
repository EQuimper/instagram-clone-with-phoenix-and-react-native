defmodule Instagram.Chats.Channel do
  use Ecto.Schema
  import Ecto.Changeset
  alias Instagram.Chats.Channel


  schema "channel" do
    # field :user1, :id
    # field :user2, :id

    belongs_to :user1, Instagram.Accounts.User
    belongs_to :user2, Instagram.Accounts.User

    has_many :messages, Instagram.Chats.Message

    timestamps()
  end

  @doc false
  def changeset(%Channel{} = channel, attrs) do
    channel
    |> cast(attrs, [:user1_id, :user2_id])
    |> validate_required([:user1_id, :user2_id])
  end
end
