/* 
Each route uses a controller that does the action, but for each route we specify some functions (middlewares) to be called before the controller, like a data validator before doing any action
Then each verifications are done by a middleware
A middleware requires three params: request, response and next() so we had to inject mocked functions in it

If a middleware verification fails, the middleware will use res.status() function
If the verification works it will use the next() function
So we mock res and next and see which one has been called

EmailSenderService is replaced by checkLimit middleware
*/ 

require('./middlewares/user.js');
require('./middlewares/todolist.js');
require('./middlewares/item.js');

require('./user.js');
require('./todolist.js');
