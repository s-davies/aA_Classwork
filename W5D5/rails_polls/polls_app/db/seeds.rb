# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# ActiveRecord::Base.transaction do

# end
Response.destroy.all
AnswerChoice.destroy.all
Question.destroy.all
Poll.destroy.all
User.destroy.all
user1 = User.create('a')
user2 = User.create('b')
user3 = User.create('c')
user4 = User.create('d')
user5 = User.create('e')

poll1 = Poll.create('ta', user1.id)
poll2 = Poll.create('tb', user1.id)
poll3 = Poll.create('tc', user2.id)
poll4 = Poll.create('td', user3.id)
poll5 = Poll.create('te', user4.id)

question1 = Question.create('ba', poll1.id)
question2 = Question.create('bb', poll2.id)
question3 = Question.create('bc', poll3.id)
question4 = Question.create('bd', poll5.id)
question5 = Question.create('be', poll5.id)

q1y = AnswerChoice.create('yes', question1.id)
q1n = AnswerChoice.create('no', question1.id)
q2y = AnswerChoice.create('yes', question2.id)
q2n = AnswerChoice.create('no', question2.id)
q3y = AnswerChoice.create('yes', question3.id)
q3n = AnswerChoice.create('no', question3.id)
q4y = AnswerChoice.create('yes', question4.id)
q4n = AnswerChoice.create('no', question4.id)
q5a = AnswerChoice.create('a', question5.id)
q5b = AnswerChoice.create('b', question5.id)
q5c = AnswerChoice.create('c', question5.id)
q5d = AnswerChoice.create('d', question5.id)
