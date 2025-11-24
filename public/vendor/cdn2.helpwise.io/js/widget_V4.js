
let conversationID = "";
let currentThreadId = "";
let previousConversationID = "";
let allConversations = [];
let currentPage = "HOMEPAGE";
let mobileView = MOBILE_VIEW;
let receiveSoundID = "Chat-Receive";
let sendSoundID = "Chat-send";
let engageSoundID = "Chat-Engage-Pop";
let offset = 0;
let limit = 15;
let closeFlag = false;
let isOffsetAdded = false;
let isTimezoneFetched = false;
let timezoneArray = [];
let isDetailProvidedByContact = false;
let isHCLoaded = false;
let isBotInterrupted = false;
let haveMoreThreads = true;
let isBrowserSafari = BROWSER.toLowerCase().includes("safari") ? true : false;
let conversationPage = 0;
let isAiBotActive = {};

let chat_attachmentIdMap = {};
let chat_files = new Set();
let chat_uploadFile = new Map();
let chatImgUrls = [];
let mailboxName = MAILBOX_NAME ? MAILBOX_NAME : "Support Team";
let showLeadDisplay = leadDisplay == "1" ? true : false;

let bots = {};
let currentBotId = "";
let currentBotData = {};
let isBotDataFetched = false;
let triggerBotThreadFirebase = false;

const WIDGET_LANGUAGE = JSON.parse(widget_language);
const WIDGET_LANG_CODE = WIDGET_LANGUAGE["language-code"];

const widgetOperationsData = JSON.parse(decodeURIComponent(escape(atob((widgetAutoReply)))));

let iframeDisplay = "OFF";

let displayCrossButton = mobileView == "ON" || OS == "iPad" ? "d-flex" : "d-none";

let isWidgetManuallyClosed = false;
let activeBotPathId = 0;


let linearGradientColor = "linear-gradient(to right," + SELECTED_COLOR + " 0," + GRADIENT_COLOR + " 100%)";
let linearLightGradientColor = "linear-gradient(to right," + SELECTED_COLOR + "aa 0," + GRADIENT_COLOR + "aa 100%)";


let isConversationPaginationLoaded = true;

let incomingMessageApiEndpoint = "/api/chat-widget/send_message_univ.php";

let fgColor = tinycolor(SELECTED_COLOR).isDark() ? "#fff" : "#000";
let fgColorLight = tinycolor(SELECTED_COLOR).isDark() ? "#fffe" : "#000b";
let fgColorIcon = tinycolor(SELECTED_COLOR).isDark() ? "#fff" : "#282828";

let imageUploading = false;

console.log("WIDGET v4 loaded");

let relativeMomentTime = {
    future: "in %s",
    past: number => (number == "just now" ? "now" : `${number} ago`) == "now ago" ? 'now' : (number == "just now" ? "now" : `${number} ago`),
    s: "now",
    ss: "now",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "%dd",
    dd: "%dd",
    M: "%dM",
    MM: "%dM",
    y: "%dY",
    yy: "%dY"
};

moment.updateLocale(WIDGET_LANG_CODE, { relativeTime: relativeMomentTime })
let uploadURL;
if (JUSTCALL_ENV == 1) {
    uploadURL = 'https://inbox.justcall.io/api/chat-widget/uploadInlineAttachment.php';
} else {
    if (STAGE == "dev") {
        uploadURL = 'https://app.helpwise.local/api/chat-widget/uploadInlineAttachment.php';
    } else if (STAGE == "staging") {
        uploadURL = 'https://staging.app.helpwise.io/api/chat-widget/uploadInlineAttachment.php';
    } else {
        uploadURL = 'https://app.helpwise.io/api/chat-widget/uploadInlineAttachment.php';
    }
}
froala = new FroalaEditor('#widgetMessageEditor', {
    enter: FroalaEditor.ENTER_BR,
    heightMin: 20,
    heightMax: 150,
    charCounterCount: false,
    emoticonsUseImage: false,
    key: 'fIE3A-9E2D1G1A4C4D4td1CGHNOa1TNSPH1e1J1VLPUUCVd1FC-22C4A3C3C2D4F2B2C3B3A1==',
    attribution: false,
    quickInsertEnabled: false,
    placeholderText: WIDGET_LANGUAGE["editorPlaceholder"],
    toolbarBottom: true,
    toolbarButtons: {
        moreRich: {
            buttons: ['emoticons'],
            buttonsVisible: 1
        }
    },
    linkAttributes: {
        target: "_blank"
    },
    linkAlwaysBlank: true,
    zIndex: 1000,
    tableColors: ['REMOVE'],
    htmlAllowedEmptyTags: ['textarea', 'a', 'iframe', 'object', 'video', 'style', 'script', '.fa', '.fr-emoticon', '.fr-inner', 'path', 'line', 'hr', 'span', 'p', 'circle'],
    htmlAllowedTags: ['.*'],
    htmlAllowedAttrs: ['.*'],
    htmlRemoveTags: ['script'],
    events: {
        'link.beforeInsert': function (link, text, attrs) {
            attrs.title = link;
            attrs.target = "_blank";
        },
        keydown: function (e) {
            if (e.which == FroalaEditor.KEYCODE.ENTER && !e.shiftKey) {
                e.preventDefault();
                $("#send-message").click();
            }
        },
        'image.beforeUpload': function (images) {
            imageUploading = true;
        },
        'image.uploaded': function (response) {
            imageUploading = false;
            $('.image-uploading-message').addClass("d-none");
        }

    },
    imagePasteProcess: true,
    imageUploadParams: {
        mailboxID: location.href.split("/")[4],
        emailID: "0",
        type: "public"
    },
    imageDefaultAlign: 'left',
    imageUploadURL: uploadURL,
    imageUploadParam: 'files[]'
}, () => {
});

$('.widgetMessagePage').on('dragover', function () {
    $('#widgetMessageEditor').find('.fr-element').css('height', '50px');
});

$('.widgetMessagePage').on('dragleave', function () {
    $('#widgetMessageEditor').find('.fr-element').css('height', '20px');
});

