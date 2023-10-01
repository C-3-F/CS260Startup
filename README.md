# PyXel

PyXel is a collaborative art project where individual pixels of a 1920 x 1080 canvas are sold and can be customized to any of the thousands of RGB colors. Users can collaborate with each other offline to come together to create a masterpiece. Purchase more pixels next to each other to create more complex pieces of art!

## Key Features

* Asynchronous Editing and Live Update
* Organization of PyXels
* Account Editing with authentication

## Key Technologies
 * Authentication: Individual accounts that your PyXels are linked to
 * Database Data: Records accounts and state of PyXels
 * Websocket: Refreshing of the home page representing a live state of the canvas


## Basic Mockup

![Image](./docs/Prototype.png)	


## HTML Deliverable

For this deliverable I modified the following:

* Added html pages in the `/src` directory for the home page, myPyXels, sign in , and store
* Included placeholders on the home page for the live websocket data showing the status of the canvas
* Add placeholders on store and my PyXels page representing data fetched from database
* Add Sign in component form that links to the home page
* Add nav links on each page that link to each other

