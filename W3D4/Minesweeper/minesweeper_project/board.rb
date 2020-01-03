require "colorize"
require_relative "tile"
require "byebug"
class Board
    attr_accessor :num_flags_rem
    attr_reader :size, :grid

    def initialize(size)
        @size = size
        @grid = Array.new(size) {Array.new(size) {Tile.new}}
        @num_flags_rem = size + 1
        self.populate_bombs
        self.populate_values
    end

    def populate_bombs
        num_flags_rem.times do 
            pos_x = rand(0...size)
            pos_y = rand(0...size)
            pos = [pos_x, pos_y]
            
            while self[pos].is_bomb
                pos_x = rand(0...size)
                pos_y = rand(0...size)
                pos = [pos_x, pos_y]
            end

            self[pos].is_bomb = true
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
                        count += 1 if self[v].is_bomb
                    end
                end

                tile.value = count
            end
        end
    end


    def cheat_print
        grid.each do |row|
            printed_row = row.map do |tile|
                if tile.is_bomb
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
        color_hash = {1 => :blue, 2 => :green, 3 => :red, 4 => :magenta, 5 => :cyan, 6 => :yellow}
        grid.each do |row|
            printed_row = row.map do |tile|
                if tile.is_bomb && tile.revealed
                    '*'.black.on_red
                elsif tile.is_bomb && !tile.revealed && self.lost? && !tile.flagged
                    "*".red
                elsif tile.revealed && tile.value.between?(1,6)
                    tile.value.to_s.colorize(color_hash[tile.value])
                elsif tile.revealed && tile.value > 6
                    tile.value.to_s
                elsif tile.revealed && tile.value == 0
                    " "
                elsif tile.flagged
                    "F".yellow
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

    def revealable_pos?(pos)
        valid_pos?(pos) && !self[pos].revealed && !self[pos].flagged
    end

    def [](pos)
        x, y = pos
        grid[x][y]
    end
    
    def []=(pos, value)
        x, y = pos
        grid[x][y] = value
    end

    def flag_tile(pos)
        tile = self[pos]
        if !tile.flagged && !tile.revealed
            tile.flagged = true
            self.num_flags_rem -= 1
        elsif tile.flagged  && !tile.revealed
            tile.flagged = false
            self.num_flags_rem += 1
        elsif !tile.flagged && tile.revealed
            raise "You can't flag a tile that's already been revealed"
        end
    end

    def clear_adj_tiles(pos)
        reveal_tile(pos)
        x, y = pos
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
        if self[pos].value == 0
            hash.each do |k, v|
                if valid_pos?(v)
                    if !self[v].revealed && self[v].value == 0 && !self[v].is_bomb
                        clear_adj_tiles(v)
                    elsif !self[v].revealed && self[v].value > 0 && !self[v].is_bomb
                        reveal_tile(v)
                    end
                end
            end
        end

    end

    def reveal_tile(pos)
        if revealable_pos?(pos)
            self[pos].revealed = true
        elsif self[pos].revealed
            raise "Position has already been revealed"
        elsif self[pos].flagged
            raise "You can't reveal a flagged position; you must unflag it first"
        elsif !self.valid_pos?(pos)
            raise "Invalid position"
        end
    end

    def over?
        won? || lost?
    end

    def won?
        count = 0
        @grid.each do |row|
            row.each do |tile|
                count += 1 if tile.revealed && !tile.is_bomb
            end
        end
        count == (size**2) - (size+1)
    end

    def lost?
        @grid.any? do |row|
            row.any? do |tile|
                tile.revealed && tile.is_bomb
            end
        end
    end
end