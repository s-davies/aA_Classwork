require_relative "piece"
require_relative "move_modules"
class Queen < Piece
    include Slideable

    def symbol
        if self.color.downcase == :white
            "♕".white    
        else
            "♛".black
        end
    end

    protected

    def move_dirs
        HORIZONTAL_DIRS + DIAGONAL_DIRS
    end
end