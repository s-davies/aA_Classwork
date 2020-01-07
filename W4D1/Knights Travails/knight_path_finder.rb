require_relative "00_tree_node.rb"
require "byebug"
class KnightPathFinder

    attr_reader :start_pos, :root_node

    def self.valid_moves(pos)
        x, y = pos
        moves = { top_left: [x-1, y-2],
         top_right: [x+1, y-2],
         mid_top_right: [x+2, y-1],
         mid_bottom_right: [x+2, y+1],
         bottom_right: [x+1, y+2],
         bottom_left: [x-1, y+2],
         mid_bottom_left: [x-2, y+1],
         mid_top_left: [x-2, y-1] 
        }
        v_moves = []
        moves.each do |k, v|
            v_moves << v if v.first.between?(0,7) && v.last.between?(0,7)
        end
        v_moves
    end

    def initialize(start_pos)
        @start_pos = start_pos
        @root_node = PolyTreeNode.new(start_pos)
        @considered_positions = Array.new(@start_pos)
        build_move_tree
    end
   
   def new_move_positions(pos)
        moves = KnightPathFinder.valid_moves(pos).select { |p| !@considered_positions.include?(p) }
   end

   def build_move_tree
        queue = [self.root_node]
        until queue.empty?
            result = queue.shift
            result_pos = result.value
            new_positions = self.new_move_positions(result_pos)
            new_positions.each do |n|
                node = PolyTreeNode.new(n)
                result.add_child(node)
                result.children << node
                @considered_positions << node.value
                queue << node
            end
        end
   end

   def find_path(end_pos)
        queue = [self.root_node]
        until queue.empty?
            result = queue.shift
            break if result.value == end_pos
            queue += result.children
        end
        trace_path_back(result)
   end



   def trace_path_back(found_node)
       path = [found_node.value]
        par = found_node
        until par.parent.nil?
            path << par.parent.value
            par = par.parent
        end
        path.reverse
   end

end