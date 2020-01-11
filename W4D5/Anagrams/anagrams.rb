def first_anagram?(word1, word2)
  word1_a = word1.split("").permutation.to_a
  word1_map = word1_a.map {|perm| perm.join("")}
  word1_map.include?(word2)
end
#O(n!)
# p first_anagram?("gizmo", "sally")    #=> false
# p first_anagram?("elvis", "lives")    #=> true

def second_anagram?(word1, word2)
  word2_arr = word2.split("")
  word1.each_char do |char|
    idx = word2_arr.find_index(char)
    return false if idx.nil?
    word2_arr.delete_at(idx)
  end
  return true if word2_arr.empty?
end
#O(n ^ 3)
# p second_anagram?("gizmo", "sally")    #=> false
# p second_anagram?("elvis", "lives")    #=> true

def third_anagram?(word1, word2)
  word1.split("").sort == word2.split("").sort
end

p third_anagram?("gizmo", "sally")    #=> false
p third_anagram?("elvis", "lives")    #=> true

def fourth_anagram?(word1, word2)
  hash = Hash.new(0)
  word1.each_char {|char| hash[char] += 1}
  # word2.each_char do |char|
  #   return false if hash[char] < 1
  #   hash[char] -= 1
  # end
  # true
  word2.each_char {|char| hash[char] -= 1}
  hash.values.all? {|val| val == 0}
end

p fourth_anagram?("gizmo", "sally")    #=> false
p fourth_anagram?("elvis", "lives")    #=> true