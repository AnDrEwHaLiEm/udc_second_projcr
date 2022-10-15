<pre>
server port numbere = 3000
db port number = 5432

Database setup =>{
    CREATE DATABASE udc_second_project;
    CREATE DATABASE udc_second_project_test;
}

Environment variables =>{

    POSTGRES_HOST = 127.0.0.1
    POSTGRES_DB = udc_second_project
    POSTGRES_TEST_DB = udc_second_project_test
    POSTGRES_USER = postgres
    POSTGRES_PASSWORD = postgres
    PRIVATE_KEY = 
    eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NTQ5OTk2NiwiaWF0IjoxNjY1NDk5OTY2fQ.29ULaWLQCw6q_WhmsYS9f7V4Z_toNJ-Y1KSHFZP9yVQ
    ENV=dev
}



Package installation instructions =>{
        "scripts": {
          "build": "npx tsc",
          "start": "nodemon src/index.ts",
          "jasmin":"jasmine",
          "dev-server": "tsc-watch --noClear -p ./src/tsconfig.json --onSuccess \"node ./dist/index.js\"",
          "migrate": "db-migrate --env test up && db-migrate up",
          "destroy":"db-migrate --env test reset",
          "test": "ENV=test db-migrate --env test up &&npm run build && ENV=test npm run jasmin&& npm run destroy",
          "lint": "eslint . --ext .ts",
          "prettier": "prettier --config .prettierrc 'src/**/*.ts' --write"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.14",
    "@types/jasmine": "^4.3.0",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/node": "^18.7.18",
    "@types/pg": "^8.6.5",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.40.0",
    "@typescript-eslint/parser": "^5.40.0",
    "eslint": "^8.24.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "nodemon": "^2.0.20",
    "prettier": "^2.7.1",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.3"
  },
  "dependencies": {
    "@types/sharp": "^0.31.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.3",
    "express": "^4.18.1",
    "jasmine": "^4.4.0",
    "jasmine-spec-reporter": "^7.0.0",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.8.0",
    "sharp": "^0.31.0",
    "supertest": "^6.2.4"
  }
}

Setup db and server instructions --> postgres database

</pre>


