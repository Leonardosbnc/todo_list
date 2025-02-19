## TO-DO LIST

This project implements a full-stack web application that allow users to crate an account and manage TO-DOs

- Tech Stack: Rails and React
- Email provider: Postmark
- Features:
  - User creation
  - Recover User password
  - JWT auth flow
  - List and Filter To-do's
  - Create, Edit, Complete and Delete To-do

## Running the api

- Devcontainer (recommeded)

  - Requirements: VS Code and Docker

  - Run "code api/"
  - Create env file and add required envs (check .env.example)
  - Install VS Code "Dev Containers" extension
  - Open VS Code Command Palette and search for "Dev Containers: Reopen in Container"

  It will automatically intall the app, create database and start the server on port 3000

- No Devcontainer

  - Requirements: Ruby 3.1.4 and Postgres

  - Start postgres server
  - Navigate into "api" on your text editor
  - Create env file and add required envs (check .env.example)
  - Install dependencies "bundle install"
  - Setup DB "rails db:setup"
  - Run migrations "rails db:migrate"
  - Start server "rails s"
  - Ther server will be available on port 3000

## Running frontend

- Navigate into "web_app"
- Create env file and add required envs
- Install dependencies "npm i"
- Start app "npm run dev"
- App running on port 3001
