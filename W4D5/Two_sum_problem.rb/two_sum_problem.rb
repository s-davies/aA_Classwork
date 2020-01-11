def bad_two_sum?(arr, target_sum)
  (0...arr.length).each do |i|
    (i+1...arr.length).each do |j|
      return true if arr[i] + arr[j] == target_sum
    end
  end
  false
end

# arr = [0, 1, 5, 7]
# p bad_two_sum?(arr, 6) # => should be true
# p bad_two_sum?(arr, 10) # => should be false
require "byebug"
def okay_two_sum?(arr, target_sum)
  sorted = arr.sort
  sorted.each_with_index do |num,idx|
    search = sorted.bsearch_index {|x| x == target_sum - num}
    return true if !search.nil? && idx != search
  end
  false
end

# arr = [0, 1, 5, 7]
# p okay_two_sum?(arr, 6) # => should be true
# p okay_two_sum?(arr, 10) # => should be false

def good_two_sum?(arr, target_sum)
  hash = Hash.new
  arr.each do |ele|
    return true if hash[target_sum - ele]
    hash[ele] = true
  end
  false
end

arr = [0, 1, 5, 7]
p good_two_sum?(arr, 6) # => should be true
p good_two_sum?(arr, 10) # => should be false