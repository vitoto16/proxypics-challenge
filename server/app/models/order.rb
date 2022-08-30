class Order < ApplicationRecord
  STATUS_PENDING = "Pending"
  STATUS_COMPLETED = "Completed"
  STATUS_OPTIONS = [STATUS_PENDING, STATUS_COMPLETED]

  before_validation :_set_initial_status, on: :create

  belongs_to :requester
  belongs_to :assignee, optional: true
  has_many_attached :photos

  validates :status, presence: true, inclusion: { in: STATUS_OPTIONS, message: "'%{value}' is not a valid status type" }
  validates :address, presence: true

  private

  def _set_initial_status
    self.status = STATUS_PENDING
  end
end
