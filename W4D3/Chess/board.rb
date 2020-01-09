require_relative "piece"
require_relative "nullpiece.rb"
require_relative 'knight.rb'
require_relative 'pawn.rb'
require_relative 'queen.rb'
require_relative 'rook.rb'
require_relative 'king.rb'
require_relative 'bishop.rb'

class Board

    attr_reader :chess_board

    def initialize
        @chess_board = Array.new(8) {Array.new(8){NullPiece.instance}}
    end

    def fill_board
        self.chess_board.each_with_index do |sub,sub_idx|
            if sub_idx == 1 
                sub.map!.with_index { |space, i| space = Pawn.new(:black, self, [sub_idx,i]) }
            end
            if sub_idx == 6 
                sub.map!.with_index { |space, i| space = Pawn.new(:white, self, [sub_idx,i]) }
            end
            if sub_idx == 0 
                sub.map!.with_index do |space, i|
                    if i == 0 || i == 7 
                        space = Rook.new(:black, self, [sub_idx, i] )
                    elsif i == 1 || i == 6 
                        space = Knight.new(:black, self, [sub_idx, i] )
                    elsif i == 2 || i == 5 
                        space = Bishop.new(:black, self, [sub_idx, i] )
                    elsif i == 3 
                        space = Queen.new(:black, self, [sub_idx, i] )
                    elsif i == 4 
                        space = King.new(:black, self, [sub_idx, i] )
                    end
                end
            end
            if sub_idx == 7
                sub.map!.with_index do |space, i|
                    if i == 0 || i == 7 
                        space = Rook.new(:white, self, [sub_idx, i] )
                    elsif i == 1 || i == 6 
                        space = Knight.new(:white, self, [sub_idx, i] )
                    elsif i == 2 || i == 5 
                        space = Bishop.new(:white, self, [sub_idx, i] )
                    elsif i == 3 
                        space = Queen.new(:white, self, [sub_idx, i] )
                    elsif i == 4 
                        space = King.new(:white, self, [sub_idx, i] )
                    end
                end
            end
        end
    end
    def move_piece(start_pos,end_pos)
        piece = self[start_pos]
        self[end_pos] = piece
        piece.pos = end_pos 
        self[start_pos] = NullPiece.instance 
    end

    def [](pos)
        row, col = pos
        @chess_board[row][col]
    end

    def []=(pos, value)
        row, col = pos
        @chess_board[row][col] = value 
    end

    def checkmate?(color)
        in_check?(color) && safe_moves(color).empty?
    end

    def safe_moves(color)
        opposite_color_moves = []
        self.chess_board.each_with_index do |row, row_idx|
            row.each_with_index do |piece, piece_idx|
                v_moves = piece.valid_moves
                opposite_color_moves += v_moves if piece.color != color
            end
        end
        uniq_opp = opposite_color_moves.uniq
        king = find_king(color)
        safe_moves = Hash.new {|h,k| h[k] = []}
        king.valid_moves.each do |move|
            if !uniq_opp.include?(move)
                safe_moves[king.pos] << move
            end
        end
        safe_moves
    end

    def in_check?(color)
        king = find_king(color)
        king_pos = king.pos
        self.chess_board.each_with_index do |row, row_idx|
            row.each_with_index do |piece, piece_idx|
                
                return true if piece.valid_moves.include?(king_pos) && piece.color != color #probably don't need second half of statement
            end
        end
        false
        #need to fix when moving a piece in front of the king would save him from check
    end

    def find_king(color)
        self.chess_board.each_with_index do |row, row_idx|
            row.each_with_index do |piece, piece_idx|
                return piece if piece.is_a?(King) && piece.color == color
            end
        end
    end

end