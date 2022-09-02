class ApplicationController < ActionController::API
    include ActionController::MimeResponds
    respond_to :json

    def authenticate_requester!
        authenticate_user!
        if !current_user.is_a? Requester
            return render json: { message: "User type not authorized to perform this action" }, status: :unauthorized
        end
    end
end
