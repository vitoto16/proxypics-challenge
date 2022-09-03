class ApplicationController < ActionController::API
    include ActionController::MimeResponds
    respond_to :json

    def authenticate_requester!
        authenticate_user!
        if !current_user.is_a? Requester
            return render json: { message: "User type not authorized to perform this action" }, status: :unauthorized
        end
    end

    def authenticate_assignee!
        authenticate_user!
        if !current_user.is_a? Assignee
            return render json: { message: "User type not authorized to perform this action" }, status: :unauthorized
        end
    end

    def rescue_exceptions
        begin
            yield
        rescue ActiveRecord::RecordInvalid => e
            return render json: {message: e.record.errors.full_messages}, status: :bad_request
        rescue Exception => e
            if e.message.include?("photos: ")
                message = e.message
                message.slice!("photos: ")
                return render json: {message: message}, status: :bad_request
            end
            return render json: {message: e.message}, status: :internal_server_error
        rescue ActionController::ParameterMissing => e
            respond_with nil, message: "Invalid parameters format"
        end
    end
end
