defmodule Instagram.Repo.Migrations.CreateTagsPhotos do
  use Ecto.Migration

  def change do
    create table(:tags_photos) do
      add :tag_id, references(:tags, on_delete: :delete_all), null: false
      add :photo_id, references(:photos, on_delete: :delete_all), null: false
    end

    create unique_index(:tags_photos, [:tag_id, :photo_id])
  end
end
