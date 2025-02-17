class CreateTodos < ActiveRecord::Migration[7.2]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :status, :default => "pending"
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
