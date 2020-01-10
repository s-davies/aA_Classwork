require "card"
describe Card do
  subject(:card) { Card.new("K", "♣️", 10)}
  describe "#initialize" do
    it "initializes with a face value, a suit, and a card value" do
      expect(card.face_val).to eq("K")
      expect(card.suit).to eq("♣️")
      expect(card.card_val).to eq(10)
    end
  end
  
  describe "#to_output" do
    it "should cancatanate face value and suit" do
      expect(card.to_output).to eq("K♣️")
    end
  end


end
