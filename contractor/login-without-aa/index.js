import {inject} from 'aurelia-framework';

export class LoginWithAA {
	constructor() {
	}

	login(authMethod) {
	    if (event) {
	        event.preventDefault();
	    }
	    $("#login_form").submit(event.preventDefault()); //execute form validation, but don't submit.
	    if ($("input#usernameInput").val().length === 0) {
	        //$("#usernameInput").addClass("is-invalid-input");
	        //$("#usernameInputErrorMsg").addClass("is-visible");
	        $("#usernameInput").focus();
	    } else {
	        if ($("#defaultPasswordInput").val().length === 0) {
	            //$("#defaultPasswordInput").addClass("is-invalid-input");
	            //$("#defaultPasswordInputErrorMsg").addClass("is-visible");
	            $("#defaultPasswordInput").focus();
	        } else {
	            if (!$("#defaultPasswordInput").hasClass("is-invalid-input")) {
	                location.assign('#/managesms');
	            }
	        }
	    }
	} 
    
	usernameInputKeyup(ev) {
	    var t = ev.target;
	    var key = ev.keyCode;
	    //on Enter Key
	    if (document.auth_type === "AA" && key==13) {
	        $("#nextButtonID").focus();
	        this.submitUser();
	    }
	}
    
	defaultPasswordInputKeyup(ev) {
	    var t = ev.target;
	    var key = ev.keyCode;
	    //on Enter Key
	    if (key==13) {
	        this.login('password');
	    }
	}

	attached() {
	    //Required to initialize Foundation framwork inside Aurelia.
	    //$(document).foundation();
        
	    //Set first field focus
	    $("#usernameInput").focus();
	}
}
