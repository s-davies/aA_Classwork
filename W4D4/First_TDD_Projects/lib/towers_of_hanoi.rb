class Hanoi
  attr_reader :size, :towers
  def initialize(size = 3)
    @size = size
    @towers = Array.new(size) {Array.new}
    @towers[0] += (1..@size).to_a
  end
end