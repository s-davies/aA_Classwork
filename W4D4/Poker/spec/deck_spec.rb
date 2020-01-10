require "deck"
require "byebug"

describe Deck do
  subject(:our_deck) {Deck.new}
  let(:card) {double("card")}
  
  describe "#initialize" do
    it "calls Deck#populate to build a deck" do
      deck = Deck.allocate
      expect(deck).to receive(:populate)
      deck.send(:initialize)
    end
  end

  describe "#populate" do
    it "creates and array of 52 elements" do
      expect(our_deck.deck.length).to eq(52)
    end

    it "should populate @deck with card instances" do
      expect(our_deck.deck.first).to eq(card)
    end
  end

  describe "#shuffle!" do

    it "should randomize cards and mutate the deck" do
      our_cards = our_deck.deck.dup
      our_deck.shuffle!
      expect(our_deck.deck).to_not eq(our_cards)
    end

    it "should still contain all 52 cards but in random order" do
      our_cards = our_deck.deck.dup
      our_deck.shuffle!
      expect(our_deck.deck.length).to eq(our_cards.length)
    end

  end

end