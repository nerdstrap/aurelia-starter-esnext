import {inject, TaskQueue} from 'aurelia-framework';
import {Global} from '../lib/Global';
﻿import zxcvbn from 'zxcvbn';
import {User} from '../models/user';
import {email} from '../models/emailChannel';
import {phone} from '../models/phoneChannel';
import _ from 'lodash';

@inject(TaskQueue, Global, User)
export class selfServiceLandingPage {
    constructor(taskQueue, global, user) {
        var currentContext = this;
        this.taskQueue = taskQueue;
        var defaultCriticalErrorMsg = {"header":"CRITICAL ERROR", "msg":"Please try again or call the IT Service Desk for assistance if you continue to experience the error.", "icon":"fa-exclamation-triangle"};
        currentContext.meterColorClass = "bad";
        currentContext.confirmPasswordValue = "";
        currentContext.passwordStrengthScore = 0;
        currentContext.passwordResetDisabled = true;
        currentContext.passwordHasBeenReset = false;
        currentContext.addQuestionDisabled = true;
        currentContext.addPhoneButtonFocus = false;
        currentContext.addEmailButtonFocus = false;
        currentContext.userId = global.User.id;
        currentContext.userName = global.User.name;
        currentContext.sessionId = global.User.sessionId;
        currentContext.userQuestionList;
        currentContext.fullQuestionList;
        currentContext.availQuestionList;
        currentContext.analyzeActionCode = global.Analyze.actionCode;
        currentContext.authActionCode = global.Authenticate.actionCode;
        currentContext.token = "";
        currentContext.isUnlocked = false;
        currentContext.user = user;
        currentContext.ValidationController = this.user.controller;
        //Add Question Vals
        currentContext.questionMatcher = (a, b) => a.iD === b.iD;
        currentContext.selectedQuestion;

        var response;
        var ajaxData = [];
        ajaxData.push({ name: 'userId', value: currentContext.userId});
        ajaxData.push({ name: 'sessionId', value: currentContext.sessionId});
        $.when(
                $.ajax({
                    type: "POST",
                    url: "./api/user/getuser",
                    contentType: "application/x-www-form-urlencoded",
                    data: ajaxData,
                    dataType: "json",
                    success: function (ajaxMsg) {
                        response = ajaxMsg;
                    },
                    error: function (ajaxError) {
                        currentContext.errorOptions = defaultCriticalErrorMsg;
                        $('#service_error_modal').foundation('open');
                    }
                })
            ).done(function () {
                currentContext.userId = response.userId;
                currentContext.userName = response.userId;
                currentContext.user.channelList = [];
                for(var i = 0; i < response.emailInfos.length; i++){
                	currentContext.user.channelList.push(new email(this.ValidationController, {
                		"type": 'email',
                		"contactInfo": response.emailInfos[i].emailAddress,
                		"verified": response.emailInfos[i].verified,
                		"hasActiveToken": response.emailInfos[i].hasActiveToken
                	}));
                }
                for(var j = 0; j < response.phoneInfos.length; j++){
                	currentContext.user.channelList.push(new phone(this.ValidationController, {
                		"type": 'phone',
                		"contactInfo": response.phoneInfos[j].phoneNumber,
                		"verified": response.phoneInfos[j].verified,
                		"hasActiveToken": response.phoneInfos[j].hasActiveToken
                	}));
                }
                currentContext.userQuestionList = response.challengeQuestionAnswers;
                var ajaxDataFql = [];
                var responseFql;
                ajaxDataFql.push({ name: 'sessionId', value: currentContext.sessionId});
                $.when(
                        $.ajax({
                        	type: "POST",
                            url: "/api/user/getchallengequestions",
                            contentType: "application/x-www-form-urlencoded",
                            data: ajaxData,
                            dataType: "json",
                            success: function (ajaxMsg) {
                                responseFql = ajaxMsg;
                            },
                            error: function (ajaxError) {
                                $('#service_error_modal').foundation('open');
                            }
                        })
                    ).done(function () {
                        currentContext.fullQuestionList = responseFql.challengeQuestions;
                        //currentContext.availQuestionList = responseFql;

                        if(currentContext.fullQuestionList !== undefined)
                        {
                            var length = currentContext.fullQuestionList.length, el = null;                            
                            var aQl = [];
                            for (var i = 0; i < length; i++) {
                                el = currentContext.fullQuestionList[i];
                                if(currentContext.userQuestionList.findIndex(x=>x.id == el.id) == -1)
                                {
                                    aQl.push(el);
                                }
                            }
                            currentContext.availQuestionList = aQl;
                        }

                    })
            })
    }

