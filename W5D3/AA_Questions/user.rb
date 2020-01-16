require_relative 'questions'
require_relative 'question'
require "byebug"
class User
  attr_accessor :id, :fname, :lname

  def self.all
    data = QuestionDBConnection.instance.execute("SELECT * FROM users")
    data.map { |datum| User.new(datum) }
  end

  def self.find_by_id(id)
    data = QuestionDBConnection.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        users
      WHERE
        id = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| User.new(datum) }.first
  end

  def self.find_by_name(fname, lname)
    data = QuestionDBConnection.instance.execute(<<-SQL, fname, lname)
      SELECT
        *
      FROM
        users
      WHERE
        fname = ? AND lname = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| User.new(datum) }.first
  end

  def followed_questions
    QuestionFollow.followed_questions_for_user_id(self.id)
  end

  def authored_questions
    Question.find_by_author_id(self.id)
  end

   def authored_replies
    Reply.find_by_user_id(self.id)
  end

  def liked_questions
    QuestionLike.liked_questions_for_user_id(self.id)
  end

  def average_karma
    quests = self.authored_questions
    sum = 0
    quests.each do |q|
      sum += q.num_likes
    end
    sum / quests.length.to_f
  end

  def initialize(options)
    @id = options['id']
    @fname = options['fname']
    @lname = options['lname']
  end

  def save
    if self.id.nil?
      self.create
    else
      self.update
    end
  end

  def create
    raise "#{self} already in database" if self.id
    QuestionDBConnection.instance.execute(<<-SQL, self.fname, self.lname)
      INSERT INTO
        users (fname, lname)
      VALUES
        (?, ?)
    SQL
    self.id = QuestionDBConnection.instance.last_insert_row_id
  end

  def update
    raise "#{self} not in database" unless self.id
    QuestionDBConnection.instance.execute(<<-SQL, self.fname, self.lname, self.id)
      UPDATE
        users
      SET
        fname = ?, lname = ?
      WHERE
        id = ?
    SQL
  end
end