$(document).ready(async function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="popover"]').on("mouseenter", function () {
        $(this).popover("show");
    });

    $('[data-toggle="popover"]').on("mouseleave", function () {
        $(this).popover("hide");
    });

    if (TEXT_COLOR != 0) {
        fgColor = TEXT_COLOR == 2 ? "#000" : "#fff";
        fgColorLight = TEXT_COLOR == 2 ? "#000b" : "#fffe";
        fgColorIcon = TEXT_COLOR == 2 ? "#282828" : "#fff";
    }

    let { h, s, l, a } = tinycolor(SELECTED_COLOR).toHsl();
    let g = tinycolor(GRADIENT_COLOR).toHsl();


    document.querySelector(":root").style.setProperty("--hw-fg-color", fgColor);
    document.querySelector(":root").style.setProperty("--hw-fg-color-light", fgColorLight);
    document.querySelector(":root").style.setProperty("--selected-h", h);
    document.querySelector(":root").style.setProperty("--selected-s", (s * 100) + "%");
    document.querySelector(":root").style.setProperty("--selected-l", (l * 100) + "%");
    document.querySelector(":root").style.setProperty("--selected-a", a);
    document.querySelector(":root").style.setProperty("--gradient-h", g['h']);
    document.querySelector(":root").style.setProperty("--gradient-s", (g['s'] * 100) + "%");
    document.querySelector(":root").style.setProperty("--gradient-l", (g['l'] * 100) + "%");
    document.querySelector(":root").style.setProperty("--gradient-a", g['a']);

    sendMessageToParent("HelpwiseWidgetFgColor", { color: fgColorIcon });


    if (widgetOperationsData && widgetOperationsData.selectedOperation && widgetOperationsData.selectedOperation == "performActionOnWidgetVisibility") {
        let shouldStopExecution = false;

        let isDuringWHFlag = await processWorkingHours(widgetOperationsData);
        let operationsData = widgetOperationsData.operationData
        if (operationsData) {

            if (isDuringWHFlag && operationsData.widgetOnOffWhen == 1) {
                // agr dono same hai or widget on hai toh widget on else off
                if (operationsData.widgetOnOff == 0) {
                    shouldStopExecution = true;
                }
            } else if (!isDuringWHFlag && operationsData.widgetOnOffWhen == 0) {
                // agr dono same hai or widget on hai toh widget on else off
                if (operationsData.widgetOnOff == 0) {
                    shouldStopExecution = true;
                }
            } else {
                // agr dono alg hai or widget on hai toh widget off hoga else on hoga
                if (operationsData.widgetOnOff == 1) {
                    shouldStopExecution = true;
                }
            }
        }

        if (shouldStopExecution) {
            throw new Error("Not the right time to load widget");
        }
    }

    if (iframeDisplay == "OFF") {
        turnChatWidgetPopOn();
        $("#hw_message_box").html("");
        $("#send_message_area").addClass("d-none");
    } else if (iframeDisplay == "ON") {
        turnChatWidgetOn();
        $("#send_message_area").addClass("d-none");
    }

    if ((IS_LEAD_FORM_MANDATORY == "1" || IS_LEAD_FORM_MANDATORY == true) && CONTACT_TYPE == "1") {
        isDetailProvidedByContact = false;
    } else {
        isDetailProvidedByContact = true;
    }

    mailboxUnreadMessageCount(MAILBOX_ID, CONTACT_ID);

    openThread();

    // mailboxUnreadChatMessageCount(MAILBOX_ID, CONTACT_ID);
    checkOutboundTriggers(MAILBOX_ID, MAILBOX_MANAGER, CONTACT_ID, USER_COOKIE, decodeURIComponent(CURRENT_URL));


    let editorElement = $(".chat_message_div")[0];
    let editorResizeObserver = new ResizeObserver(() => {
        // widgetMessageEditor is just a input form, 34 offset because of padding around it.
        let widgetActualheight = $(".chat_message_div").height();
        $("#messageBoxContainer").css("bottom", widgetActualheight);
        $(".conversation_messages_box").css("bottom", widgetActualheight);
    });

    editorResizeObserver.observe(editorElement);


    changeWidgetPage("homepage");

    $(".message_input").focus(function () {
        $(".chat_message_div").css("box-shadow", "rgba(0,0,0,0.1) 0px 0px 100px 0px");
    })

    $(".message_input").focusout(function () {
        $(".chat_message_div").css("box-shadow", "none");
    })

    $(document).on("click", "#close_widget_display", function () {
        iframeDisplay = "OFF";
        turnChatWidgetPopOn();

        sendMessageToParent("HelpwiseWidgetCloseMessage");
        // window.top.postMessage("HelpwiseWidgetCloseMessage", "*");

        mailboxUnreadMessageCount(MAILBOX_ID, CONTACT_ID);
        increaseIframeHeight(0, "#hw_offChat_thread");
    });

    $('#upload_image_input').on('click', function () {
        $(this).val('');
    });

    $('#upload_image_input_pop').on('click', function () {
        $(this).val('');
    });

    if (showLeadDisplay || IS_LEAD_FORM_MANDATORY == "1" || IS_LEAD_FORM_MANDATORY == true) {

        $(document).on("click", "#hw-submit-lead-email", function () {
            let leadEmail = $("#lead_email").val();

            if (leadEmail.trim().length > 0) {
                let testEmail = testEmailPattern(leadEmail);
                if (!testEmail) {
                    $(this).addClass("is-invalid");
                    $("#lead_email_error").text("Please enter correct email").show();
                } else {
                    $(this).removeClass("is-invalid");
                    $("#lead_email_error").text("").hide();
                    $("#hw-submit-lead-email").addClass("d-none");
                    $("#hw-lead-loader").removeClass("d-none");
                    $("#lead_email").attr("readonly", true);
                    $("#lead_email").css("background", "aliceblue");
                    $("#hw-lead-form").css("background", "aliceblue");
                    updateUserContact(CONTACT_ID, leadEmail);
                }
            }
        })

        $(document).on("keydown", "#lead_email", function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                $("#hw-submit-lead-email").click();

            } else {
                let typedEmail = $(this).val();
                let testEmail = testEmailPattern(typedEmail);
                if (!testEmail) {
                    $(this).addClass("is-invalid");
                } else {
                    $(this).removeClass("is-invalid");
                }
            }
        })
    }

    if (IS_LEAD_FORM_MANDATORY == "1" || IS_LEAD_FORM_MANDATORY == true) {


        $("#hw_lead_email").on("keyup", function () {
            let leadEmail = $("#hw_lead_email").val().trim();
            let emailRegEx = /.+\@.+\..+/gs;

            let emailTestFlag = false;
            if (emailRegEx.test(leadEmail)) {
                emailTestFlag = true;
                $("#hw_lead_email").addClass("is-valid").removeClass("is-invalid");
            } else {
                emailTestFlag = false;
                $("#hw_lead_name").removeClass("is-invalid");
                $("#hw_sendFirstMessage").removeClass("is-invalid");
                $("#hw_lead_email").addClass("is-invalid").removeClass("is-valid");
            }
        })


        $(document).on("click", "#submitLeadFormDetails", function () {

            let havePhoneField = $("#hw_lead_phone").length > 0 ? true : false;
            let haveCustomField = $(".hw_lead_custom_field").length > 0 ? true : false;
            let customFields = {};
            let firstMessageEl = $("#hw_sendFirstMessage").length;
            let messageContent = "";
            let messageContentTemp = "";
            if (firstMessageEl > 0) {
                messageContent = $("#hw_sendFirstMessage").html();
                messageContentTemp = messageContent;

                someRegEx = /[</]div[>][<br>]*[<][/]div[>]/gi;
                if (someRegEx.test(messageContent)) {
                    messageContentTemp = messageContent.replace(someRegEx, "");
                }
            }
            $("#hw_lead_name").removeClass("is-invalid");
            $("#hw_lead_email").removeClass("is-invalid");
            $("#hw_lead_phone").removeClass("is-invalid");
            $("#hw_sendFirstMessage").removeClass("is-invalid");
            if ($("#hw_lead_name").val().trim().length <= 0) {
                $("#hw_lead_email").removeClass("is-invalid");
                $("#hw_lead_phone").removeClass("is-invalid");
                $("#hw_sendFirstMessage").removeClass("is-invalid");
                $("#hw_lead_name").addClass("is-invalid").removeClass("is-valid");
                $("#hw_lead_name_error").text("Please provide Full name");
            } else if ($("#hw_lead_name").val().trim().length >= 25) {
                $("#hw_lead_email").removeClass("is-invalid");
                $("#hw_lead_phone").removeClass("is-invalid");
                $("#hw_sendFirstMessage").removeClass("is-invalid");
                $("#hw_lead_name").addClass("is-invalid").removeClass("is-valid");
                $("#hw_lead_name_error").text("Name cannot be more than 25 characters");
            } else if ($("#hw_lead_email").val().trim().length <= 0) {
                $("#hw_lead_name").removeClass("is-invalid");
                $("#hw_lead_phone").removeClass("is-invalid");
                $("#hw_sendFirstMessage").removeClass("is-invalid");
                $("#hw_lead_email").addClass("is-invalid").removeClass("is-valid");
                $("#hw_lead_email_error").text("Please provide Email");
            } else if (firstMessageEl > 0 && messageContentTemp.trim().length <= 0) {
                $("#hw_lead_name").removeClass("is-invalid");
                $("#hw_lead_email").removeClass("is-invalid");
                $("#hw_lead_phone").removeClass("is-invalid");
                $("#hw_sendFirstMessage").addClass("is-invalid").removeClass("is-valid");
                $("#hw_sendFirstMessage_error").text("Please type in your message");
            } else if (havePhoneField && $("#hw_lead_phone").val().trim().length <= 0) {
                $("#hw_lead_name").removeClass("is-invalid");
                $("#hw_lead_email").removeClass("is-invalid");
                $("#hw_sendFirstMessage").removeClass("is-invalid");
                $("#hw_lead_phone").addClass("is-invalid").removeClass("is-valid");
                $("#hw_lead_phone_error").text("Please provide phone number");
            } else {
                if (haveCustomField) {
                    let isCustomFieldEntered = true;
                    $(".hw_lead_custom_field").each((index, el) => {
                        let val = $(el).val().trim().length;
                        let id = parseInt($(el).attr('id').match(/^hw_lead_custom_field_(.+)$/)[1]);
                        let placeholder = $(el).attr('placeholder');
                        if (val <= 0) {
                            isCustomFieldEntered = false;
                            $("#hw_lead_name").removeClass("is-invalid");
                            $("#hw_lead_email").removeClass("is-invalid");
                            $("#hw_sendFirstMessage").removeClass("is-invalid");
                            $("#hw_lead_phone").removeClass("is-invalid");
                            $(`#hw_lead_custom_field_${id}`).addClass("is-invalid").removeClass("is-valid");
                            $(`#hw_lead_custom_field_${id}_error`).text(`Please provide ${placeholder}`);
                        } else {
                            customFields[id] = $(el).val().trim();
                            $(`#hw_lead_custom_field_${id}`).removeClass("is-invalid")
                        }
                    });
                    if (!isCustomFieldEntered) {
                        return false;
                    }
                }

                let leadName = $("#hw_lead_name").val().trim().split(" ");
                let leadFirstname = leadName[0];
                let leadLastname = leadName.length > 1 ? leadName[1] : "";
                let leadEmail = $("#hw_lead_email").val().trim();
                let leadPhone = havePhoneField ? $("#hw_lead_phone").val() : 0;

                let emailRegEx = /.+\@.+\..+/gs;

                let emailTestFlag = false;
                if (emailRegEx.test(leadEmail)) {
                    emailTestFlag = true;
                } else {
                    emailTestFlag = false;
                    $("#hw_lead_name").removeClass("is-invalid");
                    $("#hw_sendFirstMessage").removeClass("is-invalid");
                    $("#hw_lead_email").addClass("is-invalid").removeClass("is-valid");
                    $("#hw_lead_email_error").text("Please enter correct email");
                }

                let phoneTestFlag = false;
                if (parseInt(leadPhone) == leadPhone) {
                    phoneTestFlag = true;
                } else {
                    $("#hw_lead_name").removeClass("is-invalid");
                    $("#hw_lead_email").removeClass("is-invalid");
                    $("#hw_sendFirstMessage").removeClass("is-invalid");
                    $("#hw_lead_phone").addClass("is-invalid").removeClass("is-valid");
                    $("#hw_lead_phone_error").text("Phone number cannot contain character");
                }


                if (emailTestFlag && phoneTestFlag) {
                    let buttonText = $("#submitLeadFormDetails").text();
                    if (MAILBOX_ID == "210285") {
                        $("#submitLeadFormDetails").attr("disabled", "true").text("Enviando...");
                    } else {
                        $("#submitLeadFormDetails").attr("disabled", "true").text("Sending..");
                    }
                    // $("#person_name").text(leadFirstname);

                    $.post({
                        url: '/api/chat-widget/updateDetails',
                        data: {
                            email: leadEmail,
                            firstname: leadFirstname,
                            lastname: leadLastname,
                            contactID: CONTACT_ID,
                            managerId: MAILBOX_MANAGER,
                            mailboxId: MAILBOX_ID,
                            phone: leadPhone,
                            customFields: JSON.stringify(customFields)
                        }
                    }).done(response => {
                        if (firstMessageEl > 0) {
                            $.post({
                                url: incomingMessageApiEndpoint,
                                data: {
                                    "contact_id": CONTACT_ID,
                                    "mailbox_id": MAILBOX_ID,
                                    "conversation_id": "",
                                    "contact_email": leadEmail,
                                    "value": messageContent,
                                    "type": 0,
                                    "attachmentIds": [],
                                    "managerID": MAILBOX_MANAGER,
                                    "isEmailed": false,
                                    'time': moment().toISOString(),
                                }
                            }).done(async function (res) {
                                if (res.status == "success") {
                                    $("#send_existing_messages_form").addClass("d-flex").removeClass("d-none");
                                    conversationID = res.data.conversation_id;
                                    $("#chat_back_button").addClass("see_previous_conversation").removeClass("back_show_home");

                                    currentPage = "CHAT_SCREEN_PAGE";
                                    previousConversationID = res.data.conversation_id;

                                    $('.ongoing_message_thread_avatar').html(DISPLAY_AVATAR);

                                    $('#ongoing_message_agent_name').text(mailboxName);
                                    $("#agent_available_status").addClass("d-none");
                                    let time = moment().lang(WIDGET_LANG_CODE).fromNow();


                                    // --- tio update here -----

                                    // $('.widgetHomePage').addClass('d-none').removeClass("d-flex");
                                    // $('.widgetConversationPage').addClass('d-none');
                                    changeWidgetPage("message");
                                    $("#see_previous_button_div").removeClass("d-none");

                                    $('.conversation_messages_box').html('');
                                    mailboxUnreadChatMessageCount(MAILBOX_ID, CONTACT_ID);
                                    $('.widgetMessagePage').removeClass('d-none');


                                    let timeoutTime = 0;
                                    if (WELCOME_TEXT.trim().length > 0) {
                                        timeoutTime += 500;
                                        $(".conversation_messages_box").append(getTypingIndicatorCss());
                                    }
                                    checkForWorkingHoursNotice(widgetOperationsData);
                                    setTimeout(function () {
                                        if (WELCOME_TEXT.trim().length > 0) {
                                            $("#typingEffectContainer").remove();
                                            $(".conversation_messages_box").append(`
                                                <ul class="p-0 d-flex message-body justify-content-start" id="message-${moment().valueOf()}">
                                                    <div class="avatar avatar-sm mg-r-5">
                                                        ${DISPLAY_AVATAR}
                                                    </div>
                                                    <li class="list-group-item d-flex flex-column inboundMessage">
                                                    <div style='width: 100%' class="fr-view"> 
                                                        ${WELCOME_TEXT}</div>
                                                    </li>       
                                                </ul>
                                            `);
                                        }

                                        $(".conversation_messages_box").append(`
                                            <ul class="p-0 d-flex message-body flex-column align-items-end sentMessage">
                                                <div class="d-flex flex-column align-items-end hwMessageContent">
                                                    <li class="list-group-item d-flex flex-column outboundMessage" id='${res.data.messageId}'>
                                                        <div style='width: 100%' class="fr-view">
                                                            ${messageContent}
                                                        </div>
                                                    </li>
                        
                                                    <div class="d-flex hw_message_seen_label sent">      
                                                        <span style="font-size:0.6rem; text-align: right; color: #8c8d90;padding-right: 10px;" class="hw_rel-date" data_date='${moment().unix()}'>${time}</span>
                                                    </div>
                                                </div>
                                            </ul>
                                        `);
                                    }, timeoutTime);

                                    let autoReplyData = await processAutoReply(widgetOperationsData);

                                    if (autoReplyData) {

                                        if (autoReplyData.sendAutoReply) {
                                            setTimeout(function () {
                                                $(".conversation_messages_box").append(getTypingIndicatorCss());
                                                scrollToBottomMessage();
                                            }, timeoutTime);
                                            timeoutTime += 500;
                                            setTimeout(function () {
                                                $("#typingEffectContainer").remove();
                                                $(".conversation_messages_box").append(`
                                                    <ul class="p-0 d-flex message-body justify-content-start" id="message-${moment().valueOf()}">
                                                        <div class="avatar avatar-sm mg-r-5 d-flex justify-content-center align-items-center" style="background: ${SELECTED_COLOR}; border-radius: 50%;">
                                                            <img src="https://cdn.helpwise.io/assets/images/helpwise-chat-icon-xs.png" style="height: 20px; width: 20px;">
                                                        </div>
                                                        <li class="list-group-item d-flex flex-column flex-column inboundMessage" style="background: #fcfcfc; color: black;">  
                                                            <div>
                                                            ${autoReplyData.messageToshow}
                                                            </div>
                                                        </li>       
                                                    </ul>
                                                `);
                                                scrollToBottomMessage();
                                            }, timeoutTime);
                                        }

                                        if (autoReplyData.displayReplyTime) {
                                            setTimeout(function () {
                                                $(".conversation_messages_box").append(getTypingIndicatorCss());
                                                scrollToBottomMessage();
                                            }, timeoutTime);
                                            timeoutTime += 500;
                                            setTimeout(function () {
                                                $("#typingEffectContainer").remove();
                                                $(".conversation_messages_box").append(`
                                                    <ul class="p-0 d-flex message-body justify-content-start" id="message-${moment().valueOf()}">
                                                        <div class="avatar avatar-sm mg-r-5 d-flex justify-content-center align-items-center" style="background: ${SELECTED_COLOR}; border-radius: 50%;">
                                                            <img src="https://cdn.helpwise.io/assets/images/helpwise-chat-icon-xs.png" style="height: 20px; width: 20px;">
                                                        </div>
                                                        <li class="list-group-item d-flex flex-column flex-column inboundMessage" style="background: #fcfcfc; color: black;">  
                                                            <div>
                                                                ${MAILBOX_NAME} replies ${autoReplyData.replyTime}
                                                            </div>
                                                        </li>       
                                                    </ul>
                                                `);
                                                scrollToBottomMessage();
                                            }, timeoutTime);
                                        }
                                    }

                                    if (res.data.isAutoReplyTriggered) {

                                        setTimeout(function () {
                                            $(".conversation_messages_box").append(getTypingIndicatorCss());
                                        }, timeoutTime);

                                        timeoutTime += 500;
                                        let rulesAutoReplyData = res.data.rulesAutoReplyData;
                                        setTimeout(function () {
                                            $("#typingEffectContainer").remove();
                                            $(".conversation_messages_box").append(`
                                                <ul class="p-0 d-flex message-body justify-content-start" id="message-${rulesAutoReplyData.message_id}">
                                                    <div class="avatar avatar-sm mg-r-5">
                                                        ${DISPLAY_AVATAR}
                                                    </div>
                                                    <li class="list-group-item d-flex flex-column inboundMessage">
                                                    <div style='width: 100%' class="fr-view">
                                                        ${rulesAutoReplyData.body}</div>
                                                    </li>       
                                                </ul>
                                            `);
                                        }, timeoutTime);
                                    }

                                } else {
                                    console.log(res.message)
                                }
                            }).fail(err => {
                                handleOnOff("#not_lead_data_capture", "#lead_data_capture", "on");
                                // $("#see_previous_button_div").removeClass("d-none");
                                console.log(err);
                            })
                        } else {
                            isDetailProvidedByContact = true;
                            $($(".new-conversation-button").get(0)).click();
                        }
                        handleOnOff("#not_lead_data_capture", "#lead_data_capture", "on");
                        $("#submitLeadFormDetails").removeAttr("disabled");
                        $("#submitLeadFormDetails").text(buttonText);
                        isDetailProvidedByContact = true;
                    }).fail((err) => {
                        console.log(err);
                    })
                }
            }
        });

        $(document).on("click", "#cancelLeadCaptureForm", function () {
            let dataBackTo = $(this).data("backTo");
            if (dataBackTo == "HOMEPAGE") {
                handleOnOff("#not_lead_data_capture", "#lead_data_capture", "on");
            } else if (dataBackTo == "ALL_CONVERSATION_PAGE") {
                conversationPage = 0;
                handleOnOff("#not_lead_data_capture", "#lead_data_capture", "on");
                changeWidgetPage("conversation")
            }
        })


    }

    $(document).on("click", ".search_help_articles", function () {

        let searchQuery = $(this).parents(".search-form").find(".search_query").val();
        if (searchQuery.trim().length <= 0) {
            $(this).parents(".search-form").find(".search_query").addClass("is-invalid").removeClass("is-valid");
            $(this).parents(".search-area").find("#search_query_error").removeClass("d-none").addClass("d-block");
            $(this).parents(".search-area").find("#search_query_error").text("Please enter search term");
            $(this).parents(".helpwise_conversation_body").find(".search_articles_list").html("");
            $(".search-articles-container").removeClass("show");
            handleSearchOperations();
        } else {
            $(this).parents(".search-form").find(".search_query").attr("disabled", "");
            let searchHtml = $(this).html();
            $(this).html(
                `
                <div class="spinner-border text-custom ht-15 wd-15" role="status" style="border-width: 0.2em;">
                    <span class="sr-only">Loading...</span>
                </div>
                `
            ).attr("disabled", "");
            $(this).parents(".search-area").find("#search_query_error").removeClass("d-block").addClass("d-none");
            $(this).parents(".search-area").find("#search_query_error").removeClass("is-invalid");

            $.post({
                url: "/api/chat-widget/searchArticles_v3",
                data: {
                    managerId: MAILBOX_MANAGER,
                    mailboxId: MAILBOX_ID,
                    searchQuery
                }
            })
                .done(response => {
                    if ((response.status = "success")) {
                        let searchResult = response.data;
                        $(this).parents(".helpwise_conversation_body").find(".search_articles_list").html("");

                        $(this).parents(".helpwise_conversation_body").find(".search_articles_list").append(`
                            <p class="mg-l-15 tx-color-03 mg-b-2 tx-bold">Search results for: <span class="tx-color-01" id="searchResultForText"></span></p>
                        `);
                        $("#searchResultForText").text(searchQuery);

                        if (searchResult) {
                            if (searchResult.length == 0) {
                                $(this).parents(".helpwise_conversation_body").find(".search_articles_list").append(`
                                <div class="d-flex justify-content-start bd-t" style="width: 100%; padding: 16px 10px; background: white;">
                                    <div class="d-flex flex-column" style="width: 100%;">
                                        <div class=" d-flex justify-content-between" style="width: 100%; font-size: 0.86rem;">
                                            <p class="mg-b-0 tx-bold">No result Found</p>
                                        </div>
                                        <div class="d-flex" style="width: 100%;">
                                            <p class="mg-0 tx-gray-700 chat_message_content" style="font-size: 0.8125rem;">Please try with another term</p>
                                        </div>
                                    </div>
                                </div>
                                `);
                            }
                            for (let i = 0; i < searchResult.length; i++) {
                                $(this).parents(".helpwise_conversation_body").find(".search_articles_list").append(`
                                    <a href="${searchResult[i].url}" target="_blank" style="color: inherit">
                                        <div class="d-flex justify-content-start bd-t search_article" id="${searchResult[i].id}">
                                            <div class="d-flex flex-column" style="width: 100%;">
                                                <div class=" d-flex justify-content-between" style="width: 100%; font-size: 0.86rem;">
                                                    <p class="mg-b-0 tx-bold">
                                                        ${searchResult[i].highlighted.title ? searchResult[i].highlighted.title : searchResult[i].title}
                                                    </p>
                                                </div>
                                                <div class="d-flex" style="width: 100%;">
                                                    <p class="mg-0 tx-gray-700 chat_message_content" style="font-size: 0.8125rem;">
                                                        ${searchResult[i].highlighted.description ? searchResult[i].highlighted.description : searchResult[i].description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                `);
                            }
                            // $("#search_help_articles").html(searchHtml);
                            $(this).parents(".helpwise_conversation_body").find(".search_help_articles").removeAttr("disabled");
                            $(this).parents(".search-form").find(".search_query").removeAttr("disabled");
                        } else {
                            $(this).parents(".helpwise_conversation_body").find(".search_articles_list").append(`
                                <div class="d-flex justify-content-start bd" style="width: 100%; padding: 16px 10px; background: white;">
                                    <div class="d-flex flex-column" style="width: 100%;">
                                        <div class=" d-flex justify-content-between" style="width: 100%; font-size: 0.86rem;">
                                            <p class="mg-b-0 tx-bold">No result Found</p>
                                        </div>
                                        <div class="d-flex" style="width: 100%;">
                                            <p class="mg-0 tx-gray-700 chat_message_content" style="font-size: 0.8125rem;">Please try with another term</p>
                                        </div>
                                    </div>
                                </div>
                            `);
                        }
                        $(this).parents(".helpwise_conversation_body").find(".search_help_articles").html(searchHtml);
                        $(".search-articles-container").addClass("show");
                        handleSearchOperations(1);
                    } else {
                        // console.log(response.message);
                        $(this).parents(".helpwise_conversation_body").find(".search_help_articles").html(searchHtml);
                        $(this).parents(".helpwise_conversation_body").find(".search_help_articles").removeAttr("disabled");
                        $(this).parents(".search-form").find(".search_query").removeAttr("disabled");
                        $(".search-articles-container").removeClass("show");
                        handleSearchOperations();
                    }
                })
                .fail(error => {
                    // console.log(error);
                    $(this).parents(".helpwise_conversation_body").find(".search_help_articles").html(searchHtml);
                    $(this).parents(".helpwise_conversation_body").find(".search_help_articles").removeAttr("disabled");
                    $(this).parents(".search-form").find(".search_query").removeAttr("disabled");
                });
        }
    });

    $(document).on("click", ".close_search_help_articles", function () {
        $(".search_query").val("");
        $(".search-articles-container").removeClass("show");
        setTimeout(function () {
            $(".search_articles_list").html("");
        }, 300)
        handleSearchOperations();
    });

    $(".search_query").on("keyup", function (event) {
        $(this).parents(".search-area").find("#search_query_error").removeClass("d-block").addClass("d-none");
        $(this).removeClass("is-invalid");
        if (event.keyCode == 13) {
            $(this).parents(".helpwise_conversation_body").find(".search_help_articles").click();
        }
    });

    $(document).on("click", ".hw_article_card", function () {
        changeWidgetPage("article");
        turnPageLoader("on");
        getArticleData($(this).attr("id").split("-")[1]).then(res => {
            prepareArticlePage(res);
        });
    })

    $(".back_show_home").on("click", function () {
        conversationID = "";
        isBotInterrupted = true;
        previousConversationID = "";
        changeWidgetPage("homepage");
        // $('.chat_widget_new_conversation').addClass('d-none');
        mailboxUnreadChatMessageCount(MAILBOX_ID, CONTACT_ID);
        triggerBotThreadFirebase = false;
        // makeConversationsUI();
    });

    $(".article_back_button").on("click", function () {
        changeWidgetPage("homepage");
    })

    $(".see_previous_conversation").on("click", function () {
        turnPageLoader("on");

        conversationID = "";
        previousConversationID = "";
        isBotInterrupted = true;

        conversationPage = 0;
        triggerBotThreadFirebase = false;
        $(".chat_widget_conversation_list").html("");
        changeWidgetPage("conversation");
        showconversations(CONTACT_ID, MAILBOX_ID, conversationPage);
    });

    $(document).on("click", ".delete-chat-attachment", function () {
        let id = $(this).attr("id");
        let hash = $(this)
            .attr("id")
            .match(/^delete-chat-attachment-(.+)$/)[1];
        $(`#chat-attachment-${hash}`).css("background", "red");

        let attachmentID = chat_attachmentIdMap[hash];
        $.post({
            url: "/api/chat-widget/deleteAttachment",
            data: {
                attachmentID
            }
        })
            .done(response => {
                if (response.status == "success") {
                    //delete the set and the map for specific attachment
                    chat_files.delete(chat_attachmentIdMap[hash]);
                    chat_uploadFile.delete(chat_attachmentIdMap[hash]);
                    //remove the div from the document
                    $(`#chat-attachment-${hash}`).remove();
                }
            })
            .fail(() => {
                console.log("error");
            });
    });

    $("#upload_image_input").on("change", function () {
        uploadImage("#upload_image_input", "#chat_attachment_list");
    });

    $("#upload_image_input_pop").on("change", function () {
        uploadImage("#upload_image_input_pop", "#chat_attachment_list_pop");
    });

    $(document).on("click", ".new-conversation-button", function () {
        if (!isDetailProvidedByContact && IS_LEAD_FORM_MANDATORY && CONTACT_TYPE == 1) {
            if (currentPage == "HOMEPAGE") {
                handleOnOff("#lead_data_capture", "#not_lead_data_capture", "on");
                $("#cancelLeadCaptureForm").data({ "backTo": "HOMEPAGE" });
            } else if (currentPage == "ALL_CONVERSATION_PAGE") {
                changeWidgetPage("homepage");
                handleOnOff("#lead_data_capture", "#not_lead_data_capture", "on");
                $("#cancelLeadCaptureForm").data({ "backTo": "ALL_CONVERSATION_PAGE" });
            }
        } else {
            conversationID = "";
            previousConversationID = "";

            $(".ongoing_message_thread_avatar").html(DISPLAY_AVATAR);
            $(".ongoing_message_thread_avatar").removeClass("avatar-online").removeClass("avatar-away");

            $("#ongoing_message_agent_name").text(mailboxName);
            $("#agent_available_status").addClass("d-none")
            let time = moment().lang(WIDGET_LANG_CODE).fromNow();

            $(".conversation_messages_box").html("");
            mailboxUnreadChatMessageCount(MAILBOX_ID, CONTACT_ID);
            changeWidgetPage("message");

            if (WELCOME_TEXT.trim().length > 0) {
                setTimeout(function () {
                    $(".conversation_messages_box").append(`
                    <ul class="p-0 d-flex message-body justify-content-start" id="message-${moment().valueOf()}">
                        <div class="avatar avatar-sm mg-r-5">
                            ${DISPLAY_AVATAR}
                        </div>
                        <li class="list-group-item d-flex flex-column inboundMessage">  
                            <div style='width: 100%' class="fr-view">${WELCOME_TEXT}</div>
                        </li>
                    </ul>
                `);
                }, 1000);
            }

            // check for message bot trigger

            // let initialBotPathId = "5a4c4f3e-077a-474a-9656-95ddfcd4bb83";
            isBotInterrupted = false;
            if (isBotDataFetched) {
                initiateBot(bots);
            } else {
                // let initialBotPathId = "5a4c4f3e-077a-474a-9656-95ddfcd4bb83";
                getMessageBotData().then(data => {
                    bots = data;
                    isBotDataFetched = true;
                    initiateBot(bots);
                });
            }

            checkForWorkingHoursNotice(widgetOperationsData)
        }
    });

    $(document).on("click", ".chat_widget_conversation", function () {
        turnPageLoader("on");

        var conversation_id = this.id;

        markChatRead(CONTACT_ID, MAILBOX_ID, conversation_id);

        conversationID = conversation_id;
        previousConversationID = conversationID;
        changeWidgetPage("message");
        $(".conversation_messages_box").html("");
        $(".user-disconnected-refresh").data("conversationid", conversation_id);

        offset = 0;
        showmessages(CONTACT_ID, MAILBOX_ID, conversation_id, offset, limit);
    });

    $("#send-message").on("click", function () {
        if (!imageUploading) {
            sendMessage(chat_files, chat_uploadFile);
        } else {
            $(".image-uploading-message").removeClass("d-none");
        }
    });

    $("#send-message-input_pop").on("keydown", function (
        event
    ) {
        // console.log(event.keyCode);
        if (event.keyCode == 13 && event.shiftKey) {
            // event.preventDefault();
            // console.log("new line");
            $("#send-message-input_pop").append(`<br>`);
            // placeCaretAtEnd(document.getElementById("send-message-input"));
        } else if (event.keyCode == 13) {
            event.preventDefault();
            sendMessagePop(chat_files, chat_uploadFile);
        } else if (event.keyCode == 8) {
            let value = $("#send-message-input_pop").html();
            if (value == "<br>") {
                $("#send-message-input_pop").html("");
            }
        }
    });

    $("#send-message_pop").on("click", function () {
        sendMessagePop(chat_files, chat_uploadFile);
    });

    $(".replyMessagePopInput").on("keydown", function (event) {
        // console.log(event.keyCode);
        if (event.keyCode == 13 && event.shiftKey) {
            // event.preventDefault();
            // console.log("new line");
            $(this).append(`<br>`);
            // placeCaretAtEnd(document.getElementById("send-message-input"));
        } else if (event.keyCode == 13) {
            event.preventDefault();
            sendMessagePop(chat_files, chat_uploadFile);
        } else if (event.keyCode == 8) {
            let value = $(this).html();
            if (value == "<br>") {
                $(this).html("");
            }
        }
    });

    $(".replyMessagePop").on("click", function () {
        sendMessagePop(chat_files, chat_uploadFile);
    });

    $(document).on("click", ".hw_open_collection", function () {
        let collectionID = $(this).data("id");
        let $el = $(this);
        $el.addClass("active");
        $(".search-articles-container").removeClass("show");
        handleSearchOperations();
        setTimeout(function () {
            $el.removeClass("active");
            $(".search_articles_list").html("");
            $(".search-form .search_query").val("");
            turnPageLoader("on", 1);
        }, 450)
        handleOnOff("", "#hw_hc_collections", "active");
        getArticles(collectionID);
    });

    $("#hw_back_to_collections").on("click", function () {
        $("#hw_back_to_collections").removeClass("active");
        turnPageLoader("off", 1);
        // $("#hw_hc_articles").addClass("d-none").removeClass("d-flex");
        // $("#hw_hc_collections").addClass("d-flex").removeClass("d-none");
        handleOnOff("#hw_hc_collections", "#hw_hc_articles", "active");
    });

    // scroll event

    $(".conversation_messages_box").off("scroll").on("scroll", function (evt) {
        evt.preventDefault();
        var pos = $(this).scrollTop();
        if (pos == 0) {
            offset += limit;
            showmessages(CONTACT_ID, MAILBOX_ID, conversationID, offset, limit);
        }
    });

    $(".chat_widget_conversation_list").off("scroll");
    $(".chat_widget_conversation_list").off("scroll").on("scroll", function (evt) {
        evt.preventDefault();
        var pos = $(this).scrollTop();
        var height = $(this).get(0).scrollHeight;

        if (isConversationPaginationLoaded && haveMoreThreads && parseInt(pos) + parseInt($(this).innerHeight()) == parseInt(height)) {
            isConversationPaginationLoaded = false;
            conversationPage += 1;
            showconversations(CONTACT_ID, MAILBOX_ID, conversationPage);
        }
    });

    $(document).on("mouseenter", ".message-body", function () {
        $(this).find(".hw_message_delete").addClass("d-flex").removeClass("d-none");
    });
    $(document).on("mouseleave", ".message-body", function () {
        $(this).find(".hw_message_delete").addClass("d-none").removeClass("d-flex");
    });


    $(document).on("click", ".popConversationTrigger", function () {
        let threadID = $(this).parents(".triggerThread").attr("id");
        $(".chat-widget-pop").data({
            "conversationID": threadID.split("-")[1]
        });

        iframeDisplay = "ON";
        $(".chat-widget-pop").addClass("d-none").removeClass("d-flex");
        sendMessageToParent("HelpwiseWidgetOpenMessage");
        // window.top.postMessage("HelpwiseWidgetOpenMessage", "*");
        if ($("#hw_offChat_thread .triggerThread").length > 0) {
            $($("#hw_offChat_thread .triggerThread").get(0)).removeClass("d-none").addClass("d-flex");
        } else {
            if ($("#hw_offChat_thread .popConversation").length > 0) {
                $($("#hw_offChat_thread .popConversation").get(0)).removeClass("d-none").addClass("d-flex");
            }
        }
    });

    $(document).on("click", ".popConversation .contentArea", function () {
        if (!closeFlag) {
            let conversationID = $(this).parents(".popConversation").attr("id").split("-")[1];

            $(".chat-widget-pop").data({ conversationID });
            $(".chat-widget-pop").addClass("d-none").removeClass("d-flex");

            iframeDisplay = "ON";

            sendMessageToParent("HelpwiseWidgetOpenMessage");
            // window.top.postMessage("HelpwiseWidgetOpenMessage", "*");

            $(this).parents(".popConversation").find(".closeCurrentPop").click();

        }
    });

    $(document).on("keyup", ".hwPopEmailTrigger", function (e) {


        if (e.keyCode == 13) {
            $(this).parents(".hwPopEmailTriggerDiv").find(".hwPopEmailTriggerBtn").click();
        }
    });

    $(document).on("click", ".hwPopEmailTriggerBtn", function (e) {

        let inputEl = $(this).parents(".hwPopEmailTriggerDiv").find(".hwPopEmailTrigger");
        let emailValue = inputEl.val();
        let emailRegEx = /.+\@.+\..+/gs;

        let emailTestFlag = false;
        if (emailRegEx.test(emailValue)) {
            emailTestFlag = true;
            inputEl.removeClass("is-invalid").addClass("is-valid");
        } else {
            emailTestFlag = false;
            inputEl.removeClass("is-valid").addClass("is-invalid");
        }

        if (emailTestFlag) {
            let buttonHtml = $(this).html();
            $(this).html("");
            $(this).html(`
                <div class="spinner-border text-light tx-8 ht-15 wd-15" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            `);
            if ($(this).parents(".triggerThread").length > 0) {
                let threadID = $(this)
                    .parents(".triggerThread")
                    .attr("id")
                    .split("-")[1];
                let emailAddr = $(this).parents(".hwPopEmailTriggerDiv").find(".hwPopEmailTrigger").val();
                if (emailAddr.trim().length > 0) {

                    replyToOutbound(threadID, emailAddr, MAILBOX_ID, MAILBOX_MANAGER, CONTACT_ID, $(this));
                    $(this).html(buttonHtml);
                }
            }
        }
    });

    $(document).on("mouseenter", ".popConversation", function () {
        $(this).find(".closePopDiv").removeClass("d-none").addClass("d-flex");
        // increaseIframeHeight();
    });
    $(document).on("mouseleave", ".popConversation", function () {
        $(this).find(".closePopDiv").removeClass("d-flex").addClass("d-none");
        // increaseIframeHeight();
    });

    $(document).on("mouseenter", ".triggerThread", function () {
        $(this).find(".closePopDiv").removeClass("d-none").addClass("d-flex");

    });

    $(document).on("mouseleave", ".triggerThread", function () {
        $(this).find(".closePopDiv").removeClass("d-flex").addClass("d-none");
    });

    $(document).on("click", ".user-disconnected-refresh", function () {
        let conversationId = $(".user-disconnected-refresh").data("conversationid");
        $(`#${conversationId}`).click();
    });

    $(document).on("click", ".closeCurrentPopTrigger", function () {
        isOffsetAdded = false;
        frameFlag = false;
        isWidgetManuallyClosed = true;

        $(this).parents(".triggerThread").remove();
        $(".chat-widget-pop").data({ "conversationID": 0 });

        if ($("#hw_offChat_thread .triggerThread").length > 0) {
            let element = $($("#hw_offChat_thread .triggerThread").get(0));
            element.removeClass("d-none").addClass("d-flex");
            let threadID = element.attr("id").split("-")[1];
            $(".chat-widget-pop").data({ "conversationID": threadID });

        } else if ($("#hw_offChat_thread .popConversation").length > 0) {
            let element = $($("#hw_offChat_thread .popConversation").get(0));
            element.removeClass("d-none").addClass("d-flex");
            let threadID = element.attr("id").split("-")[1];
            $(".chat-widget-pop").data({ "conversationID": threadID });

            $("#stackShadowOffChatThread2").removeClass("d-none").addClass("d-flex");
            $("#hw_offChat_thread").addClass("pd-t-10");

            if ($("#hw_offChat_thread .popConversation").length > 2) {
                $("#stackShadowOffChatThread1").removeClass("d-none").addClass("d-flex");
            }
        } else {
            increaseIframeHeight(-1, "#hw_offChat_thread");
            frameFlag = true;
        }
        if (!frameFlag) {
            increaseIframeHeight(0, "#hw_offChat_thread");
        } else {
            frameFlag = false;
        }

    });


    $(document).on("click", ".closeCurrentPop", function (e) {
        closeFlag = true;
        $(this).parents(".popConversation").remove();
        if ($("#hw_offChat_thread .popConversation").length > 0) {

            if ($("#hw_offChat_thread .popConversation").length == 2) {
                $("#stackShadowOffChatThread1").removeClass("d-flex").addClass("d-none");
            } else if ($("#hw_offChat_thread .popConversation").length == 1) {
                $("#stackShadowOffChatThread2").removeClass("d-flex").addClass("d-none");
                $("#hw_offChat_thread").removeClass("pd-t-10");
            }

            let element = $($("#hw_offChat_thread .popConversation").get(0));
            element.removeClass("d-none").addClass("d-flex");
            let threadID = element.attr("id").split("-")[1];
            $(".chat-widget-pop").data({ "conversationID": threadID });
            increaseIframeHeight(0, "#hw_offChat_thread");
        } else {
            $(".chat-widget-pop").data({ "conversationID": 0 });
            increaseIframeHeight(-1, "#hw_offChat_thread");
        }

        isOffsetAdded = false;
        closeFlag = false;
    });

    $("#closeHwChatPopWindow").on("click", function () {
        $(".chat-widget-pop").data({ "conversationID": 0 });
        increaseIframeHeight(-1, "#hw_chat_message_screen");
    })


    $(document).on("click", ".suggestions", function () {
        let nextPathId = $(this).data("nextpath");
        let suggestionText = $(this).html();
        let time = moment().lang(WIDGET_LANG_CODE).fromNow();

        $(".widgetPreviewSuggestionContainer").remove();

        let tempId = randomString(10);
        let valueHtml = `
            <ul class="p-0 d-flex justify-content-end message-body">
                    
                <div class="d-flex flex-column align-items-end">
                    <li class="list-group-item d-flex flex-column outboundMessage sending" id="botMessage-${tempId}">
                        <div style="width: 100%">  
                            ${suggestionText}
                        </div>
                    </li>  
                    <div class="d-flex hw_message_seen_label sent">
                        <span style="font-size:0.6rem; text-align: right; color: #8c8d90; padding-right: 10px;" class="hw_rel-date" data_date='${moment().unix()}'>${time}</span>
                    </div>
                </div>
            </ul>
        `;

        $(".conversation_messages_box").append(valueHtml);
        scrollToBottomMessage();

        triggerBotThreadFirebase = true;
        let botIdentity = bots[currentBotId]["botIdentity"];
        let options = {
            currentBotId,
            botPathId: nextPathId,
            text: suggestionText,
            type: 0,
            conversationID,
            triggerBotThreadFirebase: true,
            botIdentityID: botIdentity.id,
            botType: 'chat'
        };

        if (currentBotData[nextPathId]['botType'] == 'ai') {
            isAiBotActive[conversationID] = 1;
        }

        triggerMessageBotInsertMessage(options).then(response => {

            $(`#botMessage-${tempId}`).removeClass("sending");
            $(`#botMessage-${tempId}`).parents(".message-body").attr("id", "message-" + response.messageId);
            $(`#botMessage-${tempId}`).attr("id", "botMessage-" + response.messageId);
            triggerMessageBot({ botPathId: nextPathId, botData: currentBotData, triggerBotThreadFirebase, botIdentity });
        })

    });

    // update the relative times every minute eg. 1m => 2m
    setInterval(() => {
        $(".hw_rel-date").each(function () {
            let dateStr = $(this).attr("data_date");
            $(this).text(moment(dateStr, "X").lang(WIDGET_LANG_CODE).fromNow());
        });
    }, 60000);
});

