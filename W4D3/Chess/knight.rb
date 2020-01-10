require_relative 'piece.rb'
require_relative "move_modules"
class Knight < Piece 
    include Stepable
    def symbol
        if self.color.downcase == :white
            "♘".white
        else
            "♞".black
        end
    end
    
    def move_dirs 
        [[1,-2],
        [1,2],
        [-1,-2],
        [-1,2],
        [2,-1],
        [2,1],
        [-2,-1],
        [-2,1]]
    end
end