//Assign API responses to the Page state and Print
function printstates($page, event) {
    console.log("print state function begins");
    var name = sessionStorage.getItem('usernameA');
    var token1 = sessionStorage.getItem('iam2_token_login_jhn');
    $page.State.getUsername1 = name;
    $page.State.getToken = token1;
    console.log("value of state getUsername1 from the session is ", $page.State.getUsername1);
    console.log("name of state token from the session is ", $page.State.getToken);
    //console.log("name from the name from the session is ", name);
    $page.State.userid = sessionStorage.getItem('userid');
    $page.State.firstname = sessionStorage.getItem('firstname');
    $page.State.lastname = sessionStorage.getItem('lastname');
    $page.State.department = sessionStorage.getItem('department');
    $page.State.mobileno = sessionStorage.getItem('mobileno');
    $page.State.email = sessionStorage.getItem('email');
    $page.State.avatar = sessionStorage.getItem('avatar');
    console.log("print state function ends");
    $page.update();
    }
    
//Call Logout API - Logout from the Password Credential Grant Flow
function userlogoutIAM2PC($page, event) {
    //alert ("Start Logout");  
    var token1 = sessionStorage.getItem("iam2_token_login_jhn") || localStorage.getItem("ct_token");
    alert("User Session logged out. Thankyou for using ONEWEB IAM login Demo - using Password Credential Flow ;) ");
    var username = sessionStorage.getItem("usernameA") || localStorage.getItem("usernameA");
    //var form = new FormData();
    var settings = {
      "url": "https://community.oneweb.tech/IAM2RESTService/oauth/logout",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer " + token1,
      },
    };
  
    $.ajax(settings).done(function (response) {
      //remove all credentails from the local/session storage
      sessionStorage.removeItem("iam2_token_login_jhn");
      sessionStorage.removeItem("usernameA");
      sessionStorage.removeItem("firstname");
      sessionStorage.removeItem("lastname");
      sessionStorage.removeItem("department");
      sessionStorage.removeItem("mobile");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("avatar");
      sessionStorage.removeItem("userid");
      //Redirect user back to the Sign IN Page
      $page.pageGo("loginwithiam2");
      $page.update();
      // alert ("End Logout")
    });
  }

    