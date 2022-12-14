# frozen_string_literal: true

class Api::V1::Users::SessionsController < ::Devise::SessionsController
  respond_to :json

  def create
    super
  rescue ActionController::ParameterMissing => e
    respond_with nil, message: "Invalid parameters format"
  end

  private

  def respond_with(resource, _opts = {})
    render json: {
      status: {code: 200, message: 'Logged in sucessfully.'},
      data: UserSerializer.new(resource).as_json
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: {code: 200, message: "Logged out successfully"},
      }, status: :ok
    else
      render json: {
        status: {code: 401, message: "Couldn't find an active session."},
      }, status: :unauthorized
    end
  end
end
