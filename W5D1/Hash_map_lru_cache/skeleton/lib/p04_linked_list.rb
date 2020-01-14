require "byebug"
class Node
  attr_reader :key
  attr_accessor :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end

  def remove
    # optional but useful, connects previous link to next link
    # and removes self from list.
  end
end

class LinkedList
  include Enumerable

  def initialize
    @head = Node.new
    @tail = Node.new
    @head.next = @tail
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @head.next
  end

  def last
    @tail.prev
  end

  def empty?
    @head.next == @tail
  end

  def get(key)
    self.each {|node| return node.val if node.key == key}
    nil
  end

  def include?(key)
    self.each {|node| return true if node.key == key}
    false
  end

  def append(key, val)
    node = Node.new(key, val)
    @tail.prev.next = node
    node.prev = @tail.prev
    @tail.prev = node
    node.next = @tail
    node
  end

  def update(key, val)
    return nil unless self.include?(key)
    self.each {|node| node.val = val if node.key == key}
  end

  def remove(key)
    return nil unless self.include?(key)
    current_node = nil
    self.each {|node| current_node = node if node.key == key}
    current_node.prev.next = current_node.next
    current_node.next.prev = current_node.prev
  end

  def each(&prc)
    # debugger
    current_node = @head.next
    until current_node == @tail
      prc.call(current_node)
      current_node = current_node.next
    end
  end

  # uncomment when you have `each` working and `Enumerable` included
  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
