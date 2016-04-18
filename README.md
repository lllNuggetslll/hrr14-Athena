# Pairaoke

> Find out where your friends or enemies are planning to show their vocal chops. Show up and either provide some harmonization or devastate them with your superior vocal acrobatics. Sign in to create new Pairaoke collabo or battle-style pop-up karaoke events.

## Team

  - __Product Owner__: Emily Ashley
  - __Scrum Master__: Ben Janes
  - __Development Team Members__: Terry Capan, David Nguyen

## Table of Contents

1. [Usage](#usage)
2. [Tech Stack](#tech-stack)
3. [Development](#development)
    1. [Local Development](#to-develop-locally)
    2. [Building for Production](#to-build-for-production)
    3. [Testing](#to-test)
4. [Team](#team)
5. [Issues](#roadmap)
6. [Contributing](#contributing)

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

View the project roadmap [here](https://github.com/hrr14-Athena/hrr14-Athena/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.