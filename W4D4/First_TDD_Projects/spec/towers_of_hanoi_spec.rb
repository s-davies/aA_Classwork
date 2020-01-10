require "towers_of_hanoi"

describe Hanoi do
  subject(:game) {Hanoi.new(4)}

  describe "#initialize" do
    it "should take size" do
      expect(game.size).to eq(4)
    end

    context "when no size is given" do
      it "should set size to 3" do
        expect(Hanoi.new.size).to eq (3)
      end
    end

    it "should initialize a two-d array with unique sub-arrays" do
      arr = [[1,2,3,4],[],[],[]]
      expect(game.towers).to eq(arr)
      arr1 = [[1,2,3,4,5],[],[],[]]
      game.towers[0] << 5
      expect(game.towers).to eq(arr1)
    end
  end



end