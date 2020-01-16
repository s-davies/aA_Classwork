require_relative 'questions'
class Reply
  attr_accessor :id, :body, :question_id, :parent_reply_id, :user_id

  def self.all
    data = QuestionDBConnection.instance.execute("SELECT * FROM replies")
    data.map { |datum| Reply.new(datum) }
  end

  def self.find_by_id(id)
    data = QuestionDBConnection.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        replies
      WHERE
        id = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| Reply.new(datum) }.first
  end

  def self.find_by_user_id(user_id)
    data = QuestionDBConnection.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        replies
      WHERE
        user_id = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| Reply.new(datum) }.first
  end

  def self.find_by_question_id(question_id)
    data = QuestionDBConnection.instance.execute(<<-SQL, question_id)
      SELECT
        *
      FROM
        replies
      WHERE
        question_id = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| Reply.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @body = options['body']
    @question_id = options['question_id']
    @parent_reply_id = options['parent_reply_id']
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
    QuestionDBConnection.instance.execute(<<-SQL, self.body, self.user_id, self.question_id, self.parent_reply_id)
      INSERT INTO
        replies (body, user_id, question_id, parent_reply_id)
      VALUES
        (?, ?, ?, ?)
    SQL
    self.id = QuestionDBConnection.instance.last_insert_row_id
  end

  def update
    raise "#{self} not in database" unless self.id
    QuestionDBConnection.instance.execute(<<-SQL, self.body, self.user_id, self.question_id, self.parent_reply_id, self.id)
      UPDATE
        replies
      SET
        body = ?, user_id = ?, question_id = ?, parent_reply_id = ?
      WHERE
        id = ?
    SQL
  end

  def author
    User.find_by_id(self.user_id)
  end

  def question 
    Question.find_by_id(self.question_id)
  end

  def parent_reply
    Reply.find_by_id(self.parent_reply_id)
  end

  def child_replies
    data = QuestionDBConnection.instance.execute(<<-SQL, self.id)
      SELECT
        *
      FROM
        replies
      WHERE
        parent_reply_id = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| Reply.new(datum) }
  end

end

