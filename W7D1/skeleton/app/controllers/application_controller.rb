class ApplicationController < ActionController::Base

    helper_method :current_user

    def current_user  
        return nil if session[:session_token].nil?
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login(user)
        if user
            session[:session_token] = user.reset_session_token!
            redirect_to cats_url
        else    
            redirect_to new_session_url
        end 
    end
    
    def logged_in?
        !!current_user
    end

    def redirect_if_logged_in
        if logged_in?
            redirect_to cats_url
        end
    end
end