window.onmessage = function (e) {
    if (typeof (e.data) == "string") {
        if (e.data == "HelpwiseLiveChatIconClosed") {
            iframeDisplay = "OFF";

            turnChatWidgetPopOn();
            if ($("#hw_offChat_thread .triggerThread").length > 0) {
                $("#hw_offChat_thread").removeClass("d-none").addClass("d-flex");
                increaseIframeHeight(0, "#hw_offChat_thread");
            }

            isWidgetManuallyClosed = true;

            mailboxUnreadMessageCount(MAILBOX_ID, CONTACT_ID);
        } else if (e.data == "HelpwiseLiveChatIconLoaded") {
            iframeDisplay = "ON";

            turnChatWidgetOn();

            $("#send_message_area").addClass("d-none");
            $("#hw_message_box").html("");
            currentThreadId = "";

            let threadID = $(".chat-widget-pop").data("conversationID") ? $(".chat-widget-pop").data("conversationID") : "0";

            if (threadID > 0) {
                openMessagesDirect(threadID);
            } else if (MAILBOX_ID == "215253") {
                $($(".new-conversation-button").get(0)).click();
            }

            if (!isHCLoaded) {
                isHCLoaded = true;
                turnPageLoader("on", 1);
                let displayHCinWidget = true;
                if (MAILBOX_ID == 210513 && CONTACT_TYPE != 0) {
                    displayHCinWidget = false;
                }

                if (displayHCinWidget) {
                    showHCcollections();
                }
            }
            if (!isBotDataFetched) {
                getMessageBotData().then(data => {
                    bots = data;
                    isBotDataFetched = true;
                });
            }

            let currentURL = location.href;
            let onlineStatus = "Online";
        } else if (e.data == "HelpwiseLiveChatMobileViewON") {
            mobileView = "ON";
            displayCrossButton = "d-flex";
            // $("#close_widget_display").removeClass("d-none").addClass("d-block");
        } else if (e.data == "HelpwiseLiveChatMobileViewOFF") {
            mobileView = "OFF";
            displayCrossButton = "d-none";
            // $("#close_widget_display").addClass("d-none").removeClass("d-block");
        } else if (e.data == "HelpwisePleaseOpenConversations") {
            $("#see_previous_button").click();
        } else if (e.data == "HelpwisePleaseOpenLiveChat") {
            changeWidgetPage("homepage");
            if (mobileView == "OFF") {
                $("#close_widget_display").removeClass("show");
            } else {
                $("#close_widget_display").addClass("show");
            }
        } else if (e.data == "HelpwisePleaseOpenLiveChatWithoutIcon") {
            changeWidgetPage("homepage");
            // $("#close_widget_display").removeClass("d-none").addClass("d-block");
            $("#close_widget_display").addClass("show")

        } else if (e.data.includes("HelpwisePleaseSendThisMessage:")) {
            let message = e.data.split(":")[1];
            changeWidgetPage("homepage");
            $("#new-conversation-button").click();
            froala.html.set(`<div style='width: 100%'>${message}</div>`)
        } else if (e.data == "HelpwiseLiveChatWidgetIsReady") {
            isHelpwiseWidgetReadyToRoll = true;
            if (!isWidgetManuallyClosed && CURRENT_URL && CURRENT_URL.includes("openHelpwiseChat=true")) {
                sendMessageToParent("HelpwiseWidgetOpenMessage");
                // window.top.postMessage("HelpwiseWidgetOpenMessage", "*");
            }
        } else if (e.data.includes("HelpwisePleaseRefreshEngage")) {
            let updatedURL = e.data.split("=")[1];
            checkOutboundTriggers(MAILBOX_ID, MAILBOX_MANAGER, CONTACT_ID, USER_COOKIE, updatedURL);
        } else if (e.data == "HelpwiseCloseButtonForFrameOff") {
            $("#close_widget_display").removeClass("show");
        } else if (e.data == "HelpwiseCloseButtonForFrameOn") {
            $("#close_widget_display").addClass("show");
        }
    }
};

function fetchTimezones() {
    return new Promise((resolve, reject) => {
        if (isTimezoneFetched) {
            resolve(timezoneArray);
        } else {
            $.get({
                url: "/api/get-timezones.php"
            }).done(res => {
                if (res.status == "success") {
                    isTimezoneFetched = true;
                    timezoneArray = res.data.timezones;
                    resolve(timezoneArray);
                } else {
                    isTimezoneFetched = false;
                    console.log("error");
                }
            }).fail(err => {
                isTimezoneFetched = false;
                console.log(err);
            })
        }
    });
}

function processTimezone(tz, timezones) {
    let timezoneName = "";
    for (let i = 0; i < timezones.length; i++) {
        if (timezones[i]["id"] == tz) {
            timezoneName = timezones[i]["tz"];
            break;
        }
    }
    return timezoneName;
}

function processWorkingHours(workingHoursData) {

    return new Promise((resolve, reject) => {
        let workingHoursOption = workingHoursData.workingHoursOption;
        let inTimeFlag = true;

        if (workingHoursOption == "alwaysClosed") {
            inTimeFlag = false;
            resolve(inTimeFlag);
        } else if (workingHoursOption == "customTime") {
            inTimeFlag = false;
            let daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            fetchTimezones().then(timezones => {
                let inboxTimezoneID = workingHoursData.selectedTimezone;
                let inboxTimezone = processTimezone(inboxTimezoneID, timezones);
                let customHours = workingHoursData.customHours;
                let processedCustomHours = [];
                for (let customHour of customHours) {
                    let tempDate = "2015/10/10";
                    let toMins = (moment(tempDate + " " + customHour.toTime).hours() * 60) + moment(tempDate + " " + customHour.toTime).minutes();
                    let fromMins = (moment(tempDate + " " + customHour.fromTime).hours() * 60) + moment(tempDate + " " + customHour.fromTime).minutes();
                    if (fromMins >= toMins) { // > 12am
                        processedCustomHours.push({
                            fromTime: customHour.fromTime,
                            toTime: '11:59 pm',
                            weekDay: customHour.weekDay
                        }, {
                            fromTime: '12:01 am',
                            toTime: customHour.toTime,
                            weekDay: customHour.weekDay
                        });
                    } else {
                        processedCustomHours.push(customHour);
                    }
                }

                let todaysDay = moment().tz(inboxTimezone).day();
                let todaysDayName = daysArray[todaysDay];
                for (let processedCustomHour of processedCustomHours) {
                    if (processedCustomHour.weekDay.includes(todaysDayName)) {
                        let tempDate = "2015/10/10";
                        if (processedCustomHour.fromTime == '12:01 am') {
                            tempDate = "2015/10/11";
                        }
                        let fromDate = moment(tempDate + " " + processedCustomHour.fromTime).unix();
                        let toDate = moment(tempDate + " " + processedCustomHour.toTime).unix();
                        let currentTime = moment().tz(inboxTimezone).format("hh:mm a");
                        let currentDate = moment(tempDate + " " + currentTime).unix();
                        if (currentDate > fromDate && currentDate < toDate) {
                            inTimeFlag = true;
                            break;
                        }
                    }
                }
                resolve(inTimeFlag);
            })
        } else {
            resolve(inTimeFlag);
        }
    });

}

function processAutoReply(widgetOperationsData) {
    let widgetAutoReplyLocal = widgetOperationsData;
    let isNewLogic = false;
    if (widgetAutoReplyLocal != null && widgetOperationsData["selectedOperation"]) {
        isNewLogic = true;
    }

    return new Promise((resolve, reject) => {
        if (widgetAutoReplyLocal != null) {

            let messageToshow = "";

            processWorkingHours(widgetOperationsData).then(inTimeFlag => {
                let replyData = {};

                if (isNewLogic) {
                    replyData = widgetOperationsData.operationData;
                } else {
                    replyData = {
                        inTimeReply: widgetAutoReplyLocal.inTimeReply,
                        afterTimeReply: widgetAutoReplyLocal.afterTimeReply,
                        isAutoReplyEnabled: widgetAutoReplyLocal.isAutoReplyEnabled,
                    }
                }

                let sendAutoReply = false;
                if (replyData.isAutoReplyEnabled) {
                    sendAutoReply = replyData.isAutoReplyEnabled == "on" ? true : false;
                }

                if (sendAutoReply) {
                    if (inTimeFlag) {
                        messageToshow = processMessageVariables(replyData.inTimeReply, USERNAME_ON_CHAT);
                    } else {
                        messageToshow = processMessageVariables(replyData.afterTimeReply, USERNAME_ON_CHAT);
                    }
                }


                let displayReplyTime = false;
                let replyTime = widgetAutoReplyLocal.widgetReplyTimeText;
                if (!(widgetAutoReplyLocal.isReplyTimeEnabled == 0 || widgetAutoReplyLocal.isReplyTimeEnabled == "off")) {
                    // displayReplyTime = widgetAutoReplyLocal.isReplyTimeEnabled == "on" ? true : false;
                    if (!inTimeFlag && isNewLogic && widgetAutoReplyLocal.showReplyTimeWhen.after == 1) {
                        displayReplyTime = true;
                        replyTime = widgetOperationsData.replyTimeAfterWHData.widgetReplyTimeTextAfterWH;
                    } else if (inTimeFlag && isNewLogic && widgetAutoReplyLocal.showReplyTimeWhen.during == 1) {
                        displayReplyTime = true;
                    }

                    if (MAILBOX_ID == "214028") {
                        replyTime = "I nostri operatori le risponderanno a breve.";
                    }

                } else {
                    displayReplyTime = false;
                }
                resolve({ replyTime, messageToshow, inTimeFlag, displayReplyTime, sendAutoReply });
            })

        }
    });
}

function processMessageVariables(message, contactName) {

    message = message.replace("{{recipient.firstname}}", contactName ? contactName : "");
    message = message.replace("{{recipients.firstname}}", contactName ? contactName : "");
    return message;
}

function replyToOutbound(conversationID, value, mailboxID, managerID, contactID, element) {
    let data = {
        conversationID,
        value,
        mailboxID,
        managerID,
        contactID
    };

    $.post({
        url: "/api/chat-widget/replyToOutbound",
        data
    }).done(res => {
        element.parents(".triggerThread").find(".triggerMessageBox").append(`
      <div class="d-flex w-100 justify-content-end">
        <div class="d-flex flex-column mg-l-10 pd-x-15 pd-y-10 align-items-end" style="width: fit-content; border-radius: 5px 7px 12px 12px; background: linear-gradient(to right, ${SELECTED_COLOR} 0px, ${GRADIENT_COLOR} 100%);">
          <div class="messageBody mg-b-0 d-flex flex-column text-white">${value}</div>
          <p class="mg-b-0"><span style="font-size:0.6rem; color: white; text-align: left;" class="hw_rel-date" data_date='${moment().unix()}'>${moment().lang(WIDGET_LANG_CODE).fromNow()}</span></p>
        </div>
      </div>
    `);
        element.parents(".hwPopEmailTriggerDiv").find(".hwPopEmailTrigger").val("");
        element.parents(".hwPopEmailTriggerDiv").removeClass("d-flex").addClass("d-none");
        element.parents(".triggerThread").find(".triggerMessageBox").click();
        increaseIframeHeight(0, "#hw_offChat_thread");

    }).fail(err => {
        console.log(err);
    })
}

function markChatRead(contactId, mailboxId, conversationId) {
    $("#" + conversationId)
        .find(".chat_message_bubble")
        .addClass("d-none");
    $.post({
        url: "/api/chat-widget/mark-chat-read",
        data: {
            contactId,
            mailboxId,
            conversationId,
            managerID: MAILBOX_MANAGER
        }
    }).done(response => {
        if (response.status == "success") {
            $("#" + conversationId).css("background", "aliceblue");
        }
    });
}

function openMessagesDirect(threadID) {
    turnPageLoader("on");
    $(".chat-widget-pop").data({ conversationID: "0" });

    $(`#hw_offChat_thread #thread-${threadID} .closeCurrentPopTrigger`).click();
    $(`#hw_offChat_thread #thread-${threadID} .closeCurrentPop`).click();

    var conversation_id = threadID;
    markChatRead(CONTACT_ID, MAILBOX_ID, conversation_id);

    conversationID = conversation_id;
    previousConversationID = conversationID;

    changeWidgetPage("message");
    $(".conversation_messages_box").html("");

    offset = 0;
    $(".user-disconnected-refresh").data("conversationid", conversation_id);
    showmessages(CONTACT_ID, MAILBOX_ID, conversation_id, offset, limit);
}

