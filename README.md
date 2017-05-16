[![CircleCI](https://circleci.com/gh/ProjectZed/WeatherStation.svg?style=shield&circle-token=95a0f2678e695b7818b86da733d25b82759d8867)](https://circleci.com/gh/ProjectZed/WeatherStation)

# Setup

1. Install [Node.js v6.10.3 LTS](https://nodejs.org/)
2. Install MongoDB
  * Windows

    [Install MongoDB on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
  * macOS

    [Install MongoDB on macOS](https://brew.sh/)

    ```brew install mongodb```
  * Linux

    [Install MongoDB on Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)
3. `cd client`
4. `npm install`
5. `cd ../server`
6. `npm install`
7. Create the directory `weather-station-data` outside of the repo
8. **Mac/Linux**: Initialize database with `mongod --dbpath weather-station-data`  
    **Windows**: Initialize database with `"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath weather-station-data`
9. Initialize the database with `node server/src/resetdatabase.js`
10. In client, run `npm run watch`
11. In server, run `node src/server.js`
