require "test_helper"
require 'devise/jwt/test_helpers'

class Api::V1::OrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @requester = requesters(:Eric)

    @headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    @auth_headers = Devise::JWT::TestHelpers.auth_headers(@headers, @requester)
    @order_params = { address: "blablablab" }
  end

  def create_order(params, headers = @auth_headers)
    post(
      api_v1_request_photos_url,
      params: {order: params},
      as: :json,
      headers: headers
    )
  end

  test "should return unauthorized when not logged in" do
    post(
      api_v1_request_photos_url,
      params: { order: { address: "blablablab" } },
      as: :json
    )

    assert_response :unauthorized
    assert_equal("You need to sign in or sign up before continuing.", response.parsed_body["error"])
  end
  
  test "should return unauthorized when user logged in is not requester" do
    assignee = assignees(:Stan)
    auth_headers = Devise::JWT::TestHelpers.auth_headers(@headers, assignee)
    
    create_order(@order_params, auth_headers)
    
    assert_response :unauthorized
    assert_equal("User type not authorized to perform this action", response.parsed_body["message"])
  end
  
  test "should not create order when missing address" do
    assert_no_difference -> { Order.count } do
      create_order(@order_params.merge(address: nil))
    end

    assert_response :bad_request
    assert_equal(["Address can't be blank"], response.parsed_body["message"])

    assert_no_difference -> { Order.count } do
      create_order({})
    end

    assert_response :internal_server_error
    assert_equal("param is missing or the value is empty: order", response.parsed_body["message"])
  end

  test "should create order succesfully when user is requester and address is present" do
    assert_difference -> { Order.count } do
      create_order(@order_params)
    end

    assert_response :ok
    assert_equal(@order_params[:address], response.parsed_body["address"])
    assert_equal(Order::STATUS_PENDING, response.parsed_body["status"])
    assert_equal(@requester.id, response.parsed_body["requester_id"])
  end
end
