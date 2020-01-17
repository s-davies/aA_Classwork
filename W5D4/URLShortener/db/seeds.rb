# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ActiveRecord::Base.transaction do
  User.destroy_all
  user1 = User.create!(email: 'ca@aa.io')
  user2 = User.create!(email: 'fa@aa.io')
  user3 = User.create!(email: 'ja@aa.io')
  user4 = User.create!(email: 'ga@aa.io')
  user5 = User.create!(email: 'na@aa.io')

  ShortenedUrl.destroy_all
  url1 = ShortenedUrl.create_short_url(user1, 'djfghlsdjfhglkdsfgkdfsgh.org')
  url2 = ShortenedUrl.create_short_url(user2, 'djfghlsdjfhglkdsfgkdfsgh.edu')
  url3 = ShortenedUrl.create_short_url(user3, 'djfghlsdjfhglkdsfgkdfsgh.com')
  url4 = ShortenedUrl.create_short_url(user4, 'djfghlsdjfhglkdsfgkdfsgh.com')
  url5 = ShortenedUrl.create_short_url(user1, 'djfghlsdjfhglkdsfgkdfsgh.gov')
end