require_relative "piece"
require_relative "nullpiece.rb"
require_relative 'knight.rb'
require_relative 'pawn.rb'
require_relative 'queen.rb'
require_relative 'rook.rb'
require_relative 'king.rb'
require_relative 'bishop.rb'
require "byebug"
class Board

    attr_reader :chess_board
    attr_accessor :last_killed, :last_killed_pos

    def initialize
        @chess_board = Array.new(8) {Array.new(8){NullPiece.instance}}
        @last_killed = NullPiece.instance
        @last_killed_pos = nil
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
        self.last_killed_pos = start_pos
        self.last_killed = self[end_pos]
        self[end_pos] = piece
        piece.pos = end_pos 
        self[start_pos] = NullPiece.instance 
    end

    def undo_move_piece(start_pos, end_pos)
        piece = self[end_pos]
        self[start_pos] = piece
        piece.pos = start_pos
        self[end_pos] = self.last_killed
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
        s_moves = []
        self.chess_board.each_with_index do |row, row_idx|
            row.each_with_index do |piece, piece_idx|
                if piece.color == color
                    v_moves = piece.valid_moves
                    v_moves.each do |v_move|
                        self.move_piece(piece.pos, v_move)
                        s_moves << v_move unless in_check?(color)
                        self.undo_move_piece(self.last_killed_pos, v_move)
                    end
                end
            end
        end
        s_moves
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
    end

    def find_king(color)
        self.chess_board.each_with_index do |row, row_idx|
            row.each_with_index do |piece, piece_idx|
                return piece if piece.is_a?(King) && piece.color == color
            end
        end
    end

end