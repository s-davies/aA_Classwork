class ApplicationController < ActionController::Base
  helper_method :current_user

  
  def current_user
    return nil if session[:session_token].nil? 
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    session[:session_token] = user.reset_session_token! 
  end

  def require_login
    unless logged_in?
      redirect_to new_session_url
    end
  end

  def logout! 
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  
end
