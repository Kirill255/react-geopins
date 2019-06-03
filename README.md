# react-geopins

https://coursehunters.net/course/sozdaem-prilozhenie-s-react-hooks-i-graphql

https://github.com/reedbarger/GeoPins

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

5. Check IP on Atlas Mongodb https://github.com/Automattic/mongoose/issues/5237

6. `git push heroku master`
