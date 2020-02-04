class SubsController < ApplicationController
  before_action :require_login 
  before_action :require_author, only: [:edit, :update, :destroy]  

  def show
    @sub = Sub.find_by(id: params[:id])
    if @sub 
      render :show 
    else
      redirect_to subs_url
    end
  end

  def index
    @subs = Sub.all 
    render :index 
  end

  def edit
    @sub = Sub.find_by(id: params[:id])
    if @sub 
      render :edit 
    else
      redirect_to subs_url
    end
  end

  def update
    @sub = Sub.find_by(id: params[:id])
    if @sub && @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :edit
    end
  end

  def new
    @sub = Sub.new
    render :new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.moderator_id = current_user.id
    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def destroy
    @sub = Sub.find_by(id: params[:id])
    if @sub
      @sub.destroy
    end
    redirect_to subs_url
  end

  private

  def require_author
    @sub = Sub.find_by(id: params[:id])
    if @sub 
      if (current_user.id != @sub.moderator_id)
        flash[:errors] = ["Only the moderator can modify."]
        redirect_to subs_url 
      end
    else
      flash[:errors] = ["Sub does not exist."]
      redirect_to subs_url
    end
  end

  def sub_params
    params.require(:sub).permit(:title, :description)
  end

end
