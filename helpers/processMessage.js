const API_AI_TOKEN = 'd4b40a57ba3645f3803c87e9e6901165';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAFvpI2KficBAHfh4zcdwhsHR7hZBz29BZASyfZBZBtZBxL4MHeRJOfLodZBuhpZBu3wec8k90RMvXpZBUtCxLFcRrQCN8s6ZCm14ZBjsZA0GJzhO4v3ijUqC6koVBBJ0iiOn3ZACeepJcrHzARUtQ2LhetITDR27NrafqPZBxkIHKvQd8QZDZD';
const request = require('request');
//var Zendesk = require('zendesk-node-api');
var Zendesk=require('node-zendesk');
 
// var client = Zendesk.createClient({
//   email:'wrestlingmania9@gmail.com', // me@example.com
//   token:  'l7R64UOf3vahmYe0R8KtNBdojaWxWlKaQrzzM11e',
//   remoteUri: 'https://humanbot.zendesk.com', // https://example.zendesk.com
// });

// client.users.list(function (err, req, result) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
// });

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
    console.log(senderId)
    const message = event.message.text;
    console.log(message)
   const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'pournima'});
   apiaiSession.on('response', (response) => {
     JSON.stringify(response);
    //const result = response.result.fulfillment.speech;
    console.log(response.result.fulfillment);
     
    //console.log(result);
    
       
    if(response.result.fulfillment.speech==''){
      result="connecting our live agent";
      // var ticket = {
      //   "ticket":
      //     {
      //       "subject":"My printer is on fire!",
      //       "comment": {
      //         "body": "The smoke is very colorful."
      //       }
      //     }
      //   };
      
      // client.tickets.create(ticket,  function(err, req, result) {
      //   if (err) return handleError(err);
      //   console.log(result);
      //   console.log(JSON.stringify(result, null, 2, true));
      // });
    } else{
     result=response.result.fulfillment.speech;
    }
  
  sendTextMessage(senderId, result); 
  })
    //search the list of
  apiaiSession.on('error', error => console.log(error));
  
//create tickets
  
  apiaiSession.end()
   }