class Sub < ApplicationRecord
  validates :title, :description, presence: true

  belongs_to :moderator,
    foreign_key: :moderator_id,
    class_name: :User

  has_many :post_shares, dependent: :destroy, inverse_of: :sub

  has_many :posts, through: :post_shares, source: :post
end