function placeCaretAtEnd(el) {
    el.focus();
    if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
    ) {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function uploadImage(imageElement, attachmentElement) {
    let selectedFiles = $(imageElement).get(0).files;
    for (let i = 0; i < selectedFiles.length; i++) {
        let selectedFile = selectedFiles[i];
        let hash = md5(
            JSON.stringify({
                name: selectedFile.name,
                size: selectedFile.size
            })
        );
        var formData = new FormData();
        formData.append("files[]", selectedFile);
        formData.append("mailboxID", MAILBOX_ID);
        formData.append("type", "public");

        let width = "170px";

        if (selectedFile.size > 10485760) {
            showToast();
        } else {
            $(attachmentElement).append(`
        <span class="d-flex justify-content-start attachment align-items-center rounded mt-1 mb-1" id="chat-attachment-${hash}" style="width: ${width};border: 1px solid #e2e2e2;margin-left: 10px;position: relative">
          <div id="progress-chat-${hash}" class="progress" style="padding: 11px;background-color: #e2e2e2">
            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span class="d-flex justify-content-between" data-toggle="tooltip" data-placement="top" title="${selectedFile.name} (${humanFileSize(selectedFile.size, true)})" style="width: 80%;margin-left: 5px;position:absolute;">
            <span style="overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:auto%">
              ${getFileIcon(selectedFile.name.split(".")[1] || "")} ${selectedFile.name}
            </span>
            <!--    <span class="attachment-filesize" style="overflow: hidden;white-space:nowrap;text-overflow:ellipsis;display:none">
              (${humanFileSize(selectedFile.size, true)})
            </span> -->
          </span>
          <span id="delete-chat-attachment-${hash}" class="delete-chat-attachment" style="margin-left: 5px;margin-right: 5px;cursor:pointer;right: 0px;position:absolute;"><i class="far fa-times-circle"></i></span>
        </span>
      `);
            $.ajax({
                url: "/api/chat-widget/aws_upload",
                data: formData,
                type: "post",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    //get the attachment id
                    let file = response.data.files[0];
                    //make a set and add the file id
                    chat_files.add(file);
                    // $(`#progress-chat-${hash}`).remove();
                    chat_attachmentIdMap[hash] = file;
                    //get the file data which include the hash,name,size
                    let uploadFileData = response.data.data[0];

                    chat_uploadFile.set(file, {
                        filehash: uploadFileData.filehash,
                        filename: uploadFileData.filename,
                        extension: uploadFileData.extension,
                        filesize: uploadFileData.filesize,
                        mimeType: uploadFileData.mimeType
                    });
                    $(`#progress-chat-${hash}`).css("width", `100%`);
                    $(`#progress-chat-${hash}`).css("background", "rgba(0, 255, 0, 0.3)");
                },
                error: function (err) {
                    console.log(err);
                },
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        // For handling the progress of the upload
                        myXhr.upload.addEventListener(
                            "progress",
                            function (e) {
                                if (e.lengthComputable) {
                                    let percentage = (e.loaded / e.total) * 100;
                                    $(`#progress-chat-${hash}`).css("width", `${percentage - 10}%`);
                                }
                            },
                            false
                        );
                    }
                    return myXhr;
                }
            });
        }
    }
}

function showToast() {
    toastr.options.timeOut = "3000";
    toastr.options.extendedTimeOut = "3000";
    // toastr.options.timeOut = "300000";
    toastr.options.positionClass = "toast-custom-bottom-right";
    // toastr.error('File size is too large, it should be less than 10 MB', 'Error uploading file');
    toastr.error('File size is too large, it should be less than 10 MB');
}

function sendMessagePop(chat_files, chat_uploadFile) {
    $("#send-message-input_pop")
        .find("a")
        .each(function () {
            var linkText = $(this).text();
            $(this).before(linkText);
            $(this).remove();
        });

    let value = $("#send-message-input_pop").html();
    let chatAttachments = [];
    //this files come from the comments.js file
    if (chat_files.size != 0) {
        //convert set to array
        chatAttachments = Array.from(chat_files);
    }
    if (value == "" && chatAttachments.length == 0 && $(`<div>${value}</div>`).find('img').length == 0) { } else {
        let dateTime = moment().lang(WIDGET_LANG_CODE).fromNow();

        let imagesHtml = "";
        let baseUrl = ATTACHMENT_BASE_URL + '/';
        let attachmentArray = [];
        chat_uploadFile.forEach((value, key, map) => {
            let imgUrl = baseUrl + value.filehash + "." + value.extension;
            attachmentArray.push({
                extension: value.extension,
                url: imgUrl,
                name: value.filename,
                size: value.filesize,
                mimeType: value.mimeType
            });
        });

        attachmentHtml = returnInstantAttachmentDisplay(attachmentArray);

        let message = convertLinkToAnchor(value, 0);

        let tempId = randomString(10) + moment().valueOf();
        let valueHtml = `
                        <ul class="p-0 d-flex message-body flex-column align-items-end sentMessage">
                            <div class="d-flex align-items-end">
                                <li class="list-group-item d-flex flex-column outboundMessage sending" id='${tempId}' style="border:none; padding: 17px 20px; box-shadow: rgba(0,0,0,0.1) 0px 0px 10px;">  
                                    <div style='width: 100%'>
                                      ${message} ${attachmentHtml}
                                    </div>

                                    <div class="d-flex hw_message_seen_label sent">      
                                        <span style="font-size:0.6rem; text-align: right; color: #ffffffcf;padding-right: 10px;" class="hw_rel-date" data_date='${moment().unix()}'>${dateTime}</span>
                                    </div>
                                </li>
                            </div>
                        </ul>
                        `;
        $("#hw_message_box").append(valueHtml);
        $("#send-message-input_pop").text("");
        $("#chat_attachment_list_pop").html("");
        chat_attachmentIdMap = {};
        chat_files.clear();
        chat_uploadFile.clear();
        $("#hw_message_box").animate({
            scrollTop: $("#hw_message_box").prop("scrollHeight")
        },
            1000
        );
        increaseIframeHeight(0, "#hw_chat_message_screen");
        const threadId = $(".chat-widget-pop").data("conversationID");
        if (isAiBotActive[conversationID] == "1") {
            $("#" + tempId).removeClass("sending");
            setTimeout(function () {
                $(".conversation_messages_box").append(getTypingIndicatorCss());
                scrollToBottomMessage();
            }, 500);
        }
        $.post({
            url: incomingMessageApiEndpoint,
            data: {
                contact_id: CONTACT_ID,
                mailbox_id: MAILBOX_ID,
                conversation_id: threadId,
                contact_email: CONTACT_EMAIL,
                value,
                type: 0,
                attachmentIds: chatAttachments,
                managerID: MAILBOX_MANAGER,
                isEmailed: false,
                time: moment().toISOString(),
                is_ai_bot_active: isAiBotActive[threadId]
            }
        })
            .done(response => {
                if (response.status == "success") {
                    conversationID = response.data.conversation_id;
                    // addSeenNotSeenLabel(WIDGET_LANGUAGE["not-seen"]);
                    createjs.Sound.play(sendSoundID);
                    $("#" + tempId).removeClass("sending");
                    $("#" + tempId).parents(".message-body").attr("id", `message-${response.data.messageId}`);

                    if (isAiBotActive[conversationID] && response.data.aiBotMessage != '') {
                        appendAiChatMessage(response.data.aiBotMessage);
                        isAiBotActive[conversationID] = response.data.aiBotActive;
                    }

                    markChatRead(CONTACT_ID, MAILBOX_ID, $(".chat-widget-pop").data("conversationID"));
                } else {
                    $("#" + tempId).parents(".message-body").append(`
                    <div class="d-flex align-items-center mg-r-5 mg-t-2" style="font-size: 0.85rem;color: red;">
                        <i class="fas fa-exclamation-circle mg-r-5" style="color:red;"></i> Couldn't send
                    </div>
                `);
                }
            })
            .fail(() => {
                $("#" + tempId).parents(".message-body").append(`
                <div class="d-flex align-items-center mg-r-5 mg-t-2" style="font-size: 0.85rem;color: red;">
                    <i class="fas fa-exclamation-circle mg-r-5" style="color:red;"></i> Couldn't send
                </div>
            `);
            });
    }
}

