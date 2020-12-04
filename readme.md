## Resume:

https://amrlabib.github.io/resume/

### Development

All resume code is inside `src` folder, it will be bundled inside `docs` using webpack, and a dev server will run on `http://localhost:9000/` when you run the following commands

```
npm install
npm run build:dev
```

OR

```
yarn
yarn build:dev
```

---

### Server deployment

Resume can be deployed to production node server and run

```
node app.js
```

---

### Github pages

We use `docs` folder instead of using `dist` to put all bundled code to be able to host resume on github pages, on following link https://amrlabib.github.io/resume/

