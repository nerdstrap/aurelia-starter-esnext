import {inject, TaskQueue} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserAnalyzed, UserAuthenticated} from '../resources/messages/user-messages';
import {UserService} from '../services/user-service';
import {Global} from '../lib/Global';
import scrollTo from '../lib/helperAnimateScroll';
import {User} from '../models/user';
import _ from 'lodash';
import {email} from '../models/emailChannel';
import {phone} from '../models/phoneChannel';
//import TimerClass from "../models/timer";

@inject(Router, TaskQueue, UserService, EventAggregator, Global, User)

export class Login {
	constructor(router, taskQueue, userService, ea, Global, User) {
		this.router = router;
		this.taskQueue = taskQueue;
		this.userService = userService;
		this.ea = ea;
		ea.subscribe(UserAnalyzed, usr => this.showChallenge(usr.actionCode));
		ea.subscribe(UserAuthenticated, usr => this.showChallenge(usr.actionCode));
		this.global = Global;
		this.user = User;
		this.defaultLoginIsVisible;
		this.submitLoginButtonDivIsVisible;
		this.showLoginOptionsIsVisible = false;
		this.submitUserIDButtonDivIsVisible = true;
		this.authOtherMethodsDivIsVisible = false;
		this.userIdInputIsDisabled = false;
		this.activeEmailOTPChannel;
		this.activePhoneOTPChannel;
	}
	canAnalyze() {
		return this.user.userId && !this.userService.isRequesting;
	}

	created() {
		// things that happen during startup
	}

	analyze() {
		console.log('analyze invoked');
		this.userService.analyze({
			'username': this.username
		}).then(response => {
			this.ea.publish(new UserAnalyzed({'actionCode':'allow'}));
		});
	}

	authorize() {
		console.log('authorize invoked');
		this.userService.authorize({
			'username': this.username
		}).then(response => {
			this.ea.publish(new UserAuthenticated({'actionCode':'allow'}));
		});
	}

	showChallenge(actionCode) {
		console.log(actionCode);
	}

