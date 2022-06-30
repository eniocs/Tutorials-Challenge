# Tutorials
 Tutorials SPA
-------------------------------------------

Data model and associations

● Tutorial has id, title (required), video url (optional), description (optional), published
status (required), deleted at (optional).

● User can create, retrieve, update, delete Tutorials.

● There is a search box for finding Tutorials by title and description.

-------------------------------------------

API Endpoints



VERB - PATH - Description

POST - api/tutorials/ - Tutorial create

GET - api/tutorials/ - Tutorial list
Should support query params as well for filtering

GET - api/tutorials/:id - Tutorial show

DELETE - api/tutorials/:id - Tutorial delete

PUT - api/tutorials/:id - Tutorial update

DELETE - api/tutorials/mass_delete - Delete all tutorials



-------------------------------------------
Run server: Node Tutorials-Server/server.js
