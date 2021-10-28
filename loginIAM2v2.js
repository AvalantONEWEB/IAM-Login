// Sample Case2: Password Credential Grant Flow
function loginIAM2v2($page, event) {
    // alert("calling IAM Login");
    console.log("Begin Login Fn.");
    //Assign values from the Page State to the Variables
    var username = $page.State.username;
    var password = $page.State.password;
//Get Authen 
    var clientid = "[your client_Id]";
    // example: var clientid = "***BcUHRHVifW***";
    var clientsecret = "[your client_secret]";
    //example: var clientsecret ="***snM8PPSjN5-qSyKoPSMliS***";
    var authen = clientid +":" + clientsecret;
    // Start Encode
   var encodedString = btoa(authen);
   //console.log (" the value of encoded string is " , encodedString);
    var settings = {
      "url": "https://community.oneweb.tech/IAM2RESTService/oauth/token",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic "+ encodedString
      },

      "data": {
        // Use must use the Client ID provided by the IAM Admin
        "client_id": "***BcUHRHVifW***",
        "grant_type": "password",
        "scope": "read write",
        "username": username,
        "password": password
      }
    };
    $.ajax(settings).done(function (response) {
         //console.log(response);
        // console.log ("the value of token is", response.access_token);
      var obj = response;
         console.log("Value of obj is: ", obj)
      var token = response.access_token;
      //  console.log ("the value of variable token is",token);
      //  localStorage.setItem('iam2_token_login_jhn',token);
      sessionStorage.setItem('iam2_token_login_jhn', token);
      $page.State.getToken = token;
      console.log("getuserinfo1 fn.")
      // Called new fn. to get the User Information from the IAM
      getuserinfo1(obj, $page, event);
      // catch errors 
    }).catch((e) => {
      // alert(e.message);
      alert(" Error! Authentication Failed - Invalid Username or Password");
      $page.update();
      //end code 
    });
  }
  
// Get the User information from the token retrieved
  function getuserinfo1(obj, $page, event) {
    console.log("Begin getuserinfo1 Fn.");
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
      // console.log(response);
      //Get userdetails
      var user = response.User_info.username;
      sessionStorage.setItem('usernameA', user);
      console.log("the name of the user is", user);
      $page.State.getUsername = user;
      //  console.log(" the value of the state getUsername is", $page.State.getUsername);
      //Use variables to assign values from the response
      var userid = response.User_info.user_id;
      var firstname = response.User_info.en_firstname;
      var lastname = response.User_info.en_lastname;
      var department = response.User_info.department;
      var mobile = response.User_info.mobile;
      var email = response.User_info.email;
      var avatar = response.User_info.avatar;
      // Save Values into the session storage
      sessionStorage.setItem('userid', userid);
      sessionStorage.setItem('firstname', firstname);
      sessionStorage.setItem('lastname', lastname);
      sessionStorage.setItem('department', department);
      sessionStorage.setItem('mobile', mobile);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('avatar', avatar);
      $page.update();
      // console.log("end user info");
      console.log("End getuserinfo1 Fn.");
      $page.update();
      //Redirect user to the Homepage
      $page.pageGo('[Your_landing_Page]');
     // example: $page.pageGo('redirect_pswdFlow'); 
    }).catch((e) => {
      // alert(e.message);
      alert("Access Required!!\n\nDear ONEWEB IAM User, currently you are not authorized to access this system. Please contact your ONEWEB IAM Admin to get the full access. Thank you ;) ");
      // $page.pageGo('redirect_pswdFlow');
      sessionStorage.removeItem("iam2_token_login_jhn");
      $page.update();
      //end code 
    });
  }