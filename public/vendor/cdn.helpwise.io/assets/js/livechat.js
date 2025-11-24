
let isHelpwiseChatWidgetLoaded = false;
const currentPageURL = document.URL;
let hwChatWidgetMobileView = "OFF";
let hwChatWidgetDisplay = "OFF";
let HelpwiseFunctionQueue = [];
let justcallChatEnv = false;
let cookieName = 'HelpwiseLiveChatUID'
if (window.justCallSettings) {
    window.helpwiseSettings = window.justCallSettings;
    justcallChatEnv = true;
    cookieName = 'JustCallLiveChatUID';
}
function HelpwiseLoadLiveChatWidget() {
    if (window.matchMedia("(max-width: 460px)").matches) {
        hwChatWidgetMobileView = "ON";
    } else {
        hwChatWidgetMobileView = "OFF";
    }

    let baseURL = "https://app.helpwise.io/";
    let cdnURL = "https://cdn.helpwise.io/";
    if (helpwiseSettings["STAGE"]) {
        if (helpwiseSettings["STAGE"] == 'dev') {
            baseURL = "https://app.helpwise.local/";
        } else if (helpwiseSettings["STAGE"] == 'prod') {
            baseURL = "https://app.helpwise.io/";
        } else if (helpwiseSettings["STAGE"] == 'staging') {
            baseURL = "https://staging.app.helpwise.io/";
        }
    }
    let iconLink = cdnURL + "assets/images/helpwise-chat-icon-xs-2.png";

    if (justcallChatEnv) {
        baseURL = "https://inbox.justcall.io/";
        cdnURL = "https://cdn.justcall.io/inbox-assets/";
        iconLink = cdnURL + "images/helpwise-chat-icon-xs-2.png";
    }

    let viewportLink = document.createElement("meta");
    viewportLink.setAttribute("name", "viewport");
    viewportLink.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName("head")[0].appendChild(viewportLink);

    let cssLink = document.createElement("link");
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('type', 'text/css');
    cssLink.setAttribute('href', cdnURL + 'assets/css/livechat.css');
    document.getElementsByTagName("head")[0].appendChild(cssLink);

    let cookieValue = document.cookie.split("; ").find(row => row.startsWith(cookieName)) == undefined ? "" : document.cookie.split("; ").find(row => row.startsWith(cookieName)).split("=")[1];
    loadDoc(cookieValue);



    function getUserAgent() {
        var i = navigator.userAgent, t, n = i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        return /trident/i.test(n[1]) ?
            ((t = /\brv[ :]+(\d+)/g.exec(i) || []), "IE " + (t[1] || "")) :
            n[1] === "Chrome" && ((t = i.match(/\b(OPR|Edge)\/(\d+)/)), t != null) ?
                t.slice(1).join(" ").replace("OPR", "Opera") :
                ((n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"]),
                    (t = i.match(/version\/(\d+)/i)) != null && n.splice(1, 1, t[1]),
                    n.join(" "))
            ;
    }

    function getOS() {
        var n = "Unknown OS";
        return (
            navigator.appVersion.indexOf("Win") != -1 && (n = "Windows"),
            navigator.appVersion.indexOf("Mac") != -1 && (n = "MacOS"),
            navigator.appVersion.indexOf("iPad") != -1 && (n = "iPad"),
            navigator.appVersion.indexOf("X11") != -1 && (n = "UNIX"),
            navigator.appVersion.indexOf("Linux") != -1 && (n = "Linux"),
            n
        );
    }

    function Userdetails(n) {
        for (
            var i,
            r = window.location.href
                .slice(window.location.href.indexOf("?") + 1)
                .split("&"),
            t = 0; t < r.length; t++
        ) {
            if (((i = r[t].split("=")), i[0].toUpperCase() == n.toUpperCase())) {
                return i[1];
            } else {
                return "";
            }
        }
    }

    function loadDoc(cookieValue) {
        let page_title = document.URL;
        if (document.getElementsByTagName("title")[0]) {
            page_title = document.getElementsByTagName("title")[0].innerHTML;
        }

        let apiData = {
            c: cookieValue,
            currentPageURL,
            os: getOS(),
            referrer: document.referrer,
            url: document.URL,
            userAgent: getUserAgent(),
            browser: getUserAgent(),
            utm_campaign: Userdetails("utm_campaign"),
            utm_device: Userdetails("utm_device"),
            utm_term: Userdetails("utm_term"),
            utm_medium: Userdetails("utm_medium"),
            utm_source: Userdetails("utm_source"),
            utm_content: Userdetails("utm_content"),
            page_title
        };

        let keys = Object.keys(helpwiseSettings);
        let alignmentKey = "right";
        let displayKey = "";
        for (key of keys) {
            if (key == "align") {
                alignmentKey = helpwiseSettings[key] == "left" ? "left" : "right";
            } else if (key == "display") {
                displayKey = helpwiseSettings[key] == "open" ? "on" : "off";
            }
            apiData[key] = helpwiseSettings[key];
        }


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let responseData = JSON.parse(this.response);
                if (responseData.status == "success") {
                    if (responseData.data.showWidget == true) {
                        let pingData = responseData.data;

                        document.cookie = pingData["value"];
                        let c = apiData["c"];
                        let isWidgetHidden = pingData["isWidgetHidden"];
                        let widgetHiddenClass = isWidgetHidden ? "widgetHidden" : "";
                        let widgetID = pingData["widgetID"];
                        let contactID = pingData["contactID"];
                        let selectedColor = pingData["selectedColor"];
                        let gradientColor = pingData["gradientColor"];
                        let widgetBannerData = pingData["widgetBannerData"];
                        // widgetBannerData = {
                        //     title: "Got a queston?",
                        //     description: "We're here to help!",
                        // }

                        let showBannerClass = "";
                        let bannerHtml = "";
                        if (widgetBannerData && (widgetBannerData.title != "" && widgetBannerData.description != "")) {
                            showBannerClass = "show";
                            bannerHtml = `
                                ${widgetBannerData.title ? `<p class="banner-title">${widgetBannerData.title}</p>` : ""}
                                ${widgetBannerData.description ? `<p class="banner-content">${widgetBannerData.description}</p>` : ""}
                            `;
                        }

                        if (displayKey == "on") {
                            if (widgetHiddenClass == "widgetHidden") {
                                turnWidgetOn(1);
                            } else {
                                turnWidgetOn(2);
                            }
                        }
                        let linearGradient = "linear-gradient(to right," + selectedColor + "  0," + gradientColor + "  100%)";
                        document.querySelector(":root").style.setProperty("--hw-background-widget", linearGradient);
                        let src = `${baseURL}chat-widget/display_V4?widgetID=${widgetID}&contactID=${contactID}&mobileView=${hwChatWidgetMobileView}&c=${c || pingData["c"]}&align=${alignmentKey}&url=${currentPageURL}&browser=${getUserAgent()}&os=${getOS()}`;
                        if (helpwiseSettings["STAGE"]) {
                            src += "&stage=" + helpwiseSettings["STAGE"];
                        }

                        const iframe = createHtmlElements("iframe", "hw_widget-frame", `helpwise_chat_widget_iframe ${alignmentKey} ${widgetHiddenClass}`);
                        iframe.name = "helpwise-main-iframe";
                        iframe.src = src;
                        document.body.appendChild(iframe);

                        const widgetIconDiv = createHtmlElements("div", "helpwise-widget-launcher", "helpwise_chat_widget_launcher");

                        widgetIconDiv.innerHTML = `
                            <div class="hw-widgetLauncherContainer  ${alignmentKey} ${widgetHiddenClass}">
                                <div id="hw-chat" class="widget-icon loading ${alignmentKey}">
                                    <div class="open-button">
                                        <span class="badge badge-danger" id="unread_message_count">1</span>
                                        <img src=${iconLink} id="expand-icon"></img>
                                    </div>
                                    <div class="close-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </div>
                                </div>

                                <div class="widget-banner ${showBannerClass}" style="cursor: pointer;">
                                    ${bannerHtml}
                                    <div class="close-banner" id="closeWidgetBanner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bbbbbb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </div>
                                </div>

                            </div>
                        `;

                        window.onmessage = function (e) {

                            let messageData = { "channel": "" };
                            try {
                                messageData = JSON.parse(e.data);
                            } catch (error) {
                                // console.error("------- This message is not meant for Helpwise ------");
                            }
                            if (messageData.channel == "HWChatWidgetInnerIframe") {
                                let message = messageData.message;

                                if (message == "HelpwiseWidgetMessage" || message == "UnreadMessageCountHelpwiseLiveChat") {
                                    let content = messageData.content;
                                    let count = content.count;
                                    if (count > 0) {
                                        widgetIconDiv.querySelector("#unread_message_count").style.display = "flex";
                                        widgetIconDiv.querySelector("#unread_message_count").innerHTML = count;
                                    } else {
                                        widgetIconDiv.querySelector("#unread_message_count").style.display = "none";
                                    }

                                    document.body.appendChild(widgetIconDiv);

                                    document.getElementById("hw-chat").onclick = function () {
                                        if (document.getElementById("hw-chat").classList.contains("open")) {
                                            turnWidgetOff();
                                        } else {
                                            turnWidgetOn();
                                        }
                                    }

                                    let isCloseBannerClicked = false;
                                    document.getElementById("closeWidgetBanner").onclick = function () {
                                        isCloseBannerClicked = true;
                                        widgetIconDiv.querySelector(".widget-banner").classList.add("hidden");
                                    }

                                    document.querySelector(".widget-banner").onclick = function () {
                                        if (!isCloseBannerClicked) {
                                            turnWidgetOn();
                                        }
                                    }

                                    if (widgetHiddenClass == "widgetHidden") {
                                        toggleCloseButtonForIframe(1);
                                    } else {
                                        toggleCloseButtonForIframe(0);
                                    }

                                    setTimeout(function () {
                                        if (document.querySelector("#helpwise-widget-launcher #hw-chat").classList.contains("loading")) {
                                            document.querySelector("#helpwise-widget-launcher #hw-chat").classList.remove("loading");
                                            document.querySelector("#helpwise-widget-launcher #hw-chat").classList.add("loaded");
                                        }
                                    }, 500);


                                    if (!isHelpwiseChatWidgetLoaded) {
                                        document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwiseLiveChatWidgetIsReady", "*");
                                        isHelpwiseChatWidgetLoaded = true;
                                        processHelpwiseFunctionQueue();
                                    }

                                } else if (message == "HelpwiseWidgetCloseMessage") {
                                    turnWidgetOff();
                                    hwChatWidgetDisplay = "OFF";
                                } else if (message == "HelpwiseWidgetOpenMessage") {
                                    turnWidgetOn();
                                    hwChatWidgetDisplay = "ON";
                                } else if (message == "HelpwiseWidgetIframeOuterHeight") {
                                    let iframeHeight = messageData.content.height;
                                    console.log(iframeHeight, hwChatWidgetDisplay);
                                    let originalIframeHeight = iframeHeight;
                                    if (hwChatWidgetDisplay == "OFF") {
                                        if (iframeHeight != "fit-content") {
                                            iframeHeight = iframeHeight + "px";
                                        } else {
                                            iframeHeight = "100% !important";
                                        }
                                        console.log(iframeHeight);
                                        document.querySelector(":root").style.setProperty("--hw-widget-frame-height", iframeHeight);
                                        // iframe.style.height = iframeHeight;
                                        document.getElementById("hw_widget-frame").classList.add("engaged");
                                    } else {
                                        document.getElementById("hw_widget-frame").classList.remove("engaged");
                                    }

                                } else if (message == "pleaseProvideCurrentURL") {
                                    let currentURL = document.URL;
                                    let responseMessage = "HelpwiseCurrentURLis=" + currentPageURL;
                                    document.getElementById("hw_widget-frame").contentWindow.postMessage(responseMessage, "*");
                                } else if (message == "HelpwiseWidgetFgColor") {
                                    let fgColor = messageData.content.color;
                                    if (fgColor != "#fff") {
                                        iconLink = cdnURL + "assets/images/helpwise-chat-icon-xs-dark-2.png";
                                    }
                                    if (widgetIconDiv.querySelector("#expand-icon")) {
                                        widgetIconDiv.querySelector("#expand-icon").src = iconLink;
                                    }
                                    document.querySelector(":root").style.setProperty("--hw-fg-color", fgColor);
                                }
                            }
                        };
                    }
                }
            }
        }

        xhttp.open("POST", baseURL + "api/chat-widget/HwPing_V4", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(apiData));

    }

    function turnWidgetOn(i = 0) {
        document.getElementById("hw-chat").classList.add("open");
        document.getElementById("hw_widget-frame").classList.add("on");
        processWidgetHiddenMatter(i);

        document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwiseLiveChatIconLoaded", "*");

        document.querySelector("#unread_message_count").style.display = "none";
        document.querySelector(".hw-widgetLauncherContainer .widget-banner").classList.add("hidden");
        hwChatWidgetDisplay = "ON";
    }
    function turnWidgetOff(i = 0) {
        document.getElementById("hw-chat").classList.remove("open");
        document.getElementById("hw_widget-frame").classList.remove("on");
        processWidgetHiddenMatter(i);

        document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwiseLiveChatIconClosed", "*");

        document.querySelector(".hw-widgetLauncherContainer .widget-banner").classList.remove("hidden");
        // document.querySelector("#unread_message_count").style.display = "flex";
        hwChatWidgetDisplay = "OFF";
    }

    function processWidgetHiddenMatter(i) {
        if (i == 1) {
            document.querySelector(".hw-widgetLauncherContainer").classList.add("widgetHidden");
            document.querySelector(".helpwise_chat_widget_iframe").classList.add("widgetHidden");
            toggleCloseButtonForIframe(1);
        } else if (i == 2) {
            document.querySelector(".hw-widgetLauncherContainer").classList.remove("widgetHidden");
            document.querySelector(".helpwise_chat_widget_iframe").classList.remove("widgetHidden");
            toggleCloseButtonForIframe(0);
        }
    }

    function toggleCloseButtonForIframe(i = 0) {
        if (i == 0) {
            // off
            document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwiseCloseButtonForFrameOff", "*");
            return true;
        }
        // on
        document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwiseCloseButtonForFrameOn", "*");
    }

    function createHtmlElements(name, id, classname) {
        let elem = document.createElement(name);
        elem.id = id;
        elem.setAttribute("class", classname);

        return elem;
    }

    function processHelpwiseFunctionQueue() {
        if (HelpwiseFunctionQueue.length > 0) {
            console.log("HelpwiseFunctionQueue", HelpwiseFunctionQueue);
            while (HelpwiseFunctionQueue.length > 0) {

                const commandToProcess = HelpwiseFunctionQueue.shift();

                if (commandToProcess.action == "typeNewMessage") {
                    Helpwise(commandToProcess.action, commandToProcess.message);
                } else {
                    Helpwise(commandToProcess.action);
                }
            }
        }
    }

    HelpwiseLoadLiveChatWidget.turnWidgetOff = turnWidgetOff;
    HelpwiseLoadLiveChatWidget.turnWidgetOn = turnWidgetOn;
};

