class Assignee < User
    has_many :orders

    def submit_photos!(order_id, photos)
        raise "Please provide at least one photo" if photos.size < 1
        order = Order.find(order_id)

        photos.each do |photo, i|
            file_ext = photo.path.match /(png)|(jpeg)|(jpg)$/
            raise "Unsupported media type" if !file_ext

            order.photos.attach(io: photo, filename: "Order_#{order_id}_photo_#{i}.#{file_ext}")
        end

        raise "Something went wrong, please try again" if !order.photos.attached?

        order.assignee = self
        order.status = Order::STATUS_COMPLETED
        order.save!

        return order
    end
end