function sendMessage(chat_files, chat_uploadFile) {

    isBotInterrupted = true;
    let value = froala.html.get();
    let chatAttachments = [];
    //this files come from the comments.js file
    if (chat_files.size != 0) {
        //convert set to array
        chatAttachments = Array.from(chat_files);
    }
    if ($(`<div>${value}</div>`).text().trim().length == 0 && $(`<div>${value}</div>`).find('img').length == 0 && chatAttachments.length == 0) {
        froala.html.set("");
    } else {

        let brStartRegex = /^<\/*br\s*\\*?>\s*/i;
        let brEndRegex = /<\/*br\s*\\*?>\s*$/i;
        while (value.match(brStartRegex) && value.match(brStartRegex).index > -1) {
            // console.log("match found 1");
            value = value.replace(brStartRegex, "");
        }

        while (value.match(brEndRegex) && value.match(brEndRegex).index > -1) {
            value = value.replace(brEndRegex, "");
        }

        let dateTime = moment().lang(WIDGET_LANG_CODE).fromNow();

        let imagesHtml = "";
        let baseUrl = ATTACHMENT_BASE_URL + '/';
        let attachmentArray = [];
        chat_uploadFile.forEach((value, key, map) => {
            let imgUrl = baseUrl + value.filehash + "." + value.extension;
            attachmentArray.push({
                extension: value.extension,
                url: imgUrl,
                name: value.filename,
                size: value.filesize,
                mimeType: value.mimeType
            });
        });

        attachmentHtml = returnInstantAttachmentDisplay(attachmentArray);

        let message = convertLinkToAnchor(value, 0);

        let tempId = randomString(10) + moment().valueOf();
        // let leftDelete = `
        // <div class="hw_message_delete d-none align-items-center mg-b-10 pd-5" style="cursor: pointer;">
        //     <i class="far fa-trash-alt"></i>
        // </div>
        // `;
        let leftDelete = "";
        let valueHtml = `
            <ul class="p-0 d-flex  message-body justify-content-end">
                ${leftDelete}
                <div class="d-flex flex-column align-items-end">
                    <li class="list-group-item d-flex flex-column outboundMessage sending" id='${tempId}'>  
                        <div style='width: 100%' class="fr-view">
                            ${message} ${attachmentHtml}
                        </div>
                    </li> 
                    <div class="d-flex hw_message_seen_label sent">      
                        <span style="font-size:0.6rem; text-align: right; color: #8c8d90;padding-right: 10px;" class="hw_rel-date" data_date='${moment().unix()}'>${dateTime}</span>
                    </div>
                </div>
            </ul>
        `;

        $(".conversation_messages_box").append(valueHtml);
        // $("#send-message-input").text("");
        froala.html.set("");
        $("#chat_attachment_list").html("");
        chat_attachmentIdMap = {};
        chat_files.clear();
        chat_uploadFile.clear();
        scrollToBottomMessage();
        if (isAiBotActive[conversationID] == "1") {
            $("#" + tempId).removeClass("sending");
            setTimeout(function () {
                $(".conversation_messages_box").append(getTypingIndicatorCss());
                scrollToBottomMessage();
            }, 500);
        }
        $.post({
            url: incomingMessageApiEndpoint,
            data: {
                contact_id: CONTACT_ID,
                mailbox_id: MAILBOX_ID,
                conversation_id: conversationID,
                contact_email: CONTACT_EMAIL,
                value,
                type: 0,
                attachmentIds: chatAttachments,
                managerID: MAILBOX_MANAGER,
                isEmailed: false,
                time: moment().toISOString(),
                is_ai_bot_active: isAiBotActive[conversationID]
            }
        })
            .done(response => {
                if (response.status == "success") {
                    conversationID = response.data.conversation_id;
                    addSeenNotSeenLabel(WIDGET_LANGUAGE["not-seen"]);
                    createjs.Sound.play(sendSoundID);
                    $("#" + tempId).removeClass("sending");
                    $("#" + tempId).parents(".message-body").attr("id", `message-${response.data.messageId}`);
                    conversationID = response.data["conversation_id"];
                    if (previousConversationID == "") {
                        previousConversationID = conversationID;
                        if ($("#latest_previous_conversations").find(".chat_widget_conversation").length < 3) {
                            $("#chat_back_button").addClass("see_previous_conversation").removeClass("back_show_home");
                            $("#see_previous_button_div").removeClass("d-none");
                            $("#previous_conversations").removeClass("d-none").addClass("d-flex");
                            $("#conversation_loader").removeClass("d-none");
                        } else {
                            $($("#latest_previous_conversations").find(".chat_widget_conversation")[2]).remove();
                        }

                        processAutoReply(widgetOperationsData).then(autoReplyData => {
                            let timeoutTime = 0;
                            if (autoReplyData.sendAutoReply) {
                                setTimeout(function () {
                                    $(".conversation_messages_box").append(getTypingIndicatorCss());
                                    scrollToBottomMessage();
                                }, timeoutTime);
                                timeoutTime += 500;
                                setTimeout(function () {
                                    $("#typingEffectContainer").remove();
                                    $(".conversation_messages_box").append(`
                                        <ul class="p-0 d-flex message-body justify-content-start" id="message-${moment().valueOf()}">
                                            <div class="avatar avatar-sm mg-r-5 d-flex justify-content-center align-items-center" style="background: ${SELECTED_COLOR}; border-radius: 50%;">
                                                <img src="https://cdn.helpwise.io/assets/images/helpwise-chat-icon-xs.png" style="height: 20px; width: 20px;">
                                            </div>
                                            <li class="list-group-item d-flex flex-column flex-column inboundMessage" style="background: #fcfcfc; color: black;">  
                                                <div>
                                                ${autoReplyData.messageToshow}
                                                </div>
                                            </li>       
                                        </ul>
                                    `);
                                    scrollToBottomMessage();
                                }, timeoutTime);
                            }

                            if (autoReplyData.displayReplyTime && !isAiBotActive[conversationID]) {
                                setTimeout(function () {
                                    $(".conversation_messages_box").append(getTypingIndicatorCss());
                                    scrollToBottomMessage();
                                }, timeoutTime);
                                timeoutTime += 500;
                                setTimeout(function () {
                                    $("#typingEffectContainer").remove();
                                    $(".conversation_messages_box").append(`
                                        <ul class="p-0 d-flex message-body justify-content-start" id="message-${moment().valueOf()}">
                                            <div class="avatar avatar-sm mg-r-5 d-flex justify-content-center align-items-center" style="background: ${SELECTED_COLOR}; border-radius: 50%;">
                                                <img src="https://cdn.helpwise.io/assets/images/helpwise-chat-icon-xs.png" style="height: 20px; width: 20px;">
                                            </div>
                                            <li class="list-group-item d-flex flex-column flex-column inboundMessage" style="background: #fcfcfc; color: black;">  
                                                <div>
                                                    ${MAILBOX_NAME} replies ${autoReplyData.replyTime}
                                                </div>
                                            </li>       
                                        </ul>
                                    `);
                                    scrollToBottomMessage();
                                }, timeoutTime);
                            }
                        });

                        if (showLeadDisplay) {

                            let displayLeadCaptureMessage = LEAD_CAPTURE_MESSAGE ? true : false;
                            setTimeout(function () {
                                if (displayLeadCaptureMessage) {
                                    $(".conversation_messages_box").append(`
                                        <ul class="p-0 d-flex message-body justify-content-start" id="message-${moment().valueOf()}">
                                            <div class="avatar avatar-sm mg-r-5">
                                                ${DISPLAY_AVATAR}
                                            </div>
                                            <li class="list-group-item d-flex flex-column inboundMessage">  
                                                <div style='width: 100%' class="fr-view">
                                                    ${LEAD_CAPTURE_MESSAGE ? LEAD_CAPTURE_MESSAGE : ""}
                                                </div>
                                            </li>       
                                        </ul>
                                    `);
                                }
                            }, 3000);

                            setTimeout(function () {
                                $(".conversation_messages_box").append(`
                                    <div class="d-flex">
                                        <div class="avatar avatar-sm mg-r-5">
                                            ${DISPLAY_AVATAR}
                                        </div>
                                        <div class="card pd-y-15 pd-x-20" style="width: 100%;border-radius: 5px 6px 12px 12px;margin-bottom: 1rem; box-shadow: rgba(0,0,0,0.1) 0px 13px 22px -10px;">
                                            <form class="lead_details_form">
                                                <div class="form-group">
                                                    <label> ${EMAIL_LABEL ? EMAIL_LABEL : "Get notified on"} </label>
                                                    <div class="form-control d-flex pd-0 bd-0">
                                                        <div class="input-group" id="hw-lead-form">
                                                            <input type="email" class="form-control" placeholder="Email Address" id="lead_email">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary" id="hw-submit-lead-email" style="padding: 6px 18px;background: ${SELECTED_COLOR};border-radius: 0px 5px 5px 0px;">
                                                                    <i class="fas fa-angle-right"></i>
                                                                </button>
                                                                <div class="btn btn-primary tx-14 d-none" id="hw-lead-loader" style="border-radius: 0px 5px 5px 0px;">
                                                                    <div class="text-white" role="status" style="display: inline-block;height: 1rem !important;width: 1rem !important;vertical-align: text-bottom;border: 0.15em solid currentColor;border-right-color: transparent;border-radius: 50%;animation: spinner-border .75s linear infinite;">
                                                                        <span class="sr-only">Loading...</span>
                                                                    </div>
                                                                </div>
                                                                <div class="hw-lead-submit d-none">
                                                                    <div class="btn btn-success" disabled="true" style="border-radius: 0px 5px 5px 0px;"><i class="fas fa-check"></i></div>
                                                                </div>
                                                            </div>
                                                            <div class="invalid-feedback" id="lead_email_error"></div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                `);
                            }, 3500);
                        }

                        if (response.data.isAutoReplyTriggered) {
                            let rulesAutoReplyData = response.data.rulesAutoReplyData;
                            setTimeout(function () {
                                $(".conversation_messages_box").append(`
                                    <ul class="p-0 d-flex message-body justify-content-start" id="message-${rulesAutoReplyData.message_id}">
                                        <div class="avatar avatar-sm mg-r-5">
                                            ${DISPLAY_AVATAR}
                                        </div>
                                        <li class="list-group-item d-flex flex-column inboundMessage">  
                                        <div style='width: 100%' class="fr-view">
                                            ${rulesAutoReplyData.body}
                                        </div>
                                        </li>       
                                    </ul>
                                `);
                            }, 4000);
                        }
                        // makeConversationsUI();
                    }
                    if (isAiBotActive[conversationID] && response.data.aiBotMessage != '') {
                        // let messagesArray = response.data.aiBotMessage.split("<break>")
                        // Loop through the outcomes
                        // timeoutValue = 0;
                        // messagesArray.forEach((gptRes) => {
                        //     setTimeout(() => {
                        //         appendAiChatMessage(gptRes);
                        //     }, timeoutValue)
                        //     timeoutValue = 1000;
                        // });
                        // if (messagesArray.length == 0) {
                        appendAiChatMessage(response.data.aiBotMessage);
                        // }
                        isAiBotActive[conversationID] = response.data.aiBotActive;
                    }
                } else {
                    $("#" + tempId)
                        .parents(".message-body")
                        .append(
                            `
                            <div class="d-flex align-items-center mg-r-5 mg-t-2" style="font-size: 0.85rem;color: red;">
                                <i class="fas fa-exclamation-circle mg-r-5" style="color:red;"></i> Couldn't send
                            </div>
                            `
                        );
                }
            })
            .fail(() => {
                $("#" + tempId)
                    .parents(".message-body")
                    .append(
                        `
                        <div class="d-flex align-items-center mg-r-5 mg-t-2" style="font-size: 0.85rem;color: red;">
                            <i class="fas fa-exclamation-circle mg-r-5" style="color:red;"></i> Couldn't send
                        </div>
                        `
                    );
            });
    }
}

function updateUserContact(contact_id, email) {
    $.post({
        url: "/api/chat-widget/updateDetails",
        data: {
            email,
            contactID: contact_id,
            managerId: MAILBOX_MANAGER,
            refer: "livechatwidget",
            mailboxId: MAILBOX_ID,
            conversationId: conversationID
        }
    })
        .done(response => {
            if (response.status == "success") {
                showLeadDisplay = false;
                $("#hw-lead-loader").addClass("d-none");
                $(".hw-lead-submit").removeClass("d-none");
                $("#send_existing_messages_form").removeClass("d-none").addClass("d-flex");
                // console.log("success");
            }
        })
        .fail(err => {
            console.log(err);
        });
}

function addSeenNotSeenLabel(seenStatus) {
    $(".hw_seen_status").remove();

    let sentMessagesLength = $(".hw_message_seen_label.sent").length;

    if (sentMessagesLength > 0) {
        $($(".hw_message_seen_label.sent").get(sentMessagesLength - 1)).append(`
            <span style="font-size:0.6rem; color: #8c8d90; text-align: right; padding-right: 10px;" class="hw_seen_status">${seenStatus}</span>
        `);
    }
}

function randomString(length) {
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function convertLinkToAnchor(text, type) {
    return text;

    // let linkColor = "white";
    // if(type == 1){
    //     linkColor = "blue";
    // }
    // let urlRe = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;
    // let linkRegEx = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|(?:help|h[kmnrtu])|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    // return text.replace(urlRe, function(url) {
    //     if(url.includes("//")){
    //         return '<a href="' + url + '" style="color: '+linkColor+'; text-decoration: underline;" target="_blank">' + url + '</a>';
    //     } else {
    //         return '<a href="//' + url + '" style="color: '+linkColor+'; text-decoration: underline;" target="_blank">' + url + '</a>';
    //     }
    // });
}

function getFileIcon(extension, size) {
    let iconStyle = "";
    if (size) {
        iconStyle = `style="height:${size}px;width:${size}px;"`;
    }

    let ext = extension.toString().toLowerCase();
    return `<span ${iconStyle} class="fiv-viv fiv-icon-blank fiv-icon-${ext}"></span>`;
}

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + " B";
    }
    var units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + " " + units[u];
}

function md5(d) {
    result = M(V(Y(X(d), 8 * d.length)));
    return result.toLowerCase();
}

function M(d) {
    for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)
        (_ = d.charCodeAt(r)), (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
    return f;
}

function X(d) {
    for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
    for (m = 0; m < 8 * d.length; m += 8)
        _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
    return _;
}

function V(d) {
    for (var _ = "", m = 0; m < 32 * d.length; m += 8)
        _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
    return _;
}

function Y(d, _) {
    d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
    for (var m = 1732584193, f = -271733879, g = -1732584194, h = 271733878, i = 0; i < d.length; i += 16) {
        var a = m,
            r = f,
            e = g,
            n = h;
        f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, g = md5_ff(g, h = md5_ff(h, m = md5_ff(m, f, g, h, d[i + 0], 7, -680876936), f, g, d[i + 1], 12, -389564586), m, f, d[i + 2], 17, 606105819), h, m, d[i + 3], 22, -1044525330), g = md5_ff(g, h = md5_ff(h, m = md5_ff(m, f, g, h, d[i + 4], 7, -176418897), f, g, d[i + 5], 12, 1200080426), m, f, d[i + 6], 17, -1473231341), h, m, d[i + 7], 22, -45705983), g = md5_ff(g, h = md5_ff(h, m = md5_ff(m, f, g, h, d[i + 8], 7, 1770035416), f, g, d[i + 9], 12, -1958414417), m, f, d[i + 10], 17, -42063), h, m, d[i + 11], 22, -1990404162), g = md5_ff(g, h = md5_ff(h, m = md5_ff(m, f, g, h, d[i + 12], 7, 1804603682), f, g, d[i + 13], 12, -40341101), m, f, d[i + 14], 17, -1502002290), h, m, d[i + 15], 22, 1236535329), g = md5_gg(g, h = md5_gg(h, m = md5_gg(m, f, g, h, d[i + 1], 5, -165796510), f, g, d[i + 6], 9, -1069501632), m, f, d[i + 11], 14, 643717713), h, m, d[i + 0], 20, -373897302), g = md5_gg(g, h = md5_gg(h, m = md5_gg(m, f, g, h, d[i + 5], 5, -701558691), f, g, d[i + 10], 9, 38016083), m, f, d[i + 15], 14, -660478335), h, m, d[i + 4], 20, -405537848), g = md5_gg(g, h = md5_gg(h, m = md5_gg(m, f, g, h, d[i + 9], 5, 568446438), f, g, d[i + 14], 9, -1019803690), m, f, d[i + 3], 14, -187363961), h, m, d[i + 8], 20, 1163531501), g = md5_gg(g, h = md5_gg(h, m = md5_gg(m, f, g, h, d[i + 13], 5, -1444681467), f, g, d[i + 2], 9, -51403784), m, f, d[i + 7], 14, 1735328473), h, m, d[i + 12], 20, -1926607734), g = md5_hh(g, h = md5_hh(h, m = md5_hh(m, f, g, h, d[i + 5], 4, -378558), f, g, d[i + 8], 11, -2022574463), m, f, d[i + 11], 16, 1839030562), h, m, d[i + 14], 23, -35309556), g = md5_hh(g, h = md5_hh(h, m = md5_hh(m, f, g, h, d[i + 1], 4, -1530992060), f, g, d[i + 4], 11, 1272893353), m, f, d[i + 7], 16, -155497632), h, m, d[i + 10], 23, -1094730640), g = md5_hh(g, h = md5_hh(h, m = md5_hh(m, f, g, h, d[i + 13], 4, 681279174), f, g, d[i + 0], 11, -358537222), m, f, d[i + 3], 16, -722521979), h, m, d[i + 6], 23, 76029189), g = md5_hh(g, h = md5_hh(h, m = md5_hh(m, f, g, h, d[i + 9], 4, -640364487), f, g, d[i + 12], 11, -421815835), m, f, d[i + 15], 16, 530742520), h, m, d[i + 2], 23, -995338651), g = md5_ii(g, h = md5_ii(h, m = md5_ii(m, f, g, h, d[i + 0], 6, -198630844), f, g, d[i + 7], 10, 1126891415), m, f, d[i + 14], 15, -1416354905), h, m, d[i + 5], 21, -57434055), g = md5_ii(g, h = md5_ii(h, m = md5_ii(m, f, g, h, d[i + 12], 6, 1700485571), f, g, d[i + 3], 10, -1894986606), m, f, d[i + 10], 15, -1051523), h, m, d[i + 1], 21, -2054922799), g = md5_ii(g, h = md5_ii(h, m = md5_ii(m, f, g, h, d[i + 8], 6, 1873313359), f, g, d[i + 15], 10, -30611744), m, f, d[i + 6], 15, -1560198380), h, m, d[i + 13], 21, 1309151649), g = md5_ii(g, h = md5_ii(h, m = md5_ii(m, f, g, h, d[i + 4], 6, -145523070), f, g, d[i + 11], 10, -1120210379), m, f, d[i + 2], 15, 718787259), h, m, d[i + 9], 21, -343485551), m = safe_add(m, a), f = safe_add(f, r), g = safe_add(g, e), h = safe_add(h, n)
    }
    return Array(m, f, g, h)
}

function md5_cmn(d, _, m, f, r, i) {
    return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
}

function md5_ff(d, _, m, f, r, i, n) {
    return md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
}

function md5_gg(d, _, m, f, r, i, n) {
    return md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
}

function md5_hh(d, _, m, f, r, i, n) {
    return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
}

function md5_ii(d, _, m, f, r, i, n) {
    return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
}

function safe_add(d, _) {
    var m = (65535 & d) + (65535 & _);
    return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
}

function bit_rol(d, _) {
    return (d << _) | (d >>> (32 - _));
}

function mailboxUnreadMessageCount(mailboxID, contactID) {
    $.post({
        url: "/api/chat-widget/mailboxUnreadCount",
        data: {
            mailboxID,
            contactID
        }
    })
        .done(response => {
            if ((response.status = "success")) {
                if (iframeDisplay == "OFF") {
                    sendMessageToParent("HelpwiseWidgetMessage", { count: response.data });
                    // window.top.postMessage("HelpwiseWidgetMessage:" + response.data, "*");
                }
            } else {
                if (iframeDisplay == "OFF") {
                    sendMessageToParent("HelpwiseWidgetMessage", { count: 0 });
                    // window.top.postMessage("HelpwiseWidgetMessage:" + "0", "*");
                }
            }
        })
        .fail(() => {
            if (iframeDisplay == "OFF") {
                sendMessageToParent("HelpwiseWidgetMessage", { count: 0 });
                // window.top.postMessage("HelpwiseWidgetMessage:" + "0", "*");
            }
        });
}

function mailboxUnreadChatMessageCount(mailboxID, contactID) {
    $.post({
        url: "/api/chat-widget/mailboxUnreadCount",
        data: {
            mailboxID,
            contactID
        }
    })
        .done(response => {
            if ((response.status = "success")) {
                if (response.data > 0) {
                    $(".widget_unread_message_count").text(response.data);
                    $(".widget_unread_message_count")
                        .removeClass("d-none")
                        .addClass("d-flex");
                } else {
                    $(".widget_unread_message_count")
                        .removeClass("d-flex")
                        .addClass("d-none");
                }
            } else {
                $(".widget_unread_message_count")
                    .removeClass("d-flex")
                    .addClass("d-none");
            }
        })
        .fail(() => {
            $(".widget_unread_message_count")
                .removeClass("d-flex")
                .addClass("d-none");
        });
}

function showconversations(contact_id, mailbox_id, conversationPage) {
    // if(allConversations.length == 0){

    if (conversationPage > 0) {
        $(".chat_widget_conversation_list").append(`
            <div class="pos-absolute b-80" id="conversationPageChange" style="left: 50%; transform: translateX(-50%);">
                <div class="spinner-border text-custom" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `);
    }

    $.ajax({
        url: "/api/chat-widget/conversations.php",
        data: {
            contact_id,
            mailbox_id,
            page: conversationPage,
            limit: 20
        }
    })
        .done(response => {
            isConversationPaginationLoaded = true;
            if (response.status == "success") {
                if (response.data.length == 0 && conversationPage == 0) {
                    haveMoreThreads = false;
                    $(".chat_widget_conversation_list").append(`
                        <div style="height: inherit; width: inherit;" class="d-flex justify-content-center align-items-center">
                            <h2 style="text-align: center;">We didn't get any chance to help you!</h2>
                        </div>
                    `);
                    turnPageLoader("off");
                    // $('.widgetMessagePage').addClass('d-none');
                    // $('.widgetConversationPage').removeClass('d-none');
                    // //$('.chat_widget_new_conversation').addClass('d-none');
                    //$('.widgetMessagePage').addClass('d-none');
                } else {
                    if (conversationPage > 0 && response.data.length == 0) {
                        // console.log("-------");
                        haveMoreThreads = false;
                        $("#conversationPageChange").remove();
                    } else {
                        allConversations = response.data;
                        showconversationsUI(response.data, conversationPage);
                    }
                    // $('.widgetMessagePage').addClass('d-none');
                    // $('.widgetHomePage').addClass('d-none');
                    // $('.widgetConversationPage').removeClass('d-none');
                }
            } else {
                $("#conversationPageChange").remove();
            }
        })
        .fail(() => {
            $("#conversationPageChange").remove();
        });
    // } else {
    //     showconversationsUI(allConversations);
    // }
}


function showconversationsUI(data, pageNumber) {
    var n = data.length;
    if (n > 0) {
        pageNumber == 0 ? $('.chat_widget_conversation_list').html("") : "";
        for (var i = 0; i < n; i++) {
            var conversation = data[i];
            let {
                conversation_id,
                body,
                date_time,
                avatarTag,
                agentName,
                assigned_to,
                unread_count,
                is_read,
                isAvailable,
                agentID
            } = conversation;

            let avatarClass = "";
            if (isAvailable == 1) {
                avatarClass = "avatar-online";
            } else if (isAvailable == -1) {
                avatarClass = "";
            } else {
                avatarClass = "avatar-away";
            }

            if (agentID && $("#teammate-" + agentID).length > 0) {
                $(`#teammate-${agentID}`).removeClass("avatar-online").removeClass("avatar-away").addClass(avatarClass);
            }

            if (agentName == "") {
                agentName = mailboxName;
                avatarClass = "";
            } else {
                if (STAGE == "dev" || MAILBOX_MANAGER == "211988") {
                    agentName = agentName.split(" ")[0];
                }
            }

            if (!avatarTag) {
                avatarTag = DISPLAY_AVATAR;
            }


            let unreadDisplay = "d-flex";
            if (unread_count == '0') {
                unreadDisplay = "d-none";
            }

            var d = moment(date_time, "X").lang(WIDGET_LANG_CODE).fromNow();
            body = body.length > 20 ? body.slice(0, 20) + "..." : body
            if (body.length < 1) {
                body = `<i class="fas fa-paperclip tx-gray-700" style="transform: rotate(45deg);"></i>`;
            }
            $('.chat_widget_conversation_list').append(`
          <div class="chat_widget_conversation ${is_read == 1 ? "read" : "unread"}" id="${conversation_id}">
              <div class="d-flex align-items-center">
                  <div class="avatar avatar-sm agent_avatar ${avatarClass}">
                      ${avatarTag}
                  </div>
              </div>
              <div class="d-flex flex-column mg-l-10" style="width: 100%;">
                  <div class="tx-gray-700 d-flex justify-content-between" style="width: 100%; padding-left: 10px;font-size: 0.8125rem;">
                      <p class="mg-b-0 agent_name">${agentName}</p>
                      <div class="d-flex">
                      <span class="chat_message_bubble badge badge-custom  mg-r-10 ${unreadDisplay} align-items-center justify-content-center" style="border-radius: 50% !important;min-height: 18px;min-width: 18px;font-size: 10px;font-weight: 400;">${unread_count}</span>
                          <p class="mg-b-0 chat_message_date hw_rel-date" data_date = '${date_time}'>${d}</p>
                      </div>
                  </div>
                  <div class="d-flex" style="width: 100%; padding-left: 10px;">
                      <p class="mg-0 chat_message_content" style="font-size: 0.8125rem;">${body}</p>
                  </div>
              </div>
          </div>
          `);
            // <p class="chat_message_bubble d-none mg-b-0 mg-r-10" style="background: #006adc; border-radius: 50%; color: white;">0</p>
            $(`#${conversation_id}`).data({
                avatarTag,
                agentName,
                avatarClass
            });

        }
        // $(".chat_widget_conversation_list").animate({ scrollTop: $('.chat_widget_conversation_list').prop("scrollHeight")}, 1000);
        turnPageLoader("off");
        pageNumber == 0 ? "" : $("#conversationPageChange").remove();
    }
    pageNumber == 0 ? "" : $("#conversationPageChange").remove();
}

function showmessages(contact_id, mailbox_id, conversation_id, offset, limit) {
    $.ajax({
        url: '/api/chat-widget/messages-bot',
        data: {
            contact_id,
            mailbox_id,
            conversation_id,
            offset,
            limit
        }
    }).done(response => {
        if (response.status == 'success') {
            // console.log(response.data == 0);
            if (response.data == 0) {
                $('.widgetMessagePage').addClass('d-none');
                $('.widgetConversationPage').removeClass('d-none');
            } else {
                changeWidgetPage("message");

                let assignedTo = response.data.assignedTo;

                let agentAvatarTag = DISPLAY_AVATAR;
                let agentAgentName = MAILBOX_NAME;
                let agentAvatarClass = ""
                let agentAvailableStatus = "";
                let agentFlag = false;
                if (assignedTo.id != "0") {
                    agentAvatarTag = assignedTo.avatarTag;
                    agentAgentName = assignedTo.first_name + " " + assignedTo.last_name;
                    if (STAGE == "dev" || MAILBOX_MANAGER == 211988) {
                        agentAgentName = assignedTo.first_name;
                    }
                    agentAvatarClass = assignedTo.isAvailable == 1 ? "avatar-online" : "avatar-away";
                    agentAvailableStatus = assignedTo.isAvailable == 1 ? WIDGET_LANGUAGE["available"] : WIDGET_LANGUAGE["away"];
                    agentFlag = true;
                }
                $('.ongoing_message_thread_avatar').removeClass("avatar-online").removeClass("avatar-away").addClass(agentAvatarClass);
                $('.ongoing_message_thread_avatar').html(agentAvatarTag);
                $('#ongoing_message_agent_name').text(agentAgentName);
                agentFlag ?
                    $("#agent_available_status").text(agentAvailableStatus).removeClass("d-none") : $("#agent_available_status").addClass("d-none");

                var currentPosEl = $('.message-body').length > 0 ? $('.message-body').get(0).id : "";
                $("#chat_back_button").attr("disabled", "true");
                makemessagesUI(response.data.messages, conversation_id, offset);
                if (offset == 0) {
                    //   $("html, body").animate({ 
                    //     scrollTop: $( 
                    //       'html, body').get(0).scrollHeight 
                    // }, 2000); 
                    scrollToBottomMessage();
                    let seenStatus = response.data.readCount > 0 ? WIDGET_LANGUAGE["seen"] : WIDGET_LANGUAGE["not-seen"];
                    let sentMessagesLength = $(".hw_message_seen_label.sent").length;
                    if (sentMessagesLength > 0) {
                        $($(".hw_message_seen_label.sent").get(sentMessagesLength - 1)).append(`
                          <span style="font-size:0.6rem; color: #8c8d90; text-align: right; padding-right: 10px;" class="hw_seen_status">${seenStatus}</span>
                      `)
                    }
                    if (response.data.isBotActive && response.data.isBotActive == 1) {
                        isBotInterrupted = false;
                        if (bots && bots[response.data.botId]) {
                            let botIdentity = bots[response.data.botId]["botIdentity"];
                            triggerMessageBot({ botPathId: response.data.currentBotPathId, botData: JSON.parse(bots[response.data.botId]["bot_data"]), isTextTriggered: true, botIdentity });
                        }
                    }

                    checkForWorkingHoursNotice(widgetOperationsData);
                } else {
                    if (currentPosEl == "") {

                    } else {
                        // $('.conversation_messages_box').scrollTop($(`#${currentPosEl}`).offset().top);
                    }
                }
                setTimeout(function () {
                    $("#chat_back_button").removeAttr("disabled");
                }, 1000);



                mailboxUnreadChatMessageCount(MAILBOX_ID, CONTACT_ID);
            }
        } else {

        }
    }).fail(() => { });
}


function makemessagesUI(data, conversation_id) {

    var n = data.length;
    if (n > 0) {

        for (var i = 0; i < n; i++) {
            var j = i + 1;
            var message = data[i];
            let {
                id,
                body,
                date_time,
                type,
                avatarTag,
                attachment,
                message_time,
                isAvailable,
                agentID
            } = message;
            var d = moment(date_time).lang(WIDGET_LANG_CODE).fromNow();
            let alignment = "";
            let color = "";
            let avatarHtml = "";
            let dateSpanColor = "";
            let dateAlign = "";


            let avatarClass = "";
            if (isAvailable == 1) {
                avatarClass = "avatar-online";
            } else {
                avatarClass = "avatar-away";
            }

            if (agentID && $("#teammate-" + agentID).length > 0) {
                $(`#teammate-${agentID}`).removeClass("avatar-online").removeClass("avatar-away").addClass(avatarClass);
            }


            let leftDelete = "";
            let sentAlignment = "";
            let paddingClass = "";
            let seenDiv = "";

            if (type == 1 || type == 6) {
                alignment = "justify-content-start";
                messageClass = "inboundMessage";


                if (agentID != '0') {
                    if (agentID == -1) {
                        avatarHtml = `
                            <div class="avatar avatar-sm mg-r-5 rounded-circle pd-5" style="width: 32px !important; background: ${SELECTED_COLOR};">
                                <img src="https://cdn.helpwise.io/assets/images/helpwise-chat-icon-xs.png" style="border-radius: 50%;display: block;background-color: transparent !important;">
                            </div>
                        `;
                    } else {
                        if (agentID < 0) {
                            avatarClass = "";
                        }
                        avatarHtml = `<div class="avatar avatar-sm mg-r-5 ${avatarClass}">
                            ${avatarTag}
                        </div>`;
                    }
                } else {
                    avatarHtml = `
                  <div class="avatar avatar-sm mg-r-5">
                    ${DISPLAY_AVATAR}
                  </div>
                `;
                }

                dateSpanColor = "#8c8d90";
                dateAlign = "left";
                paddingClass = "padding-left: 10px;";
            } else {
                alignment = "justify-content-end";
                messageClass = "outboundMessage";
                dateSpanColor = "#8c8d90";
                dateAlign = "right";
                paddingClass = "padding-right: 10px;";
                // leftDelete = `
                //     <div class="hw_message_delete d-none align-items-center mg-b-10 pd-5" style="cursor: pointer;">
                //         <i class="far fa-trash-alt"></i>
                //     </div>
                // `;

                sentAlignment = "align-items-end";

                seenDiv = "sent";
            }

            let attachmentHtml = "";
            if (attachment.length > 0) {
                attachmentHtml = returnAttachmentDisplay(attachment, type);
                // for(let i = 0; i < attachment.length; i++){
                //     let mimeType = attachment[i].mime_type;
                //     let url = attachment[i].url;
                //     if(mimeType.includes("image/")){
                //         imagesHtml += `
                //             <br><img src="${url}" style="max-height: 300px; max-width: 300px;"/>
                //         `
                //     }

                // }
            }
            let displayMessage = convertLinkToAnchor(body, type);

            $('.conversation_messages_box').prepend(`
              <ul class="p-0 d-flex ${alignment} message-body" id="message-${id}">
                  ${avatarHtml} ${leftDelete}
                  <div class="d-flex flex-column ${sentAlignment} hwMessageContent">
                      <li class="list-group-item d-flex flex-column ${messageClass}">
                        <div class="fr-view" style='width: 100%'>  
                          ${displayMessage} ${attachmentHtml}
                        </div>
                      </li>  
                      <div class="d-flex hw_message_seen_label ${seenDiv}">
                          <span style="font-size:0.6rem; color: ${dateSpanColor}; text-align: ${dateAlign}; ${paddingClass}" class="hw_rel-date" data_date='${message_time}'>${d}</span>
                      </div>
                  </div>
              </ul>`);


        }
        if (!isDetailProvidedByContact && IS_LEAD_FORM_MANDATORY) {
            $(".conversation_messages_box").append(`
                <div class="d-flex">
                    <div class="avatar avatar-sm mg-r-5">
                        ${DISPLAY_AVATAR}
                    </div>
                    <div class="card pd-y-15 pd-x-20" style="width: calc(100% - 40px);border-radius: 5px 6px 12px 12px;margin-bottom: 1rem; box-shadow: rgba(0,0,0,0.1) 0px 13px 22px -10px;">
                        <form class="lead_details_form">
                            <div class="form-group">
                                <label> Please provide your email address </label>
                                <div class="form-control d-flex pd-0 bd-0">
                                    <div class="input-group" id="hw-lead-form">
                                        <input type="email" class="form-control" placeholder="Email Address" id="lead_email">
                                        <div class="input-group-append">
                                            <button type="button" class="btn btn-primary" id="hw-submit-lead-email" style="padding: 6px 18px;background: ${SELECTED_COLOR};border-radius: 0px 5px 5px 0px;">
                                                <i class="fas fa-angle-right"></i>
                                            </button>
                                            <div class="btn btn-primary tx-14 d-none" id="hw-lead-loader" style="border-radius: 0px 5px 5px 0px;">
                                                <div class="text-white" role="status" style="display: inline-block;height: 1rem !important;width: 1rem !important;vertical-align: text-bottom;border: 0.15em solid currentColor;border-right-color: transparent;border-radius: 50%;animation: spinner-border .75s linear infinite;">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                            <div class="hw-lead-submit d-none">
                                                <div class="btn btn-success" disabled="true" style="border-radius: 0px 5px 5px 0px;"><i class="fas fa-check"></i></div>
                                            </div>
                                        </div>
                                        <div class="invalid-feedback" id="lead_email_error"></div>
                                    </div>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
            `);

            $("#send_existing_messages_form").addClass("d-none").removeClass("d-flex");
        } else {
            $("#send_existing_messages_form").addClass("d-flex").removeClass("d-none");
        }
        // #messageBoxContainer").animate({ scrollTop: $('.conversation_messages_box').prop("scrollHeight")}, 1000);
        turnPageLoader("off");
    }
}

function returnAttachmentDisplay(attachment, type) {
    let color = "white";
    if (type == 1) {
        color = "black";
    }
    let attachmentHtml = "";
    for (let i = 0; i < attachment.length; i++) {
        if (
            attachment[i].mime_type.split("/")[1] == "jpg" ||
            attachment[i].mime_type.split("/")[1] == "jpeg" ||
            attachment[i].mime_type.split("/")[1] == "png"
        ) {
            attachmentHtml += `<br> <a href="${attachment[i].url
                }" target="_blank" style="color: ${color}; text-align: center;"> <img src="${attachment[i].url
                }" style="object-fit: cover;"> View ${attachment[i].name
                } (${humanFileSize(attachment[i].size, true)})</a>`;
        } else if (attachment[i].mime_type.split("/")[1] == "mp4") {
            attachmentHtml += `<br> <a href="${attachment[i].url
                }" target="_blank" style="color: ${color}; text-align: center;"> <video controls style="height: 230px;width: 300px;object-fit: cover;"">
                        <source src="${attachment[i].url}"
                                type="video/mp4">
                        Sorry, your browser doesn't support embedded videos.
                </video> View ${attachment[i].name} (${humanFileSize(
                    attachment[i].size,
                    true
                )})</a>`;
        } else if (
            attachment[i].mime_type.split("/")[1] == "mpeg" ||
            attachment[i].mime_type.split("/")[1] == "mp3" ||
            attachment[i].mime_type.split("/")[1] == "ogg" ||
            attachment[i].mime_type.split("/")[1] == "amr"
        ) {
            attachmentHtml += `<br>  <a href="${attachment[i].url
                }" target="_blank" style="color: ${color}; text-align: center;"> <audio controls>
            <source src="${attachment[i].url}" type="${attachment[i].mime_type
                }">
            Your browser does not support the audio element.
            </audio> View ${attachment[i].name} (${humanFileSize(
                    attachment[i].size,
                    true
                )})</a>`;
        } else {
            // return `<embed src="${attachment.url}" style="width:600px; height:500px;">`
            attachmentHtml += `<br> <a href="${attachment[i].url
                }" target="_blank" style="color: ${color}; text-align: center;"> View ${attachment[i].name} (${humanFileSize(
                    attachment[i].size,
                    true
                )})</a>`;

            // <p>Whatsapp Media <a href="${attachment[i].url}">to the PDF!</a></p>
        }
    }
    return attachmentHtml;
}

function returnInstantAttachmentDisplay(attachment) {
    let attachmentHtml = "";
    for (let i = 0; i < attachment.length; i++) {
        if (
            attachment[i].extension == "jpg" ||
            attachment[i].extension == "jpeg" ||
            attachment[i].extension == "png"
        ) {
            attachmentHtml += `<br><a href="${attachment[i].url
                }" target="_blank" style="color: white; text-align: center;"><img src="${attachment[i].url
                }" style="object-fit: cover;"> View ${attachment[i].name
                } (${humanFileSize(attachment[i].size, true)}) </a>`;
        } else if (attachment[i].extension == "mp4") {
            attachmentHtml += `<br><a href="${attachment[i].url
                }" target="_blank"> <video controls style="height: 230px;width: 300px;object-fit: cover;"">
                        <source src="${attachment[i].url}"
                                type="video/mp4">
                        Sorry, your browser doesn't support embedded videos.
                </video> View ${attachment[i].name} (${humanFileSize(
                    attachment[i].size,
                    true
                )})</a>`;
        } else if (
            attachment[i].extension == "mpeg" ||
            attachment[i].extension == "mp3" ||
            attachment[i].extension == "ogg" ||
            attachment[i].extension == "amr"
        ) {
            attachmentHtml += `<br><a href="${attachment[i].url
                }" target="_blank" style="color: white; text-align: center;"> <audio controls>
            <source src="${attachment[i].url}" type="${attachment[i].mime_type
                }">
            Your browser does not support the audio element.
            </audio> View ${attachment[i].name} (${humanFileSize(
                    attachment[i].size,
                    true
                )}) </a>`;
        } else {
            attachmentHtml += `<br> <a href="${attachment[i].url
                }" target="_blank" style="color: white; text-align: center;"> 
                                        <object data="${attachment[i].url
                }" type="${attachment[i].mimeType
                }" width="100%" height="100%"></object>
                                        View ${attachment[i].name
                } (${humanFileSize(
                    attachment[i].size,
                    true
                )})</a>
                                    `;
        }

        // else if(attachment[i].extension=='pdf')
        // {
        //     // return `<embed src="${attachment.url}" style="width:600px; height:500px;">`
        //     attachmentHtml += `<br> <a href="${attachment[i].url}" target="_blank" style="color: white">
        //             <object data="${attachment[i].url}" type="application/pdf" width="100%" height="100%">

        //             </object> View PDF</a>`;

        //             // <p>Whatsapp Media <a href="${attachment[i].url}">to the PDF!</a></p>
        // }
    }
    return attachmentHtml;
}

function openThread() {

    let mailFlag = false;
    let threadFlag = false;


    firebase_onlineOffline
        .auth()
        .signInWithCustomToken(ONLINE_OFFLINE_TOKEN)
        .then(function () {

            var onlineOfflineSocket = firebase_onlineOffline
                .database()
                .ref(`/ChatInbox-${MAILBOX_ID}/customer online status/${CONTACT_ID}`);


            let randomFirebaseId = randomString(10);
            onlineOfflineSocket.onDisconnect().set({
                status: "offline",
                contactID: CONTACT_ID,
                timeStamp: moment().toISOString()
            });

            onlineOfflineSocket.set({
                status: "online",
                contactID: CONTACT_ID,
                timeStamp: moment().toISOString()
            });

            onlineOfflineSocket.set({
                status: "online",
                contactID: CONTACT_ID,
                timeStamp: moment().toISOString()
            });

        }).catch((error) => {
            console.log("firebaseError", error.code);
            console.log("firebaseError", error.message);
        });

    firebase_chatapp
        .auth()
        .signInWithCustomToken(CUSTOM_TOKEN)
        .then(function () {

            let assignedSocket = firebase_chatapp
                .database()
                .ref(
                    `/ChatInbox-${MAILBOX_ID}/Contact-${CONTACT_ID}/chat widget receive assignment`
                );
            assignedSocket.on("value", function (data) {
                if (data.val()) {
                    // console.log(data.val());
                    let firebaseData = JSON.parse(JSON.stringify(data.val()));
                    let firebaseConversationID = firebaseData.threadID;
                    let agentID = firebaseData.agentDetails.id;
                    let agentName = MAILBOX_NAME;
                    let agentAvatarTag = DISPLAY_AVATAR;
                    let agentFlag = false;
                    if (agentID > 204376) {
                        agentName = firebaseData.agentDetails.firstname;
                        agentAvatarTag = firebaseData.agentDetails.avatarTag;
                        agentFlag = true;
                        if (STAGE == "dev" || MAILBOX_MANAGER == "211988") {
                            agentName = agentName.split(" ")[0];
                        }
                    }

                    if (currentPage == "CHAT_SCREEN_PAGE" && conversationID == firebaseConversationID) {
                        $(".ongoing_message_thread_avatar").html(agentAvatarTag);
                        $("#ongoing_message_agent_name").text(agentName);

                        if (agentFlag) {
                            let agentAvailableStatus = firebaseData.agentDetails.isAvailable == 1 ? WIDGET_LANGUAGE["available"] : WIDGET_LANGUAGE["away"];
                            $("#agent_available_status").text(agentAvailableStatus).removeClass("d-none");
                        } else {
                            $("#agent_available_status").addClass("d-none");
                        }
                    } else {
                        $("#" + firebaseData.threadID)
                            .find(".agent_avatar")
                            .html(agentAvatarTag);
                        $("#" + firebaseData.threadID)
                            .find(".agent_name")
                            .html(agentName);
                        $("#" + firebaseData.threadID).data({
                            avatarTag: agentAvatarTag
                        });
                        $("#" + firebaseData.threadID).data({
                            agentName: agentName
                        });
                    }
                }
            });

            var mailboxThreadSocket = firebase_chatapp
                .database()
                .ref(`ChatInbox-${MAILBOX_ID}/Contact-${CONTACT_ID}`);


            // if (previousConversationID == "") {
            //     previousConversationID = conversationID;
            // } else {
            //     // mailboxThreadSocket.off("value");
            //     previousConversationID = conversationID;
            // }

            mailboxThreadSocket.child(`/send`).on("value", function (data) {
                if (mailFlag) {
                    if (data.val()) {

                        isBotInterrupted = true;
                        createjs.Sound.play(receiveSoundID);
                        let firebaseData = JSON.parse(JSON.stringify(data.val()));

                        let avatarTag = firebaseData.avatarTag;
                        let isAvailableClass = firebaseData.isAvailable;
                        let avatarHtml = `
                      <div class="avatar avatar-sm mg-r-5">
                        ${DISPLAY_AVATAR}
                      </div>
                    `;

                        if (firebaseData.sent_by != "0") {
                            avatarHtml = `
                        <div class="avatar ${isAvailableClass} avatar-sm mg-r-5">
                          ${avatarTag}
                        </div>
                      `;
                        }

                        let date_time = moment(firebaseData.messageTime).lang(WIDGET_LANG_CODE).fromNow();
                        let attachmentHtml = "";
                        if (firebaseData.attachment) {
                            if (firebaseData.attachment.length > 0) {
                                attachmentHtml = returnAttachmentDisplay(
                                    firebaseData.attachment,
                                    1
                                );
                            }
                        }

                        let message = convertLinkToAnchor(firebaseData.body, 1);
                        let convMessage = firebaseData.message;

                        if (iframeDisplay == "ON") {
                            if (currentPage == "CHAT_SCREEN_PAGE" && conversationID == firebaseData.conversation_id) {
                                if ($(`#message-${firebaseData.message_id}`).length == 0) {
                                    $(".conversation_messages_box").append(`
                                    <ul class="p-0 d-flex justify-content-start message-body" id="message-${firebaseData.message_id}">
                                    ${avatarHtml}
                                    <div class="d-flex flex-column">
                                        <li class="list-group-item d-flex flex-column inboundMessage">  
                                            <div class="fr-view" style='width: 100%'>
                                            ${message} ${attachmentHtml}
                                            </div>
                                            
                                        </li>  
                                        <div class="d-flex hw_message_seen_label">   
                                            <span style="font-size:0.6rem; color: #8c8d90; text-align: left; padding-left: 10px;" class="hw_rel-date" data_date='${firebaseData.dateTime}'>${date_time}</span>
                                        </div>
                                    </div>
                                    </ul>
                                `);
                                    scrollToBottomMessage();
                                    markChatRead(
                                        CONTACT_ID,
                                        MAILBOX_ID,
                                        firebaseData.conversation_id
                                    );
                                    isAiBotActive[firebaseData.conversation_id] = "0";
                                }
                            } else {
                                mailboxUnreadChatMessageCount(MAILBOX_ID, CONTACT_ID);
                            }
                        } else {
                            // if(iframeDisplay == "OFF"){
                            mailboxUnreadMessageCount(MAILBOX_ID, CONTACT_ID);

                            if ($(".chat-widget-pop #hw_offChat_thread .triggerThread").length == 0) {
                                // $(".chat-widget").addClass("d-none");
                                // $(".chat-widget-pop").removeClass("d-none").addClass("d-flex");
                                turnChatWidgetPopOn();

                                let storedConversationID = $(".chat-widget-pop").data("conversationID");

                                // console.log("stored conversation ID", storedConversationID);

                                let currentElement = "#hw_chat_message_screen";

                                if (storedConversationID && storedConversationID > 0) {
                                    if (storedConversationID == firebaseData.conversation_id) {
                                        $("#hw_message_box").append(`
                                      <ul class="p-0 d-flex message-body justify-content-start received" id="message-${firebaseData.message_id}">
                                          ${avatarHtml}
                                          <div class="d-flex flex-column">
                                              <li class="list-group-item d-flex flex-column inboundMessage" style="padding: 17px 20px; background: white; box-shadow: rgba(0,0,0,0.1) 0px 0px 10px; border: none;">  
                                                  <div style='width: 100%' class="fr-view">${message} ${attachmentHtml}</div>
                                                  <div class="d-flex hw_message_seen_label">      
                                                      <span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${firebaseData.dateTime}'>${date_time}</span>
                                                  </div>
                                              </li> 
                                          </div>
                                      </ul>
                                    `);

                                        appendOrUpdateHwOffChatThread(firebaseData.conversation_id, message, avatarHtml, attachmentHtml, firebaseData.dateTime, date_time)

                                        $("#send_message_area").removeClass("d-none");
                                        // increase box height
                                        $("#hw_message_box").animate({
                                            scrollTop: $("#hw_message_box").prop("scrollHeight")
                                        }, 1000);
                                        // let messageBoxHeight = $(".chat-widget-pop").innerHeight();
                                        // window.top.postMessage("HelpwiseWidgetIframeOuterHeight:"+messageBoxHeight, "*");
                                    } else {
                                        appendOrUpdateHwOffChatThread(firebaseData.conversation_id, message, avatarHtml, attachmentHtml, firebaseData.dateTime, date_time)

                                        if ($("#hw_message_box .sentMessage").length == 0) {
                                            $("#hw_chat_message_screen").addClass("d-none").removeClass("d-flex");

                                            // $(".chat-widget-pop").data({
                                            //   conversationID: 0
                                            // });

                                            $("#hw_offChat_thread").removeClass("d-none").addClass("d-flex");
                                            currentElement = "#hw_offChat_thread";
                                            currentThreadId = "";
                                            if ($("#hw_offChat_thread .triggerThread").length == 0) {
                                                $($("#hw_offChat_thread .popConversation").get(0)).removeClass("d-none").addClass("d-flex");
                                                $("#stackShadowOffChatThread2").removeClass("d-none").addClass("d-flex");
                                                $("#hw_offChat_thread").addClass("pd-t-10");

                                                if ($("#hw_offChat_thread .popConversation").length > 2) {
                                                    $("#stackShadowOffChatThread1").removeClass("d-none").addClass("d-flex");
                                                }
                                            }
                                            // $("#hw_offChat_thread").animate({
                                            //   scrollTop: $("#hw_message_box").prop("scrollHeight")
                                            // }, 1000);
                                        }
                                    }
                                    if (mobileView == "ON" && currentElement == "#hw_chat_message_screen") {

                                    } else {
                                        increaseIframeHeight(0, currentElement);
                                    }
                                } else {
                                    $(".chat-widget-pop").data({
                                        conversationID: firebaseData.conversation_id
                                    });

                                    if (currentThreadId == "") {
                                        currentThreadId = firebaseData.conversation_id;

                                        // console.log("inside if");

                                        $.ajax({
                                            url: '/api/chat-widget/messages-bot',
                                            data: {
                                                contact_id: CONTACT_ID,
                                                mailbox_id: MAILBOX_ID,
                                                conversation_id: firebaseData.conversation_id,
                                                offset: 0,
                                                limit: 20
                                            }
                                        }).done(response => {
                                            if (response.status == "success") {
                                                $("#hw_message_box").html("");
                                                for (let i = 1; i < response.data.messages.length; i++) {
                                                    let message = response.data.messages[i];

                                                    let { id, body, date_time, type, avatarTag, attachment, message_time, isAvailable, agentID } = message;
                                                    var d = moment(date_time).lang(WIDGET_LANG_CODE).fromNow();
                                                    let alignment = "";
                                                    let color = "";
                                                    let avatarHtml = "";
                                                    let dateSpanColor = "";
                                                    let dateAlign = "";


                                                    let avatarClass = "";
                                                    if (isAvailable == 1) {
                                                        avatarClass = "avatar-online";
                                                    } else {
                                                        avatarClass = "avatar-away";
                                                    }

                                                    if (agentID && $("#teammate-" + agentID).length > 0) {
                                                        $(`#teammate-${agentID}`).removeClass("avatar-online").removeClass("avatar-away").addClass(avatarClass);
                                                    }


                                                    let sentAlignment = "";
                                                    let seenDiv = "";
                                                    let bgColor = "";
                                                    if (type == 1 || type == 6) {
                                                        alignment = "justify-content-start";
                                                        messageClass = "inboundMessage";
                                                        avatarHtml = `<div class="avatar avatar-sm mg-r-5 ${avatarClass}">
                                                        ${avatarTag}
                                                    </div>`
                                                        dateSpanColor = "#8c8d90";
                                                        dateAlign = "left";
                                                        bgColor = `white`;

                                                    } else {
                                                        alignment = "justify-content-end";
                                                        messageClass = "outboundMessage";
                                                        dateSpanColor = "#ffffffcf";
                                                        dateAlign = "right";
                                                        bgColor = linearGradientColor;
                                                        // leftDelete = `
                                                        //     <div class="hw_message_delete d-none align-items-center mg-b-10 pd-5" style="cursor: pointer;">
                                                        //         <i class="far fa-trash-alt"></i>
                                                        //     </div>
                                                        // `;

                                                        sentAlignment = "align-items-end";

                                                        seenDiv = "sent";
                                                    }

                                                    let attachmentHtml = "";
                                                    if (attachment.length > 0) {
                                                        attachmentHtml = returnAttachmentDisplay(attachment, type);
                                                    }

                                                    let displayMessage = convertLinkToAnchor(body, type);


                                                    let messageHtml = "";
                                                    if (i == response.data.messages.length - 1) {
                                                        messageHtml = `
                                                      <ul class="pd-l-5 pd-y-0 pd-r-0 d-flex message-body justify-content-start received w-100" id="message-${id}">
                                                        ${avatarHtml}
                                                        <div class="d-flex flex-column w-100">
                                                          <li class="list-group-item d-flex flex-column  popMessage">  
                                                            <div style='width: 100%'>${displayMessage} ${attachmentHtml}</div>

                                                            <div class="d-flex hw_message_seen_label">      
                                                              <span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${message_time}'>${d}</span>
                                                            </div>
                                                          </li>
                                                        </div>
                                                      </ul>
                                                    `;
                                                    } else {
                                                        messageHtml = `
                                                      <ul class="p-0 d-flex ${alignment} message-body w-100" id="message-${id}">
                                                          ${avatarHtml}
                                                          <div class="d-flex flex-column ${sentAlignment}">
                                                              <li class="list-group-item d-flex flex-column ${messageClass}" style="padding: 17px 20px; background: ${bgColor}; border: none; box-shadow: rgba(0,0,0,0.1) 0px 0px 10px;">  
                                                                  <div style='width: 100%'>${displayMessage} ${attachmentHtml}</div>
                                                                  
                                                                  <div class="d-flex hw_message_seen_label ${seenDiv}">
                                                                      <span style="font-size:0.6rem; color: ${dateSpanColor}; text-align: ${dateAlign};" class="hw_rel-date" data_date='${message_time}'>${d}</span>
                                                                  </div>
                                                              </li>  
                                                          </div>
                                                      </ul>
                                                    `;
                                                    }

                                                    $("#hw_message_box").prepend(messageHtml);
                                                }

                                                $("#hw_message_box").append(`
                                                <ul class="p-0 d-flex message-body justify-content-start received" id="message-${firebaseData.message_id}">
                                                    ${avatarHtml}
                                                    <div class="d-flex flex-column">
                                                        <li class="list-group-item d-flex flex-column inboundMessage" style="padding: 17px 20px; background: white; box-shadow: rgba(0,0,0,0.1) 0px 0px 10px; border: none;">  
                                                              <div style='width: 100%' class="fr-view">${message} ${attachmentHtml}</div>
                                                            <div class="d-flex hw_message_seen_label">      
                                                                <span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${firebaseData.dateTime}'>${date_time}</span>
                                                            </div>
                                                        </li> 
                                                    </div>
                                                </ul>
                                            `);
                                                $("#hw_message_box").animate({ scrollTop: $("#hw_message_box").prop("scrollHeight") }, 0);
                                                $("#send_message_area").removeClass("d-none");
                                                if (mobileView == "OFF") {
                                                    increaseIframeHeight(0, "#hw_chat_message_screen");
                                                }
                                            }
                                        }).fail(err => {

                                        })
                                    } else {
                                        $("#hw_message_box").append(`
                                        <ul class="p-0 d-flex message-body justify-content-start received" id="message-${firebaseData.message_id}">
                                            ${avatarHtml}
                                            <div class="d-flex flex-column">
                                                <li class="list-group-item d-flex flex-column inboundMessage" style="padding: 17px 20px; background: white; box-shadow: rgba(0,0,0,0.1) 0px 0px 10px; border: none;">  
                                                    <div style='width: 100%' class="fr-view">${message} ${attachmentHtml}</div>
                                                    <div class="d-flex hw_message_seen_label">      
                                                        <span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${firebaseData.dateTime}'>${date_time}</span>
                                                    </div>
                                                </li> 
                                            </div>
                                        </ul>
                                    `);
                                    }

                                    $("#hw_offChat_thread").append(`
                                    <div class="pd-10 d-none mg-b-10 popConversation" id="thread-${firebaseData.conversation_id}">
                                        <div class="d-flex bg-white w-100" style="border-radius: 5px; box-shadow: rgba(0,0,0,0.1) 0px 0px 10px;">
                                            <div class="d-flex contentArea pd-y-20 pd-l-20" style="width: calc(100% - 20px)">
                                            ${avatarHtml}
                                            <div class="d-flex flex-column mg-l-10 w-100">
                                                <div class="messageBody mg-b-0 d-flex flex-column">${message} ${attachmentHtml}</div>
                                                <p class="mg-b-0"><span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${firebaseData.dateTime}'>${date_time}</span></p>
                                            </div>
                                            </div>
                                            <div class="${displayCrossButton} justify-content-end align-items-start closePopDiv pd-r-5 pd-t-5" style="width: 20px">
                                            <button class="btn closeCurrentPop rounded-50 tx-12 pd-x-5 pd-y-5" type="button" style="color: rgb(82 81 81 / 61%);"><i class="fas fa-times"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                `);



                                    $("#hw_chat_message_screen").removeClass("d-none").addClass("d-flex");
                                    // increase box height
                                    $("#hw_message_box").animate({
                                        scrollTop: $("#hw_message_box").prop("scrollHeight")
                                    },
                                        1000
                                    );

                                    if (mobileView == "OFF") {
                                        increaseIframeHeight(0, "#hw_chat_message_screen");
                                    }
                                    // let messageBoxHeight = $(".chat-widget-pop").innerHeight();
                                    // window.top.postMessage("HelpwiseWidgetIframeOuterHeight:"+messageBoxHeight, "*");
                                }

                            }
                            // }
                        }
                    }
                    mailFlag = true;
                } else {
                    mailFlag = true;
                }
            });

            mailboxThreadSocket
                .child(`/updateWidgetDeleteMessage`)
                .on("value", function (data) {
                    if (data.val()) {
                        let fbData = data.val();
                        $("#message-" + fbData.messageID).remove();
                    }
                });

            mailboxThreadSocket
                .child("/updateWidgetSeenLabel")
                .on("value", function (data) {
                    if (data.val()) {
                        let fbData = data.val();
                        if (fbData.conversationID == conversationID) {
                            addSeenNotSeenLabel(WIDGET_LANGUAGE["seen"]);
                        }
                    }
                });

            mailboxThreadSocket
                .child(`/newComposeMessage`)
                .on("value", function (data) {
                    if (threadFlag) {
                        if (data.val()) {
                            let firebaseData = JSON.parse(JSON.stringify(data.val()));
                            let avatarTag = firebaseData.avatarTag;
                            let agentName = firebaseData.agentName;
                            let date_time = moment(firebaseData.messageTime).lang(WIDGET_LANG_CODE).fromNow();

                            if (STAGE == "dev" || MAILBOX_MANAGER == "211988") {
                                agentName = agentName.split(" ")[0];
                            }

                            let body = firebaseData.body;
                            body = body.length > 20 ? body.slice(0, 20) + "..." : body;
                            if (body.length < 1 && firebaseData.attachment.length > 0) {
                                body = `<i class="fas fa-paperclip tx-gray-700" style="transform: rotate(45deg);"></i>`;
                            }

                            if (currentPage == "CHAT_SCREEN_PAGE") {
                                mailboxUnreadChatMessageCount(MAILBOX_ID, CONTACT_ID);
                            } else if (currentPage == "HOMEPAGE") {
                                // makeConversationsUI();
                            } else {
                                $(".chat_widget_conversation_list").prepend(`
                        <div class="d-flex justify-content-start chat_widget_conversation bd-b" id="${firebaseData.conversation_id}" style="width: 100%; padding: 10px 20px; background: white;">
                            <div class="d-flex align-items-center">
                                <div class="avatar avatar-sm agent_avatar">
                                    ${avatarTag}
                                </div>
                            </div>
                            <div class="d-flex flex-column mg-l-10" style="width: 100%;">
                                <div class="tx-gray-700 d-flex justify-content-between" style="width: 100%; padding-left: 10px;font-size: 0.8125rem;">
                                    <p class="mg-b-0 agent_name">${agentName}</p>
                                    <div class="d-flex">
                                    <span class="chat_message_bubble badge badge-custom  mg-r-10 d-flex align-items-center justify-content-center" style="border-radius: 50% !important;min-height: 18px;min-width: 18px;font-size: 10px;font-weight: 400;">1</span>
                                        <p class="mg-b-0 chat_message_date hw_rel-date" date_date="${firebaseData.messageTime}">${date_time}</p>
                                    </div>
                                </div>
                                <div class="d-flex" style="width: 100%; padding-left: 10px;">
                                    <p class="mg-0 chat_message_content" style="font-size: 0.8125rem;">${body}</p>
                                </div>
                            </div>
                        </div>
                        `);
                                $(`#${firebaseData.conversation_id}`).data({
                                    avatarTag,
                                    agentName
                                });
                            }
                        }
                        if (iframeDisplay == "OFF") {
                            mailboxUnreadMessageCount(MAILBOX_ID, CONTACT_ID);
                        }
                        threadFlag = true;
                    } else {
                        threadFlag = true;
                    }
                });
        });

    var connectedRef = firebase_chatapp.database().ref(".info/connected");
    connectedRef.on("value", function (snapshot) {
        if (snapshot.val() === true) {
            $(".user-disconnected-message").addClass("d-none");
            $(".user-disconnected-refresh").addClass("d-none");
        } else {
            $(".user-disconnected-message").removeClass("d-none");
            $(".user-disconnected-refresh").removeClass("d-none");
        }
    });
}


function appendOrUpdateHwOffChatThread(conversationID, message, avatarHtml, attachmentHtml, dateTime, date_time) {
    if ($(`#hw_offChat_thread #thread-${conversationID}`).length > 0) {
        $(`#hw_offChat_thread #thread-${conversationID} .contentArea`).html("");
        $(`#hw_offChat_thread #thread-${conversationID} .contentArea`).append(`
      ${avatarHtml}
      <div class="d-flex flex-column mg-l-10">
        <div class="messageBody mg-b-0 d-flex flex-column">${message} ${attachmentHtml}</div>
        <p class="mg-b-0"><span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${dateTime}'>${date_time}</span></p>
      </div>
    `);
        // $(`#hw_offChat_thread #thread-${conversationID} .messageBody`).html(message);
        // $(`#hw_offChat_thread #thread-${conversationID} .messageBody`).html(attachmentHtml);
        // $(`#hw_offChat_thread #thread-${conversationID} .hw_rel-date`).html(date_time);
        // $(`#hw_offChat_thread #thread-${conversationID} .hw_rel-date`).attr("date_date", `${dateTime}`);
    } else {
        $("#hw_offChat_thread").append(`
            <div class="pd-10 d-none mg-b-10 popConversation" id="thread-${conversationID}">
                <div class="d-flex bg-white w-100" style="border-radius: 5px; box-shadow: rgba(0,0,0,0.1) 0px 0px 10px;">
                    <div class="d-flex pd-y-20 pd-l-20  contentArea" style="width: calc(100% - 20px)">
                    ${avatarHtml}
                    <div class="d-flex flex-column mg-l-10 w-100">
                        <div class="messageBody mg-b-0 d-flex flex-column">${message} ${attachmentHtml}</div>
                        <p class="mg-b-0"><span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${dateTime}'>${date_time}</span></p>
                    </div>
                    </div>
                    <div class="${displayCrossButton} justify-content-end align-items-start closePopDiv pd-r-5 pd-t-5" style="width: 20px;">
                    <button class="btn closeCurrentPop rounded-50 tx-12 pd-x-5 pd-y-5" type="button" style="color: rgb(82 81 81 / 61%);"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
        `);
    }
}

function updateConversationUI(conversation_id, element, date_time, message) {
    let ele = "#" + conversation_id;
    let eleHtml = $(element).find(ele).html();
    $(element).find(ele).remove();

    let paddingValue = "10px";
    if (element == ".chat_widget_conversation_list") {
        paddingValue = "10px 20px";
    }
    $(element).prepend(
        `
        <div class="d-flex justify-content-start chat_widget_conversation bd-b bd-t" id="${conversation_id}" style="width: 100%; padding: ${paddingValue}; background: white;">
            ${eleHtml}
        </div>
        `
    );
    let count = $(ele).find(".chat_message_bubble").text();

    $(ele).find(".chat_message_bubble").text(parseInt(count) + 1);
    $(ele).find(".chat_message_bubble").removeClass("d-none");
    $(ele).find(".chat_message_date").text(date_time);
    $(ele).find(".chat_message_content").text(message.length > 20 ? message.slice(0, 20) + "..." : message);
}

function showHCcollections() {

    $.post({
        url: "/api/chat-widget/getCollections",
        data: {
            mailboxId: MAILBOX_ID,
            managerId: MAILBOX_MANAGER,
            widgetID: WIDGET_ID
        }
    })
        .done(response => {
            if (response.status == "success") {
                if (response.data.length == 0) {
                    $("#hw_hc_collections_tab").removeClass("d-flex").addClass("d-none");
                    $(".search-form").addClass("d-none");
                } else {
                    $("#hw_hc_collections_tab").removeClass("d-none").addClass("d-flex");
                    let collections = response.data;
                    $("hw_hc_collections").html("");
                    $(".search-form").removeClass("d-none");
                    let count = 0;
                    for (let i = 0; i < collections.length; i++) {
                        let collection = collections[i];
                        let collectionArticleCount = collection["articleCount"];

                        if (collectionArticleCount > "0") {
                            let pdClass = "pd-l-5 pd-r-0";
                            if (count % 2 == 0) {
                                pdClass = "pd-r-5 pd-l-0";
                            }
                            count += 1;
                            let collectionIcon = collection["icon"];
                            let collectionName = collection["name"];
                            let collectionId = collection["id"];
                            // let collectionSeoId = seofyId(collectionId, collectionName);
                            let collectionSeoId = collection["collectionSeoId"];
                            let collectionDescription = collection["description"];
                            let articlesStr = WIDGET_LANGUAGE["hc-articles"];
                            if (collectionArticleCount == 1) {
                                articlesStr = WIDGET_LANGUAGE["hc-article"];
                            }
                            let arrowIcon = `<button type="button" class="btn btn-custom pd-0 tx-18 lh-0"><i class="icon ion-md-arrow-forward"></i></button>`;

                            $("#hw_hc_collections").append(`
                            <div class="col-6 hw_article mg-b-10 ${pdClass}">

                                <div class="card card-help hw_roundedShadow hw_open_collection ht-100p" data-id='${collectionId}'>
                                <div class="card-body tx-13">
                                    <div class="tx-60 lh-0 mg-b-10">
                                    ${collectionIcon}
                                    </div>
                                    <h6 style="color: currentColor">${collectionName}</h6>
                                    <p class="tx-color-03 mg-b-0 hw_collection-description" style="max-height: 60px; word-wrap: break-word; overflow: hidden;">${collectionDescription}</p>
                                </div>
                                <div class="card-footer tx-13">
                                    <span>${collectionArticleCount} ${articlesStr}</span>
                                    ${arrowIcon}
                                </div>
                                </div>
                            </div>
                        `);
                        }
                    }
                    turnPageLoader("off", 1);
                }
            } else {
                $("#hw_hc_collections_tab")
                    .removeClass("d-flex")
                    .addClass("d-none");
                $(".search-form").addClass("d-none");
            }
        })
        .fail(() => {
            $("#hw_hc_collections_tab")
                .removeClass("d-flex")
                .addClass("d-none");
            $(".search-form").addClass("d-none");
        });
}

function getArticles(collectionID) {
    $.post({
        url: "/api/chat-widget/getArticles",
        data: {
            collectionID,
            managerID: MAILBOX_MANAGER
        }
    })
        .done(response => {
            if (response.status == "success") {
                if (response.data.length > 0) {
                    // $("#hw_hc_articles").removeClass("d-none").addClass("d-flex");
                    handleOnOff("#hw_hc_articles", "", "active");
                    $("#hw_back_to_collections").addClass("active");
                    let articles = response.data;
                    $("#hw_hc_articles").html("");
                    articles.forEach(article => {
                        $("#hw_hc_articles").append(`
                            <div class="hw_article_card" data-link="${article.articleLink}" id="article-${article.id}">
                                <div class="d-flex flex-column" style="width: 100%;">
                                    <div class=" d-flex justify-content-between" style="width: 100%; font-size: 0.85rem;">
                                        <p class="mg-b-0 tx-bold">${article.title}</p>
                                    </div>
                                    <div class="d-flex" style="width: 100%;">
                                        <p class="mg-0 tx-gray-700 chat_message_content" style="font-size: 0.8125rem;">${article.description}</p>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                    turnPageLoader("off", 1);
                }
            } else {
                turnPageLoader("off", 1);
            }
        })
        .fail(() => {
            turnPageLoader("off", 1);
        });
}

function getArticleData(articleID) {
    return new Promise((res, rej) => {
        $.post({
            url: "/api/chat-widget/getArticleData",
            data: {
                articleID,
                managerID: MAILBOX_MANAGER
            }
        }).then(response => {
            if (response.status == "success") {
                res(response.data);
            }
        })
    })
}

function prepareArticlePage(article) {
    let articleHeaderHtml = '';
    console.log(article);
    if (article.title) {
        articleHeaderHtml += `<h4 class="articleTitle">${article.title}<a href="${article.articleLink}" target="_blank" class="openArticleIcon mg-l-5" style="color: ${fgColor}"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a></h4>`;
    }

    // if(article.description){
    //     articleHeaderHtml += `<p class="articleDescription">${article.description}</p>`;
    // }

    let $temp = $(`<div>${article.body}</div>`);
    $temp.find('a').each(function () {
        $(this).attr("target", "_blank");
    });

    let body = $temp.html();
    $(".widgetArticleHeaderContent").html(articleHeaderHtml);
    $(".widgetArticleBody").html(body);
    turnPageLoader("off");
}

function checkOutboundTriggers(mailboxID, managerID, contactID, userCookie, currentUrl) {

    $.post({
        url: "/api/chat-widget/getEngageSettings_univ",
        data: {
            mailboxID,
            managerID,
            contactID,
            userCookie,
            currentUrl
        }
    })
        .done(response => {
            if (response.status == "success") {
                if (response.data.length > 0) {
                    $("#chat_back_button").addClass("see_previous_conversation").removeClass("back_show_home");
                    $("#see_previous_button_div").removeClass("d-none");
                }
                recursiveTriggerOutbound(response.data, 0);
            } else {
                // console.log("error");
            }
        })
        .fail(err => {
            console.log(err);
        });

}

function recursiveTriggerOutbound(obSettings, count) {
    if (count == obSettings.length) {
        return 1;
    } else {
        obSetting = obSettings[count];
        let timeout = obSetting["timeout"];
        let chatHtml = "";
        let emailHtml = "";
        if (obSetting["replyType"].toLowerCase() == "chat") {
            chatHtml = `
        <form class="chat_widget_form_field popConversationTrigger d-flex align-items-center justify-content-between bd rounded-10 bg-white send_existing_messages_form_pop" style="width: 100%;min-height: 50px;padding: 0 10px;max-height: 150px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important;">
            <div class="d-flex align-items-center w-100">
                <div class="message_input replyMessagePopInput" style="width: 100%;min-height: 20px;max-height: 150px;overflow: auto;" contenteditable="true" data-text="Type your message..."></div>
                <div class="input-group-btn d-flex">
                    <label for="upload_image_input_pop" class="btn p-0 mg-l-10 mg-b-0" style="color: #596882b5;font-size: 1.3rem;margin-right: 10px;cursor: pointer;"><i class="fas fa-paperclip"></i></label>
                    <input type="file" style="display: none" name="files[]" id="upload_image_input_pop" multiple="">
                    <!-- accept=".jpg, .jpeg, .png, .mp3, .ogg, .amr, .pdf, .mp4" -->
                    <button class="btn p-0 tx-30 replyMessagePop" type="button" style="color: ${SELECTED_COLOR};font-size: 1.3rem;margin-right: 10px;"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>  
        </form>
      `;
        } else {
            emailHtml = `
        <div class="input-group d-flex justify-content-end">
            <div class="d-flex align-items-center hwPopEmailTriggerDiv" style="background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important; border-radius: 10px;width: 100%;">
                <input type="text" class="form-control hwPopEmailTrigger bd-0" placeholder="Enter your Email" aria-label="Recipient's username" aria-describedby="button-addon2" style="background: white;border-top-right-radius: 0px;border-bottom-right-radius: 0px;border-right: 0px; /* height: 55px;*/">
                <div class="input-group-append">
                    <button class="btn hwPopEmailTriggerBtn" type="button" style="color: ${fgColorIcon};background: linear-gradient(to right, ${SELECTED_COLOR} 0px, ${GRADIENT_COLOR} 100%);border-top-left-radius: 0px;border-bottom-left-radius: 0px;border-left: 0px; /* height: 55px; width: 45px; */">
                        <i class="fas fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>
      `;
        }

        let show = count == 0 ? "d-flex" : "d-none";

        if (count == 0) {
            // console.log(obSetting["conversationID"]);
            $(".chat-widget-pop").data({ "conversationID": obSetting["conversationID"] })
            // console.log($(".chat-widget-pop").data("conversationID"));
        }

        let height = "430px";
        if (mobileView == "ON") {
            height = "calc(100vh - 160px)";
        }

        setTimeout(function () {
            if ($("#hw_offChat_thread .triggerThread").length == 0) {
                show = "d-flex";
                createjs.Sound.play(engageSoundID);
            }

            $engageHtml = $("<div style='width: 100%'></div>");
            $emgageHtml = $engageHtml.append(obSetting["content"]);
            $engageHtml.find('a').each(function () {
                $(this).attr("target", "_blank");
            });
            if (show == "d-flex") {
                $engageHtml.find('img').each(function () {

                    $(this).attr("onload", "increaseIframeHeight(5, '#hw_offChat_thread')");
                });
            }

            let engageDisplayName = `${obSetting["from"]["first_name"]} ${obSetting["from"]["last_name"]}`;
            if (MAILBOX_ID == 221708) {
                engageDisplayName = `${obSetting["from"]["first_name"]}`;
            }
            $("#hw_offChat_thread").append(`
                <div class="${show} flex-column rounded-10 triggerThread" id="thread-${obSetting["conversationID"]}" style="position: relative;">
                    <div class="${displayCrossButton} justify-content-end closePopDiv mg-b-5 pd-r-10" style="/*visibility: hidden;*/"><button class="btn btn-secondary closeCurrentPopTrigger rounded-50 tx-12 pd-x-7 pd-y-2" type="button"><i class="fas fa-times"></i></button></div>
                    <div class="triggerMessageBox d-flex flex-column popConversationTrigger pd-y-10 pd-r-10">
                        <div class ="d-flex mg-b-10 messageArea">
                            <div class="avatar avatar-sm agent_avatar" style="width: 32px;">
                                ${obSetting["from"]["avatarTag"]}
                            </div>
                            <div class="d-flex flex-column mg-l-10 pd-x-20 pd-y-10" style="width: calc(100% - 42px); border-radius: 5px 7px 12px 12px; background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important;">
                                <div class="tx-color-03 mg-b-10 tx-12">
                                  <b>${engageDisplayName}</b> from ${MAILBOX_NAME}
                                </div>
                                <div class="messageBody mg-b-0 customScrollbar" style="max-height: ${height}; overflow: auto;"><div class="fr-view">${$engageHtml.html()}</div></div>
                                <p class="mg-b-0 d-none"><span style="font-size:0.6rem; color: #8c8d90; text-align: left;" class="hw_rel-date" data_date='${moment().unix()}'>${moment().lang(WIDGET_LANG_CODE).fromNow()}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-end pd-r-10 pd-b-10" style="width: 100%;z-index: 2;/* min-height: 50px; */ box-shadow: rgba(35, 47, 53, 0.09) 0px 2px 8px 0px; padding-left: 41px; /* border-top: 1px solid #0000001f;*/ position: relative;bottom: 0px;" id="">
                        ${emailHtml} ${chatHtml}
                    </div>
                </div>
            `);

            if (iframeDisplay == "OFF") {
                turnChatWidgetPopOn();
                $("#hw_chat_message_screen").addClass("d-none").removeClass("d-flex");
                $("#hw_offChat_thread").removeClass("d-none").addClass("d-flex");

                show == "d-flex" ? increaseIframeHeight(0, "#hw_offChat_thread") : "";
                $("#hw_offChat_thread").animate({
                    scrollTop: $("#hw_offChat_thread").prop("scrollHeight")
                },
                    1000
                );

            }

            makeTriggerLog(
                obSetting["filterId"],
                USER_COOKIE,
                MAILBOX_ID,
                MAILBOX_MANAGER,
                obSetting["url"],
                obSetting["conversationID"],
                obSetting["opCode"]
            );

            recursiveTriggerOutbound(obSettings, count + 1);
        }, timeout * 1000);
    }
}

function makeTriggerLog(filterID, userCookie, mailboxID, managerID, url, conversationID, opCode) {
    $.post({
        url: '/api/chat-widget/makeTriggerLog',
        data: { filterID, userCookie, mailboxID, managerID, url, conversationID, opCode }
    }).done(response => {
        if (response.status == "success") {
            console.log("success");
        }
    })
}

function increaseIframeHeight(i = 0, element) {

    let messageBoxHeight = $(element).get(0).scrollHeight;

    if (element == "#hw_offChat_thread" && $("#hw_offChat_thread .triggerThread.d-flex .messageBody .fr-view").get(0)) {
        let height = $("#hw_offChat_thread .triggerThread.d-flex .messageBody .fr-view").get(0).scrollHeight;

        messageBoxHeight = height + 78 + 61 + 40;
        // console.log("height", height);
        // console.log("height", height + 78 + 61 + 40);
        isOffsetAdded = true;
        i = 0;
    }

    // if(isBrowserSafari && OS != "iPad" && element == "#hw_offChat_thread"){
    //     if($("#hw_offChat_thread .messageBody").get(0)){
    //         messageBoxHeight += $("#hw_offChat_thread .messageBody").get(0).scrollHeight;
    //         messageBoxHeight += 70;
    //     }
    // }

    if (i == 5) {
        isOffsetAdded = false;
        i = 0;
    }

    if (i == 0) {
        if (messageBoxHeight < "30") {
            messageBoxHeight = 0;
        } else {
            if (!isOffsetAdded) {
                messageBoxHeight = parseInt(messageBoxHeight) + 45;
                isOffsetAdded = true;
            }
        }
    } else if (i == -1) {
        messageBoxHeight = 0;
    } else {
        messageBoxHeight = "fit-content";
    }

    if (i == 9) {
        messageBoxHeight = 704;
    }

    $("#mobileIframeHeight").text(messageBoxHeight);
    console.log(messageBoxHeight);
    // console.log($(".chat-widget-pop").length, " : length");
    //  else {
    //   messageBoxHeight += 30;
    // }

    sendMessageToParent("HelpwiseWidgetIframeOuterHeight", { height: messageBoxHeight });
    // window.top.postMessage("HelpwiseWidgetIframeOuterHeight:" + messageBoxHeight, "*");


}

// function increaseIframeHeight(i = 0, element){
//     if(element == "#hw_offChat_thread"){
//         if($("#hw_offChat_thread .triggerThread.d-flex .messageBody .fr-view").get(0)){
//             messageBoxHeight += $("#hw_offChat_thread .triggerThread.d-flex .messageBody .fr-view").get(0).scrollHeight;
//             console.log("height", messageBoxHeight);
//         }
//     }
// }

function testEmailPattern(email) {
    let emailRegEx = /.+\@.+\..+/gs;
    let emailTestFlag = false;
    if (emailRegEx.test(email)) {
        emailTestFlag = true;
    }
    return emailTestFlag;
}


function getMessageBotData(type = 0) {
    let mailboxID = MAILBOX_ID;
    let managerID = MAILBOX_MANAGER
    let contactID = CONTACT_ID
    let userCookie = USER_COOKIE;
    let currentUrl = decodeURIComponent(CURRENT_URL);
    return new Promise((res, rej) => {
        $.post({
            url: "/api/chat-widget/getBotData",
            data: {
                mailboxID,
                managerID,
                contactID,
                userCookie,
                currentUrl,
                type
            }
        }).done(response => {
            if (response.status == "success") {
                res(response.data);
            } else {
                rej("Error in fetching data");
            }
        }).fail(err => {
            rej("error while API hit ====> ", err);
        })
    })

}

function initiateBot(bots) {
    let botIdArray = Object.keys(bots);
    if (botIdArray && botIdArray.length > 0) {
        let firstBotId = botIdArray[0];
        currentBotId = firstBotId;
        currentBotData = JSON.parse(bots[firstBotId]["bot_data"]);

        let botIdentity = bots[firstBotId]["botIdentity"];
        if (botIdentity && botIdentity.length > 0) {
            let $tempHtml = $(`<div>${botIdentity.avatarTag}</div>`);
            let avatarHtml = $tempHtml.find(".avatar").html();
            $(".ongoing_message_thread_avatar").html(avatarHtml);
            $("#ongoing_message_agent_name").text(`${botIdentity.firstname} ${botIdentity.lastname}`)
        }
        let options = {
            botPathId: 0,
            botData: currentBotData,
            isTextTriggered: false,
            botIdentity
        }
        triggerBotThreadFirebase = false;
        if (!isBotInterrupted) {
            triggerMessageBot(options);
            makeBotTriggerLog({ botID: currentBotId })
        }
    }
}

function makeBotTriggerLog(options) {
    options["contactID"] = CONTACT_ID;
    options["contact_cookie"] = USER_COOKIE;
    options["mailboxID"] = MAILBOX_ID;
    options["managerID"] = MAILBOX_MANAGER;

    $.post({
        url: "/api/bot/makeBotLogs",
        data: options
    }).done(res => {
        if (res.status == "success") {
            console.log("success");
        }
    })
}

function triggerMessageBot(options) {
    let { botPathId, botData, isTextTriggered, botIdentity } = options;
    if (botData.hasOwnProperty(botPathId)) {
        let pathBotData = botData[botPathId];
        let processedData = processAndFetchMessageBotData(pathBotData);
        let { text, suggestions, isSuggestions, actions, isActions, composer, showText } = processedData;

        if (!composer) {
            $(".chat_widget_form_field").addClass("d-none").removeClass("d-flex");
        } else {
            $(".chat_widget_form_field").addClass("d-flex").removeClass("d-none");
        }

        let timeout = 1300;

        if (showText && !isTextTriggered) {
            processedData["textIndex"] = 0;
            processedData["timeout"] = timeout;
            processedData["botPathId"] = botPathId;
            processedData["text"] = Object.values(text);
            processedData["botIdentity"] = botIdentity;
            appendMessageBotTextInUi(processedData);
            // timeout = (Object.keys(text).length)*1300;
        } else {
            if (isSuggestions) {
                initiateMessageBotSuggestions(isSuggestions, timeout, suggestions, botIdentity)
            } else if (isActions) {
                triggerMessageBotActions(actions);
            } else {
                let endBotData = { conversationID, mailboxID: MAILBOX_ID }
                endMessageBot(endBotData);
            }
        }
    }
}

function continueMessageBotProcess(options) {

    let { isSuggestions, timeout, suggestions, isActions, actions, botIdentity } = options;

    if (isSuggestions) {
        initiateMessageBotSuggestions(isSuggestions, timeout, suggestions, botIdentity)
    } else if (isActions) {
        triggerMessageBotActions(actions);
        // endMessageBot(endBotData);
    } else {
        // console.log("END MESSAGE BOT");
        let endBotData = { conversationID, mailboxID: MAILBOX_ID }
        endMessageBot(endBotData);
    }

    return 1;
}

function appendMessageBotTextInUi(options) {
    let { text, textIndex, timeout, botPathId, botIdentity } = options
    if (text.length == 0 || textIndex > text.length - 1) {
        $("#typingEffectContainer").remove();
        continueMessageBotProcess(options);
        return timeout;
    } else {
        // timeCounter += 1300
        if (!isBotInterrupted) {
            let avatarTag = "";
            if (botIdentity && botIdentity.avatarTag) {
                avatarTag = botIdentity.avatarTag
            }
            $(".conversation_messages_box").append(getTypingIndicatorCss(avatarTag));
            scrollToBottomMessage();
        }
        setTimeout(function () {
            let messageText = processMessageVariables(text[textIndex], USERNAME_ON_CHAT);
            triggerMessageBotInsertMessage({ text: messageText, type: 1, currentBotId, botPathId, conversationID, triggerBotThreadFirebase, botType: 'chat', botIdentityID: botIdentity && botIdentity.id ? botIdentity.id : 0 }).then(response => {
                // $(`#botMessage-${tempId}`).css("background", SELECTED_COLOR);
                let { messageHtml, tempId } = triggerMessageBotMessage(messageText, botIdentity);
                $("#typingEffectContainer").remove();
                $(".conversation_messages_box").append(messageHtml);
                scrollToBottomMessage();
                $(`#botMessage-${tempId}`).parents(".message-body").attr("id", `message-${response.messageId}`);
                $(`#botMessage-${tempId}`).attr("id", `botMessage-${response.messageId}`);
                options["textIndex"] = textIndex + 1;
                if (!isBotInterrupted) {
                    appendMessageBotTextInUi(options);
                }
            });

        }, timeout);
    }
}

