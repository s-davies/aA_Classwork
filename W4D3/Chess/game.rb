require_relative "board.rb"
require_relative "player"
require_relative "display"
require "byebug"
class Game
    attr_reader :board, :display, :player1, :player2
    attr_accessor :current_player, :previous_player
    def initialize(player1,player2)
        @board = Board.new 
        @board.fill_board
        @display = Display.new(@board)
        @player1 = player1
        @player2 = player2
        @current_player = player1
        @previous_player = player2
    end

    def self.play
        puts "Welcome to chess!"
        player1 = Player.new(:white)
        player2 = Player.new(:black)
        game = Game.new(player1,player2)
        b = game.board
        d = game.display
        until b.checkmate?(:white) || b.checkmate?(:black)
            d.render
            game.get_start_pos
            
            
            
            game.switch_turn
        end
        d.render
        puts "Checkmate! #{game.previous_player.color.to_s.capitalize} wins!"
    end

    def get_start_pos
        begin
            puts "#{self.current_player.color.to_s.capitalize}'s turn. Enter a position in the form 'row col' to access a piece"
            input = gets.chomp
            self.valid_start_pos?(input, self.current_player.color)
            start_pos = input.split(" ").map(&:to_i)
            piece = self.board[start_pos]
        rescue StandardError => exception
            puts exception
            retry
        end
        self.get_end_pos(start_pos, piece)
    end

    def get_end_pos(start_pos, piece)
        out_of_check_moves = {}
        if self.board.in_check?(self.current_player.color) && !self.board.checkmate?(self.current_player.color)
            out_of_check_moves = self.board.safe_moves(self.current_player.color)
        end
        begin
            puts "Enter end position in the form 'row col' to move. Enter c to switch pieces"
            input_pos = gets.chomp
            if input_pos == "c"
                self.get_start_pos
            else
                self.valid_end_pos?(input_pos, piece, out_of_check_moves)
                pos_end = input_pos.split(" ").map(&:to_i)
                self.board.move_piece(start_pos, pos_end)
            end
        rescue StandardError => exception
            puts exception
            retry
        end
    end

    def switch_turn
        self.current_player = self.current_player == self.player1 ? self.player2 : self.player1
        self.previous_player = self.previous_player == self.player1 ? self.player2 : self.player1
    end

    def valid_start_pos?(pos, color)
        arr = pos.split(" ")
        h, v = arr
        raise "This position is not on the board" unless (h.to_i.between?(1,7) || h == "0") && (v.to_i.between?(1,7) || v == "0") && ((h+v).length == 2)
        raise "No piece in this position" if self.board[arr.map(&:to_i)] == NullPiece.instance
        raise "This is not your piece" if self.board[arr.map(&:to_i)].color != color
    end

    def valid_end_pos?(pos, piece, king_v_moves)
        arr = pos.split(" ")
        h, v = arr
        raise "This position is not on the board" unless (h.to_i.between?(1,7) || h == "0") && (v.to_i.between?(1,7) || v == "0") && ((h+v).length == 2)
        raise "Not a legal move" unless piece.valid_moves.include?(arr.map(&:to_i))
        if self.board.in_check?(self.current_player.color) && !self.board.checkmate?(self.current_player.color)
            if !out_of_check_moves[piece.pos].include?(arr.map(&:to_i))
                raise "This move doesn't move the king out of check"
            end
        end
    end

end

Game.play