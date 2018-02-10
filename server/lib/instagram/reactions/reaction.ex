defmodule Instagram.Reactions do
  @moduledoc """
  The Reaction context.
  """

  import Ecto.Query, warn: false
  alias Instagram.Repo

  alias Instagram.Reactions.LikePhoto


  def like_photo(photo_id, user_id) do
    result = like_photo_exist(photo_id, user_id)

    if result == nil do
      create_like_photo(%{photo_id: photo_id, user_id: user_id})
      {:ok, true}
    else
      delete_like_photo(result)
      {:ok, false}
    end
  end

  def viewer_like_photo(photo_id, user_id) do
    result = like_photo_exist(photo_id, user_id)

    if result == nil do
      {:ok, false}
    else
      {:ok, true}
    end
  end

  # def list_like_photos do
  #   Repo.all(LikePhoto)
  # end

  # def get_like_photo!(id), do: Repo.get!(LikePhoto, id)

  def create_like_photo(attrs \\ %{}) do
    %LikePhoto{}
    |> LikePhoto.changeset(attrs)
    |> Repo.insert()
  end

  # def update_like_photo(%LikePhoto{} = like_photo, attrs) do
  #   like_photo
  #   |> LikePhoto.changeset(attrs)
  #   |> Repo.update()
  # end

  def delete_like_photo(%LikePhoto{} = like_photo) do
    Repo.delete(like_photo)
  end

  # def change_like_photo(%LikePhoto{} = like_photo) do
  #   LikePhoto.changeset(like_photo, %{})
  # end

  defp like_photo_exist(photo_id, user_id) do
    query = from p in LikePhoto,
            where: p.photo_id == ^photo_id and p.user_id == ^user_id
    Repo.one(query)
  end
end
