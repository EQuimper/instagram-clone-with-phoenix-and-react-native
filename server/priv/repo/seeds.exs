alias Instagram.{Posts, Repo}

mock_photos = 9

photos_list = [
  "https://freestocks.org/fs/wp-content/uploads/2018/01/english_bulldog_lying_on_a_sofa_2-800x533.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2017/04/old_tile_stove_fire-800x533.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2017/10/trip_in_the_mountins_with_a_dog-733x1100.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/08/french_fries-800x533.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/09/memory_box_2-800x533.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/10/sailing_boat_at_sunset-450x300.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/11/playground_ropes-800x533.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/11/fig_cake_2-800x533.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2017/12/christmas_tree_decoration_3-800x533.jpg",
  "https://freestocks.org/fs/wp-content/uploads/2016/08/timber-800x533.jpg"
]

for idx <- 0..mock_photos do
  photo = %{
    image_url: Enum.at(photos_list, idx),
    caption: Faker.Lorem.Shakespeare.hamlet
  }

  %Posts.Photo{}
  |> Posts.Photo.changeset(photo)
  |> Repo.insert!
end