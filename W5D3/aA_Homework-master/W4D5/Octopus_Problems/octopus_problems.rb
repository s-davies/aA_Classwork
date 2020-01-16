def sluggish_octopus(fish)
    longest_fish = fish.first
    (0...fish.length).each do |i|
        unless fish.any? {|f| fish[i].length < f.length}
            longest_fish = fish[i]
        end
    end
    longest_fish
end

# p sluggish_octopus(['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh'])
#=> "fiiiissshhhhhh"

def dominant_octopus(fish)
    fish.sort {|a,b| a.length <=> b.length}.last
end

# p dominant_octopus(['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh'])
#=> "fiiiissshhhhhh"

def clever_octopus(fish)
    longest_fish = fish.first
    fish.each do |f|
        longest_fish = f if f.length > longest_fish.length
    end
    longest_fish
end

# p clever_octopus(['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh'])
#=> "fiiiissshhhhhh"

def slow_dance(dir, tiles_arr)
    tiles_arr.each_with_index {|tile,idx| return idx if tile == dir}
end
tiles_array = ["up", "right-up", "right", "right-down", "down", "left-down", "left",  "left-up" ]
# p slow_dance("up", tiles_array)
# > 0

# p slow_dance("right-down", tiles_array)
# > 3

def fast_dance(dir,tiles_hash)
    tiles_hash[dir]
end
tiles_hash = {"up" => 0, "right-up" => 1, "right" => 2, "right-down" => 3, "down" => 4, "left-down" => 5, "left" => 6,  "left-up" => 7 }

# p fast_dance("up", tiles_hash)
# > 0

# p fast_dance("right-down", tiles_hash)
# > 3
