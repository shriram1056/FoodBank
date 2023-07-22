## Project creation process:

<br />

```
typeorm init --database postgres --express
```

gives a template backend with user table configured.

<br />

```
npm i --save-dev nodemon
```

for development

<br />

```
nodemon -w \*.ts -w .env src/index.ts
```

looks for changes in file with extension ts & env and run index.ts

<br />
<br />

## install packages:

```
npm -i package
```

<br />

## install it as dev-dependency:

```
npm -i --save-dev package
```

## Javascript:

`[]` syntax allows you to access an object property dynamically using a variable or an expression.

`res.send()` in Express.js, objects and arrays are typically automatically converted to JSON format.

<br />

## Packages:

`bodyParser.json()` parses the JSON data in the request body and makes it available in req.body.

`morgan package` is for logging info for backend. by default, no backend logs are present and we have chosen tiny as the format.

`Dotenv` is a zero-dependency module that loads environment variables from a .env file into process.env

<br />

## bodyParser

bodyParser.json is responsible for parsing JSON data. It will parse incoming request bodies that have Content-Type: application/json.

```
POST /test HTTP/1.1
Host: foo.example
Content-Type: application/json
Content-Length: 27

{"key": "value", "another_key": "another_value"}
```

the request doesn't have body field.

there are other methods in bodyparser is parse other type of data.

```
PUT /path/to/resource HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: <length_of_request_body>

key=value&another_key=another_value
```

<br />

## seeding:

seeding is a concept of populating the db with some data at the start of the server.

`package: typeorm-extensions`

look at commit message that has the word "seeding" in it.

<br />

## Snake Naming Strategy:

TypeORM will automatically generate and map table and column names using the "snake_case" convention.

For example, if you have an entity named UserDetails with a property firstName, the corresponding table in the database will be named user_details, and the column will be named first_name.

`package: typeorm-naming-strategy`

<br />

## storing date time in postgreSQL:

by default the TIMESTAMP WITH TIME ZONE type (our datetime type) is stored as UTC in postgreSQL, this means that even if your db timezone is set as AST, ADT, the stored time will not be stored as AST unless we change the default format. instead it'll be stored UTC PLUS the offset to reflect that timezone. So, if there is +00 offset, then it means the time zone is UTC.

```
SET TIME ZONE 'AST';

SELECT '2023-07-11 15:43:00+00'::timestamptz;

>> '2023-07-11 11:43:00-04'
```

https://www.postgresql.org/docs/current/datatype-datetime.html

<br />

## how to insert DateTime for table;

```
INSERT INTO table(last_updated) VALUES(TIMESTAMP WITH TIME ZONE 'Tuesday July 11, 2023 at 08:00 AST');

id |    last_updated
----+-------------------------+
13 |   2023-07-11 11:00:00+00

```

we can store the timestamp we get from environment canada as it is without worrying about conversions. However, we might need conversion when we retrieve data from db.

```
select last_updated at time zone 'ADT' from table;
```

which returns the date time in atlantic date and time
