class CreatePostShares < ActiveRecord::Migration[5.2]
  def change
    create_table :post_shares do |t|
      t.bigint :sub_id
      t.bigint :post_id

      t.timestamps
    end

    add_index :post_shares, :sub_id
    add_index :post_shares, :post_id
  end
end
