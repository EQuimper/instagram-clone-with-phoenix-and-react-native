defmodule Instagram.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :avatar, :string
      add :facebook_id, :string
      add :email, :string
      add :first_name, :string
      add :last_name, :string

      timestamps()
    end

    create unique_index(:users, [:email])
    create unique_index(:users, [:facebook_id])
  end
end
