class SessionsController < ApplicationController

    before_action :redirect_if_logged_in, only: [:new]

    def new  
        # debugger
        render :new
    end

    def create 
        user = User.find_by_credentials(params[:user][:user_name], params[:user][:password]) 
        login(user)
    end

    def destroy
        current_user.reset_session_token! if current_user
        session[:session_token] = nil
        redirect_to new_session_url
    end

end
