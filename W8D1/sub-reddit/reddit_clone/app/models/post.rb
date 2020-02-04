class Post < ApplicationRecord
  validates :title, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  has_many :comments, dependent: :destroy

  has_many :post_shares, dependent: :destroy, inverse_of: :post

  has_many :subs, through: :post_shares, source: :sub
end
