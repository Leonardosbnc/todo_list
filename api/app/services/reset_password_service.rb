class ResetPasswordService
  def self.generate_and_save_token_for_user(user)
    token = SecureRandom.urlsafe_base64(nil, false)

    user.reset_password_token = token
    user.reset_password_sent_at = DateTime.now
    user.save!

    return token
  rescue ActiveRecord::RecordNotUnique
    retry
  end

  def self.send_reset_password_email(email)
    user = User.find_by(email:)
    if user.nil?
      return
    end

    token = generate_and_save_token_for_user(user)

    UserMailer.reset_password(email, token).deliver_now
  end
end
