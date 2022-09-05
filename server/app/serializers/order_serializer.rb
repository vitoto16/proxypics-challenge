class OrderSerializer < ActiveModel::Serializer
  attributes :id, :address, :status

  belongs_to :requester, serializer: UserSerializer
  belongs_to :assignee, serializer: UserSerializer
end
