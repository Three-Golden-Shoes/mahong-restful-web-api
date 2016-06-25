complete the webapi
===========================================

Steps
-----

### create directory, config files and download deps
```
mkdir restfulapi

cd restfulapi

npm init -y

npm install express --save
```

### use `nodemon` to auto-reload

```
npm install -g nodemon
```

### write code

The code is already in this project

### run code
```
node app.js
```
or

```
nodemon app.js
```

### visit

start the server in the terminal

use the tool of postman to visit

for example:

```
add(post):http://localhost:8081/products

getall(get):http://localhost:8081/products

getone(get):http://localhost:8081/products/9

deleteone(delete):http://localhost:8081/products/2

update(put):http://localhost:8081/products/1
```

