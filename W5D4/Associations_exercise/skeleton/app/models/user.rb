# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  has_many :enrollments,
    primary_key: :id,
    class_name: :Enrollment,
    foreign_key: :student_id

  has_many :courses, through: :enrollments, source: :course

  has_many :taught_classes,
    primary_key: :id,
    class_name: :Course,
    foreign_key: :instructor_id
end