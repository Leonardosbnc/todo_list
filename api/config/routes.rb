Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  devise_for :users, 
    path: '',
    path_names: { sign_in: 'token', sign_out: 'token' },
    controllers: { sessions: 'users/sessions' }

  namespace :v1, defaults: { format: :json } do
    resources :users, only: %i[create]
    resources :todos, param: :slug
  end
end
