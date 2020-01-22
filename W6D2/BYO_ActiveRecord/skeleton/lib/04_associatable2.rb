require_relative '03_associatable'

# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options

  def has_one_through(name, through_name, source_name)
    # ...
    s = self
    define_method(:through_options) do
      s.assoc_options[through_name]
    end

    define_method(:source_options) do
      s.assoc_options[through_options.model_class]
    end
debugger
    # data = DBConnection.execute(<<-SQL, self.id)
    #     SELECT
    #       #{through_options}.*
    #     FROM
    #       #{source_options}
    #     JOIN
    #       #{through_options} ON #{through_options.foreign_key} = #{source_options.primary_key}
    #     WHERE
    #       #{source_options.id} = ?
    #   SQL
    # self.parse_all(data)

  end
end