function processAndFetchMessageBotData(pathBothData) {
    let text = pathBothData["text"];
    let showText = false;
    if (text && Object.keys(text).length > 0) {
        showText = true;
    }

    let followUpOption = pathBothData["followUpOption"];

    let suggestions = {};
    let isSuggestions = false;

    let actions = {};
    let isActions = false;

    if (followUpOption == "suggestions") {
        isSuggestions = true;
        suggestions = pathBothData["suggestions"];
    } else if (followUpOption == "actions") {
        isActions = true;
        actions = pathBothData["actions"];
    }

    let composer = true;
    if (pathBothData["composer"]) {
        composer = pathBothData["composer"] == "on" ? true : false;
    }

    return {
        text,
        suggestions,
        isSuggestions,
        actions,
        isActions,
        composer,
        showText
    };

}

function initiateMessageBotSuggestions(isSuggestions, timeout, suggestions, botIdentity) {
    if (isSuggestions && !isBotInterrupted) {
        // timeout = showText ? (Object.keys(text).length)*1300 : 0;
        // setTimeout(function(){
        let avatarTag = "";
        if (botIdentity && botIdentity.avatarTag) {
            avatarTag = botIdentity.avatarTag
        }
        $(".conversation_messages_box").append(getTypingIndicatorCss(avatarTag));
        // }, timeout);
        setTimeout(function () {
            let suggestionsFinalHtml = triggerMessageBotSuggestions(suggestions);
            $("#typingEffectContainer").remove();
            $(".conversation_messages_box").append(suggestionsFinalHtml);
            scrollToBottomMessage();
        }, timeout + 1300);
    }
}

