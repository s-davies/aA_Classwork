class AddSubmitterIdToShortenedUrls < ActiveRecord::Migration[5.2]
  def change
    add_column :shortened_urls, :submitter_id, :integer
    add_index :shortened_urls, :submitter_id
  end
end
