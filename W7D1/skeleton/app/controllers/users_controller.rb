class UsersController < ApplicationController
    before_action :redirect_if_logged_in, only: [:new]
    
    def index
        @users = User.all
        render :index
    end

    def show 
        @user = User.find(params[:id])

        if @user 
            render :show
        else    
            redirect_to users_url  
        end    
    end

    def new
        @user = User.new
        render :new
    end

    def create 
        @user = User.new(user_params)

        if @user.save
            login(@user)
        else    
            render :new
        end

    end

    def user_params
        params.require(:user).permit(:user_name, :password)
    end

end
