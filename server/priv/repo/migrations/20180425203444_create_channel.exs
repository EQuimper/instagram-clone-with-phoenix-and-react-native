defmodule Instagram.Repo.Migrations.CreateChannel do
  use Ecto.Migration

  def change do
    create table(:channel) do
      add :user1_id, references(:users, on_delete: :nothing)
      add :user2_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:channel, [:user1_id])
    create index(:channel, [:user2_id])

    create unique_index(:channel, [:user1_id, :user2_id], name: :channel_name)
  end
end
