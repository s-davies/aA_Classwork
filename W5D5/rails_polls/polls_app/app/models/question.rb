# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  poll_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord
  validates :body, :poll_id, presence: true
end
