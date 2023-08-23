This is a [Node.js](https://nodejs.org/en/) project, which was made using [Express](https://expressjs.com/) for Optimal Solution Company.

First, setup necessary environment:

```bash
make install
```

Now you can run the project:

```bash
make start
```


API documentation:
```bash
http://localhost:3001/swagger
```

For first route(list pipelines) was used the given api documentation page:
```bash
https://developer.close.com/resources/pipelines/
```
Unfortunatly, '_skip' and '_limit' don't work with this route, so I haven't made the pagination.

For second route(list pipeline's opportunites) was used the given api documentation pages:
```bash
https://developer.close.com/resources/opportunity-statuses/
```
```bash
https://developer.close.com/resources/opportunities/
```
Route gets the statuses' IDs by 'id_pipeline' and uses them in second route, so we get all the pipeline's opportunites.
This route has the simple pagination(if you try to go out of limit - it will send the empty array).