require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    # ...
    self.class_name.constantize
  end

  def table_name
    # ...
    self.class_name.camelcase.downcase + "s"
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    # ...
    self.foreign_key = options.has_key?(:foreign_key) ? options[:foreign_key] : "#{name}_id".to_sym
    self.primary_key = options.has_key?(:primary_key) ? options[:primary_key] : "id".to_sym
    self.class_name = options.has_key?(:class_name) ? options[:class_name] : "#{name}".singularize.camelcase
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
  # ...
  # debugger
  self.foreign_key = options.has_key?(:foreign_key) ? options[:foreign_key] : "#{self_class_name.underscore}_id".to_sym
  self.primary_key = options.has_key?(:primary_key) ? options[:primary_key] : "id".to_sym
  self.class_name = options.has_key?(:class_name) ? options[:class_name] : "#{name}".singularize.camelcase
  # debugger
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    # ...
    opts = BelongsToOptions.new(name, options)
    define_method(name) do
      fk = opts.foreign_key
      mc = opts.model_class
      pk = opts.primary_key
      mc.where(pk => self.send(fk)).first
    end
    # debugger
    self.assoc_options[name] = opts
    # debugger
  end

  def has_many(name, options = {})
    # ...
    opts = HasManyOptions.new(name, self.name.to_s.downcase, options)
    define_method(name) do
      fk = opts.foreign_key
      mc = opts.model_class
      pk = opts.primary_key

      mc.where(fk => self.send(pk))
    end
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
    if @assoc.nil?
      @assoc = {}
    else
      @assoc
    end
  end
end

class SQLObject
  # Mixin Associatable here...
  extend Associatable
end
