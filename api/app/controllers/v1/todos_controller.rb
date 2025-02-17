class V1::TodosController < ApplicationController
  before_action :authenticate_user!

  def index
    todos = current_user.todos

    if params[:status].present?
      todos = todos.where(status: params[:status])
    end

    render json: { todos: }, status: :ok
  end

  def show
    todo = current_user.todos.find_by_slug(params[:slug])
    render json: { todo: }, status: :ok
  end

  def create
    todo = current_user.todos.new(todo_params)

    if todo.save
      render json: { todo: }, status: :created
    else
      render json: { error: todo.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def destroy
    todo = current_user.todos.find_by_slug(params[:slug])
    unless todo.nil?
      todo.destroy!
      render status: :no_content
    else
      render json: { error: "To-do not found" }, status: :not_found
    end
  end

  def update
    todo = current_user.todos.find_by_slug(params[:slug])

    if todo.status == 'completed'
      return render json: {error: 'Completed to-do can not be updated'}, status: :bad_request
    end

    todo.update(update_todo_params)
    todo.reload

    render json: { todo: }, status: :ok
  end

  def todo_params
    params.require(:todo).permit(:name)
  end

  def update_todo_params
    params.require(:todo).permit(:name, :status)
  end
end
