## Plan of Approach

### Refinement Questions:

```
    What should happen to the contact in a case where the application fails?
    If in this case we will what to rollback, with the current design of making 2 http calls to create contacts and applications differently, we will not be able to use transactions to manage this rollback. I will advice we handle both contact creation and application creation in the same controller so as to utilize transactions efficiently.
    Are there any specific validation rules for the input data beyond the format provided?
    Should the CV be handled in a specific way if it exceeds a certain size?
    Is there any required file storage infrastructure to use for storing the file?
    Are there any additional fields that might be included in the future input payload?
    Should error handling include retries for failed API requests?
    Is there a specific logging mechanism required?
    Should we maintain a record of successful and failed attempts?
```

### Setup:

```
    Create an Express.js server to handle incoming requests from the job board.
    Use Multer for handling file uploads.
    Define routes and controllers for handling the incoming payload for ATS, contacts and applications.
    Implement functions for transforming the payload to match the ATS model.
    Make HTTP requests to the ATS APIs to create a contact and then an application.
    Send appropriate responses back to the job board.
```

### Steps:

```
    Step 1: Set up the Express server and necessary middlewares.
    Step 2: Define the route to accept incoming payloads.
    Step 3: Implement the controller to process the payload.
    Step 4: Transform the incoming payload to the required format for the ATS.
    Step 5: Make API requests to the ATS to create contact and application.
    Step 6: Handle success and error responses.
    Step 7: Test the implementation using Postman or a similar tool.
```

## Considerations Made in the working Solution.

```
    I decided to save the file locally. and then save the stringified metadata of the cv file on the cv column (I am using SQL-lite and Sequelize ORM). Saving the file locally is a bad practice but for the sake of the test and time. It would be best to use a file storage like Cloudinary, Amazon S3 bucket or Google Storage bucket etc.
    I also added some simple validation to check the type and content of the payload this is because no validation is defined yet from the requirements.
    Finally, Because International numbers have different formats I used an external library to handle that.
```

## STEPS TO TEST THE PROJECT LOCALLY SETUP

```
npm install: to install dependencies

npm seed: to seed data to the db

npm start: to start the express server locally
```
