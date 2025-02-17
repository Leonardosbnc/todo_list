class V1::UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotUnique, :with => :rescue_unique

  def create
    user = User.new(user_params)

    if user.save
      render json: user, status: :created
    else
      render json: { error: user.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  protected

  def rescue_unique
    return render json: { error: "Email has already been taken" }, status: :unprocessable_entity
  end
end
