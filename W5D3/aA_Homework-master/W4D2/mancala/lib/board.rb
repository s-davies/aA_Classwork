require "byebug"
class Board
  attr_accessor :cups, :name1, :name2

  def initialize(name1, name2)
    @name1, @name2 = name1, name2
    @cups = Array.new(14) {Array.new}
    self.place_stones
  end

  def place_stones
    # helper method to #initialize every non-store cup with four stones each
    (0..12).each do |idx|
      4.times {self.cups[idx] << :stone} unless idx == 6
    end
  end

  def valid_move?(start_pos)
    raise 'Invalid starting cup' unless start_pos.between?(0,13)
    raise 'Starting cup is empty' if self.cups[start_pos].empty?
  end

  def make_move(start_pos, current_player_name)
    i = start_pos + 1
    until self.cups[start_pos].empty?
      if current_player_name == self.name1
        if i == 12 || i == 13
          i = 0
        else
          stone = self.cups[start_pos].shift
          self.cups[i] << stone
          i += 1
        end
      else
        if i == 6
          i += 1
        elsif i == 5
          stone = self.cups[start_pos].shift
          self.cups[i] << stone
          i += 2
        elsif i == 13
          stone = self.cups[start_pos].shift
          self.cups[i] << stone
          i = 0
        else
          stone = self.cups[start_pos].shift
          self.cups[i] << stone
          i += 1
        end
      end
    end
    render
    nidx = i == 0 ? 13 : i - 1
    next_turn(nidx, current_player_name)
  end

  def next_turn(ending_cup_idx, current_player_name)
    # debugger
    # helper method to determine whether #make_move returns :switch, :prompt, or ending_cup_idx
    return :prompt if (self.name1 == current_player_name && ending_cup_idx == 6) || (self.name2 == current_player_name && ending_cup_idx == 13)
    return :switch if self.cups[ending_cup_idx].length == 1
    ending_cup_idx
  end

  def render
    print "      #{self.cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{self.cups[13].count} -------------------------- #{self.cups[6].count}"
    print "      #{self.cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    self.cups[0..5].all? {|cup| cup.empty?} || self.cups[7..12].all? {|cup| cup.empty?}
  end

  def winner
    case self.cups[6] <=> self.cups[13]
    when 1
      return self.name1
    when 0
      return :draw
    when -1
      return self.name2
    end
  end
end
