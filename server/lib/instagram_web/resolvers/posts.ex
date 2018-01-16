defmodule InstagramWeb.Resolvers.Posts do
  def photos(_, _, _) do
    {:ok, Instagram.Posts.list_photos}
  end

  def photo(_, %{id: id}, _) do
    {:ok, Instagram.Posts.get_photo!(id)}
  end
end