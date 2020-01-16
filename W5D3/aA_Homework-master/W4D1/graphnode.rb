require "byebug"
class GraphNode
    attr_accessor :val, :neighbors

    def initialize(val)
        self.val = val
        self.neighbors = []
    end

    
end

# a = GraphNode.new('a')
# b = GraphNode.new('b')
# c = GraphNode.new('c')
# d = GraphNode.new('d')
# e = GraphNode.new('e')
# f = GraphNode.new('f')
# a.neighbors = [b, c, e]
# c.neighbors = [b, d]
# e.neighbors = [a]
# f.neighbors = [e]

def bfs(starting_node, target_value)
    visited = Set.new()
    queue = [starting_node]
    until queue.empty?
        dequeued = queue.shift
        return dequeued if dequeued.val == target_value
        visited.add(dequeued)
        dequeued.neighbors.each do |neighbor|
            queue << neighbor unless visited.include?(neighbor)
        end
    end
    nil
end