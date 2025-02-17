# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'v1/todos', type: :request do
  it "should return 401 if hit todo endpoints without auth_token" do
    todo = create(:todo)
    post_body = { todo: { name: 'todo1' } }
    patch_body = { todo: { status: 'completed' } }

    base_post('/v1/todos', post_body.to_json)
    expect(response).to have_http_status(401)
    base_get('/v1/todos')
    expect(response).to have_http_status(401)
    base_get("/v1/todos/#{todo.slug}")
    expect(response).to have_http_status(401)
    base_patch("/v1/todos/#{todo.slug}", patch_body.to_json)
    expect(response).to have_http_status(401)
    base_delete("/v1/todos/#{todo.slug}")
    expect(response).to have_http_status(401)
  end

  it "should list filtered todos for authenticated user" do
    user = create(:user)
    todo_1 = create(:todo, user:)
    todo_2 = create(:todo, user:, status: 'completed')

    headers = prepare_user_login(user)
    auth_get(headers, '/v1/todos')

    expect(response).to have_http_status(200)
    body = JSON.parse(response.body, {:symbolize_names => true})
    expect(body[:todos].length).to be(2)

    # add filter
    auth_get(headers, '/v1/todos', { status: 'completed' })

    expect(response).to have_http_status(200)
    body = JSON.parse(response.body, {:symbolize_names => true})
    expect(body[:todos].length).to be(1)
  end

  it "should retrieve todo for authenticated user" do
    todo = create(:todo)

    headers = prepare_user_login(todo.user)
    auth_get(headers, "/v1/todos/#{todo.slug}")

    expect(response).to have_http_status(200)
    body = JSON.parse(response.body, {:symbolize_names => true})
    expect(body[:todo][:name]).to eq(todo.name)
  end

  it "should create todo for authenticated user" do
    user = create(:user)
    post_body = { todo: { name: 'create todo test' } }

    headers = prepare_user_login(user)
    auth_post(headers, '/v1/todos', post_body.to_json)
    expect(response).to have_http_status(201)
    body = JSON.parse(response.body, {:symbolize_names => true})
    expect(body[:todo][:name]).to eq('create todo test')
    expect(body[:todo][:status]).to eq('pending')
  end

  it "should update todo" do
    todo = create(:todo)

    headers = prepare_user_login(todo.user)
    auth_patch(headers, "/v1/todos/#{todo.slug}", { name: 'name test', status: 'completed' }.to_json)

    expect(response).to have_http_status(200)
    body = JSON.parse(response.body, {:symbolize_names => true})
    expect(body[:todo][:name]).to eq('name test')
    expect(body[:todo][:status]).to eq('completed')
  end

  it "should not update completed todo" do
    todo = create(:todo, status: 'completed')

    headers = prepare_user_login(todo.user)
    auth_patch(headers, "/v1/todos/#{todo.slug}", { status: 'pending' }.to_json)

    expect(response).to have_http_status(400)
  end

  it "should delete todo" do
    todo = create(:todo)

    headers = prepare_user_login(todo.user)
    auth_delete(headers, "/v1/todos/#{todo.slug}")

    expect(response).to have_http_status(204)
  end
end
