# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PostShare.destroy_all
Post.destroy_all
Sub.destroy_all
User.destroy_all

u1 = User.create(username: "user1", password: "123456")
u2 = User.create(username: "user2", password: "123456")
u3 = User.create(username: "user3", password: "123456")
u4 = User.create(username: "user4", password: "123456")

s1 = Sub.create(title: "sub1", description: "this is sub1", moderator_id: u1.id)
s2 = Sub.create(title: "sub2", description: "this is sub2", moderator_id: u1.id)
s3 = Sub.create(title: "sub3", description: "this is sub3", moderator_id: u3.id)
s4 = Sub.create(title: "sub4", description: "this is sub4", moderator_id: u4.id)

p1 = Post.create(title: "post1", url: "post1.com", content: "this is post1", author_id: u1.id)
p2 = Post.create(title: "post2", author_id: u1.id)
p3 = Post.create(title: "post3", url: "post3.com", content: "this is post3", author_id: u3.id)
p4 = Post.create(title: "post4", url: "post4.com", content: "this is post4", author_id: u4.id)

ps1 = PostShare.create(sub_id: s1.id, post_id: p1.id)