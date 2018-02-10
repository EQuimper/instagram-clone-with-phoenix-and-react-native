defmodule Instagram.Posts.Photo do
  use Ecto.Schema
  import Ecto.Changeset
  alias Instagram.Posts.Photo


  schema "photos" do
    field :caption, :string
    field :image_url, :string

    belongs_to :user, Instagram.Accounts.User

    has_many :likes, Instagram.Reactions.LikePhoto

    timestamps()
  end

  @doc false
  def changeset(%Photo{} = photo, attrs) do
    photo
    |> cast(attrs, [:image_url, :caption, :user_id])
    |> validate_required([:image_url, :user_id])
  end
end
