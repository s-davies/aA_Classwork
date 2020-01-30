require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "GET#index" do
    it "renders users index page" do
      get :index
      expect(response).to render_template(:index)
    end
  end

  describe "GET#show" do
    it "renders user show page" do
      get :show, params: {id: 1}
      expect(response).to redirect_to(user_url(params[:id]))
    end
  end

   describe "GET#edit" do
    it "renders user edit form" do
      get :edit
      expect(response).to render_template(:edit)
    end
  end
  
  describe "PATCH#update" do
    context "when given valid params" do
      let(:user_params) do {
        user: {
          username: "tableman",
          password: "12345678"
        }
      } end
      
      it "should redirect to the users show page" do
        patch :update, params: user_params
        user = User.find_by(username: "tableman")
        expect(response).to redirect_to(user_url(user))
      end

    end

    context "when given invalid params" do
      let(:user_params) do {
        user: {
          username: "random",
          password: ""
        }
      } end

      it "should render edit template with errors" do
        patch :update, params: user_params
        expect(response).to render(:edit)
        expect(flash.now[:errors]).to be_present
      end

    end
  end
  describe "GET#edit" do
    it "renders user edit form" do
      get :edit
      expect(response).to render_template(:edit)
    end
  end
  
  describe "POST#create" do
    context "when given valid params" do
      let(:user_params) do {
        user: {
          username: "tableman",
          password: "12345678"
        }
      } end

      # it "should login user" do
      #   post :create, params: user_params

      # end
      
      it "should redirect to the users show page" do
        post :create, params: user_params
        user = User.find_by(username: "tableman")
        expect(response).to redirect_to(user_url(user))
      end

    end

    context "when given invalid params" do
      let(:user_params) do {
        user: {
          username: "random",
          password: ""
        }
      } end

      it "should render new template with errors" do
        post :create, params: user_params
        expect(response).to render(:new)
        expect(flash.now[:errors]).to be_present
      end

    end

  end

  describe "GET#new" do
    it "renders new user form" do
      get :new
      expect(response).to render_template(:new)
    end
  end

  describe "GET#edit" do
    it "renders user edit form" do
      get :edit
      expect(response).to render_template(:edit)
    end
  end
  
  describe "PATCH#update" do
    context "when given valid params" do
      let(:user_params) do {
        user: {
          username: "tableman",
          password: "12345678"
        }
      } end
      
      it "should redirect to the users show page" do
        patch :update, params: user_params
        user = User.find_by(username: "tableman")
        expect(response).to redirect_to(user_url(user))
      end

    end

    context "when given invalid params" do
      let(:user_params) do {
        user: {
          username: "random",
          password: ""
        }
      } end

      it "should render edit template with errors" do
        patch :update, params: user_params
        expect(response).to render(:edit)
        expect(flash.now[:errors]).to be_present
      end

    end


  end

end
