defmodule InstagramWeb.Resolvers.Chats do
  alias Instagram.Chats


  def create_channel(_, %{user_id: user_id}, %{context: %{current_user: current_user}}) do
    with {:ok, channel} <- Chats.create_channel(%{user1_id: current_user.id, user2_id: user_id}) do
      {:ok, channel}
    end
  end

  def create_message(_, %{text: text, channel_id: channel_id}, %{context: %{current_user: current_user}}) do
    with {:ok, message} <- Chats.create_message(%{text: text, channel_id: channel_id, from_id: current_user.id}) do
      {:ok, message}
    end
  end

  def get_channel(_, %{channel_id: channel_id}, _) do
    {:ok, Chats.get_channel!(channel_id)}
  end

  def get_user_channels(_, %{user_id: user_id}, %{context: %{current_user: current_user}}) do
    {:ok, Chats.get_user_channels(user_id)}
  end
end