function triggerMessageBotMessage(message, botIdentity) {
    let time = moment().lang(WIDGET_LANG_CODE).fromNow();
    let tempId = randomString(10);

    let avatarHtml = `
        <div class="avatar avatar-sm mg-r-5 rounded-circle pd-4" style="width: 32px !important; background: ${SELECTED_COLOR};">
            <img src="https://cdn.helpwise.io/assets/images/helpwise-chat-icon-xs.png" style="border-radius: 50%;display: block;background-color: transparent !important;">
        </div>
    `;

    if (botIdentity && botIdentity.avatarTag) {
        avatarHtml = botIdentity.avatarTag;
    }

    let messageHtml = "";
    messageHtml = `
        <ul class="p-0 d-flex justify-content-start message-body">
            ${avatarHtml}
            <div class="d-flex flex-column ">
                <li class="list-group-item d-flex flex-column inboundMessage" id="botMessage-${tempId}">
                    <div style="width: 100%" class="fr-view">  
                        ${message} 
                    </div>
                </li>  
                <div class="d-flex hw_message_seen_label ">
                    <span style="font-size:0.6rem; color: #8c8d90; text-align: left; padding-left: 10px;" class="hw_rel-date" data_date="${moment().unix()}">${time}</span>
                </div>
            </div>
        </ul>
    `;

    return { messageHtml, tempId };
}

