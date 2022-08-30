class Requester < User
    has_many :orders

    def request_photos!(address)
        return Order.create!(address: address, requester: self)
    end
end