HelpwiseLoadLiveChatWidget();

function Helpwise(command, ...options) {
    let response = { action: command };
    switch (command) {
        case "show":
            if (isHelpwiseChatWidgetLoaded) {
                HelpwiseLoadLiveChatWidget.turnWidgetOn(2);

                // document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwiseLiveChatIconLoaded", "*");
                document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwisePleaseOpenLiveChat", "*");
                hwChatWidgetDisplay = "ON";

                response.status = "success";
            } else {
                HelpwiseFunctionQueue.push({ action: "show" });
                response.status = "queued";
            }
            break;
        case "showWithoutIcon":
            if (isHelpwiseChatWidgetLoaded) {

                HelpwiseLoadLiveChatWidget.turnWidgetOn(1);

                document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwisePleaseOpenLiveChatWithoutIcon", "*");
                // document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwiseLiveChatIconLoaded", "*");
                hwChatWidgetDisplay = "ON";
                response.status = "success";
            } else {
                HelpwiseFunctionQueue.push({ action: "showWithoutIcon" });
                response.status = "queued";
            }
            break;
        case "hide":
            if (isHelpwiseChatWidgetLoaded) {
                HelpwiseLoadLiveChatWidget.turnWidgetOff(2);
                response.status = "success";
            } else {
                HelpwiseFunctionQueue.push({ action: "hide" });
                response.status = "queued";
            }

            break;
        case "hideAlongWithIcon":
            if (isHelpwiseChatWidgetLoaded) {
                HelpwiseLoadLiveChatWidget.turnWidgetOff(1);
                response.status = "success";
            } else {
                HelpwiseFunctionQueue.push({ action: "hideAlongWithIcon" });
                response.status = "queued";
            }

            break;
        case "showConversations":
            if (isHelpwiseChatWidgetLoaded) {

                HelpwiseLoadLiveChatWidget.turnWidgetOn();

                hwChatWidgetDisplay = "ON";
                document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwisePleaseOpenConversations", "*");
                response.status = "success";
            } else {
                HelpwiseFunctionQueue.push({ action: "showConversations" });
                response.status = "queued";
            }
            break;
        case "typeNewMessage":
            if (isHelpwiseChatWidgetLoaded) {
                let message = options[0];

                HelpwiseLoadLiveChatWidget.turnWidgetOn();

                hwChatWidgetDisplay = "ON";
                document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwisePleaseSendThisMessage:" + message, "*");

                response.status = "success";
            } else {
                HelpwiseFunctionQueue.push({ action: "typeNewMessage", message: options[0] });
                response.status = "queued";
            }
            break;

        case "refreshEngage":
            if (isHelpwiseChatWidgetLoaded) {
                document.getElementById("hw_widget-frame").contentWindow.postMessage("HelpwisePleaseRefreshEngage=" + document.URL, "*");
                response.status = "success";
            } else {
                HelpwiseFunctionQueue.push({ action: "refreshEngage" });
                response.status = "queued";
            }
            break;
    }

    return response;
}

window.JustCall = Helpwise