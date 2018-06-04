defmodule Instagram.Posts.Photo do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias Instagram.Repo
  alias Instagram.Posts.{Photo, Tag}


  schema "photos" do
    field :caption, :string
    field :image_url, :string

    belongs_to :user, Instagram.Accounts.User

    has_many :likes, Instagram.Reactions.LikePhoto
    has_many :comments, Instagram.Posts.Comment

    many_to_many :tags, Tag, join_through: "tags_photos"

    timestamps()
  end

  @doc false
  def changeset(%Photo{} = photo, attrs) do
    photo
    |> cast(attrs, [:image_url, :caption, :user_id])
    |> validate_required([:image_url, :user_id])
    |> put_assoc(:tags, parse_tags(attrs))
  end

  defp parse_tags(params) do
    (params.tags || [])
    |> Enum.map(&String.trim/1)
    |> Enum.reject(& &1 == "")
    |> insert_and_get_all()
  end

  defp insert_and_get_all([]) do
    []
  end
  defp insert_and_get_all(names) do
    maps = Enum.map(names, &%{name: &1})
    Repo.insert_all(Tag, maps, on_conflict: :nothing)
    Repo.all(from t in Tag, where: t.name in ^names)
  end
end