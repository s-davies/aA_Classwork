json.array! @benches do |bench|
  json.extract! bench, :description, :lat, :lng
end
# let b1 = {description: "nowhere", lat: 37.01, lng: -122.3};
# $.ajax({
#   method: 'POST',
#   url: '/api/benches',
#   data: {bench}
# })