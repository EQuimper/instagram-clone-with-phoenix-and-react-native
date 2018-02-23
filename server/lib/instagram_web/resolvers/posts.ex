defmodule InstagramWeb.Resolvers.Posts do
  alias Instagram.Posts

  def photos(_, _, _) do
    {:ok, Posts.list_photos}
  end

  def photo(_, %{id: id}, _) do
    {:ok, Posts.get_photo!(id)}
  end

  def presign_url(_, _, _) do
    {:ok, Posts.get_presign_url}
  end

  def create_photo(_, args, %{context: %{current_user: current_user}}) do
    args = Map.merge(args, %{user_id: current_user.id})
    with {:ok, photo} <- Posts.create_photo(args) do
      {:ok, photo}
    end
  end
end