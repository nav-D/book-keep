# Book-Keep

This is the documentation for the setup and details about API Endpoints of the Book-Keep Server :

## Technologies Used

This project uses Node v20.9.0 along with MongoDB v7.0.2

## Dev Container

If you don't have mongo or node and don't want to go through the trouble of installing them on your system, I have setup a convenient dev container which will setup an environment with Node and Mongo in a dockerized container. 

All you need is the official Dev Containers Extension for VSCode and it will automatically ask you to reopen this project inside a container when you clone this repo.

Or you can manually install Mongo (v >= 5) and Node (v >= 16).

## Setup

Assuming you have setup the dev container or have node and npm installed, you can hit the following command to start the server in the project directory.

    npm start

Following env variables can be setup in a `yourfile.env`:

- **_API_PORT_** : The port at which the server listens to requests. Default is 3000.
- **_MONGO_HOST_** : Mongo Host to connect to. Default is 'localhost'.
- **_MONGO_PORT_** : Mongo Port to connect to. Default is 27017
- **_MONGO_DB_** : Name of the database for the project
- **_LOG_ENV_** : Predefined format for morgan logger

  Can be one of the following :

  - dev
  - combined
  - common
  - short
  - tiny

Run the  following command before the above command if you have supplied your own `yourfile.env` file

    source yourfile.env

## APIs

The server serves a total of 5 APIs

### Create Book Record

API to create a book record.

- Method : `POST`

- Path : `/api/books`

- Input :

  - body

        {
          "title": "Some-Title",
          "author": "Some-Author",
          "summary": "Some-summary"
        }

  **_NOTE :_** `title` and `author` are required fields.

- Output : JSON

      {
        book_id: "654b929b9438813c9703d286"
      }

### Get All Books

API to get all book records.

- Method : `GET`

- Path : `/api/books`

- Input :

  - query : `from` and `size` for pagination

        ?from=0&size=50

  **_NOTE :_** Default and minimum value of `from` is `0`. Default value of `size` is `50` and minimum is `1`.

- Output : JSON

      {
        data: [
          {
            "_id": "654b9ea5faf52fce2c7eb830",
            "title": "Some-Title",
            "author": "Some-Author"
          }
        ],
        total: 1
      }

  **_NOTE :_** `total` is an integer denoting total number of books. `data` is an array of book records.

### Get Book Record Details

API to get details of a book record.

- Method : `GET`

- Path : `/api/books/:id`

- Input :

  - params : `id` of the book record to be fetched

- Output : JSON

      {
        "data": {
          "_id": "654bbfd6c5f201897a3ec1c3",
          "title": "Some-Title",
          "author": "Some-Author",
          "summary": "Some-Summary",
          "created_at": "2023-11-08T17:05:26.780Z",
          "updated_at": "2023-11-08T17:05:26.780Z",
          "__v": 0
        }
      }

### Update Book Record Details

API to get details of a book record.

- Method : `PUT`

- Path : `/api/books/:id`

- Input :

  - params : `id` of the book record to be updated

  - body

        {
          "title": "Some-Title",
          "author": "Some-Author",
          "summary": "Some-summary"
        }

- Output : `204` When Successful

### Delete Book Record Details

API to get details of a book record.

- Method : `PUT`

- Path : `/api/books/:id`

- Input :

  - query : `soft_delete`

        ?soft_delete=false

    If this query param is sent with `false` value, then document will be hard deleted otherwise it will always be a soft delete

  - params : `id` of the book record to be deleted

- Output : `204` When Successful
