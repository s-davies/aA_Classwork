# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Bench.destroy_all
Bench.create(description: "App Academy", lat: 37.799010, lng: -122.401458)
Bench.create(description: "Safeway", lat: 37.796895, lng: -122.398594)
Bench.create(description: "Chipotle", lat: 37.794270, lng: -122.397457)