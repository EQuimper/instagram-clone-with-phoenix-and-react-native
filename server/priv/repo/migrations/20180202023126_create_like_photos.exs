defmodule Instagram.Repo.Migrations.CreateLikePhotos do
  use Ecto.Migration

  def change do
    create table(:like_photos) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :photo_id, references(:photos, on_delete: :nothing), null: false

      timestamps()
    end

    create unique_index(:like_photos, [:user_id, :photo_id], name: :user_like_photo)
  end
end
