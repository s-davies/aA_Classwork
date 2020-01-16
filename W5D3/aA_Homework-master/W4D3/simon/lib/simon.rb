require "colorize"
class Simon
  COLORS = %w(red blue green yellow)

  attr_accessor :sequence_length, :game_over, :seq

  def initialize
    @sequence_length = 1
    @game_over = false
    @seq = []
  end

  def play
    puts "Welcome to Simon!"
    until self.game_over
      self.take_turn
    end
    self.game_over_message
    self.reset_game
  end

  def take_turn
    self.show_sequence
    self.require_sequence
    unless self.game_over
      self.round_success_message
      self.sequence_length += 1
    end
  end

  def show_sequence
    puts "Hit enter to begin the next sequence:"
    input = gets.chomp
    system("clear")
    self.add_random_color
    self.seq.each do |color|
      case color
      when "red"
        puts color.red
      when "blue"
        puts color.blue
      when "green"
        puts color.green
      when "yellow"
        puts color.yellow
      end
      sleep(0.75)
      system("clear")
      sleep(0.25)
    end
  end

  def require_sequence
    self.seq.each do |color|
      puts "Enter a color and hit enter. Do this until the sequence is complete."
      input = gets.chomp
      unless color == input.downcase
        self.game_over = true
        break
      end
      system("clear")
    end
  end

  def add_random_color
    self.seq << COLORS.sample
  end

  def round_success_message
    puts "You got the colors correct!"
  end

  def game_over_message
    puts "Sorry, that was an incorrect color. Game over!"
  end

  def reset_game
    self.sequence_length = 1
    self.game_over = false
    self.seq = []
  end
end

game = Simon.new
game.play