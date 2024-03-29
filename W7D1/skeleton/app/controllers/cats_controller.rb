class CatsController < ApplicationController
  before_action :redirect_if_logged_out, only: [:new, :create, :edit, :update]
  before_action :find_cat, only: [:edit, :update]
 

  def redirect_if_logged_out
    if !logged_in?
      redirect_to new_session_url  
    end
  end

  def find_cat 
      if !current_user.cats.find(params[:id])
        redirect_to cats_url
      end
   
  end

  def index
    @cats = Cat.all
    render :index
  end

  def show
    @cat = Cat.find(params[:id])
    render :show
  end

  def new
    @cat = Cat.new
    render :new
  end

  def create
    @cat = Cat.new(cat_params)
    @cat.user_id = current_user.id
    if @cat.save
      redirect_to cat_url(@cat)
    else
      flash.now[:errors] = @cat.errors.full_messages
      render :new
    end
  end

  def edit
    @cat = Cat.find(params[:id])
    render :edit
  end

  def update
    @cat = Cat.find(params[:id])
    if @cat.update_attributes(cat_params)
      redirect_to cat_url(@cat)
    else
      flash.now[:errors] = @cat.errors.full_messages
      render :edit
    end
  end

  private

  def cat_params
    params.require(:cat).permit(:age, :birth_date, :color, :description, :name, :sex)
  end
end
