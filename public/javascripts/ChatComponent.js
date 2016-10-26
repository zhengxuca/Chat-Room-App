var React = require('react');


var UserListComponent = React.createClass({
    render: function() {
        return (
       
        <div id="userList">
        <h3>Online Users</h3>
        <hr/>
        <ul class="messages">

        </ul>
        </div>
        );
    }
});


var chatComponent = React.createClass({
    render: function () {
        return (
            
            <div>
            <div>

            <div id="messageList"> 
                <h3>Messages</h3>
                <hr/>
            <ul class="messages" > 
            
            </ul>
    
            </div>

            <UserListComponent />
            </div>

            <form action="#">
                <input id="inputMessage" placeholder="Enter Message" type="text" />
                <button>Send</button>
            </form>
            </div>
          
         
        );
    }
});



module.exports = chatComponent;