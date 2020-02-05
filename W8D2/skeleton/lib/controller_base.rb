require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require 'active_support/inflector'
require 'byebug'
class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res)
    @req = req
    @res = res
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    res['location'] = url
    res.redirect(url, status=302)
    if already_built_response?
      raise
    else
      @already_built_response = true
    end
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    res['Content-Type'] = content_type
    res.write(content)
    if already_built_response?
      raise
    else
      @already_built_response = true
    end
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)

    view_temp = "#{template_name}.html.erb"

    controller_name = ActiveSupport::Inflector.underscore(self.class.to_s)
    fpath = File.join("views", controller_name, view_temp)
    f_cont = File.read(fpath)
    erb_cont = ERB.new(f_cont).result(binding)
    render_content(erb_cont,"text/html")
  end

  # method exposing a `Session` object
  def session
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
  end
end

