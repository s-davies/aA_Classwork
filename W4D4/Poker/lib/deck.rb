require_relative "card.rb"
require "byebug"
# card_vals = (2..9).to_a + [10, 10, 10, 10, 11]

class Deck

  attr_reader :deck

  def initialize
    @deck = populate
  end

  def populate
    face_vals = ("2".."10").to_a + ["J", "Q", "K", "A"]
    suits = ["♡", "♢", "♧", "♤"]
    cards = []
  
    face_vals.each do |face|
      if face == "J" || face == "Q" || face == "K"
        val = 10
      elsif face == "A"
        val = 11
      else
        val = face.to_i
      end
      suits.each do |suit|
        cards << Card.new(face, suit, val)
      end
    end
    cards
  end

  def shuffle!
    self.deck.shuffle!
  end
end