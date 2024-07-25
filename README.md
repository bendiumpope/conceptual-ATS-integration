## Plan of Approach

### Refinement Questions:

```
    1.  What should happen to the contact in a case where the application fails?
    2.  In this case if we will what to rollback, with the current design of
        making 2 http calls to create contacts and applications differently,
        we will not be able to use transactions to manage this rollback.
        I will advice we handle both contact creation and application creation in the same controller
        so as to utilize transactions efficiently.
    3.  Are there any specific validation rules for the input data beyond the format provided?
    4.  Should the CV be handled in a specific way if it exceeds a certain size?
    5.  what preferred file storage infrastructure should be use for storing the file?
    6.  Are there any additional fields that might be included in the future input payload?
    7.  Should we handle a case of same contact applying for several jobs?
    8.  Should error handling include retries for failed API requests?
    9.  Is there a specific logging mechanism required?
    10. Should we maintain a record of successful and failed attempts?
```

### Setup:

```
    1. Create an Express.js server to handle incoming requests from the job board.
    2. Use Multer for handling file uploads.
    3. Define routes and controllers for handling the incoming payload for ATS, contacts and applications.
    4. Implement functions for transforming the payload to match the ATS model.
    5. Make HTTP requests to the ATS APIs to create a contact and then an application.
    6. Send appropriate responses back to the job board.
    7. Implement cron job
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
    I decided to save the file locally. and then save the stringified metadata of the cv file on the cv column (I am using SQL-lite and Sequelize ORM). Saving the file locally is a bad practice but used it for the sake of the test and time. I also added a crone job to run once every week to clean up contacts with out associated application and also delete the contact associated file. It would be best to use a file storage like Cloudinary, Amazon S3 bucket or Google Storage bucket etc.
    I also added some simple validation to check the type and content of the payload this is because no validation is defined yet from the requirements.
    Finally, Because International numbers have different formats I used an external library to handle that.
```

## STEPS TO TEST THE PROJECT LOCALLY SETUP

```
    1.  npm install: to install dependencies

    2.  npm seed: to seed data to the db

    3.  npm start: to start the express server locally
```
