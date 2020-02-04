class ChangePostShares < ActiveRecord::Migration[5.2]
  def change
    remove_column :post_shares, :sub_id
    remove_column :post_shares, :post_id
    add_column :post_shares, :sub_id, :bigint, null:false
    add_column :post_shares, :post_id, :bigint, null:false
    add_index :post_shares, :sub_id
    add_index :post_shares, :post_id
  end
end
