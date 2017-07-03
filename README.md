# Hello Marcus

> Just say it, and Marcus does it.

## Team
  - Corey Chau
  - Matt Reyes
  - Scott Yoon
  - Joseph Lei

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 6.4.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g bower
npm install
bower install
```
### Front End

Sign up for Houndify.com and enable speech to text domain. The domain will generate corresponding API key and User ID. Copy the UserID and paste it in client_env.js file from hello-marcus/react-client/src folder.

Run the following code within root directory to run webpack
```sh
npm run react-dev
```

### Backend

## Stack

- Postgres database
- Express/Node


## Backend structure

The main parts of the backend are:

- fred (the AI that powers Marcus)
- APIs that fred consumes
- Database models (queries)
- Core server files such as index.js

## Adding new capabilities to Hello Marcus

Everything runs through fred. 

1. Start by adding an api name to the api table in postgres.

2. Add the words you want to associate with that api to the words table. The words table contains a foreign key to the api table.

3. Add a file in /server/apis folder for your api. Be sure to export that api under server/apis/index.js.

That's it!


## Natural language processing

We use a module called compromise to parse the user input string. For now, we're only using the module to parse out the location. 

To learn more about compromise, go to the [doc](https://github.com/nlp-compromise/compromise).

## Using environment keys

We use a module called dotenv that mimic's Heroku's process.env variable. You'll see references to process.env.something  in our code where we need to hide an API key.

To get started, install the dotenv module (should already be in package.json file), create a .env file in your local machine and ask our team for the API keys.  

If you add a variable in your own .env file, you also need to add it on Heroku's servers.

Never check in your .env file to the github. 

*Note that process.env does not work on the front-end for our app.

## Database management

There are two databases: staging and production. If you change something in staging, you have to manually make the same change in production. 

Set your .env file so that your local machine always connects to the staging server . 

Refer to this [document](https://docs.google.com/document/d/1VUalzQ0VXM_Wb5kB-ophp29Ejy7KyNIJ4DT1Dze_TeE/edit) for instructions on how to connect to the staging server and production server.


### App plan

View the app plan [here](https://docs.google.com/document/d/1VnS2nWmhrQnm-ed_r_fEU9Qqk9QiBCGFSzvwa8l1ffc/edit)


### Roadmap

View the project roadmap [here](https://docs.google.com/spreadsheets/d/1NkW4t51z79jExXhSUT2BQSOyc6LG7uqIltWkaLTu_oM/edit?usp=drive_web)

### Style guide
View the style guide [here](https://github.com/hello-marcus/hello-marcus/blob/master/STYLE-GUIDE.md)



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
