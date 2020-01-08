class Employee

    attr_reader :name, :salary, :title
    attr_accessor :boss

    def initialize(name, salary, title, boss)
        @name = name
        @salary = salary
        @title = title
        @boss = boss
    end

    def bonus(multiplier)
        bonus = salary * multiplier
    end


end