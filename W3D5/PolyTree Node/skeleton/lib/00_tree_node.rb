require "byebug"
class PolyTreeNode
    attr_reader :value, :parent, :children
    def initialize(value)
        @value = value
        @parent = nil
        @children = []
    end

    def parent=(node)
        # debugger
        
        old_parent = self.parent
        old_parent.children.delete(self) if !old_parent.nil?
        @parent = node
        if !node.nil?
            node.children << self unless node.children.include?(self)
        end

    end

    def add_child(child)
        child.parent = self
    end

    def remove_child(child)
        raise "node is not a child" if !self.children.include?(child)
        child.parent = nil
        self.children.delete(child)
    end

    def dfs(target)
        return self if target == self.value
        self.children.each do |child|
            result = child.dfs(target)
            return result if !result.nil?
        end
        nil
    end

    def bfs(target)
        queue = [self]
        until queue.empty?
            result = queue.shift
            return result if target == result.value
            queue += result.children
        end
        nil
    end

end
