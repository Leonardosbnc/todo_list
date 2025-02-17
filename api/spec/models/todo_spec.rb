require 'rails_helper'

RSpec.describe Todo, type: :model do
  it 'correctly create todo with slug' do
    user = create(:user)
    todo = Todo.create(name: 'Todo 1', user:)

    expect(todo.name).to eq("Todo 1")
    expect(todo.user_id).to eq(user.id)
    expect(todo.status).to eq("pending")
    expect(todo.slug).to eq("todo-1")
  end

  it 'cannot create with duplicated slug on user scope' do
    user = create(:user)
    first_todo = create(:todo, user:)
    user.reload
    second_todo = Todo.new(name: first_todo.name, user:)

    expect(second_todo).not_to be_valid
  end

  it 'cannot create with invalid status' do
    user = create(:user)
    todo = Todo.create(name: 'Todo 1', status: 'rand_status', user:)

    expect(todo).not_to be_valid
  end
end
