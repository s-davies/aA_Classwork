require_relative "board"
class Game
    attr_reader :board
    def initialize(size = 10)
        @board = Board.new(size)
    end

    def self.play
        puts "Welcome to minesweeper. Enter a board size:"
        begin
            size = gets.chomp.to_i
            self.check_size(size)
        rescue StandardError => exception
            puts exception
            retry
        end
        game = Game.new(size)
        until game.board.over?
            puts "#{game.board.num_flags_rem.to_s} bombs remaining"
            game.board.print
            game.get_position
        end
        game.board.print
        if game.board.won?
            puts "You win!"
        else
            puts "BOOOOOOOM!!!!!"
        end
    end

    def self.check_size(size)
        raise "Too small. Enter a board size larger than 1" if size < 2
    end

    def get_position
        begin
            puts "Enter a coordinate to change in the form 'row col'"
            pos = gets.chomp
            parsed = parse_pos(pos)
        rescue StandardError => exception
            puts exception
            retry
        end
        self.make_move(parsed)
    end

    def parse_pos(pos)
        arr = pos.split(" ").map(&:to_i)
        raise "Not a valid position" if arr.length != 2 || !self.board.valid_pos?(arr)
        arr
    end

    def make_move(pos)
        begin
            puts "Enter r to reveal position, f to flag position, or c to change positions"
            input = gets.chomp
            if input.downcase == "r"
                self.board.clear_adj_tiles(pos)
            elsif input.downcase == "f"
                self.board.flag_tile(pos)
            elsif input.downcase == "c"
                self.get_position
            else
                raise "Invalid command"
            end
        rescue StandardError => exception
            puts exception
            retry
        end
    end
end

Game.play