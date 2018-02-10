import Integer, only: [is_odd: 1]

alias Instagram.{Posts, Repo, Accounts}

mock_photos = 9
mock_users = 5

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

# Users
for idx <- 1..mock_users do
  sex = if (is_odd(idx)), do: "men", else: "women"
  avatar = "https://randomuser.me/api/portraits/#{sex}/#{idx}.jpg"
  %Accounts.User{
    email: Faker.Internet.email,
    avatar: avatar,
    username: Faker.Internet.user_name,
    facebook_id: "#{idx}"
  }
  |> Repo.insert!
end

# Photos
for idx <- 0..mock_photos do
  photo = %{
    image_url: Enum.at(photos_list, idx),
    caption: Faker.Lorem.Shakespeare.hamlet,
    user_id: Enum.random(1..mock_users)
  }

  %Posts.Photo{}
  |> Posts.Photo.changeset(photo)
  |> Repo.insert!
end