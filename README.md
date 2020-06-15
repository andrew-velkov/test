## test cart

### `git clone git@github.com:andrew-velkov/test.git`

### `cd test-cart`

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode to view it in the browser.
Open App [http://localhost:3001](http://localhost:3001)

---

Test Jest

### `npm run test`

---

Development Build:
### `npm run build:dev`

---

Production Build:
### `npm run build`

---

Automatically formatting code with prettier / eslint and running JEST tests with husky.hooks - pre-commit / pre-push

---

Demo: http://todo-list.ho.ua

![Image preview](http://todo-list.ho.ua/assets/images/product-cart.png)

<!-- 
  "husky": {
    "hooks": {
      "pre-commit": "npm run prettier && npm run lint && npm run test",
      "pre-push": "npm run test"
    }
  },
 -->