function triggerMessageBotSuggestions(suggestions) {

    let suggestionHtml = "";

    let colors = getSuggestionUIColors(SELECTED_COLOR);

    for (const suggestionID in suggestions) {
        let suggestionData = suggestions[suggestionID];
        suggestionHtml += `<p class="pd-x-15 pd-y-10 mg-b-10 mg-l-10 rounded-10 suggestions" style="color: ${colors.foreground}; background: ${colors.background};" id="suggestions-${suggestionID}" data-nextpath='${suggestionData["nextPathId"]}'>${suggestionData["text"]}</p>`;
    }

    let suggestionsFinalHtml = `
        <div class="d-flex flex-wrap w-100 pd-l-30 justify-content-start widgetPreviewSuggestionContainer" style="margin-top: -10px; margin-bottom: 1rem;">
            ${suggestionHtml}
        </div>
    `;

    $(document).on("mouseenter", ".suggestions", function () {
        $(this).css("background", colors.foreground);
        $(this).css("color", colors.background);
    });

    $(document).on("mouseleave", ".suggestions", function () {
        $(this).css("color", colors.foreground);
        $(this).css("background", colors.background);
    });

    return suggestionsFinalHtml;
}

function triggerMessageBotActions(actions) {
    // will hit API to perform these actions.

    $.post({
        url: "/api/chat-widget/performBotActions",
        data: {
            actions: Object.values(actions),
            conversationID,
            mailboxID: MAILBOX_ID,
            contactID: CONTACT_ID,
            managerID: MAILBOX_MANAGER
        }
    }).done(res => {
        if (res.status == "success") {
            let endBotData = { conversationID, mailboxID: MAILBOX_ID }
            endMessageBot(endBotData);
        }
    })
}

function triggerMessageBotInsertMessage(options) {
    // will hit API to send message and even insert suggestions in DB.
    options["mailboxID"] = MAILBOX_ID;
    options["contactID"] = CONTACT_ID;
    options["managerID"] = MAILBOX_MANAGER;

    let apiName = options['botType'] == "ai" ? "insertAiBotMessage" : "insertBotMessageUniv";

    return new Promise((resolve, reject) => {
        $.post({
            url: `/api/chat-widget/${apiName}`,
            data: options
        }).done(response => {
            if (response.status == "success") {
                if (conversationID == "" || conversationID == 0) {
                    conversationID = response.data["conversation_id"];
                }
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }).fail(err => {
            reject(err);
        })
    })
}

function appendAiChatMessage(messageText) {
    let botIdentity = bots[currentBotId]["botIdentity"];
    if (!isBotInterrupted) {
        let avatarTag = "";
        if (botIdentity && botIdentity.avatarTag) {
            avatarTag = botIdentity.avatarTag
        }
        $(".conversation_messages_box").append(getTypingIndicatorCss(avatarTag));
        scrollToBottomMessage();
    }
    triggerMessageBotInsertMessage({ text: messageText, type: 1, conversationID, triggerBotThreadFirebase, botType: 'ai' }).then(response => {
        let { messageHtml, tempId } = triggerMessageBotMessage(messageText, botIdentity);
        $("#typingEffectContainer").remove();
        $(".conversation_messages_box").append(messageHtml);
        scrollToBottomMessage();
        $(`#botMessage-${tempId}`).parents(".message-body").attr("id", `message-${response.messageId}`);
        $(`#botMessage-${tempId}`).attr("id", `botMessage-${response.messageId}`);
    });
}

function getTypingIndicatorCss(avatarTag = "") {
    if (avatarTag.trim().length == 0) {
        avatarTag = `
            <div class="avatar avatar-sm mg-r-5 rounded-circle pd-5" style="width: 32px !important; background: ${SELECTED_COLOR};">
                <img src="https://cdn.helpwise.io/assets/images/helpwise-chat-icon-xs.png" style="border-radius: 50%;display: block;background-color: transparent !important;">
            </div>
        `;
    }

    let messageHtml = "";
    messageHtml = `
        <ul class="p-0 d-flex justify-content-start message-body" id="typingEffectContainer">
            ${avatarTag}
            <div class="d-flex flex-column ">
                <li class="list-group-item d-flex flex-column inboundMessage" style="padding: 5px !important;">
                    <div style="width: 100%">                      
                        <div class="typingIndicatorContainer">
                            <div class="typingIndicatorBubble">
                                <div class="typingIndicatorBubbleDot"></div>
                                <div class="typingIndicatorBubbleDot"></div>
                                <div class="typingIndicatorBubbleDot"></div>
                            </div>
                        </div> 
                    </div>
                </li>  
            </div>
        </ul>
    `;

    return messageHtml;
}

function getSuggestionUIColors(themeColor) {
    let themeHSLcolor = tinycolor(themeColor).toHslString();

    let tempColor = themeHSLcolor.slice(themeHSLcolor.indexOf("(") + 1, themeHSLcolor.indexOf(")")).split(",");

    let l = tempColor[2].trim().split("%")[0]
    let l1 = "35%";
    if (l <= 35) {
        if (l >= 15) {
            l1 = `${tempColor[2].trim().split("%")[0]}%`;
        } else {
            l1 = "10%";
        }
    }

    let h = tempColor[0].trim();
    let s = tempColor[1].trim();
    // let l1 = "35%";
    let l2 = "95%";

    return {
        background: `hsl(${h}, ${s}, ${l2})`,
        foreground: `hsl(${h}, ${s}, ${l1})`,
        h,
        s,
        l
    };

}

function endMessageBot(options) {
    options.contactID = CONTACT_ID;
    options.managerID = MAILBOX_MANAGER;
    $.post({
        url: "/api/chat-widget/endMessageBot",
        data: options
    }).done(res => {
        if (res.status == "success") {
            isBotInterrupted = true;
        }
    })
}

async function checkForWorkingHoursNotice(widgetOperationsData) {
    $("#afterWHConvNotice").remove();
    if (widgetOperationsData && widgetOperationsData.selectedOperation && widgetOperationsData.selectedOperation == "showNoticeOnChatMessageScreen") {
        let oD = widgetOperationsData.operationData;
        if (oD.noticeMessage.trim().length > 0) {
            let inTimeFlag = await processWorkingHours(widgetOperationsData);
            if (!inTimeFlag) {
                let colorData = getSuggestionUIColors(SELECTED_COLOR);
                $(".chat_message_div").prepend(`
                    <p class="pd-x-15 pd-y-20 mg-t-5 mg-b-0" id="afterWHConvNotice" style="background: ${colorData.background}; color: ${colorData.foreground}">${oD.noticeMessage.trim()}</p>
                `);
            }
        }
    }
}

function scrollToBottomMessage() {
    $("#messageBoxContainer").animate({
        scrollTop: $("#messageBoxContainer").prop("scrollHeight")
    },
        1000
    );
    $(".conversation_messages_box").animate(
        {
            scrollTop: $(".conversation_messages_box").prop("scrollHeight")
        },
        1000
    );
}

function turnChatWidgetOn() {
    handleOnOff(".chat-widget", ".chat-widget-pop", "on");
}

function turnChatWidgetPopOn() {
    handleOnOff(".chat-widget-pop", ".chat-widget", "on");
}

function handleOnOff(elemToShow, elemToHide, classToHandle) {
    $(elemToShow).addClass(classToHandle);
    $(elemToHide).removeClass(classToHandle);
}

function turnPageLoader(show, type = 0) {
    let elem = type == 0 ? "#page_loading" : "#hw_hc_collections_loader";
    if (show == "on") {
        $(elem).addClass("loading");
    } else {
        $(elem).removeClass("loading");
    }
}

function changeWidgetPage(page) {
    if (page == "conversation") {
        currentPage = "ALL_CONVERSATION_PAGE";
        $(".widgetConversationPage").addClass("open");
        $(".widgetHomePage").removeClass("open");
        $('.widgetMessagePage').removeClass('open');
        $('.widgetArticlePage').removeClass('open');
    } else if (page == "message") {
        currentPage = "CHAT_SCREEN_PAGE";
        $(".widgetConversationPage").removeClass("open");
        $(".widgetHomePage").removeClass("open");
        $('.widgetMessagePage').addClass('open');
        $('.widgetArticlePage').removeClass('open');
    } else if (page == "homepage") {
        currentPage = "HOMEPAGE";
        $(".widgetConversationPage").removeClass("open");
        $(".widgetHomePage").addClass("open");
        $('.widgetMessagePage').removeClass('open');
        $('.widgetArticlePage').removeClass('open');
    } else if (page == "article") {
        currentPage = "ARTICLE";
        $(".widgetConversationPage").removeClass("open");
        $(".widgetHomePage").removeClass("open");
        $('.widgetMessagePage').removeClass('open');
        $('.widgetArticlePage').addClass('open');
    }
}

function handleSearchOperations(type = 0) {
    if (type == 1) {
        handleOnOff(".search_help_articles", ".close_search_help_articles", "d-none");
        $("#hw_hc_collections").removeClass("active");
        // $(".search_help_articles").addClass("close_search_help_articles").removeClass("search_help_articles");
        return;
    }
    handleOnOff(".close_search_help_articles", ".search_help_articles", "d-none");
    $("#hw_hc_collections").addClass("active");
    // $(".close_search_help_articles").addClass("search_help_articles").removeClass("close_search_help_articles");
}

function sendMessageToParent(message, content = {}) {
    let messageContent = JSON.stringify({
        message,
        content,
        channel: "HWChatWidgetInnerIframe"
    });
    window.parent.postMessage(messageContent, "*");
}

function loadSound() {
    if (STAGE == "dev" || STAGE == "staging") {

    } else {

        createjs.Sound.registerSound("https://cdn.helpwise.io/assets/sound/soft_notification.mp3", receiveSoundID);
        // createjs.Sound.registerSound("https://cdn2.helpwise.io/sound/hollow.mp3", sendSoundID);
        // createjs.Sound.registerSound("https://cdn2.helpwise.io/sound/soft_notification.mp3", engageSoundID);
        createjs.Sound.registerSound("https://cdn.helpwise.io/assets/sound/14_loud.mp3", engageSoundID);
    }
}