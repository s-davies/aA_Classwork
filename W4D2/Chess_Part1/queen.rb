require_relative "piece"
require_relative "move_modules"
class Queen < Piece
    include Slideable
    def initialize(color,board,pos)
        super
    end

    def symbol
        if self.color.downcase == "white"
            "♕"    
        else
            "♛"
        end
    end

    protected

    def move_dirs
        HORIZONTAL_DIRS + DIAGONAL_DIRS
    end
end