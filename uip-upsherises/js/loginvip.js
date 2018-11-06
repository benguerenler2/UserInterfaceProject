var login_attempts=3;
function check_form()
{
    document.getElementById("message").innerHTML = "";

    // Store
    localStorage.setItem("nameV", "bengu");
    localStorage.setItem("passwordV", "123");
    
    var name=document.getElementById("name").value;
    var pass=document.getElementById("pass").value;
    var name2= localStorage.getItem("nameV");
    var pass2 =localStorage.getItem("passwordV");

    if(name == name2 && pass == pass2)
    {
        document.getElementById("name").value="";
        document.getElementById("pass").value="";
        window.location.replace("vipshop.html");
    }
    else
    {
        if(login_attempts==0)
        {
            document.getElementById("message").innerHTML = "No Login Attempts Available";
        }
        else
        {
            login_attempts=login_attempts-1;
            document.getElementById("message").innerHTML = "No Login Attempts Available";
            if(login_attempts==0)
            {
                document.getElementById("name").disabled=true;
                document.getElementById("pass").disabled=true;
                document.getElementById("form1").disabled=true;
            }
        }
    }

    return false;
}