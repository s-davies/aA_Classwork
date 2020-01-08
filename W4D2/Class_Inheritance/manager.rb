require_relative 'employee.rb'
require "byebug"
class Manager < Employee

    attr_reader :employees 
    def initialize(name, salary, title, boss, employees) #employees an array that holds all of the employees under the manager
        super(name,salary,title,boss)
        @employees = employees
    end

    def bonus(multiplier)
        # debugger
        total_salaries = 0 
        total_employees = 0 
        queue = employees.dup #if we are mutating employee array later-----look here for possible bug?
        until queue.empty?
            current_employee = queue.shift
            total_salaries += current_employee.salary
            total_employees += 1 
            queue += current_employee.employees if current_employee.is_a?(Manager)
        end
        total_salaries * multiplier
    end

            

end

david = Employee.new('david', 10_000, 'ta', 'darren')
shawna = Employee.new('shawna', 12_000, 'ta', 'darren')
darren = Manager.new('darren', 78_000, 'ta manager', 'ned', [shawna, david])
ned = Manager.new('ned', 1_000_000, 'founder', nil, [darren])

david.boss = darren 
shawna.boss = darren 
darren.boss = ned 
