# React CRUD Interface for Single-Resource REST API

Store your favorite Star Trek characters in a database!

This app requires a local install of [MongoDB](http://www.mongodb.com).

First, clone the repo containing the API server (<https://github.com/hollislau/rest_api.git>), navigate to the `hollis_lau` directory, and install the server with `npm install`. You may verify the tests with `npm test` or `gulp` if you wish (start up MongoDB with `mongod` in another shell first).

Next, in a second shell, clone this repo and install the client server with `npm install`. No tests are currently available for this client-side interface, but you may verify linting with `gulp`. Before proceeding, compile the necessary files by running `gulp build:dev`.

If not already running, start up your database with `mongod` in a third shell, then run `npm start` from your first shell to get your API server going. The port defaults to `3000` unless you have a PORT environment variable set up. Finally, run `npm start` from your second shell to start your client server on port `5000`. Navigate to <http://localhost:5000> to add some Star Trek characters to your database.

To add a character, enter any strings you like in the provided fields, except for the `power` field which takes a number. __The `name`, `weapon`, and `power` fields are required;__ the others are optional. The `power` value represents the strength of the character. This `power` value does not currently have any functionality, but will be used in the future to simulate a battle between two characters. When implemented, a character with a larger `power` value will always defeat one with a smaller value. Choose any `power` values you like, but they must be valid numbers. For your Star Trek characters, default values of "Phaser" and "Enterprise" have been set for the `weapon` and `ship` fields, respectively. If values are not provided for those fields, the default values will be saved to the database. Hit the `Create` button when you are finished. A list of your current characters will be displayed on the page.

To edit a character, modify the desired fields below the entry you wish to update, then hit the `Update` button to save your changes to the database.

To remove a character, click the `Delete` button beneath the entry you with to remove.
