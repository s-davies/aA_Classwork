require_relative "piece"
require_relative "move_modules"
class Bishop < Piece
    include Slideable

    def symbol
        
        if self.color.downcase == :white
            "♗"    
        else
            "♝"
        end
    end

    protected

    def move_dirs
        DIAGONAL_DIRS
    end
end