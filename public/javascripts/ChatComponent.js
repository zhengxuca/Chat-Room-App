var React = require('react');

var chatComponent = React.createClass({
    render: function () {
        return (
            <div>


            <userListComponent />
            </div>


        );
    }
});

var userListComponent = React.createClass({
    render: function() {

    }
});

module.exports = chatComponent;