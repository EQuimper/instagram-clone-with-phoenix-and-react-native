defmodule Instagram.Posts.Tag do
  use Ecto.Schema
  import Ecto.Changeset
  alias Instagram.Posts.Tag


  schema "tags" do
    field :name, :string

    many_to_many :photos, Instagram.Posts.Photo, join_through: "tags_photos"
  end

  @doc false
  def changeset(%Tag{} = tag, attrs) do
    tag
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
