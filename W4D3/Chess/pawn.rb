require_relative "piece"
class Pawn < Piece
    def symbol
        if self.color.downcase == :white
            "♙".white
        else
            "♟".black
        end
    end

    def move_dirs
        forward_steps + side_attacks
    end

    def valid_moves
        if self.color == :white && self.pos.first == 6
            v_moves = []
            starting_row_moves = [[5,self.pos.last], [4,self.pos.last]]
            starting_row_moves.each do |move|
                if move.first == 5 && board[move] == NullPiece.instance
                    v_moves << move
                elsif move.first == 4 && board[move] == NullPiece.instance && board[[5,self.pos.last]] == NullPiece.instance
                    v_moves << move
                end
            end
            side_attacks.each do |position|
                new_pos = [self.pos.first+position.first, self.pos.last+position.last]
                h, v = new_pos
                if (h.between?(0,7) && v.between?(0,7)) && (board[new_pos] != NullPiece.instance && board[new_pos].color != self.color)
                    v_moves << new_pos
                end
            end
        elsif self.color == :black && self.pos.first == 1
            v_moves = []
            starting_row_moves = [[2,self.pos.last], [3,self.pos.last]]
            starting_row_moves.each do |move|
                if move.first == 2 && board[move] == NullPiece.instance
                    v_moves << move
                elsif move.first == 3 && board[move] == NullPiece.instance && board[[2,self.pos.last]] == NullPiece.instance
                    v_moves << move
                end
            end
            side_attacks.each do |dir|
                new_pos = [self.pos.first+dir.first, self.pos.last+dir.last]
                h, v = new_pos
                if (h.between?(0,7) && v.between?(0,7)) && (board[new_pos] != NullPiece.instance && board[new_pos].color != self.color)
                    v_moves << new_pos
                end
            end
        else
            v_moves = []
            forward_steps.each do |dir|
                new_pos = [self.pos.first+dir.first, self.pos.last+dir.last]
                h, v = new_pos
                if (h.between?(0,7) && v.between?(0,7)) && (board[new_pos] == NullPiece.instance)
                    v_moves << new_pos
                end
            end
            side_attacks.each do |dir|
                new_pos = [self.pos.first+dir.first, self.pos.last+dir.last]
                h, v = new_pos
                if (h.between?(0,7) && v.between?(0,7)) && (board[new_pos] != NullPiece.instance && board[new_pos].color != self.color)
                    v_moves << new_pos
                end
            end
        end
        v_moves
    end

    private

    def at_start_row?
        if (self.pos.first == 1 && self.color == :black) || (self.pos.first == 6 && self.color == :white)
            return true
        end
        false
    end

    def forward_dir
        # return 1 if self.color == "white"
        # return -1 if self.color == "black"
        self.color == :white ? -1 : 1
    end

    def forward_steps
        forward_dir == 1 ? [[1,0]] : [[-1,0]]
    end

    def side_attacks
        self.color == :white ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]]
    end

    

end