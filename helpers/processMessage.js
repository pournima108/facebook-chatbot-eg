const API_AI_TOKEN = 'd4b40a57ba3645f3803c87e9e6901165';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAFvpI2KficBAGPOb5AeQqhZCq0ldbFxvHQt1VZAo5LUo48Is7290fcoRRx36BpsYCFv88fdHlPDzBke08Hp8uodhJKnZCtBTzDUho9g8RqvOvY0ELJ5bVPO1rHZB0jIuSae6VWOisZAIs5lUQRvdwMXnOZAe9mCLH8NL5ifB7IgZDZD';
const request = require('request');
var Zendesk = require('zendesk-node-api');
 
var zendesk = new Zendesk({
  url: 'https://bot7.zendesk.com', // https://example.zendesk.com
  email:'mishra.pournima108@gmail.com', // me@example.com
  token:  'l7R64UOf3vahmYe0R8KtNBdojaWxWlKaQrzzM11e',
})


const sendTextMessage = (senderId, text) => {
    request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
    recipient: { id: senderId },
    message: { text },
    }
    });
   };
   module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
   const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'pournima'});
   apiaiSession.on('response', (response) => {
     JSON.stringify(response);
    const result = response.result.fulfillment.speech;
    console.log(result);  
    sendTextMessage(senderId, result);    
    });
   apiaiSession.on('error', error => console.log(error));
   zendesk.tickets.create({
    subject: 'A new ticket',
    comment: {
      body: 'A ticket created with zendesk-node-api'
    }
  }).then(function(result){
    console.log("ticket created:",result);
  });
//create tickets
  
  
  zendesk.users.create({
    user: {"name": "HW zdjd", "email": "pooo@example.org"},
  }).then(function(result){
    console.log("user created:",result);
  });
  //create users
  
  zendesk.search.list('query=type:ticket status:open').then(function(results){
    console.log("searched ticket :",results);
  });
  //search the list of tickets
    apiaiSession.end();
   };