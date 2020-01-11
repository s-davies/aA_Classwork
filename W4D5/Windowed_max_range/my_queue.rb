class MyQueue

  def initialize
    @store = []
  end

  def enqueue(val)
    @store << val
  end

  def dequeue
    @store.shift
  end

  def peek
    @store.first
  end

  def empty?
    @store.empty?
  end

  def size
    @store.length
  end

end