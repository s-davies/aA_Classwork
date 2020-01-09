require "byebug"
module Slideable
    def valid_moves
        # debugger
        v_moves = []
        considered_pos = [] #not sure we need this
        x, y = self.pos  
        # raise 'not on board' unless x.between?(0,7) && y.between?(0,7)
        queue = [[self.pos, self.move_dirs]]
        until queue.empty?
            current = queue.shift
            current_pos = current.first
            current_dirs = current.last
            current_dirs.each do |dir|
                new_pos = [current_pos.first+dir.first, current_pos.last+dir.last]
                h, v = new_pos
                if !considered_pos.include?(new_pos) && (h.between?(0,7) && v.between?(0,7)) &&
                    (board[new_pos] == NullPiece.instance || board[new_pos].color != self.color)
                    if board[new_pos] == NullPiece.instance
                        queue << [new_pos, [dir]]
                    end
                    considered_pos << new_pos #not sure we need this
                    v_moves << new_pos
                end
            end
        end
        v_moves
    end

    private
    HORIZONTAL_DIRS = [[-1,0], [1,0],[0,-1],[0,1]]
    DIAGONAL_DIRS = [[-1,-1], [1,1], [-1,1],[1,-1]]
end

module Stepable
    def valid_moves
        v_moves = []
        move_dirs.each do |dir|
            new_pos = [self.pos.first+dir.first, self.pos.last+dir.last]
            h, v = new_pos
            if (h.between?(0,7) && v.between?(0,7)) && (board[new_pos] == NullPiece.instance || self.color != board[new_pos].color)
                v_moves << new_pos
            end
        end

        v_moves
    end
end
