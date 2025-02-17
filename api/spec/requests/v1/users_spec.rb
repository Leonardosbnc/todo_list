# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'v1/users', type: :request do
  it "should create user" do
    body = { user: Faker::Internet.user('email', 'password') }

    base_post('/v1/users', body)
    expect(response).to have_http_status(201)
  end

  it "should not create user with duplicated email" do
    user = create(:user)
    body = { user: { email: user.email, password: Faker::Internet.password } }

    base_post('/v1/users', body)
    body = JSON.parse(response.body, {:symbolize_names => true})
    expect(response).to have_http_status(422)
    expect(body[:error]).to eq("Email has already been taken")
  end
end
