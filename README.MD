# Tutorial Management API

This application provides a set of REST APIs to manage tutorials. The server is built using **Express.js**, and the database is configured with **Sqlite**.

The API allows for the creation, retrieval, updating, deletion, and search of tutorials.

## API Endpoints Overview

Below is a table showing the available REST APIs and their corresponding methods, URLs, and actions:

| **Method** | **URL**                        | **Action**                                        |
|------------|---------------------------------|---------------------------------------------------|
| **GET**    | `/api/tutorials`                | Get all tutorials.                                |
| **GET**    | `/api/tutorials/:id`            | Get a tutorial by its ID.                         |
| **POST**   | `/api/tutorials`                | Add a new tutorial.                               |
| **PUT**    | `/api/tutorials/:id`            | Update a tutorial by its ID.                      |
| **DELETE** | `/api/tutorials/:id`            | Remove a tutorial by its ID.                      |
| **DELETE** | `/api/tutorials`                | Remove all tutorials.                             |
| **GET**    | `/api/tutorials/published`      | Find all published tutorials.                     |
| **GET**    | `/api/tutorials?title=[kw]`     | Find all tutorials whose title contains the keyword `kw`. |

## Prerequisites

To run this application, you need the following:

- **Node.js** installed on your machine. [Download Node.js](https://nodejs.org/)
- **Sqlite3** database set up with the appropriate tables and columns
- **Postman** or any API client to test the API endpoints.