	submitUser() {
		if (event) {
			event.preventDefault();
		}
		$("#login_form").submit(event.preventDefault()); //execute form validation, but don't submit.
		if (this.user.userId.length > 0) {
			if (!$("#userIdInput").hasClass("is-invalid-input")) {
				var currentThis = this;
				var currentContext = this.global;
				var analyzeUserResponse;
				var deviceData = "192.168.0.0.1";
				var userId= this.user.userId;
				var ajaxData = $("#login_form").serializeArray();
				ajaxData.push({ name: 'userId', value: userId });
				ajaxData.push({ name: 'devicedata', value: deviceData });
				$.when(
                    $.ajax({
                    	type: "POST",
                    	url: "/api/user/analyzeuser", 
                    	dataType: "json",
                    	contentType: "application/x-www-form-urlencoded",
                    	data: ajaxData,
                    	success: function (ajaxMsg) {
                    		analyzeUserResponse = ajaxMsg;
                    	},
                    	error: function (ajaxError) {
                    		$('#service_error_modal').foundation('open');
                    	}
                    })
                ).done(function(){
                	currentContext.User.id = analyzeUserResponse.userId;
                	currentContext.User.sessionId = analyzeUserResponse.sessionId;
                	currentContext.Analyze.actionCode = analyzeUserResponse.actionCode;
                	currentContext.Analyze.authenticationTypes = analyzeUserResponse.authenticationTypes;
                	currentThis.user.rsaIsVisible = analyzeUserResponse.rsaIsVisible; 
                	currentThis.user.emailIsVisible = analyzeUserResponse.emailIsVisible;
                	currentThis.user.smsIsVisible = analyzeUserResponse.smsIsVisible;
                	currentThis.user.questionsIsVisible = analyzeUserResponse.questionsIsVisible;
                	currentThis.user.passwordIsVisible = analyzeUserResponse.passwordIsVisible;
                	currentThis.user.pinIsVisible = analyzeUserResponse.pinIsVisible;
                	currentThis.user.channelList = [];
                	currentThis.user.questionList = analyzeUserResponse.challengeQuestionAnswers;
                	for(var i = 0; i < analyzeUserResponse.emailInfos.length; i++){
                		currentThis.user.channelList.push(new email(this.ValidationController, {
                			"type": 'email',
                			"contactInfo": analyzeUserResponse.emailInfos[i].emailAddress,
                			"verified": analyzeUserResponse.emailInfos[i].verified,
                			"hasActiveToken": analyzeUserResponse.emailInfos[i].hasActiveToken
                		}));
                	}
                	for(var j = 0; j < analyzeUserResponse.phoneInfos.length; j++){
                		currentThis.user.channelList.push(new phone(this.ValidationController, {
                			"type": 'phone',
                			"contactInfo": analyzeUserResponse.phoneInfos[j].phoneNumber,
                			"verified": analyzeUserResponse.phoneInfos[j].verified,
                			"hasActiveToken": analyzeUserResponse.phoneInfos[j].hasActiveToken
                		}));
                	}
                    
                    if (analyzeUserResponse.actionCode === "ENROLL") {
                    	//user is new user, not registered in AA
                    	currentThis.defaultLoginIsVisible = true;
                    	currentThis.taskQueue.queueMicroTask(() => {
                    		currentThis.user.defaultPasswordHasFocus = true;
                    	});
                    	currentThis.submitLoginButtonDivIsVisible = true;
                    	currentThis.userIdInputIsDisabled = true;
                    } else if(analyzeUserResponse.actionCode === "CHALLENGE"){
                    	//user is registered with AA but is medium or high risk.
                    	currentThis.authOtherMethodsDivIsVisible = true;
                    	currentThis.defaultLoginIsVisible = false;
                    	currentThis.userIdInputIsDisabled = true;
                    	currentThis.user.showLoginOptionsIsVisible = false;
                    	currentThis.submitLoginButtonDivIsVisible = false;
                    } else {
				//user is registered with AA but is low risk.
                        currentThis.defaultLoginIsVisible = true;
				currentThis.taskQueue.queueMicroTask(() => {
					currentThis.user.defaultPasswordHasFocus = true;
				});
				currentThis.submitLoginButtonDivIsVisible = true;
				currentThis.user.showLoginOptionsIsVisible = true;
			}
		})
                currentThis.userIdInputIsDisabled = true;
		this.submitUserIDButtonDivIsVisible = false;
	}
} else {
            currentThis.user.userIdInputHasFocus = false;
currentThis.taskQueue.queueMicroTask(() => {
	currentThis.user.userIdInputHasFocus = true;
});
}
}

login(authMethod) {
	if (event) {
		event.preventDefault();
	}
	var credentialList = [this.user.rsaInput,this.user.emailInput,this.user.smsInput,this.user.passwordInput,this.user.pinInput];
	var credentials, authenticateUserResponse;
	var deviceData = "192.168.0.0.1";
	if(authMethod === "questions"){
		var hasQuestionAnswer = true;
		_.forEach(this.user.questionList, function(question) {
			if(question.userAnswerText.length <= 0){
				hasQuestionAnswer = false;
			}
		});
		if(hasQuestionAnswer){
			credentials = this.user.questionList;
		}
	} else {
		for(var i = 0;i < credentialList.length;i++){
			if (credentialList[i] != undefined && credentialList[i] != null && credentialList[i] != ""){
				credentials = credentialList[i];
			} 
		}
	}

        
	$("#login_form").submit(event.preventDefault()); //execute form validation, but don't submit.
	var currentContext = this;
	var ajaxData = [];
	ajaxData.push({ name: 'devicedata', value: deviceData });
	ajaxData.push({ name: 'credentials', value: credentials});
	ajaxData.push({ name: 'userId', value: currentContext.global.User.id});
	$.when(
		$.ajax({
			type: "POST",
			url: "./api/user/authenticateuser",
			contentType: "application/x-www-form-urlencoded",
			data: ajaxData,
			dataType: "json",
			success: function (ajaxMsg) {
				authenticateUserResponse = ajaxMsg;
			},
			error: function (ajaxError) {
				$('#service_error_modal').foundation('open');
			}
		})
	).done(function(){
		if(authenticateUserResponse.actionCode === "ALLOW"){
			currentContext.global.Authenticate.actionCode = authenticateUserResponse.actionCode;
			currentContext.global.User.name = "John A. Smith";
			currentContext.router.navigate("/self-service");
		} else {
			alert("Incorrect id or credentials");
		}
		currentContext.user.rsaInput = '';
		currentContext.user.emailInput = '';
		currentContext.user.smsInput = '';
		currentContext.user.passwordInput = '';
		currentContext.user.pinInput = '';
		currentContext.user.questionInputs = {"question1": '', "question2":'',"question3":''};
		currentContext.user.showLoginOptions = false;
	})
}

displayOptions() {
	if (event) {
		event.preventDefault();
	}
	document.other_methods_displayed = "yes";
	this.authOtherMethodsDivIsVisible = true;
	this.defaultLoginIsVisible = false;
	this.user.showLoginOptionsIsVisible = false;
	this.submitLoginButtonDivIsVisible = false;
}
cancelOTP(channel){
	//TODO: add service call to cancel a channel.
	//this.timer.stop();
	this.activeEmailOTPChannel = '';
	this.activePhoneOTPChannel = '';
}
sendOTP(channel) {
	//this.timer = new TimerClass(this.ea);
	//this.ea.subscribe('gameLoop', currentTime => {
	//    this.activePhoneOTPChannel.counter = currentTime
	//});
	//this.timer.stop();
	var authenticateUserResponse;
	var deviceData = "192.168.0.0.1";
	var ajaxData = [];
	var currentThis = this;
	ajaxData.push({ name: 'devicedata', value: deviceData });
	ajaxData.push({ name: 'userId', value: this.global.User.id});
	$.when(
		$.ajax({
			type: "POST",
			url: "./api/user/authenticateuser",
			contentType: "application/x-www-form-urlencoded",
			data: ajaxData,
			dataType: "json",
			success: function (ajaxMsg) {
				authenticateUserResponse = ajaxMsg;
			},
			error: function (ajaxError) {
				$('#service_error_modal').foundation('open');
			}
		})
	).done(function(){
		if (channel.type == "phone") {
			currentThis.activePhoneOTPChannel = channel;
			currentThis.activePhoneOTPChannel.counter = "<timer placeholder>";
		} else if (channel.type == "email") {
			currentThis.activeEmailOTPChannel = channel;
			currentThis.activeEmailOTPChannel.counter = "<timer placeholder>";
		}
	})
       
}

pageRefresh(){
	window.location.reload();
}

attached() {
	//Required to initialize Foundation framework inside Aurelia.
	$(document).foundation();
	this.taskQueue.queueMicroTask(() => {
		this.user.userIdInputHasFocus = true;        
	}); 
}
}
