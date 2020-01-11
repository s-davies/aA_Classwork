require_relative "my_stack"
class StackQueue

  def initialize
    @stack1 = MyStack.new
    @stack2 = MyStack.new
  end

  def size
    @stack1.length
  end

  def empty?
    @stack1.empty?
  end

  def enqueue(val)
    @stack1.push(val)
    until @stack2.empty?
      @stack1.push(@stack2.pop)
    end
    @stack1.push
  end

  def dequeue
    until @stack1.empty?
      @stack2.push(@stack1.pop)
    end
    @stack2.pop
  end

end