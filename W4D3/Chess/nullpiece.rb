require_relative "piece"
require 'singleton'
class NullPiece < Piece
    include Singleton
    attr_reader :symbol
    def initialize
        @color = nil
        @symbol = " " 
    end
    def valid_moves
        []
    end
end