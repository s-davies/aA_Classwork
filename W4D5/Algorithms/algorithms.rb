# O(n ^ 2)
def my_min_phase_1(list)
  (0...list.length).each do |i|
    return list[i] if list.all? {|el| list[i] <= el}
  end
end

# list = [ 0, 3, 5, 4, -5, 10, 1, 90 ]
# p my_min_phase_1(list)

# O(n)
def my_min_phase_2(list)
  min = list[0]
  (1...list.length).each do |i|
    min = list[i] if list[i] < min
  end
  min
end

# p my_min_phase_2(list)
#O(n ^ 3)
def largest_contiguous_subsum1(list)
  greatest_sum = -1.0/0.0
  (0...list.length).each do |i|
    (i...list.length).each do |j|
      greatest_sum = list[i..j].sum if greatest_sum < list[i..j].sum
    end
  end
  greatest_sum
end

#O(n ^ 3)
def largest_contiguous_subsum2(list)
  sub_array = []
  (0...list.length).each do |i|
    (i...list.length).each do |j|
      sub_array << list[i..j]
    end
  end
  sub_array.max_by {|arr| arr.sum}.sum
end

list = [2, 3, -6, 7, -6, 7]
# p largest_contiguous_subsum(list) # => 8 (from [7, -6, 7])

# list = [-5, -1, -3]
# p largest_contiguous_subsum2(list) # => -1 (from [-1])
require "byebug"

def largest_contiguous_subsum3(list)
  greatest_sum = -1.0/0.0
  sum = 0
  
  (0...list.length).each do |i|
    sum = sum >= 0 ? sum + list[i] : list[i]
    greatest_sum = [greatest_sum, sum].max
  end
  greatest_sum

end

p largest_contiguous_subsum3(list) # => -1 (from [-1])