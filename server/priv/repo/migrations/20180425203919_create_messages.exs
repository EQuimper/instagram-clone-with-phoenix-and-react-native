defmodule Instagram.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :from_id, references(:users, on_delete: :nothing)
      add :channel_id, references(:channel, on_delete: :nothing)
      add :text, :text

      timestamps()
    end

    create index(:messages, [:from_id])
  end
end
