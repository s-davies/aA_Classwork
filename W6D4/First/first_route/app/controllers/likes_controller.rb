class LikesController < ApplicationController
  def index
    if params.has_key?(:user_id)
      likes = Like.where('user_id = ?', "#{params[:user_id]}")
    elsif params.has_key?(:comment_id)
      likes = Like.where("likeable_type = 'Comment' AND likeable_id = ?", "#{params[:comment_id]}")
    elsif params.has_key?(:artwork_id)
      likes = Like.where("likeable_type = 'Artwork' AND likeable_id = ?", "#{params[:artwork_id]}")
    end
    render json: likes
  end
end
