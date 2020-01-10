require "byebug"
class Array
  def my_uniq
    new_arr = []
    self.each do |ele|
      new_arr << ele if !new_arr.include?(ele)
    end
    new_arr
  end

  def two_sum
    pairs = []
    (0...self.length-1).each do |i|
      (i+1...self.length).each do |j|
        pairs << [i,j] if self[i] + self[j] == 0
      end
    end
    pairs
  end
end

def my_transpose(twoD_array)
  new_arr = []
  (0...twoD_array.length).each do |i|
    sub_arr = []
    twoD_array.each do |sub|
      sub_arr << sub[i]
    end
    new_arr << sub_arr
  end
  new_arr
end

def stock_picker(arr_prices)
  profitable_days = {}
  (0...arr_prices.length - 1).each do |i|
    (i + 1...arr_prices.length).each do |j|
      profitable_days[[i,j]] = arr_prices[j] - arr_prices[i]  if arr_prices[i] < arr_prices[j]
    end
  end
  most_profitable = profitable_days.sort_by {|k,v| [-v, k.first, k.last]}
  return most_profitable.first.first unless most_profitable.empty?
  most_profitable
end