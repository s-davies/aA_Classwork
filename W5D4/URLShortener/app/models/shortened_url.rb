class ShortenedUrl < ApplicationRecord
  validates :long_url, presence: true
  validates :short_url, presence: true, uniqueness: true

  belongs_to :submitter,
    primary_key: :id,
    class_name: :User,
    foreign_key: :submitter_id

  def self.random_code
    short = SecureRandom::urlsafe_base64
    while self.exists?(short_url: short)
      short = SecureRandom::urlsafe_base64
    end
    short
  end

  def self.create_short_url(user, long)
    short = self.random_code
    self.create!(long_url: long, short_url: short, submitter_id: user.id)
  end
end
