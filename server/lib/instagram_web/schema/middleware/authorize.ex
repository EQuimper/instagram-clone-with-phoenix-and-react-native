defmodule InstagramWeb.Schema.Middleware.Authorize do
  @behaviour Absinthe.Middleware


  def call(resolution, _) do
    with %{current_user: current_user} <- resolution.context do
      resolution
    else
      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "Unauthorized"})
    end
  end
end