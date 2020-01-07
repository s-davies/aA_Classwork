require_relative 'tic_tac_toe'
require "byebug"
class TicTacToeNode
  attr_reader :board, :next_mover_mark, :prev_move_pos
  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(evaluator)
      opposite_mark = evaluator == :x ? :o : :x

      return true if self.board.over? && self.board.winner == opposite_mark
      return false if self.board.over? && (self.board.winner == evaluator || self.board.winner.nil?)

      ch = self.children

      return ch.any? { |child| child.losing_node?(evaluator) }

  end
    
    def winning_node?(evaluator)
      opposite_mark = evaluator == :x ? :o : :x
  
      return true if self.board.over? && self.board.winner == evaluator
      return false if self.board.over? && (self.board.winner == opposite_mark || self.board.winner.nil?)

      ch = self.children
      return ch.all? { |child| child.winning_node?(evaluator) }

    end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    ch = []
    self.board.rows.each_with_index do |row, row_idx|
      row.each_with_index do |col, col_idx|
        pos = [row_idx, col_idx]
        if self.board.empty?(pos)
          duped_board = self.board.rows.map {|r| r.map { |s| s.dup }}
          duped_board[row_idx][col_idx] = next_mover_mark
          new_board = Board.new(duped_board)
          n_mover_mark = ((next_mover_mark == :x) ? :o : :x)
          p_move_pos = pos
          new_node = TicTacToeNode.new(new_board, n_mover_mark, p_move_pos)
          ch << new_node
        end
      end
    end

    ch
  end
end
