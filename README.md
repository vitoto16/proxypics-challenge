## Running the project

For the Rails server, run `docker compose up`, so that the Rails application and database are up.

For the React Native app, change to the `app` directory and run:
  - `yarn install`
  To install the dependencies.
  
### For Android
On the `app` directory, run:
  - `yarn android`
  - `yarn start`

### For iOS
Chnge to the `/app/ios` directory and run `pod install`. Then, get back to the `app` directory and run `yarn ios`
