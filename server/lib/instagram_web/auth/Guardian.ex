defmodule InstagramWeb.Auth.Guardian do
  use Guardian, otp_app: :instagram

  def subject_for_token(resource, _claims) do
    sub = to_string(resource.id)

    {:ok, sub}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]
    resource = Instagram.Accounts.get_user!(id)
    {:ok, resource}
  end
end