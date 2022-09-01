Rails.application.routes.draw do
  devise_for :users, skip: :all
  devise_scope :user do
    post "/api/v1/signup", to: "api/v1/users/registrations#create", as: 'user_registration'
    post "/api/v1/login", to: "api/v1/users/sessions#create", as: 'user_session'
    delete "/api/v1/logout", to: "api/v1/users/sessions#destroy", as: 'destroy_user_session'
  end
end
