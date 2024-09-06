export default {
	 sendMessageToIframe(message) {
    // Send the message to the iframe
		
    // postWindowMessage(message, PDF_Preview, "*");
		
  },

	download () {
		 this.sendMessageToIframe('print');

    // Trigger the print function inside the iframe
    // iframeContentWindow.;

	}

}