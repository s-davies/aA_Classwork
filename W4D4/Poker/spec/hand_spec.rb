require_relative "hand.rb"

describe Hand do
  # let(:js) {double("js", :get_val => 10, :get_suit => "♤")}
  # let(:js) {double("js")}
  # let(:js) {double("js")}
  # let(:js) {double("js")}
  # let(:js) {double("js")}
  subject(:hand) {Hand.new([:js,])}
  describe "#find_hand_value" do
    high_card_hand = Hand.new([:js,]
    expect(find_hand_value(hand.cards)).to eq(1) #high card
    expect(find_hand_value(hand.cards)).to eq(2) #one pair
    expect(find_hand_value(hand.cards)).to eq(3) #two pair
    expect(find_hand_value(hand.cards)).to eq(4) #three of a kind
    expect(find_hand_value(hand.cards)).to eq(5) #straight
    expect(find_hand_value(hand.cards)).to eq(6) #flush
    expect(find_hand_value(hand.cards)).to eq(7) #full house
    expect(find_hand_value(hand.cards)).to eq(8) #four of a kind
    expect(find_hand_value(hand.cards)).to eq(9) #straight flush
    expect(find_hand_value(hand.cards)).to eq(10) #royal flush
  end
  
end