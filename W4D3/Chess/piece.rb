
require 'byebug'
class Piece
    attr_reader :color, :board, :pos
    def initialize(color,board,pos)
        @color, @board, @pos = color, board, pos
    end

    def pos=(val)
        @pos = val
    end

    def move_dirs
        #dummy_method
    end
end