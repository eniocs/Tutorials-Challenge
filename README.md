# Tutorials
 Tutorials SPA


Data model and associations

● Tutorial has id, title (required), video url (optional), description (optional), published
status (required), deleted at (optional).

● User can create, retrieve, update, delete Tutorials.

● There is a search box for finding Tutorials by title and description.

API Endpoints

VERB - PATH - Description

POST - /tutorials/ - Tutorial create

GET - /tutorials/ - Tutorial list
Should support query params as well for filtering

GET - /tutorials/:id - Tutorial show

DELETE - /tutorials/:id - Tutorial delete

PUT - /tutorials/:id - Tutorial update

DELETE - /tutorials/mass_delete - Delete all tutorials



-------------------------------------------
Run server: Node Tutorials-Server/server.js
