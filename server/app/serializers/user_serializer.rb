class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :type
end
