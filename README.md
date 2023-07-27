# QB-API
A **REST API** for accessing quiz bowl questions and answers, developed with **Node.js**, **Express.js**, and **MongoDB** and implementing **Model-View-Controller**/Model-Route-Contoller (**MVC**/MRC) architecture.

## How do you access it?
QB-API can be accessed in two ways: on a web server URI or locally.

### Server

QB-API can be accessed via a (free) server for web services hosted by Render at the following URI: 

**https://qb-api-onrender.com/api/questions**

Because of the free status of this server, there are limitations to calling it, and it make take a while for the server to spin up again.

### Locally

QB-API can be locally by cloning this repository and running the following command: 

`npm run serve`

It will then be run on port 3000 of the local host via `localhost:3000/api/questions`.

#### Insomnia

Insomnia is useful and easy tool for configuring and displaying the various possible calls to the API. Download it from https://insomnia.rest/download.

## How to use this API?

Numerous CRUD/HTTP methods can be used with this API. Each time the API is called, a JSON object is returned.

### Question JSON Structure

The JSON structure of the questions stored in the DB and accessible via the API is the following (also seen in `/models/questionModel.js` in the repository): 

```
{
    difficulty: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    source: { // i.e. from protobowl, QANTA, quizbowlpackets scraper, manually added, etc.
        type: String,
        required: true
    }, 
    tournament: String,
    round: String,
    num: Number,
    year: Number, 
}
```

### Methods

The following methods can be used:

### Get

You can get (read) a single question with ID `id` by calling with a `get` request: `/api/questions/id`.

You can also get (read) *all* of the questions stored in the database by calling with a `get` request: `/api/questions/`.

### Post

You can post (create) a single question JSON object by calling with a `post` request: `/api/questions/`.

### Put

You can put (update) a single question JSON object with ID `id` by calling with a `put` request: `/api/questions/id`.

### Delete

You can delete a single question JSON object with ID `id` by calling with a `delete` request: `/api/questions/id`
