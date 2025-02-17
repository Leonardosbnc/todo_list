require 'devise/jwt/test_helpers'

module AuthHelper
  BASE_SECRET = "test_secret_key_base"

  def auth_post(auth_headers, url, params = {})
    post url, params: , headers: auth_headers
  end

  def auth_get(auth_headers, url, params = {})
    get url, params: , headers: auth_headers
  end

  def auth_delete(auth_headers, url, params = {})
    delete url, params: , headers: auth_headers
  end

  def auth_patch(auth_headers, url, params = {})
    patch url, params: , headers: auth_headers
  end

  def base_get(url, params = {})
    get url, params:
  end

  def base_post(url, params = {})
    post url, params:
  end

  def base_delete(url, params = {})
    delete url, params:
  end

  def base_patch(url, params = {})
    patch url, params:
  end

  def prepare_user_login(user)
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    auth_headers
  end

  private

  def with_auth(auth_token)
    raise ArgumentError, "Unable to send request: auth_token is nil" if auth_token.nil?

    page.driver.header('Authorization', "Bearer #{auth_token}")
  end
end

RSpec.configure  do |config|
  config.include AuthHelper, type: :request
end
