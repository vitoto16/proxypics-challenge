require "test_helper"

class Api::V1::Users::RegistrationsControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers
    test "should not create user when not providing email" do
        post(
            user_registration_url,
            params: {
                user: {
                    password: "123123",
                    type: "Requester"
                }
            },
            as: :json
        )

        assert_response :unprocessable_entity
        assert_equal("User couldn't be created successfully. Email can't be blank", response.parsed_body["status"]["message"])
    end

    test "should not create user when not providing password" do
        post(
            user_registration_url,
            params: {
                user: {
                    email: "123@mail.com",
                    type: "Assignee"
                }
            },
            as: :json
        )

        assert_response :unprocessable_entity
        assert_equal("User couldn't be created successfully. Password can't be blank", response.parsed_body["status"]["message"])
    end

    test "should not create user when not providing type" do
        post(
            user_registration_url,
            params: {
                user: {
                    email: "123@mail.com",
                    password: "123123"
                }
            },
            as: :json
        )

        assert_response :unprocessable_entity
        assert_equal("User couldn't be created successfully. Type can't be blank", response.parsed_body["status"]["message"])
    end

    test "should not create user when type is invalid" do
        post(
            user_registration_url,
            params: {
                user: {
                    email: "123@mail.com",
                    password: "123123",
                    type: "Crab"
                }
            },
            as: :json
        )

        assert_response :internal_server_error
        assert_equal("Invalid user type value", response.parsed_body["status"]["message"])
    end

    test "should create user when providing email, password and valid type" do
        assert_difference -> { User.count } do
            post(
                user_registration_url,
                params: {
                    user: {
                        email: "123@mail.com",
                        password: "123123",
                        type: "Assignee"
                    }
                },
                as: :json
            )
        end

        assert_response :ok
    end

    test "should not create user when providing an already existing email" do
        user = requesters(:Eric)
        post(
            user_registration_url,
            params: {
                user: {
                    email: "eric_cartman@mail.com",
                    password: "123123",
                    type: "Assignee"
                }
            },
            as: :json
        )

        assert_response :unprocessable_entity
        assert_equal("User couldn't be created successfully. Email has already been taken", response.parsed_body["status"]["message"])
    end
end
