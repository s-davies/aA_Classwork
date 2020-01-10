# require_relative "game"
require 'colorize'
class Display
    attr_reader :board
    def initialize(board)
        @board = board
    end

    def render
        puts "   0  1  2  3  4  5  6  7"
        self.board.chess_board.each_with_index do |row, row_idx|
            print row_idx.to_s + " "
            if row_idx.even?
                row.each_with_index do |piece, s_idx|
                    if s_idx.even?
                        if piece.selected
                            print (" " + piece.symbol + " ").colorize(:color => :red, :background => :light_black)
                        else
                            print (" " + piece.symbol + " ").colorize( :background => :light_black)
                        end
                    else
                        if piece.selected
                            print (" " + piece.symbol + " ").colorize(:color => :red, :background => :light_magenta)
                        else
                            print (" " + piece.symbol + " ").colorize( :background => :light_magenta)
                        end
                    end
                end
            else
                row.each_with_index do |piece, s_idx|
                    if s_idx.odd?
                        if piece.selected
                            print (" " + piece.symbol + " ").colorize(:color => :red, :background => :light_black)
                        else
                            print (" " + piece.symbol + " ").colorize( :background => :light_black)
                        end
                    else
                        if piece.selected
                            print (" " + piece.symbol + " ").colorize(:color => :red, :background => :light_magenta)
                        else
                            print (" " + piece.symbol + " ").colorize( :background => :light_magenta)
                        end
                    end
                end
            end
            puts
        end
        nil
    end
end