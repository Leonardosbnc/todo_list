Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  devise_for :users, 
    path: '',
    path_names: { sign_in: 'token', sign_out: 'token' },
    controllers: { sessions: 'users/sessions' }

  namespace :v1, defaults: { format: :json } do
    resources :users, only: %i[create] do
      collection do
        post "send_reset_password", to: 'users#send_reset_password'
        post "reset_password", to: 'users#reset_password'
      end
    end
    resources :todos, param: :slug
  end
end
