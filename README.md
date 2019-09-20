# OnlineStoreApp
================

### How to run

- run in public folder and server ```npm install```
- run in public and in server folder  ```npm start```
- open ```http://localhost:8080```

Server-side collections:

- Clients: http://localhost:3000/api/v1/clients/
- Orders: http://localhost:3000/api/v1/orders/
- Payment Types: http://localhost:3000/api/v1/paymentTypes/
- Phones: http://localhost:3000/api/v1/phones/
- Decline Reasons: http://localhost:3000/api/v1/declineReasons/
- Delivery Types: http://localhost:3000/api/v1/deliveryTypes/
- Phone Models: http://localhost:3000/api/v1/phoneModels/
- Status Reasons: http://localhost:3000/api/v1/statusReasons/
- Statuses: http://localhost:3000/api/v1/statuses/


Rest: 
- get all GET http://localhost:3000/api/v1/phones/
- get one GET http://localhost:3000/api/v1/phones/{id}
- add POST http://localhost:3000/api/v1/phones/{id}
- update PUT http://localhost:3000/api/v1/phones/{id}
- delete DELETE http://localhost:3000/api/v1/phones/{id}