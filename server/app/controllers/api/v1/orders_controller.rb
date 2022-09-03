class Api::V1::OrdersController < ApplicationController
    before_action :authenticate_requester!, only: %i[create]
    before_action :authenticate_assignee!, only: %i[submit_photos]
    before_action :set_order, only: %i[submit_photos]
    around_action :rescue_exceptions

    def create
        order = current_user.request_photos!(order_params[:address])
        return render json: order
    end

    def submit_photos
        order = current_user.submit_photos!(@order.id, params[:photos])
        render json: order
    end

    private

    def set_order
        @order = Order.find(params[:order_id])
    rescue ActiveRecord::RecordNotFound => e
        return render json: {message: "Order not found"}, status: :not_found
    end
    
    def order_params
        params.require(:order).permit(:address, :photos)
    end
end
