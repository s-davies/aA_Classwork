require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.
require "byebug"
class SQLObject
  def self.columns
    # ...
    if @columns.nil?
      data = DBConnection.execute2(<<-SQL)
        SELECT
          *
        FROM
          #{self.table_name}
      SQL
      @columns = data.first.map(&:to_sym)
    end
    @columns
  end

  def self.finalize!
    self.columns.each do |column|
      define_method(column) do
        attributes[column]
      end
      setter = "#{column}=".to_sym
      define_method(setter) do |val|
        attributes[column] = val
      end
    end
  end

  def self.table_name=(table_name)
    # ...
    @table_name = table_name
  end

  def self.table_name
    # ...
    @table_name = self.to_s.tableize if @table_name.nil?
    @table_name
  end

  def self.all
    # ...
    data = DBConnection.execute(<<-SQL)
        SELECT
          *
        FROM
          #{self.table_name}
      SQL
    self.parse_all(data)
  end

  def self.parse_all(results)
    # ...
    objs = []
    results.each do |hash|
      # debugger
      objs << self.new(hash)
    end
    objs
  end

  def self.find(id)
    # ...
    data = DBConnection.execute(<<-SQL, id)
        SELECT
          *
        FROM
          #{self.table_name}
        WHERE
          id = ?
      SQL
    self.parse_all(data).first
  end

  def initialize(params = {})
    # ...
    params.each do |attr_name,value|
      atts = attr_name.to_sym
      raise "unknown attribute '#{attr_name}'" unless self.class.columns.include?(atts)
      attseq = "#{attr_name}=".to_sym
      self.send(attseq, value)
    end
  end

  def attributes
    # ...
    @attributes = {} if @attributes.nil?
    @attributes
  end

  def attribute_values
    # ...
    self.class.columns.map do |column|
      self.send(column)
    end
  end

  def insert
    # ...
    col_names = self.class.columns.map(&:to_s).join(",")
    question_marks = (["?"] * self.class.columns.length).join(",")
    vals = self.attribute_values
    data = DBConnection.execute(<<-SQL, *vals)
        INSERT INTO
          #{self.class.table_name} (#{col_names})
        VALUES
          (#{question_marks})
      SQL
      # debugger
    self.id = DBConnection.last_insert_row_id
  end

  def update
    # ...
    col_names = self.class.columns.map {|attr_name| "#{attr_name.to_s} = ?"}.join(",")
    question_marks = (["?"] * self.class.columns.length).join(",")
    vals = self.attribute_values
    data = DBConnection.execute(<<-SQL, *vals, self.id)
        UPDATE
          #{self.class.table_name}
        SET
          #{col_names}
        WHERE
          id = ?
      SQL
  end

  def save
    # ...
    self.id.nil? ? self.insert : self.update
  end
end
