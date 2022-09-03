# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < ::Devise::RegistrationsController
  include RackSessionFixController
  respond_to :json

  def create
    super
  rescue ActiveRecord::SubclassNotFound => e
    respond_with resource, message: "Invalid user type value"
  rescue ActionController::ParameterMissing => e
    respond_with nil, message: "Invalid parameters format"
  end

  protected

  def sign_up_params
    params.require(:user).permit(:email, :password, :type)
  end

  private

  def respond_with(resource, _opts = {})
    if resource
      if resource.persisted?
        render json: {
          status: {code: 200, message: 'Signed up sucessfully.'},
          data: resource
        }
      else
        render json: {
          status: {message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}"}
        }, status: :unprocessable_entity
      end
    else
      render json: {
        status: {message: _opts[:message]},
      }, status: :internal_server_error
    end
  end
end
