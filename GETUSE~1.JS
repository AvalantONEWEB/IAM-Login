 // Create a fn. to retrieve the code from the URL and send Code to get the Token
 function getuserdetails($page, event) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var code = url.searchParams.get("code");
    //console.log("code:", code);
    //Replace it with Your Application - Client ID and Client Secret
    var client_id = "[your client_Id]";
    //For example: var client_id = "***JriLR4eE***==";
    var client_secret = "[your client_secret]";
    //For example: var client_secret = "***0rPM5PbhPoSv0G79UuX2P***="
    //Continue Code
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + window.btoa(client_id + ":" + client_secret));
    myHeaders.append("Cookie", "JSESSIONID=Vb11HiNajOYB026Yu-00y68ekdeS-w4SBne2OYbK.ow4-community-59fcf9db77-7ww5p");
    var formdata = new FormData();
    formdata.append("grant_type", "authorization_code");
    formdata.append("code", code);
     //Replace it with Your Application - redirect_uri
    formdata.append("redirect_uri", "[your client_secret]");
    // For example: formdata.append("redirect_uri", "https://community.oneweb.tech/loginwithiam2/redirect");
    //Replace by your Application - Client ID
    formdata.append("client_id", "***JriLR4eE***==");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch("https://community.oneweb.tech/IAM2RESTService/oauth/token", requestOptions)
      .then(response => response.text())
      .then(response => {
//continue and print response
        var obj = JSON.parse(response);
        console.log("obj : ", obj)
        // Called Get user Info function
        getuserinfo(obj, $page, event);
        //  var user1 = user;
        //  console.log ("the value of user1 is", user1);
        var token = obj.access_token
        //  console.log("Set Token to the Local Storage");
        //  localStorage.setItem('iam2_token_login_jhn', obj.access_token);
        sessionStorage.setItem('iam2_token_login_jhn', obj.access_token);
        //  console.log("the value of token var is", token);
        //Assign the value of token to the state
        $page.State.getToken = token;
        //Set all the response values in the session storage 
        sessionStorage.setItem('token_Expiry_Date', obj.expires_in);
        sessionStorage.setItem('tokenID', obj.id_token);
        sessionStorage.setItem('refreshtoken', obj.refresh_token);
        sessionStorage.setItem('this_token_scope', obj.scope);
  
        //Retrieve the Values from the Session Storage  
        var reftoken = sessionStorage.getItem('refreshtoken');
        $page.State.refreshTok = reftoken;
        var tokenExp = sessionStorage.getItem('token_Expiry_Date');
        $page.State.tokenValid = tokenExp;
     //   Timefn1($page, event);
        $page.update();
      })
      .catch(error => {
        alert(error.message);
        console.log('error', error);
      //If exist, remove all data from the session storage
      sessionStorage.removeItem("iam2_token_login_jhn");
      sessionStorage.removeItem("usernameA");
      sessionStorage.removeItem("token_Expiry_Date");
      sessionStorage.removeItem("tokenID");
      sessionStorage.removeItem("refreshtoken");
      sessionStorage.removeItem("this_token_scope");
      //Delete from Session Complete then redirect user to the Sign IN Page
      //Replace it with your application- SignIn Page
        $page.pageGo('loginwithiam2');
        $page.update();
      })
    //do stuff
  }
  

  // Create a fn. to use token to get all the user information from IAM
  function getuserinfo(obj, $page, event) {
    var settings = {
      "url": "https://community.oneweb.tech/IAM2RESTService/services/v2/userinfo",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "IAMToken": "",
        "Authorization": "Bearer " + obj.access_token
      }
    };
  
    $.ajax(settings).done(function (response) {
    //Get userdetails
      var user = response.User_info.username;
      console.log(" the name of the user is", user);
      $page.State.getUsername = user;
      //store value to session
      sessionStorage.setItem('usernameA', user);
      // console.log(" the vale of the state getUsername is", $page.State.getUsername);
      $page.State.getUsername = response.User_info.username;
      $page.State.userid = response.User_info.user_id;
      $page.State.firstname = response.User_info.en_firstname;
      $page.State.lastname = response.User_info.en_lastname;
      $page.State.department = response.User_info.department;
      $page.State.mobileno = response.User_info.mobile;
      $page.State.email = response.User_info.email;
      $page.State.avatar = response.User_info.avatar;
      $page.update();
    }).catch((e) => {
      //  alert(e.message);
      alert('User unauthorized and only had access to see the IAM token. Please contact your ONEWEB Admin for complete access to this system. Thank You ;)');
      userlogoutIAM2($page, event);
        });
  }
  

// 3.Create a fn. to call the Logout API – IAM (Oauth2.0)
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