    resetPassword() {
        if (event) {
            event.preventDefault();
        }
        var currentContext = this;
        var resetResponse;
        var ajaxData = $("#newPasswordForm").serializeArray();
        ajaxData.push({ name: 'userId', value: this.userId });
        $.when(
            $.ajax({
                type: "POST",
                url: "./api/user/resetcredentials",
                contentType: "application/x-www-form-urlencoded",
                data: ajaxData,
                dataType: "json",
                success: function (ajaxMsg) {
                    resetResponse = ajaxMsg;
                },
                error: function (ajaxError) {
                    currentContext.errorOptions = defaultCriticalErrorMsg;
                    $('#service_error_modal').foundation('open');
                }
            })
        ).done(function(){
            if(resetResponse.success){
                currentContext.passwordHasBeenReset = true;
            } else {
                alert("You must enter a new password.");
            }
        })
    }
    addNewChannel(type) {
		if (event) {
            event.preventDefault();
        }
        if(type === "email"){
            this.user.channelList.push(new email(this.ValidationController, {
                "type": type,
                "contactInfo": "",
                "verified": false,
                "hasActiveToken": false,
				channelInputFocus:false,
				channelTokenFocus:false,
				channelConfirmNewButtonDisabled:true,
				channelIsReadOnly:false
            }));
        } else {
            this.user.channelList.push(new phone(this.ValidationController, {
                "type": type,
                "contactInfo": "",
                "verified": false,
                "hasActiveToken": false,
				channelInputFocus:false,
				channelTokenFocus:false,
				channelConfirmNewButtonDisabled:true,
				channelIsReadOnly:false
            }));
        }
        this.user.channelList[this.user.channelList.length - 1].validateMe();
		var newChannelIndexIs = (this.user.channelList.length - 1);
        this.taskQueue.queueMicroTask(() => {
        this.user.channelList[newChannelIndexIs].channelInputFocus = true;
        });
    }
    AddContactInfo(channel) {
        if(channel.contactInfo.length >= 10){
            if(_.filter(this.user.channelList, function(o) { return o.contactInfo == channel.contactInfo;  }).length <= 1){
                var addSmsResponse;
                var currentContext = this;
                var ajaxData= [];
                ajaxData.push({ name: 'userId', value: currentContext.userId });
                ajaxData.push({ name: 'contactInfo', value: channel.contactInfo });
                ajaxData.push({ name: 'contactType', value: channel.type });
                $.when(
                    $.ajax({
                        type: "POST",
                        url: "./api/user/addcontactinfo",
                        contentType: "application/x-www-form-urlencoded",
                        data: ajaxData,
                        dataType: "json",
                        success: function (ajaxMsg) {
                            addSmsResponse = ajaxMsg;
                        },
                        error: function (ajaxError) {
                            currentContext.errorOptions = defaultCriticalErrorMsg;
                            $('#service_error_modal').foundation('open');
                        }
                    })
                ).done(function(){
                   
                })
                 return true;
            } else {
                channel.addError();
                return false;
            }
        }
    }
    confirmDelete(channel){
        if (event) {
            event.preventDefault();
        }
        if (channel.confirmDelete) {
            channel.confirmDelete = false;
        } else {
            channel.confirmDelete = true;
        }
    }
    RemoveContactInfo(channel) {
        if (event) {
            event.preventDefault();
        }
        var addSmsResponse;
        let index = this.user.channelList.indexOf(channel);
        var ajaxData = [];
        ajaxData.push({ name: 'contactType', value: channel.type });
        ajaxData.push({ name: 'contactInfo', value: this.user.channelList[index].contactInfo});
        ajaxData.push({ name: 'verified', value: this.user.channelList[index].Verified });
        var currentContext = this;
        $.when(
            $.ajax({
                type: "POST",
                url: "./api/user/removecontactinfo",
                contentType: "application/x-www-form-urlencoded",
                data: ajaxData,
                dataType: "json",
                success: function (ajaxMsg) {
                    addSmsResponse = ajaxMsg;
                },
                error: function (ajaxError) {
                    currentContext.errorOptions = defaultCriticalErrorMsg;
                    $('#service_error_modal').foundation('open');
                }
            })
        ).done(function(){
            if (index !== -1) {
                currentContext.user.channelList.splice(index, 1);
            }
        })     
    }
    cancel(ev,channel){
        if (event) {
            event.preventDefault();
        }
        channel.token = "";
        channel.hasActiveToken = false;
        channel.channelIsReadOnly = false;
        this.taskQueue.queueMicroTask(() => {
            channel.channelInputFocus = true;
        });
    }
    verify(channel){
        var parentThis = this;
        var currentContext = channel;
        if (channel.type === "phone" | channel.type === "email"){
            if(this.AddContactInfo(channel)){
                currentContext.channelIsReadOnly = true;
                var ajaxData = [];
                ajaxData.push({ name: 'userId', value: currentContext.userId});
                ajaxData.push({ name: 'contactType', value: channel.type});
                ajaxData.push({ name: 'contactInfo', value: channel.number });
                ajaxData.push({ name: 'token', value:channel.token});
                var response;
                var currentTime;
                var tokenSent;
                $.when(
                   $.ajax({
                       type: "POST",
                       url: "./api/user/verifycontactinfo",
                       contentType: "application/x-www-form-urlencoded",
                       data: ajaxData,
                       dataType: "json",
                       success: function (ajaxMsg) {
                           response = ajaxMsg;
                       },
                       error: function (ajaxError) {
                           currentContext.errorOptions = defaultCriticalErrorMsg;
                           $('#service_error_modal').foundation('open');
                       }
                   })
               ).done(function(){
                   currentTime = response.timeOfTokenSent;
                   //var responseTwo;
                   //var ajaxData = [];
                   //ajaxData.push({ name: 'id', value:sessionStorage.getItem('id')});
                   //ajaxData.push({ name: 'sessionid', value: sessionStorage.getItem('sessionId')});
                   //$.when(
                   //        $.ajax({
                   //            type: "POST",
                   //            url: "./api/user/getuserdetails",
                   //            contentType: "application/x-www-form-urlencoded",
                   //            data: ajaxData,
                   //            dataType: "json",
                   //            success: function (ajaxMsg) {
                   //                responseTwo = ajaxMsg;
                   //            },
                   //            error: function (ajaxError) {
                   //                $('#service_error_modal').foundation('open');
                   //            }
                   //        })
                   //    ).done(function () {
                   //        currentContext.userId = responseTwo.id;
                   //        currentContext.userName = responseTwo.userName;
                   //        currentContext.userNumbers = responseTwo.smsNumbers;
                   //        currentContext.userEmails = responseTwo.emailAddresses; 
                   //    })
                   if(!channel.hasActiveToken)
                   { 
                       channel.hasActiveToken  = true;
                       parentThis.taskQueue.queueMicroTask(() => {
                           channel.channelTokenFocus = true;
                       });
                   
                   } else {
                       channel.hasActiveToken = false;
                   }
                   if(channel.token){
                       channel.verified = true;
                       if(channel.type === "phone"){
                           parentThis.taskQueue.queueMicroTask(() => {
                               parentThis.addPhoneButtonFocus = true;
                           });
                       } else {
                           parentThis.addEmailButtonFocus = true;
                       }
                   }
               })
            } 
        }
    }

