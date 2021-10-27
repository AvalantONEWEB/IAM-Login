// Use token and call API to confirm token Validity, user access type, email and ClientID
function ChkToknValid($page, event) {
  var Validtoken = sessionStorage.getItem("iam2_token_login_jhn");
  console.log(" the valid token is", Validtoken);
  var settings = {
    "url": "https://community.oneweb.tech/IAM2RESTService/oauth/check_token?token=" + Validtoken,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    var accesstype = response.authorities;
    console.log("Your Access type is", accesstype);
    var getuserValid = response.user_name;
    console.log("This Token ID belongs to the username", getuserValid);
    var clientIdtoaccess = response.client_id;
    console.log("This token user had an accces to the Client ID", clientIdtoaccess);

    // Assign variable values to the Page state Variables
    $page.State.accesstype = accesstype;
    $page.State.getuserValid = getuserValid;
    $page.State.clientIdtoaccess = clientIdtoaccess;
    $page.update();
    $page.openModal('Modal3030');
    //   alert("Hi, this token is Verified and contains the following information as below:\n\n 1) Your Access Role Type is: " + accesstype + "\n 2) Token is generated for the username: " + getuserValid + "\n 3) Your Client Id for this access is: " + clientIdtoaccess + "\n\n Thank you!");
  }).catch((e) => {
    // alert(e.message);
    alert("Sorry!! This Token is not Valid anymore!!");
    //remove all Info.
    sessionStorage.removeItem("iam2_token_login_jhn");
    sessionStorage.removeItem("usernameA");
    sessionStorage.removeItem("token_Expiry_Date");
    sessionStorage.removeItem("tokenID");
    sessionStorage.removeItem("refreshtoken");
    sessionStorage.removeItem("this_token_scope");
    //Delete from Session Complete
           //Redirect user to the Login Page
    $page.pageGo('loginwithiam2');
    $page.update();
    //end code 
  });
}