class PostShares < ActiveRecord::Migration[5.2]
  def change
    add_index :post_shares, [:post_id, :sub_id], unique: true
  end
end
