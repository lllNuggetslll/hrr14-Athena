# Pairaoke

> Find out where your friends or enemies are planning to show their vocal chops. Show up and either provide some harmonization or devastate them with your superior vocal acrobatics. Sign in to create new Pairaoke collabo or battle-style pop-up karaoke events.

## Team

  - __Product Owner__: Emily Ashley
  - __Scrum Master__: Ben Janes
  - __Development Team Members__: Terry Capan, David Nguyen

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

View events in your local area. Signup or login to add an event.

## Tech Stack

- Node/Express
- Angular
- Postgres/PostGIS
- Karma/Mocha/Chai
- Grunt

## Development

From within the root directory:
```sh
npm install
bower install
```

#### To develop locally:
Must have Postgres installed and running
```sh
createdb karaoke
psql karaoke
```
Add the PostGIS extension to your Postgres database instance
```sh
karaoke=# CREATE EXTENSION postgis;
```
Run grunt to build and watch the dev files
```sh
grunt
```
Run node to start the server
```sh
node index.js
```

#### To build for production:
```sh
grunt build
```

#### To test:
```sh
grunt test
``` 

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.