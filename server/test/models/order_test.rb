require "test_helper"

class OrderTest < ActiveSupport::TestCase
  setup do
    @requester = requesters(:Eric)
  end

  test "should not be created when missing address" do
    exception = assert_raises(Exception) {
      Order.create!(requester: @requester)
    }
    
    assert_equal("Validation failed: Address can't be blank", exception.message)
  end

  test "should not be created with non existing requester" do
    exception = assert_raises(Exception) {
      Order.create!(address: "200 Perry St.", requester: nil)
    }
    
    assert_equal("Validation failed: Requester must exist", exception.message)
  end

  test "should always be created with status Pending" do
    order = Order.create!(address: "20 Silver St.", requester: @requester, status: Order::STATUS_COMPLETED)
    
    assert_equal(Order::STATUS_PENDING, order.status)
  end

  test "status should always be Pending or Completed" do
    order = @requester.request_photos!("200 Lions St.")
    
    order.status = "BLABLA"
    
    exception = assert_raises(Exception) {
      order.save!
    }

    assert_equal("Validation failed: Status 'BLABLA' is not a valid status type", exception.message)
  end
end
