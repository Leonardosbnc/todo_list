class UserMailer < ApplicationMailer
  def reset_password(to, token)
    @token = token

    mail(:subject => 'Reset Your password', :to  => to)
  end
end
