var darkth = {
    theme : function(){
var dark = document.getElementById("darktheme") ;


dark.onclick = function(){

    if(localStorage.getItem('dark') == null)
    {
        localStorage.setItem('dark','on') ;
        console.log("dark set to " + localStorage.getItem('dark')) ;
        dark.checked = true ;
        document.body.style["background"] = "black" ;
        document.getElementById("h1").style.color = "gold" ;
    }
    else
    {
        
        var darkcheck = localStorage.getItem('dark') ;
        if(darkcheck == "on")
         {localStorage.setItem('dark',"off") ; document.body.style["background"] = "white" ; document.getElementById("h1").style.color = "bisque" ; }
        else
        {localStorage.setItem('dark',"on") ; document.body.style["background"] = "black" ; document.getElementById("h1").style.color = "gold" ; }
        console.log("darkcheck is  " + localStorage.getItem('dark')) ;
    }

}
if(dark.checked == false)
{
    if(localStorage.getItem('dark') != null){
    var darkcheck = localStorage.getItem('dark') ;
    console.log("darkcheckload is  " + localStorage.getItem('dark')) ;
    if(darkcheck == "on")
      {dark.checked = true ; document.body.style["background"] = "black" ; document.getElementById("h1").style.color = "gold" ; }
    else
       {dark.checked = false ; document.body.style["background"] = "white" ; document.getElementById("h1").style.color = "bisque" ; }   
    }
    
}
    }
}

exports.darkth = darkth ;