require_relative 'piece.rb'
require_relative "move_modules"
class King < Piece
    include Stepable
    def symbol
        if self.color.downcase == :white
            "♔".white
        else
            "♚".black
        end
    end

    def move_dirs 
        [[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1]]
    end
end