class MaxIntSet
  attr_reader :store
  
  def initialize(max)
    @max = max
    @store = Array.new(max, false)
  end

  def insert(num)
    raise "Out of bounds" if num > @max || num < 0
    @store[num] = true
  end

  def remove(num)
    @store[num] = false
  end

  def include?(num)
    @store[num] == true
  end

  private

  def is_valid?(num)
  end

  def validate!(num)
  end
end


class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    @store[num%num_buckets] << num unless self.include?(num)
  end

  def remove(num)
    @store[num%num_buckets].delete(num)
  end

  def include?(num)
    @store[num%num_buckets].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    resize! if self.count == @store.length 
    unless self.include?(num)
      @store[num%num_buckets] << num
      @count += 1
    end
  end

  def remove(num)
    if self.include?(num)
      @store[num%num_buckets].delete(num)
      @count -= 1
    end
  end

  def include?(num)
    @store[num%num_buckets].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end

  def resize!
    prev_store = @store.dup
    @store = Array.new(num_buckets*2) { Array.new }
    prev_store.each do |bucket|
      bucket.each do |ele| 
        self.insert(ele)
        @count -= 1
      end
    end
  end
end
