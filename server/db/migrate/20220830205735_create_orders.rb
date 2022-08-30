class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.string :address, null: false
      t.string :status, null: false
      t.references :assignee, foreign_key: { to_table: :users }
      t.references :requester, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
