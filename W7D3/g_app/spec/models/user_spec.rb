require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it { should validate_presence_of(:username)}
  it { should validate_length_of(:password).is_at_least(6)}
  it { should validate_uniqueness_of(:username)}
  subject(:user) {User.create(username: "tableman", password: "12345678")}

  describe "User::find_by_credentials" do
    context "when credentials are valid" do
      it "should return user" do
        new_user = User.create(username: "tableman", password: "12345678")
        expect(User.find_by_credentials("tableman", "12345678")).to eq(new_user)
      end
    end

    context "when credentials are invalid" do
      it "should return nil" do
        new_user = User.create(username: "tableman", password: "12345678")
        expect(User.find_by_credentials("tableman", "random")).to eq(nil)
      end
    end
  end
  
  describe "User#password=" do
    it "sets a new password_digest" do
      new_user = User.create(username: "tableman", password: "12345678")
      pd = new_user.password_digest
      new_user.password = "hellothere"
      expect(new_user.password_digest).to_not eq(pd)
    end
  end

  describe "User#is_password?" do
    context "when given valid password" do
      it "returns true" do
        # new_user = User.create(username: "tableman", password: "12345678")
        expect(user.is_password?("12345678")).to eq(true)
      end
    end

    context "when given invalid password" do
      it "returns true" do
        # new_user = User.create(username: "tableman", password: "12345678")
        expect(user.is_password?("randompass")).to eq(false)
      end
    end

  end

  describe "User#reset_session_token!" do
    it "resets the user's session token" do
      st = user.session_token
      expect(user.reset_session_token!).to_not eq(st)
    end
  end

  describe "User#ensure_session_token" do
    context "when the user doesn't have a session token" do
      it "assigns a new session token to the user" do
        expect(user.session_token).to_not eq(nil)
      end
    end

    context "when the user has a session token" do
      it "doesn't assign a new session token" do
        st = user.session_token
        user.update(username: "steve")
        expect(user.session_token).to eq(st)
      end
    end
  end
end
