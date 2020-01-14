class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    sum_string = ""
    self.each do |ele|
      sum_string += ele.hash.abs.to_s
    end
    sum_string.to_i.hash
  end
end

class String
  def hash
    self.bytes.hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    sorted = self.to_a.sort
    sorted.hash
  end
end
