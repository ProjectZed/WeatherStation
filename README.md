[![CircleCI](https://circleci.com/gh/ProjectZed/beatcoin/tree/master.svg?style=shield&circle-token=29c531b9dea3831098549784593f7656e55ae28d)](https://circleci.com/gh/ProjectZed/beatcoin)

# Setup

1. Install [Node.js v6.10.3 LTS](https://nodejs.org/)
2. Install MongoDB
### Windows
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
### macOS
https://brew.sh/

  ```brew install mongodb```
### Linux
https://docs.mongodb.com/manual/administration/install-on-linux/
4. `cd client`
5. `npm install`
6. `cd ../server`
7. `npm install`
10. Create the directory `weather-station-data` outside of the repo
11. **Mac/Linux**: Initialize database with `mongod --dbpath weather-station-data`  
    **Windows**: Initialize database with `"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath weather-station-data`
13. Initialize the database with `node server/src/resetdatabase.js`
14. In client, run `npm run watch`
15. In server, run `node src/server.js`
