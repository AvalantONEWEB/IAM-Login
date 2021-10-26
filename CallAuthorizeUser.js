// Sample code: AuthirozatioN GranT FloW on the User Sign In_Page
function CallAuthorizeUser($page, event) {
    // alert("AuthorizeUser Fn. has been called");
    //Replace it with your Application Client ID - DO NOT COPY same as Below
     var client_id = "[your client_Id]";
     //Replace it with your Application Client Secret - DO NOT COPY same as Below
     var client_secret = "[your client_secret]";
     //Replace it with your Application redirect_uri - DO NOT COPY same as Below
     var redirect_uri = "[your redirect_uri URL]"
     // Example: var redirect_uri = "https://community.oneweb.tech/loginwithiam2/redirect"
     // console.log("redirect uri is  is", redirect_uri);
     var scope = "read write openid profile email"
     // console.log("scope is", scope);
     // alert("Checking Authentication and generating Code");
     window.location.href = "https://community.oneweb.tech/IAM2RESTService/oauth/authorize?response_type=code&scope=read%20write%20openid%20profile%20email&client_id=" + client_id + "&state=&redirect_uri=" + redirect_uri
     // console.log("the value of window.location.href is ", window.location.href);
   }