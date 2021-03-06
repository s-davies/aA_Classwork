require_relative "piece"
require_relative "move_modules"

class Rook < Piece
    include Slideable

    def symbol
        if self.color.downcase == :white
            "♖".white
        else
            "♜".black
        end
    end

    protected

    def move_dirs
        HORIZONTAL_DIRS
    end
end