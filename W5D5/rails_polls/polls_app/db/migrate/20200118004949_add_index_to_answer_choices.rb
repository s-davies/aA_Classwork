class AddIndexToAnswerChoices < ActiveRecord::Migration[5.2]
  def change
    remove_index "question_id", name: "index_answer_choices_on_question_id"
    add_index :answer_choices, [:question_id, :choice], unique: true
  end
end
