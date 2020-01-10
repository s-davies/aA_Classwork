require "tdd_practice"

describe "TDD_Practice" do
  describe Array do
    describe "#my_uniq" do
      
      it "returns a new array containing only unique elements" do
        expect([1, 2, 1, 3, 3].my_uniq ).to eq([1,2,3])
        expect([4, 4, -4, -1, -1, 2, "word", "word", :sym, :sym, :sym].my_uniq).to eq([4, -4, -1, 2, "word", :sym])
      end

      context "when given an empty array" do
        it "returns empty array" do
          expect([].my_uniq).to eq([])
        end
      end

      it "doesn't mutate self" do
        arr = [1, 2, 1, 3, 3]
        arr.my_uniq
        expect(arr).to eq([1, 2, 1, 3, 3])
      end
    end

    describe "#to_sum" do
      it "returns all pairs of positions where the elements at those positions sum to zero" do
        expect([-1, 0, 2, -2, 1].two_sum).to eq([[0, 4], [2, 3]])
        expect([].two_sum).to eq([])
        expect([1, 2, 3, 4, 5].two_sum).to eq([])
      end

      
    end

  end

  describe "#my_transpose" do
    before(:each) do
      expect_any_instance_of(Array).not_to receive(:transpose)
    end
    it "it converts between row and column representations of a 2d array" do
      expect(my_transpose([[0, 1, 2],[3, 4, 5],[6, 7, 8]])).to eq([[0, 3, 6],[1, 4, 7],[2, 5, 8]])
      expect(my_transpose([[0, 1],[3, 4]])).to eq([[0, 3],[1, 4]])
    end

    it "doesn't mutate self" do
        arr = [[0, 1],[3, 4]]
        my_transpose(arr)
        expect(arr).to eq([[0, 1],[3, 4]])
    end

  end

  describe "#stock_picker" do
    it "returns an array of indices that correspond to buy then sell" do
      expect(stock_picker([5,20,30,10,40])).to eq([0,4])
    end

    context "when there are multiple days with the same profitability" do
      it "chooses the earliest buy and sell dates" do
        expect(stock_picker([10,20,30,10,40])).to eq([0,4])
        expect(stock_picker([10,20,40,30,10,40])).to eq([0,2])
        expect(stock_picker([10,20,40,5,10,35])).to eq([0,2])
      end
    end
    
    context "when it is not profitable" do
      it "returns an empty array" do
        expect(stock_picker([10,9,8,7])).to eq([])
        expect(stock_picker([10,10,9,8,7])).to eq([])
        expect(stock_picker([10,10,10])).to eq([])
      end
    end

  end
end