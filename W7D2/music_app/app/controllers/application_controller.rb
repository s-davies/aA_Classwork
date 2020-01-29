class ApplicationController < ActionController::Base

    helper_method :current_user

    def current_user
        return nil if session[:session_token].nil?
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def log_in_user!(user)
        if !logged_in?
            user.reset_session_token!
            session[:session_token] = user.session_token
        end
    end

    def ensure_logged_in
        if !logged_in?
            redirect_to new_session_url
        end
    end
end
