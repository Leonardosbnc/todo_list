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

  def send_reset_password
    email = params[:email]
    ResetPasswordService.send_reset_password_email(email)
    
    render json: { message: 'Email sent' }, status: :ok
  end

  def reset_password
    token = params[:token]
    password = params[:password]

    if token.nil? or password.nil?
      return render json: { error: 'Missing required param' }, status: :bad_request
    end

    user = User.find_by(reset_password_token: token)

    if user.nil?
      return render json: { error: 'Invalid token' }, status: :bad_request
    end

    user.password = password
    user.reset_password_token = nil
    user.reset_password_sent_at = nil
    user.save!

    render status: :no_content
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  protected

  def rescue_unique
    return render json: { error: "Email has already been taken" }, status: :unprocessable_entity
  end
end
