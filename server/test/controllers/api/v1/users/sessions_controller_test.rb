require "test_helper"
require 'devise/jwt/test_helpers'

class Api::V1::Users::SessionsControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers
    setup do
        @user = requesters(:Eric)
        @user.update(password: "nhanha")
    end
    test "should not log in when credentials are wrong" do
        post(
            user_session_url,
            params: {
                user: {
                    email: @user.email,
                    password: "eeeeee"
                }
            },
            as: :json
        )

        assert_response :unauthorized
    end

    test "should log in when credentials match an existing record" do
        post(
            user_session_url,
            params: {
                user: {
                    email: @user.email,
                    password: "nhanha"
                }
            },
            as: :json
        )

        assert_response :ok
        assert_equal("Logged in sucessfully.", response.parsed_body["status"]["message"])
    end

    test "should not log out when providing an invalid token" do
        headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json', "Authorization" => "Bearer akjsdhasjk casjkdabskjdashyeak" }

        delete(
            destroy_user_session_url,
            headers: headers
        )

        assert_response :unauthorized
        assert_equal("Couldn't find an active session.", response.parsed_body["status"]["message"])
    end

    test "should log out succesfully when providing a valid token" do
        headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)

        delete(
            destroy_user_session_url,
            headers: auth_headers
        )

        assert_response :ok
        assert_equal("Logged out successfully", response.parsed_body["status"]["message"])
    end
end
