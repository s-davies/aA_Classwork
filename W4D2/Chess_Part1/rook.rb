require_relative "piece"
require_relative "move_modules"
class Rook < Piece
    include Slideable
    attr_reader :color
    def initialize(color,board,pos)
        super
    end

    def symbol
        if self.color.downcase == "white"
            "♖"
        else
            "♜"
        end
    end

    protected

    def move_dirs
        HORIZONTAL_DIRS
    end
end