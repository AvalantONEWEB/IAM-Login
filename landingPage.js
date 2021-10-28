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
