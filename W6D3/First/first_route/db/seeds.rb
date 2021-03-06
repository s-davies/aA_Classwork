# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


ArtworkShare.destroy_all 
Artwork.destroy_all
User.destroy_all

u1 = User.create(username: "Joe")
u2 = User.create(username: "Kyle")
u3 = User.create(username: "Lionel")
u4 = User.create(username: "Matt")
u5 = User.create(username: "Natalie")

a1 = Artwork.create(title: "sky", image_url: "sky.com", artist_id: u1.id)
a2 = Artwork.create(title: "dirt", image_url: "dirt.com", artist_id: u2.id)
a3 = Artwork.create(title: "grass", image_url: "grass.com", artist_id: u3.id)
a4 = Artwork.create(title: "water", image_url: "water.com", artist_id: u1.id)
a5 = Artwork.create(title: "fire", image_url: "fire.com", artist_id: u4.id)


as1 = ArtworkShare.create(artwork_id: a1.id, viewer_id: u5.id)
as2 = ArtworkShare.create(artwork_id: a2.id, viewer_id: u5.id)
as3 = ArtworkShare.create(artwork_id: a3.id, viewer_id: u1.id)
as4 = ArtworkShare.create(artwork_id: a1.id, viewer_id: u2.id)
as5 = ArtworkShare.create(artwork_id: a5.id, viewer_id: u3.id)