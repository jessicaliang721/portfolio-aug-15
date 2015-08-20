/* tutorial on scotch.io */

(function () {

	//CONSTRUCTOR
	this.Modal = function () {

		//create global element references - can reference pieces of the Modal from anywhere in plugin
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;

		//determine proper prefix
		this.transitionEnd = transitionSelect();

		//define option defaults;
		var defaults = {
			className: "zoom",
			closeButton: true,
			content: "",
			maxWidth: 800,
      		minWidth: 280,
      		overlay: true
		};

		// Create options by extending defaults with the passed in arugments

		// make sure arguments[0] exists, and that it is indeed an object
		if (arguments[0] && typeof arguments[0] === "object") {
			//merge the two objects using a privately scoped utility method, extendDefaults
			this.options = extendDefaults(defaults, arguments[0]);
		}
	};

	//PUBLIC METHODS
	//attach public method to Modal object's prototype. Each new instance shares the same methods
	//open the modal
	Modal.prototype.open = function() {
		//build out modal
		buildOut.call(this);

		//initialize event listeners - make sure any applicable events get bound
		initializeEvents.call(this);

		/* After adding elements to DOM, use getComputedStyle to force
			browser to recognize initial state. For CSS3 transitions*/
		window.getComputedStyle(this.modal).height;

		//add open class and check if modal is taller than the window. if so, apply my-anchored class
		this.modal.className = this.modal.className +
			(this.modal.offsetHeight > window.innerHeight ?
			" my-open my-anchored" : " my-open");
		this.overlay.className = this.overlay.className + " my-open";
	};

	Modal.prototype.close = function() {
		//store the value of this
		var _ = this;

		//remove 'my-open' class name
		this.modal.className = this.modal.className.replace(" my-open", "");
		this.overlay.className = this.overlay.className.replace(" my-open", "");

		//listen for CSS transitionEnd event then remove nodes from DOM
		//transitionEnd chooses transitions ending from transitionSelect
		this.modal.addEventListener(this.transitionEnd, function() {
			_.modal.parentNode.removeChild(_.modal);
		});
		this.overlay.addEventListener(this.transitionEnd, function() {
			if (_.overlay.parentNode) {
				_.overlay.parentNode.removeChild(_.overlay);
			}
		});
	};



	//PRIVATE METHODS

	//extend defaults with user options
	function extendDefaults(source, properties) {
		var property;
		//takes an object, loops through its properties
		for (property in properties) {
			//if it isn’t an internal property (hasOwnProperty)
			if (properties.hasOwnProperty(property)) {
				//assigns it to the source object
				source[property] = properties[property];
			}
		}
		return source;
	}

	//constructs a modal
	function buildOut() {
		var content, contentHolder, docFrag;

		//If content is an HTML string, append the HTML string.
		if (typeof this.options.content === "string") {
			content = this.options.content;
		}
		//If content is a domNode, append its content
		else {
			content = this.options.content.innerHTML;
		}

		//create a DocumentFragment to build with (construct collections of DOM elements)
		docFrag = document.createDocumentFragment();

		//create modal element
		this.modal = document.createElement("div");
		this.modal.className = "my-modal " + this.options.className; //my-modal class for initial styling
		this.modal.style.minWidth = this.options.minWidth + "px";
		this.modal.style.maxWidth = this.options.maxWidth + "px";

		//if closeButton option is true, add a close button
		if (this.options.closeButton === true) {
			this.closeButton = document.createElement("button");
			this.closeButton.className = "my-close close-button";
			this.closeButton.innerHTML = "x";
			this.modal.appendChild(this.closeButton);
		}

		//if overlay is true, add one
		if (this.options.overlay === true) {
			this.overlay = document.createElement("div");
			this.overlay.className = "my-overlay " + this.options.className;
			docFrag.appendChild(this.overlay);
		}

		//create content area and append to modal
		contentHolder = document.createElement("div");
		contentHolder.className = "my-content";
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		//append modal to DocumentFragment
		docFrag.appendChild(this.modal);

		//append DocumentFragment to body
		document.body.appendChild(docFrag);
	}

	//bind events to close button and/or overlay
	function initializeEvents() {
		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.close.bind(this)); //use 'bind' to pass reference to 'this,' which ref Modal obj
		}

		if (this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}
	}

	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) {
			return "webkitTransitionEnd";
		}
		if (el.style.OTransition) {
			return "oTransitionEnd";
		}
		return 'transitionend';
	}

}());

/* create content */

var holder = [];
var myContent = document.getElementsByClassName("modalcontent");
var openLink = document.getElementsByClassName("triggermodal");

for (var i = 0; i < myContent.length; i++) {
	
	var myModal = new Modal({
		content: myContent[i]
	});
	holder.push(myModal);
}

function makeClickHandler(i) {
	return function () {
		holder[i].open();
	};
}

for (i = 0; i < openLink.length; i++) {
	openLink[i].addEventListener("click", makeClickHandler(i));
}