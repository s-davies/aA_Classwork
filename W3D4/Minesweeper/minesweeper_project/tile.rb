class Tile
    attr_accessor :bomb, :value
    attr_reader :revealed
    
    def initialize(bomb = false)
        @revealed = false
        @bomb = bomb
        @value = nil
    end


    
end