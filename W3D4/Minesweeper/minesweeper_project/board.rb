require "colorize"
require_relative "tile"
class Board
    attr_reader :size, :grid

    def initialize(size)
        @size = size
        @grid = Array.new(size) {Array.new(size) {Tile.new}}
        self.populate_bombs
        self.populate_values
    end

    def populate_bombs
        (size+1).times do 
            pos_x = rand(0...size)
            pos_y = rand(0...size)
            pos = [pos_x, pos_y]
            
            while contains_bomb?(pos)
                pos_x = rand(0...size)
                pos_y = rand(0...size)
                pos = [pos_x, pos_y]
            end

            self[pos].bomb = true
        end
    end
    
    def populate_values
        grid.each_with_index do |row, x|
            row.each_with_index do |tile, y|
                count = 0
                
                hash = {
                    top_left:[x-1,y-1],
                    top:[x-1,y],
                    top_right:[x-1, y+1],
                    right:[x, y+1],
                    bottom_right:[x+1, y+1],
                    bottom:[x+1, y],
                    bottom_left:[x+1, y-1],
                    left:[x, y-1]
                     }

                hash.each do |k, v|
                    if valid_pos?(v)
                        count += 1 if self[v].bomb
                    end
                end

                tile.value = count
            end
        end
    end

    def cheat_print
        grid.each do |row|
            printed_row = row.map do |tile|
                if tile.bomb
                    tile.value.to_s.red
                else
                    tile.value.to_s
                end
            end.join(" ")
            puts printed_row
        end
        nil
    end
    
    def print
        grid.each do |row|
            printed_row = row.map do |tile|
                if tile.bomb && tile.revealed
                    '*'.red
                elsif tile.revealed
                    tile.value.to_s
                else
                    '#'
                end
            end.join(' ')
            puts printed_row
        end
        nil
    end

    def valid_pos?(pos)
        x, y = pos
        x.between?(0, size-1) && y.between?(0, size-1)
    end  

    def contains_bomb?(pos)
        self[pos].bomb
    end

    def [](pos)
        x, y = pos
        grid[x][y]
    end
    
    def []=(pos, value)
        x, y = pos
        grid[x][y] = value
    end
end