    addQuestion() {
        if (event) {
            event.preventDefault();
        }
        var currentContext = this;
        var svcResponse;
        var question = currentContext.selectedQuestion;
        question.Answer = currentContext.user.selectedQuestionAnswer;
        var ajaxData = [];
        ajaxData.push({ name: 'userId', value: currentContext.userId});
        ajaxData.push({ name: 'challengeQuestionId', value: question.id});
        ajaxData.push({ name: 'userAnswerText', value: question.Answer});
        $.when(
            $.ajax({
                type: "POST",
                url: "./api/user/addchallengequestionanswer",
                contentType: "application/x-www-form-urlencoded",
                data: ajaxData,
                dataType: "json",
                success: function (ajaxMsg) {
                    svcResponse = ajaxMsg;
                },
                error: function (ajaxError) {
                    $('#service_error_modal').foundation('open');
                }
            })
        ).done(function(){
            currentContext.availQuestionList = $.grep(currentContext.availQuestionList, function(e){ 
                return e.id != question.id; });
            //clear the answer from the model
            question.Answer = "";
            currentContext.userQuestionList.push(question);
            currentContext.selectedQuestion = null;
            currentContext.user.selectedQuestionAnswer = "";

            currentContext.taskQueue.queueMicroTask(() => {
                currentContext.questionSelectFocus = true; 
                currentContext.addQuestionDisabled = true;
            }); 

        })     
    }    
    removeQuestion(question) {
        var svcResponse;
        let index = this.userQuestionList.indexOf(question);
        var ajaxData = [];
        ajaxData.push({ name: 'userId', value: currentContext.userId});
        ajaxData.push({ name: 'challengeQuestionAnswerId', value: this.userQuestionList[index].id});
        var currentContext = this;
        $.when(
            $.ajax({
                type: "POST",
                url: "./api/user/removechallengequestionanswer",
                contentType: "application/x-www-form-urlencoded",
                data: ajaxData,
                dataType: "json",
                success: function (ajaxMsg) {
                    svcResponse = ajaxMsg;
                },
                error: function (ajaxError) {
                    $('#service_error_modal').foundation('open');
                }
            })
        ).done(function(){
            if (index !== -1) {
                currentContext.userQuestionList.splice(index, 1);
                currentContext.availQuestionList.push(question);
                currentContext.availQuestionList = _.uniq(currentContext.availQuestionList);//make sure all in the array is unique, other wise we had duplicate on first deletion. 
            }
            if (currentContext.userQuestionList.length < 5) {
                currentContext.taskQueue.queueMicroTask(() => {
                    currentContext.questionSelectFocus = true; 
                    currentContext.addQuestionDisabled = true;
                }); 
            }
        })     
    }


