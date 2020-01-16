require_relative 'questions'
require_relative 'user'
class QuestionLike
  attr_accessor :id, :user_id, :question_id

  def self.all
    data = QuestionDBConnection.instance.execute("SELECT * FROM question_likes")
    data.map { |datum| QuestionLike.new(datum) }
  end

  def self.find_by_id(id)
    data = QuestionDBConnection.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        question_likes
      WHERE
        id = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| QuestionLike.new(datum) }.first
  end

  def self.likers_for_question_id(question_id)
    data = QuestionDBConnection.instance.execute(<<-SQL, question_id)
      SELECT
        *
      FROM
        users
      JOIN
        question_likes ON users.id = question_likes.user_id
      WHERE
        question_likes.question_id = ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| User.new(datum) }
  end

  def self.num_likes_for_question_id(question_id)
    data = QuestionDBConnection.instance.execute(<<-SQL, question_id)
      SELECT
        COUNT(*) AS num_likes
      FROM
      question_likes
      WHERE
        question_id = ?
      GROUP BY
      question_id
    SQL
    data.empty? ? 0 : data.first.values.first
  end

  def self.liked_questions_for_user_id(user_id)
  data = QuestionDBConnection.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
      questions
      JOIN
      question_likes ON
      questions.id = question_likes.question_id
      WHERE
      question_likes.user_id = ?   
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| Question.new(datum) }
  end

  def self.most_liked_questions(n)
    data = QuestionDBConnection.instance.execute(<<-SQL, n)
      SELECT
        *
      FROM
        questions
      JOIN
        question_likes ON questions.id = question_likes.question_id
      GROUP BY
        questions.id
      ORDER BY
        COUNT(questions.id) DESC
      LIMIT
        ?
    SQL
    raise 'nothing was found' if data.empty?
    data.map { |datum| Question.new(datum) }
  end


  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
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
    QuestionDBConnection.instance.execute(<<-SQL, self.user_id, self.question_id)
      INSERT INTO
        question_likes (user_id, question_id)
      VALUES
        (?, ?)
    SQL
    self.id = QuestionDBConnection.instance.last_insert_row_id
  end

  def update
    raise "#{self} not in database" unless self.id
    QuestionDBConnection.instance.execute(<<-SQL, self.user_id, self.question_id, self.id)
      UPDATE
        question_likes
      SET
         user_id = ?, question_id = ?
      WHERE
        id = ?
    SQL
  end
end

