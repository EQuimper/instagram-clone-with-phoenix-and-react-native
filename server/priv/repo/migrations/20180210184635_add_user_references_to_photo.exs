defmodule Instagram.Repo.Migrations.AddUserReferencesToPhoto do
  use Ecto.Migration

  def change do
    alter table("photos") do
      add :user_id, references(:users, on_delete: :delete_all), null: false
    end
  end
end
