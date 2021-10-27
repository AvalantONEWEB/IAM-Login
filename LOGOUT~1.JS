// Function to call the Logout API – IAM (Oauth2.0)
function userlogoutIAM2($page, event) {
    //alert ("Start Logout");  
    var token1 = sessionStorage.getItem("iam2_token_login_jhn") || localStorage.getItem("ct_token");
    alert("User Session logged out. Thankyou for using ONEWEB IAM login Demo - using Authorization Grant Flow ;) ");
    var username = sessionStorage.getItem("usernameA") || localStorage.getItem("usernameA");
    var settings = {
      "url": "https://community.oneweb.tech/IAM2RESTService/oauth/logout",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer " + token1,
      },
    };
    $.ajax(settings).done(function (response) {
      sessionStorage.removeItem("iam2_token_login_jhn");
      sessionStorage.removeItem("usernameA");
      sessionStorage.removeItem("token_Expiry_Date");
      sessionStorage.removeItem("tokenID");
      sessionStorage.removeItem("refreshtoken");
      sessionStorage.removeItem("this_token_scope");
      //Session storage cleared
      //Clear Console
      console.clear();
      //Redirect user to the Main Sign in Page
      //Replace it with your application- SignIn Page
      $page.pageGo("loginwithiam2");
      $page.update();
      // alert ("End Logout")
    });
  }