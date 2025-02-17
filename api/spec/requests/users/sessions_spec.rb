require 'rails_helper'

RSpec.describe "Users::Sessions", type: :request do
  it "should autheticate user" do
    user = create(:user)
    body = {
      user: {
        email: user.email,
        password: user.password
      }
    }

    base_post('/token', body)

    expect(response).to have_http_status(200)
    expect(response.headers['authorization']).to be_present
  end

  it "should not autheticate user with wrong password" do
    user = create(:user)
    body = {
      user: {
        email: user.email,
        password: Faker::Internet.password
      }
    }

    base_post('/token', body)

    expect(response).to have_http_status(401)
    expect(response.body).to eq("Invalid Email or password.")
  end

  it "should destroy session token" do
    user = create(:user)
    body = {
      user: {
        email: user.email,
        password: user.password
      }
    }
    base_post('/token', body)

    headers = prepare_user_login(user)
    auth_delete(headers, '/token')
    expect(response).to have_http_status(200)
  end
end
