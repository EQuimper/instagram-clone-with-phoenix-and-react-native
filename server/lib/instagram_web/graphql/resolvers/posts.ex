defmodule InstagramWeb.GraphQL.Resolvers.Posts do
  alias Instagram.Posts

  def photos(_, _, _) do
    {:ok, Posts.list_photos()}
  end

  def photo(_, %{id: id}, _) do
    {:ok, Posts.get_photo!(id)}
  end

  def presign_url(_, _, _) do
    {:ok, Posts.get_presign_url()}
  end

  def create_photo(_, args, %{context: %{current_user: current_user}}) do
    args = Map.merge(args, %{user_id: current_user.id})

    with {:ok, photo} <- Posts.create_photo(args) do
      {:ok, photo}
    end
  end

  def create_comment(_, args, %{context: %{current_user: current_user}}) do
    attrs = Map.merge(args, %{user_id: current_user.id})

    with {:ok, comment} <- Posts.create_comment(attrs) do
      {:ok, comment}
    end
  end

  def get_comments(_, %{photo_id: photo_id}, _) do
    {:ok, Posts.get_comments_for_photo(photo_id)}
  end

  def search_tag(_, %{name: name}, _) do
    {:ok, Posts.search_tag(name)}
  end

  def get_tags(_, _, _) do
    {:ok, Posts.get_tags()}
  end
end
