# == Schema Information
#
# Table name: answer_choices
#
#  id          :bigint           not null, primary key
#  choice      :text             not null
#  question_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class AnswerChoice < ApplicationRecord
  validates :choice, :question_id, presence: true
end
