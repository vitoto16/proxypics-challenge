require "test_helper"

class RequesterTest < ActiveSupport::TestCase
  setup do
    @requester = requesters(:Eric)
  end
  test "should not be able to request order without providing an address" do
    exception = assert_raises(Exception) {
      @requester.request_photos!(address=nil)
    }
    assert_equal("Validation failed: Address can't be blank", exception.message)
  end

  test "should be able to create an order when providing an address" do
    assert_difference('Order.count') do
      @requester.request_photos!(address="250 Main St.")
    end
  end

  test "should return created order with status Pending" do
    order = @requester.request_photos!(address="250 Main St.")

    assert_equal(Order::STATUS_PENDING, order.status)
  end
end
