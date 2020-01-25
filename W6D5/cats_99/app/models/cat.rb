# == Schema Information
#
# Table name: cats
#
#  id          :bigint           not null, primary key
#  birth_date  :date             not null
#  age         :integer          not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Cat < ApplicationRecord
  COLORS = ["black", "white", "orange", "cream"]

  validates :birth_date, :color, :name, :sex, :description, presence: true
  validates :sex, inclusion: ["M", "F"]
  validates :color, inclusion: COLORS

  # attr_accessor :age
  # def initialize(cat_hash)
    
  #   # @birth_date = cat_hash[birth_date]
  #   # @color = cat_hash[color]
  #   # @name = cat_hash[name]
  #   # @sex = cat_hash[sex]
  #   # @description = cat_hash[description]
  #   ## no needs to do above
  #   # debugger
  #   days = (Time.now.to_date - cat_hash["birth_date"].to_date).to_i
  #   # @age = days / 365
  #   # self.age = @age
  #   # cat_hash["age"] = (days / 365)
  #   # super(cat_hash)
  # end
  
  def age
    days = (Time.now.to_date - birth_date.to_date).to_i 
    days / 365
  end
end
