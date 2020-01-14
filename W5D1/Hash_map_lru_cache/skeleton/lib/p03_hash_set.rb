class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    resize! if self.count == @store.length 
    unless self.include?(key)
       self[key] << key
      @count += 1
    end
  end

  def include?(key)
    self[key].include?(key)
  end

  def remove(key)
    if self.include?(key)
      self[key].delete(key)
      @count -= 1
    end
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    @store[num.hash%num_buckets]
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
