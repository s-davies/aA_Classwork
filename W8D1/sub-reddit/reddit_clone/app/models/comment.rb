class Comment < ApplicationRecord
  validates :content, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :post
  
  belongs_to :parent_comment,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    optional: true

  has_many :replies,
    foreign_key: :parent_comment_id,
    class_name: :Comment,
    dependent: :destroy
end
