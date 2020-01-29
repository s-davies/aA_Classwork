class SessionsController < ApplicationController
    before_action :redirect_if_logged_in, only: [:new]
    before_action :ensure_logged_in, only: [:destroy]
    def new
        render :new
    end

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user.nil?
            render json: 'Credentials were wrong'
        else
            @user.reset_session_token!
            session[:session_token] = @user.session_token
            redirect_to user_url(@user)
        end
    end

    def destroy
        current_user.reset_session_token!
        session[:session_token] = nil
        redirect_to users_url
    end

    def redirect_if_logged_in
        if logged_in?
            redirect_to users_url
        end
    end
end
