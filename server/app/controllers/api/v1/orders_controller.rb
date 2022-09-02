class Api::V1::OrdersController < ApplicationController
    before_action :authenticate_requester!, on: :create

    def create
        order = current_user.request_photos!(order_params[:address])
        return render json: order 
    rescue ActiveRecord::RecordInvalid => e
        return render json: {message: e.record.errors.full_messages}, status: :bad_request
    rescue Exception => e
        return render json: {message: e.message}, status: :internal_server_error
    end

    private
    
    def order_params
        params.require(:order).permit(:address)
    end
end
