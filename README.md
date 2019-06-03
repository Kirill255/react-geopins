# react-geopins

https://coursehunters.net/course/sozdaem-prilozhenie-s-react-hooks-i-graphql

https://github.com/reedbarger/GeoPins

https://github.com/DerekNien/GeoPins

https://github.com/leonardocouy/geopins

https://github.com/DenisRebenok/geopins

## troubleshooting

1. `MongoNetworkError: connection 5`

Please check IP whitelist or firewall. My case by default Atlas mongodb allowed only my PC's IP. Hence blocked from AWS.

## Deploy

**Backend to Heroku**

1. Create project on dashboard

2. Initialize a git repository `heroku git:remote -a project_name`

3. Change port to `server.listen({ port: process.env.PORT || 4000 })`

4. Set config vars on dashboard settings

5. Check IP on Atlas Mongodb https://github.com/Automattic/mongoose/issues/5237 and https://stackoverflow.com/questions/42159175/connecting-heroku-app-to-atlas-mongodb-cloud-service

6. `git push heroku master`

**Frontend to Now**

1. Read https://zeit.co/examples/create-react-app/ and https://zeit.co/docs/v2/platform/upgrade-to-2-0

2. Change GRAPHQL_ENDPOINT to wss protocol with backend address `wss://geopins-backend.herokuapp.com/graphql`

3. Change BASE_URL to backend address `https://geopins-backend.herokuapp.com/graphql`

4. Add repository to Now access list

5. Create a now.json file with settings

6. Add script `"now-build": "react-scripts build"`

7. (optional) If you want your app to work offline and load faster, you can change `serviceWorker.unregister()` to `serviceWorker.register()`

8. We are now ready to deploy the app run `now` from client folder
