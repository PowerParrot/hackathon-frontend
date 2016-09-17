# angular2-webpack-boilerplate

## Using npm/webpack
Clone repository, and make sure you have `npm` installed.

```
npm install
typings install
npm run dev
```

You can now visit your application on http://localhost:8080

## Using Docker
Clone repository, and make sure you have `docker` installed.

```
docker build -t hack/frontend .
docker run -p 8080:8080 -v ./src:/app/src hack/frontend npm run dev
```

On Windows:

```

```

You can now visit your application on http://localhost:8080
