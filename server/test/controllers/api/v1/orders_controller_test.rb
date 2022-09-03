require "test_helper"
require 'devise/jwt/test_helpers'

class Api::V1::OrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @requester = requesters(:Eric)
    @assignee = assignees(:Stan)

    @headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    @requester_auth_headers = Devise::JWT::TestHelpers.auth_headers(@headers, @requester)
    @assignee_auth_headers = Devise::JWT::TestHelpers.auth_headers(@headers, @assignee)
    @order_params = { address: "blablablab" }
  end

  def request_photos(params, headers: @requester_auth_headers)
    post(
      api_v1_orders_url,
      params: {order: params},
      as: :json,
      headers: headers
    )
  end

  def submit_photos(order_id, photos = [], headers: @assignee_auth_headers)
    patch(
      api_v1_order_submit_photos_url(order_id),
      params: {photos: photos},
      headers: headers.merge({'Content-Type': 'multipart/form-data'})
    )
  end

  test "should not create order when not logged in" do
    post(
      api_v1_orders_url,
      params: { order: { address: "blablablab" } },
      as: :json
    )

    assert_response :unauthorized
    assert_equal("You need to sign in or sign up before continuing.", response.parsed_body["error"])
  end
  
  test "should not create order when user logged in is not requester" do
    assignee_auth_headers = Devise::JWT::TestHelpers.auth_headers(@headers, @assignee)
    
    request_photos(@order_params, headers: assignee_auth_headers)
    
    assert_response :unauthorized
    assert_equal("User type not authorized to perform this action", response.parsed_body["message"])
  end
  
  test "should not create order when missing address" do
    assert_no_difference -> { Order.count } do
      request_photos(@order_params.merge(address: nil))
    end

    assert_response :bad_request
    assert_equal(["Address can't be blank"], response.parsed_body["message"])

    assert_no_difference -> { Order.count } do
      request_photos({})
    end

    assert_response :internal_server_error
    assert_equal("param is missing or the value is empty: order", response.parsed_body["message"])
  end

  test "should create order succesfully when user is requester and address is present" do
    assert_difference -> { Order.count } do
      request_photos(@order_params)
    end

    assert_response :ok
    assert_equal(@order_params[:address], response.parsed_body["address"])
    assert_equal(Order::STATUS_PENDING, response.parsed_body["status"])
    assert_equal(@requester.id, response.parsed_body["requester_id"])
  end

  test "should not accept submitted photos when not logged in" do
    submit_photos(789, headers: @headers)

    assert_response :unauthorized
    assert_equal("You need to sign in or sign up before continuing.", response.parsed_body["error"])
  end

  test "should not accept submitted photos when user logged in is not assignee" do
    submit_photos(789, headers: @requester_auth_headers)
    
    assert_response :unauthorized
    assert_equal("User type not authorized to perform this action", response.parsed_body["message"])
  end
  
  test "should not accept submitted photos when order doesn't exist" do
    request_photos(@order_params)
    order = response.parsed_body
    
    submit_photos(order["id"] + 999)
    
    assert_response :not_found
    assert_equal("Order not found", response.parsed_body["message"])
  end

  test "should return error when not providing photos" do
    request_photos(@order_params)
    order = response.parsed_body
    
    submit_photos(order["id"])
    
    assert_response :bad_request
    assert_equal("Please provide at least one photo", response.parsed_body["message"])

    submit_photos(order["id"], {photos: []})
    
    assert_response :bad_request
    assert_equal("Please provide at least one photo", response.parsed_body["message"])
  end

  test "should submit photos succesfully when providing at least one photo" do
    request_photos(@order_params)
    order = response.parsed_body

    photo = fixture_file_upload(Rails.root.join('test', 'fixtures', 'files', 'photo_1.png'))

    submit_photos(order["id"], [photo])

    assert_response :ok
    assert_equal(@order_params[:address], response.parsed_body["address"])
    assert_equal(Order::STATUS_COMPLETED, response.parsed_body["status"])
    assert_equal(@requester.id, response.parsed_body["requester_id"])
    assert_equal(@assignee.id, response.parsed_body["assignee_id"])
  end

  test "should submit photos succesfully when providing multiple photos" do
    request_photos(@order_params)
    order = response.parsed_body

    photo_1 = fixture_file_upload(Rails.root.join('test', 'fixtures', 'files', 'photo_1.png'))
    photo_2 = fixture_file_upload(Rails.root.join('test', 'fixtures', 'files', 'photo_2.png'))

    submit_photos(order["id"], [photo_1, photo_2])

    assert_response :ok
  end
end
