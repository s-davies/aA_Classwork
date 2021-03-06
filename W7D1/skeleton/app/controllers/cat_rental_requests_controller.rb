class CatRentalRequestsController < ApplicationController


  before_action :redirect_if_logged_out, only: [:new, :create, :edit, :update]
  before_action :find_requests, only: [:edit, :update]
 

  def redirect_if_logged_out
    if !logged_in?
      redirect_to new_session_url  
    end
  end

  def find_requests
      if !current_user.requests.find(params[:id])
        redirect_to cats_url
      end
   
  end

  def approve
    current_cat_rental_request.approve!
    redirect_to cat_url(current_cat)
  end

  def create
    @rental_request = CatRentalRequest.new(cat_rental_request_params)
    @rental_request.user_id = current_user.id
    if @rental_request.save
      redirect_to cat_url(@rental_request.cat)
    else
      flash.now[:errors] = @rental_request.errors.full_messages
      render :new
    end
  end

  def deny
    current_cat_rental_request.deny!
    redirect_to cat_url(current_cat)
  end

  def new
    @rental_request = CatRentalRequest.new
  end

  private

  def current_cat_rental_request
    @rental_request ||=
      CatRentalRequest.includes(:cat).find(params[:id])
  end

  def current_cat
    current_cat_rental_request.cat
  end

  def cat_rental_request_params
    params.require(:cat_rental_request).permit(:cat_id, :end_date, :start_date, :status)
  end
end
