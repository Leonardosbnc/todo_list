class AddDescriptionToTodos < ActiveRecord::Migration[7.2]
  def change
    add_column :todos, :description, :text
  end
end
