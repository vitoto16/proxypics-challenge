require "test_helper"

class AssigneeTest < ActiveSupport::TestCase
  setup do
    @assignee = assignees(:Stan)
    @requester = requesters(:Eric)
    @order = orders(:one)
  end

  test "should not be able to submit photos when not providing photos" do
    exception = assert_raises(Exception) {
      @assignee.submit_photos!(order_id=@order.id, photos=[])
    }

    assert_equal("Please provide at least one photo", exception.message)
  end

  test "should be able to submit photos when providing at least one photo" do
    photo = File.open(Rails.root.join('test', 'fixtures', 'files', 'photo_1.png'))
    order = @assignee.submit_photos!(order_id=@order.id, photos=[photo])

    assert_equal(order.photos.count, 1)
  end

  test "should be able to submit multiple photos at once" do
    photo_1 = File.open(Rails.root.join('test', 'fixtures', 'files', 'photo_1.png'))
    photo_2 = File.open(Rails.root.join('test', 'fixtures', 'files', 'photo_2.png'))
    order = @assignee.submit_photos!(order_id=@order.id, photos=[photo_1, photo_2])

    assert_equal(order.photos.count, 2)
  end

  test "should return order with status Completed when upload is successful" do
    photo = File.open(Rails.root.join('test', 'fixtures', 'files', 'photo_1.png'))
    order = @assignee.submit_photos!(order_id=@order.id, photos=[photo])

    assert_equal(Order::STATUS_COMPLETED, order.status)
  end

  test "should return order with assignee filled when upload is successful" do
    photo = File.open(Rails.root.join('test', 'fixtures', 'files', 'photo_1.png'))
    order = @assignee.submit_photos!(order_id=@order.id, photos=[photo])

    assert_equal(@assignee, order.assignee)
  end

  test "should not be able to submit photos when order doesn't exist" do
    photo = File.open(Rails.root.join('test', 'fixtures', 'files', 'photo_1.png'))
    exception = assert_raises(Exception) {
      @assignee.submit_photos!(order_id=@order.id + 99, photos=[photo])
    }

    assert_equal("Couldn't find Order with 'id'=#{@order.id + 99}", exception.message)
  end
end
