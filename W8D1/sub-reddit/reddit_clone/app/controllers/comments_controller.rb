class CommentsController < ApplicationController
  before_action :require_login
  before_action :require_author
  def new
    @comment = Comment.new
    render :new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    @comment.post_id = params[:post_id]
    @comment.parent_comment_id = params[:]
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def require_author
    @comment = Comment.find_by(id: params[:id])
    if @comment 
      if (current_user.id != @comment.author_id)
        flash[:errors] = ["Only the author can modify."]
        redirect_to post_url(@comment.post) 
      end
    else
      flash[:errors] = ["Comment does not exist."]
      redirect_to post_url(@comment.post)
    end
  end
end
