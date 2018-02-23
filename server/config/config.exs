# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :instagram,
  ecto_repos: [Instagram.Repo]

# Configures the endpoint
config :instagram, InstagramWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "8v7Q60N+1U2UeLGLAWk47qEqj5aKQLEBKVuUwKR8FM07to7g+/AWQl5bLn88l2Wg",
  render_errors: [view: InstagramWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Instagram.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures Guardian
config :instagram, InstagramWeb.Auth.Guardian,
  issuer: "instagram",
  verify_issuer: true,
  secret_key: "zl2Ohhgkc0UbCdGoSMV6lu0qx9NT5HrNK+eHxcK1yQ8jqtoQeFFCWZyTGeb5WxiU"

# AWS
config :ex_aws,
  access_key_id: System.get_env("AWS_ACCESS_KEY_ID"),
  secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY"),
  s3: [
    scheme: "https://",
    host: "instagram-clone02.s3.amazonaws.com",
    region: "us-east-1"
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
