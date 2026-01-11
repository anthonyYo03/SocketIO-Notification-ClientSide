import React, { Component } from "react";

var notification;

class SimpleNotification extends Component {
    
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
   
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }
componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.showNotification();
      console.log("Date changed:", this.props.value);
    }
  }

  componentWillUnmount() {
    console.log("ComponentDidUnmount");
  }

  showNotification() {
    var options = {
      body: "This is the body of the Notification",
      icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      dir: "ltr"
    };
   notification = new Notification("Notification Demo", options);
}
  closeNotification() {
    notification.close();
}

  render() {
    return (
      <>
        In this project, Socket.IO is used to trigger desktop notifications on the front end every five seconds, demonstrating real-time communication between the server and client.
      </>
    );
  }
}

export default SimpleNotification;