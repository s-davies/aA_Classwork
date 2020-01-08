require_relative "piece"
class Board

    def initialize
        @chess_board = Array.new(8) {Array.new(8)}
        @chess_board.each_with_index do |sub,sub_idx|
            if sub_idx == 0 || sub_idx == 1 || sub_idx == 6 || sub_idx == 7
                sub.map! {|space| space = Piece.new }
            end
        end
    end

    def move_piece(start_pos,end_pos)
        raise 'space empty' if self[start_pos].nil?
        x, y = end_pos  
        raise 'not on board' unless x.between?(0,7) && y.between?(0,7)
        piece = self[start_pos]
        self[end_pos] = piece 
        self[start_pos] = nil 
    end

    def [](pos)
        row, col = pos
        @chess_board[row][col]
    end

    def []=(pos, value)
        row, col = pos
        @chess_board[row][col] = value 
    end

end