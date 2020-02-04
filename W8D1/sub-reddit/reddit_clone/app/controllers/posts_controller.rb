class PostsController < ApplicationController

  def show
    @post = Post.find_by(id: params[:id])
    render :show
  end

  def destroy
  end

  def new
    @post = Post.new 
    @subs = Sub.all
    render :new 
  end

  def create
    @subs = Sub.all
    @post = Post.new(post_params)
    @post.author_id = current_user.id
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new 
    end
  end

  def edit
    @post = Post.find_by(id: params[:id])
    @subs = Sub.all
    if @post
      render :edit
    else
      flash[:errors] = ["Post doesn't exist"]
      redirect_to subs_url
    end
  end

  def update
    @post = Post.find_by(id: params[:id])
    @subs = Sub.all
    if @post && @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit 
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :content, sub_ids: [])
  end
end