    pageRefresh(){
        //TODO: This worked well when using sessionStorage, but no longer works with Global.js class to store session state. What to do after critical system errors needs improvement.
        //window.location.reload();
        $('#service_error_modal').foundation('close');
    }

    addQuestionListener(ev){
        if (this.user.selectedQuestionAnswer.length > 0) {
            this.addQuestionDisabled = false;
        } else {
            this.addQuestionDisabled = true;
        }
        if(ev.keyCode==13){
            this.addQuestion();
        }
    }
    passwordMeterListener(){
        var currentContext = this;
        var result = zxcvbn(currentContext.user.newPasswordValue);
        var regexCounter = 0;
        var regexList = [/.*\d.*/,/.*[A-Z].*/,/.*[a-z].*/,/.*[!@#$%^&*()].*/];//Regex explanations: [/contains 1 number/,/contains 1 uppercase character/,/contains 1 lowercase character/,/contains 1 approved special character/]
        for(var i = 0;i <regexList.length;i++){
            if(regexList[i].test(currentContext.user.newPasswordValue)){
                regexCounter++;
            }
        }
        if(regexCounter >= 3 && currentContext.user.newPasswordValue.length >= 8){
            if(currentContext.confirmPasswordValue === currentContext.user.newPasswordValue){
                currentContext.passwordResetDisabled = false;
            } else {
                currentContext.passwordResetDisabled = true;
            }
            currentContext.passwordStrengthScore = result.score;
            switch (result.score) {
                case 2:
                    currentContext.meterColorClass = "weak";
                    break;
                case 3:
                    currentContext.meterColorClass = "good";
                    break;
                case 4:
                    currentContext.meterColorClass = "strong";
                    break;
                default:
                    currentContext.meterColorClass = "bad";
            } 
        } else {
            currentContext.passwordResetDisabled = true;
            currentContext.meterColorClass = "bad";
            currentContext.passwordStrengthScore = 0;
        }
    }
    unlockPassword() {
        var UnlockResponse;
        var currentContext = this;
        var ajaxData = [];
        ajaxData.push({ name: 'userId', value: currentContext.userId});
        ajaxData.push({ name: 'sessionId', value: currentContext.sessionId});
        $.when(
            $.ajax({
                type: "POST",
                url: "./api/user/unlockcredentials",
                contentType: "application/x-www-form-urlencoded",
                data: ajaxData,
                dataType: "json",
                success: function (ajaxMsg) {
                    UnlockResponse = ajaxMsg;
                },
                error: function (ajaxError) {
                    $('#service_error_modal').foundation('open');
                }
            })
        ).done(function(){
            if(UnlockResponse.success){
                currentContext.isUnlocked = true;
            }
        })
    }
    onEnterSubmitEmail(ev,channel){
        channel.validateMe();
        ev.preventDefault();
        if(ev.keyCode==13){
            this.verify(channel);
        }
    }
    onEnterVerifyToken(ev,channel){
        ev.preventDefault();
        if(ev.keyCode==13){
            this.verify(channel);
        }
    }
    formatPhoneOnkeyup(ev,channel) {
        channel.validateMe();
        //function formats phone numbers like 111-111-1111 during input:
        var t = ev.target;
        var len = t.value.length;
        var key = ev.keyCode;
        if( (key>=48 && key<=58) | (key>=96 && key<=105) ) {
            if( len==3 )t.value=t.value+'-'
            else if(len==7 )t.value=t.value+'-'
            else t.value=t.value;
            //see if final number is correct:
            if( len>12) {
                t.value=t.value.substring(0,len-1);
                len = t.value.length;                
            }
        } else if (len==12 & key==13) {
            this.verify(channel);
        } else if (key==8 | key==9 | key==16 | key==17 | key==18 | key==20 | key==38 | key==39 | key==40 | key==46 | key==91 | key==92 | key==93) {
            //do nothing
        } else {
            t.value=t.value.substring(0,len-1);
            len = t.value.length;
        }
    }
    attached() {
        //Required to initialize Foundation framwork inside Aurelia.
        $(document).foundation();
        if (this.analyzeActionCode === "ENROLL") {
            $("a#accordItemChannelManagement").click();
            $("a#accordItemChannelManagement").unbind("click");
            $("a#accordItemChannelManagement").removeAttr("href");
        } else {
            if (this.authActionCode === "ALLOW") {
                $("#accordItemPwdReset").removeClass("is-hidden");
                $("#accordItemAccountUnlock").removeClass("is-hidden");
            }
        }
    }
} 
