window.onload = function(){
    var submit = document.getElementById('submit') ;
    
    submit.onclick = function(){
        var req = new XMLHttpRequest() ;
        var arr = [] ;
        var connectionstring = `"` + document.getElementById('cluster').value;
        arr.push(document.getElementById('cluster').value) ;
        console.log("arr = " + arr) ;
        console.log("connection string = " + document.getElementById('cluster').value) ;
        req.open("POST", "http://localhost:8000/connectionstring?name=" + connectionstring ,true) ;
        
        document.getElementById('hrefsubmit').setAttribute("href","http://localhost:8000/index.html") ;
        //req.
        req.onloadend = function() {
            
            console.log("response = " + req.response) ;
            console.log("loadend") ;
            //if(req.status == 200)
            setTimeout(function(){
                document.getElementById("hrefsubmit").click() ;
            },500) ;
            //document.getElementById("hrefsubmit").click() ;
        }
        req.send() ;
        //document.getElementById("hrefsubmit").click() ;
        //open("http://localhost:8000/index.html") ;
    }
}