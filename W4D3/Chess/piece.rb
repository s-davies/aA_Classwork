require "colorize"
require 'byebug'
class Piece
    attr_reader :color, :board, :pos
    attr_accessor :selected
    def initialize(color,board,pos)
        @color, @board, @pos = color, board, pos
        @selected = false
    end

    def pos=(val)
        @pos = val
    end

    def move_dirs
        #dummy_method
    end
end