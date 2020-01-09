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
                        print (" " + piece.symbol + " ").colorize( :background => :white)
                    else
                        print (" " + piece.symbol + " ").colorize( :background => :black)
                    end
                end
            else
                row.each_with_index do |piece, s_idx|
                    if s_idx.odd?
                        print (" " + piece.symbol + " ").colorize( :background => :white)
                    else
                        print (" " + piece.symbol + " ").colorize( :background => :black)
                    end
                end
            end
            puts
        end
        nil
    end
end