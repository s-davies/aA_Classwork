require_relative 'p04_linked_list'

class HashMap

  include Enumerable

  attr_accessor :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    @store[key.hash%num_buckets].include?(key)
  end

  def set(key, val)
    resize! if self.count == num_buckets
    if self.include?(key)
      ll_bucket = @store[key.hash%num_buckets]
      ll_bucket.each {|node| node.val = val if node.key == key}
    else
      ll_bucket = @store[key.hash%num_buckets]
      ll_bucket.append(key, val)
      self.count += 1
    end
  end

  def get(key)
    ll_bucket = @store[key.hash%num_buckets]
    ll_bucket.get(key)
  end

  def delete(key)
    ll_bucket = @store[key.hash%num_buckets]
    ll_bucket.remove(key)
    self.count -= 1
  end

  def each(&prc)
    @store.each do |ll|
      ll.each {|node| prc.call(node.key, node.val)}
    end
  end

  # uncomment when you have Enumerable included
  def to_s
    pairs = inject([]) do |strs, (k, v)|
      strs << "#{k.to_s} => #{v.to_s}"
    end
    "{\n" + pairs.join(",\n") + "\n}"
  end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    @store.length
  end

  def resize!
    prev_store = @store.dup
    @store = Array.new(num_buckets*2) { LinkedList.new}
    prev_store.each do |ll|
      ll.each do |node|
        ll_bucket = @store[node.key.hash%num_buckets]
        ll_bucket.append(node.key, node.val)
      end
    end
  end

  def bucket(key)
    # optional but useful; return the bucket corresponding to `key`
  end
end
