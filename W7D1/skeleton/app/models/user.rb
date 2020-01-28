# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  user_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'bcrypt'
class User < ApplicationRecord
    attr_reader :password
    validates :user_name, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: { message: 'Password can\'t be blank' }

    after_initialize :ensure_session_token

    def reset_session_token!
        self.update!(session_token: SecureRandom.urlsafe_base64(16))
        self.session_token
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
       BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.find_by_credentials(user_name, password)
        user = User.find_by(user_name: user_name)
        user && user.is_password?(password) ? user : nil
    end

    def ensure_session_token
        self.session_token = SecureRandom.urlsafe_base64(16)
    end

    has_many :cats,
        foreign_key: :user_id,
        class_name: :Cat

    has_many :requests,
        foreign_key: :user_id,
        class_name: :CatRentalRequest

end
