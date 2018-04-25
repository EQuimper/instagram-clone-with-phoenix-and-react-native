defmodule Instagram.ChatsTest do
  use Instagram.DataCase

  alias Instagram.Chats

  describe "channel" do
    alias Instagram.Chats.Channel

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def channel_fixture(attrs \\ %{}) do
      {:ok, channel} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Chats.create_channel()

      channel
    end

    test "list_channel/0 returns all channel" do
      channel = channel_fixture()
      assert Chats.list_channel() == [channel]
    end

    test "get_channel!/1 returns the channel with given id" do
      channel = channel_fixture()
      assert Chats.get_channel!(channel.id) == channel
    end

    test "create_channel/1 with valid data creates a channel" do
      assert {:ok, %Channel{} = channel} = Chats.create_channel(@valid_attrs)
    end

    test "create_channel/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Chats.create_channel(@invalid_attrs)
    end

    test "update_channel/2 with valid data updates the channel" do
      channel = channel_fixture()
      assert {:ok, channel} = Chats.update_channel(channel, @update_attrs)
      assert %Channel{} = channel
    end

    test "update_channel/2 with invalid data returns error changeset" do
      channel = channel_fixture()
      assert {:error, %Ecto.Changeset{}} = Chats.update_channel(channel, @invalid_attrs)
      assert channel == Chats.get_channel!(channel.id)
    end

    test "delete_channel/1 deletes the channel" do
      channel = channel_fixture()
      assert {:ok, %Channel{}} = Chats.delete_channel(channel)
      assert_raise Ecto.NoResultsError, fn -> Chats.get_channel!(channel.id) end
    end

    test "change_channel/1 returns a channel changeset" do
      channel = channel_fixture()
      assert %Ecto.Changeset{} = Chats.change_channel(channel)
    end
  end

  describe "messages" do
    alias Instagram.Chats.Message

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def message_fixture(attrs \\ %{}) do
      {:ok, message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Chats.create_message()

      message
    end

    test "list_messages/0 returns all messages" do
      message = message_fixture()
      assert Chats.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id" do
      message = message_fixture()
      assert Chats.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message" do
      assert {:ok, %Message{} = message} = Chats.create_message(@valid_attrs)
    end

    test "create_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Chats.create_message(@invalid_attrs)
    end

    test "update_message/2 with valid data updates the message" do
      message = message_fixture()
      assert {:ok, message} = Chats.update_message(message, @update_attrs)
      assert %Message{} = message
    end

    test "update_message/2 with invalid data returns error changeset" do
      message = message_fixture()
      assert {:error, %Ecto.Changeset{}} = Chats.update_message(message, @invalid_attrs)
      assert message == Chats.get_message!(message.id)
    end

    test "delete_message/1 deletes the message" do
      message = message_fixture()
      assert {:ok, %Message{}} = Chats.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> Chats.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset" do
      message = message_fixture()
      assert %Ecto.Changeset{} = Chats.change_message(message)
    end
  end
end
