class Card
  # ["♡", "♢", "♧", "♤"]

  attr_reader :face_val, :suit, :card_val
  def initialize(face_val, suit, card_val)
    @face_val, @suit, @card_val = face_val, suit, card_val
  end

  def to_output
    face_val + suit
  end

end