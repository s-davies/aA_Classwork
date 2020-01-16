require 'rspec'
require 'dessert'

=begin
Instructions: implement all of the pending specs (the `it` statements without blocks)! Be sure to look over the solutions when you're done.
=end

describe Dessert do
  let(:chef) { double("chef", :titleize => "Buddy") }
  subject(:dessert) { Dessert.new("Cake", 3, chef)}

  describe "#initialize" do
    it "sets a type" do
      expect(dessert.type).to eq("Cake")
    end

    it "sets a quantity" do
      expect(dessert.quantity).to eq(3)
    end

    it "starts ingredients as an empty array" do
      expect(dessert.ingredients).to eq([])
    end

    it "raises an argument error when given a non-integer quantity" do
      expect { Dessert.new("Cake", "3", chef) }.to raise_error(ArgumentError)
    end
  end

  describe "#add_ingredient" do
    before(:each) do
      dessert.add_ingredient("eggs")
    end
    it "adds an ingredient to the ingredients array" do
      expect(dessert.ingredients).to include("eggs")
    end
  end

  describe "#mix!" do
    before(:each) do
      dessert.add_ingredient("eggs")
      dessert.add_ingredient("flour")
      dessert.add_ingredient("sugar")
      dessert.add_ingredient("icing")
      dessert.add_ingredient("chocolate")
      dessert.add_ingredient("vanilla")
      dessert.add_ingredient("sprinkles")
      dessert.add_ingredient("milk")
    end
    it "shuffles the ingredient array" do
      ingredients = dessert.ingredients.dup
      expect(dessert.mix!).to_not eq(ingredients)
    end
  end

  describe "#eat" do
    before(:each) do
      dessert.eat(2)
    end
    it "subtracts an amount from the quantity" do
      expect(dessert.quantity).to eq(1)
    end

    it "raises an error if the amount is greater than the quantity" do
      expect {dessert.eat(5)}.to raise_error("not enough left!")
    end
  end

  describe "#serve" do
    it "contains the titleized version of the chef's name" do
      expect(dessert.serve).to include("Buddy")
    end
  end

  describe "#make_more" do
    it "calls bake on the dessert's chef with the dessert passed in" do
      expect(chef).to receive(:bake).with(dessert)
      dessert.make_more
    end
  end
end
