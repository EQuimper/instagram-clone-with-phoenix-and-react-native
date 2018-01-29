defmodule InstagramWeb.Context do
  @behaviour Plug
  import Plug.Conn

  alias InstagramWeb.Auth

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    IO.inspect [context: context]
    put_private(conn, :absinthe, %{context: context})
  end

  defp build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
      {:ok, current_user} <- authorize(token) do
        %{current_user: current_user}
    else
      nil ->
        {:error, "Unauthorized"}
      _ ->
        %{}
    end
  end

  defp authorize(token) do
    case Auth.Guardian.decode_and_verify(token) do
      {:ok, claims} -> Auth.Guardian.resource_from_claims(claims)
      {:error, reason} -> {:error, reason}
      nil -> {:error, "Unauthorized"}
    end
  end
end