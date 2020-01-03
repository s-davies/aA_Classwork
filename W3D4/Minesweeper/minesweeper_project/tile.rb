class Tile
    attr_accessor :is_bomb, :value, :flagged, :revealed
    
    def initialize(is_bomb = false)
        @revealed = false
        @is_bomb = is_bomb
        @flagged = false
        @value = nil
    end
    
end