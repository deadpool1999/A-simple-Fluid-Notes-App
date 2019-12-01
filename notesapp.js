//import {just} from './testmodule' ;



window.onload = function(){





   

  //  just();
    //const http2 = require('http2') ;
    var height = 20 ;
    
    var fade = [
        {
            "visibility" : "hidden" ,
            "opacity" : 0
        },
        {
            "visibility" : "visible" ,
            "opacity" : 1 
        }
    ];
    
    var fadebox = [
        {
            "visibility" : "hidden" ,
            "opacity" : 0,
            "width" : '0px',
            "height" : '0px',
            "transform" : "translate(-10vh,-20vh)"
    
        },
        {
            "visibility" : "visible" ,
            "opacity" : 1 ,
            "width" : '500px',
            "height" : '500px',
            "transform" : "translate(-25vh,-45vh)"
    
        }
    ];
    var fadebox1 = [
        {
            "width" : '400px',
            "transform" : "translate(-20vh,-40vh)"
        },
        {
            "width" : '500px',
            "transform" : "translate(-25vh,-45vh)"
        }
    ];
    var fadebox2 = [
        {
            "width" : '500px',
            "transform" : "translate(-25vh,-45vh)"
        },
        {
            "width" : '400px',
            "transform" : "translate(-20vh,-40vh)"
        }
    ];
    
    var fadeout = [
        {
            "visibility" : "visible",
            "opacity" : 1,
            "width" : '400px',
            "height" : '400px'
        },
        {
            "visibility" : "hidden",
            "opacity" : 0 ,
            "width" : '0px',
            "height" : '0px'
        }
    ];
    
    var slidedown = [
        {
            "height" : height,
            "opacity" : 0
        },
        {
            "height" : height + 60,
            "opacity" : 1 
        }
    ];
    var rollright = [
        {
            "transform" : "translate(0)",
            "opacity" : 0
        },
        {
            "transform" : "translate(180px)",
            "opacity" : 1
        }
    ];
    var rollleft = [
        {
            "transform" : "translate(180px)",
            "opacity" : 1
        },
        {
            "transform" : "translate(0)",
            "opacity" : 0
        }
    ];
    
    
    
    
    
    var counttask = 0 ;
    var submitbt = document.getElementById('addtask') ;
    var taskpanel = document.querySelector('.task') ;
    var alltask = document.querySelector('.alltask') ;
    var displaytask = document.querySelector('.displaytask') ;
    var displaycategories = document.querySelector('.displaycategories') ;
    var text = document.getElementById('text') ;
    var deletetasks = document.getElementById('deletetasks') ;
    
     var dark = document.getElementById("darktheme") ;
     var ncat = document.getElementById("ncat") ;
     var ncatname = document.getElementById("ncatname") ;
     var cattext = document.getElementById("cattext") ;
     var newcategory = document.getElementById("newcategory") ;
     var presentcategory = "Newnotes" ;
     var show = document.getElementById("show") ;
     var showtext = document.getElementById("showtext") ;
     var showprev = document.getElementById("showprev") ;
     var showanim = 0 ;
     var ncatdiv1 = document.getElementById("ncatdiv1") ;
     var ncatdiv2 = document.getElementById("ncatdiv2") ;
     var newdonebt = document.getElementById("newdonebt") ;
     var newdonediv1 = document.getElementById("newdonediv1") ;
     var newdonediv2 = document.getElementById("newdonediv2") ;


    
    dark.onclick = function(){
    
        if(localStorage.getItem('dark') == null)
        {
            localStorage.setItem('dark','on') ;
            console.log("dark set to " + localStorage.getItem('dark')) ;
            dark.checked = true ;
            document.body.style["background"] = "black" ;
            document.getElementById("h1").style.color = "gold" ;
            alltask.style["background"] = "darkkhaki" ;
        }
        else
        {
            
            var darkcheck = localStorage.getItem('dark') ;
            if(darkcheck == "on")
             {localStorage.setItem('dark',"off") ; document.body.style["background"] = "white" ; document.getElementById("h1").style.color = "bisque" ;alltask.style["background"]="red" ; }
            else
            {localStorage.setItem('dark',"on") ; document.body.style["background"] = "black" ; document.getElementById("h1").style.color = "gold" ;alltask.style["background"]="darkkhaki" ; }
            console.log("darkcheck is  " + localStorage.getItem('dark')) ;
        }
    
    }
    if(dark.checked == false)
    {
        if(localStorage.getItem('dark') != null){
        var darkcheck = localStorage.getItem('dark') ;
        console.log("darkcheckload is  " + localStorage.getItem('dark')) ;
        if(darkcheck == "on")
          {dark.checked = true ; document.body.style["background"] = "black" ; document.getElementById("h1").style.color = "gold" ; alltask.style["background"]="darkkhaki" ;    }
        else
           {dark.checked = false ; document.body.style["background"] = "white" ; document.getElementById("h1").style.color = "bisque" ; alltask.style["background"]="red" ; }   
        }
        
    } 

    
    

    show.style["width"] = "500px" ;
    show.style["height"] = "300px"
    show.style["transform"] = "translate(55vmax,-72vmax)" ;
    taskpanel.style["opacity"] = 0 ;
    var newdonebtplus = 0 ;
    newdonebt.onclick = function(){
        if(showanim == 0)
        {
          showanim = 1 ; 
          
          newdonediv1.animate(
            [
                {
                    "transform":"translate(15px,-15px) rotate(0)"
                },
                {
                    "transform" : "translate(15px,-15px) rotate(-90deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        newdonediv1.style["transform"] = "translate(15px,-15px) rotate(-90deg)" ;
        newdonebtplus = 1 ;
        newdonediv2.animate(
            [
                {
                    "transform":"translate(3px,-2px) rotate(0)"
                },
                {
                    "transform" : "translate(3px,-2px) rotate(360deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        newdonediv2.style["transform"] = "translate(3px,-2px) rotate(180deg)" ;
        
         show.animate([
            {
                "transform" : "translate(55vmax,-72vmax)",
                "width" : "500px",
                

            },
            {
                "transform" : "translate(55vmax,-30vh)",
                "width" : "500px"
            }

        ],
        {
            duration:1000,
            easing : "ease-in-out"
        });
          
        setTimeout(function(){
            show.animate([
                {
                    "width" : "500px",
                    "transform":"translate(55vmax,-30vh)"
                    //"height" : "300px"
                },
                {
                    "width" : "170vh",
                    "transform":"translate(200px,-30vh)" 
                    //"height" : "350px"
                }

            ],
            {
                duration:1000,
                easing:"ease-in-out"
            });
            
        },1000);
        show.style["transform"] = "translate(200px,-30vh)" ;
        show.style["width"] = "170vh" ;
        setTimeout(function(){
            
            show.animate(
                [
                    {
                        "height" : "300px"
                    },
                    {
                        "height" : "350px"
                    }
                ],
                {
                    duration : 500,
                    easing : "ease-in-out"
                }
            );
            show.style["height"] = "350px" ;
            showtext.animate(
                [
                    {
                        "height" : "35vh"
                    },
                    {
                        "height" : "350px"
                    }
                ],
                {
                    duration : 300,
                    easing : "ease-in-out"
                }
            ) ;
            showtext.style["height"] = "350px" ;
            
        },1500);
        taskpanel.animate(
            [
                {
                    "opacity" : 0
                },
                {
                    "opacity" : 1
                }
            ],
            {
                duration : 500,
                easing : "ease-in-out"
            }
        );
        taskpanel.style["opacity"] = 1 ;
        showprev.style["opacity"] = 0 ;
        


       }
       else
       {
           showanim = 0 ;
           
           newdonediv1.animate(
            [
                {
                    "transform":"translate(15px,-15px) rotate(-90deg)"
                },
                {
                    "transform" : "translate(15px,-15px) rotate(0deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        newdonediv1.style["transform"] = "translate(15px,-15px) rotate(0deg)" ;
        newdonebtplus = 1 ;
        newdonediv2.animate(
            [
                {
                    "transform":"translate(3px,-2px) rotate(360deg)"
                },
                {
                    "transform" : "translate(3px,-2px) rotate(0deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        newdonediv2.style["transform"] = "translate(3px,-2px) rotate(0deg)" ;
           show.animate([
            {
                "width" : "170vh",
                "transform":"translate(200px,-30vh)"
            },
            {
                "width" : "500px",
                "transform":"translate(55vmax,-30vh)"
            }

        ],
        {
            duration:1000,
            easing:"ease-in-out"
        });
           
        show.style["width"] = "500px" ;
        setTimeout(function(){
            showtext.animate(
                [
                    {
                        "height" : "350px"
                    },
                    {
                        "height" : "35vh"
                    }
                ],
                {
                    duration : 300,
                    easing : "ease-in-out"
                }
            ) ;
            showtext.style["height"] = "35vh" ;
            
            show.animate([
                {
                    "transform" : "translate(55vmax,-30vh)",
                    "width" : "500px"
    
                },
                {
                    "transform" : "translate(55vmax,-72vmax)",
                    "width" : "500px"
                }
    
            ],
            {
                duration:1000,
                easing : "ease-in-out"
            });
        },1000);
        show.style["transform"] = "translate(55vmax,-72vmax)" ;
        setTimeout(function(){
            show.animate(
                [
                    {
                        "height" : "350px"
                    },
                    {
                        "height" : "300px"
                    }
                ],
                {
                    duration : 500,
                    easing : "ease-in-out"
                }
            );
            show.style["height"] = "300px" ;
            taskpanel.animate(
                [
                    {
                        "opacity" : 1
                    },
                    {
                        "opacity" : 0
                    }
                ],
                {
                    duration : 500,
                    easing : "ease-in-out"
                }
            );
            taskpanel.style["opacity"] = 0 ;
            showprev.style["opacity"] = 1 ;
            
        },1500);


       } 
        
    }
    
    // category class and all its functions....
    class mynew{
        constructor(name)
        {
            this.name = name ;
        }
        
        greet(){
            var clele = document.createElement("div") ;
            var cleletask = document.createElement("div") ;
            var celebt = document.createElement("input") ;
            celebt.type = "checkbox" ;
            celebt.placeholder = "check the task " ;
            
            cleletask.innerText = this.name ;
            cleletask.style["fontSize"] = "20px" ;
            console.log("category innertext = " + cleletask.innerText) ;
            clele.appendChild(cleletask) ;
            clele.appendChild(celebt);
            
            
            celebt.onclick = function(){
            if(celebt.checked == true )
            {
                //clele.append("checked");
                deletechild() ;
                counttask = 0 ;
                 numids = [] ;
                 presentcategory = cleletask.innerText ;
                 console.log("presentcategory changed to " + cleletask.innerText) ;
                 n_url.open("GET", 'http://localhost:8000/gettasks' + "?cat=" + cleletask.innerText , true ) ;
                 alltask.appendChild(loadanim) ;
                 tillload();

    n_url.onloadend = (e)=>{
    
        var lastchild = alltask.lastElementChild ;
        alltask.removeChild(lastchild) ;
        stopload();
         var t = n_url.response ;
        console.log("the data fetched is " + t) ;
        var n_t = t.split('|') ;
        console.log("after splitiing " + n_t) ;
        console.log("and the length is " + n_t.length) ;
        
    
        for(var i=0;i<n_t.length;i++)
        {
            var str = n_t[i] ;
            var num = 0, check=0, num_id=0 ;
           
            for(var j=5;j<str.length;j++)
            {
                if(str[j]=='"')
                {
                    check = 1 ;
                    num = j+11 ;
                    break ;
                }
                
            }
            num_id = parseInt(str.slice(5,num)) ;
            console.log("num_id is " + num_id) ;
            console.log("num is " + num ) ;
            var len = n_t[i].length ;
            str = str.slice(num,len-1) ;
            var bt = document.createElement("input") ;
            bt.type = "checkbox" ;
            //bt.innerText = "Delete" ;
            bt.id = "bt" + num_id ;
            const newtask = new myelem ;
            var task = document.createElement("li") ;
            task.id = "task" + num_id ;
           // task.innerText = str ;
            task.append(newtask.greet(str)) ;
            task.appendChild(bt) ;
            displaytask.appendChild(task) ; 
            counttask = num_id ;
            numids.push(num_id) ;
        }
        console.log("nuid array is " + numids) ;
        counttask++ ;
        
                
                
            }
            n_url.send() ;
    
    
    
        }
            else
            {
                //clele.append("notchecked") ;
                //clele.innerText = clele.innerText ;
                
                console.log("please select a category to show") ;
            }
          }
            return clele ;
        }
    }
    
    var ncatplusanim = 0 ;
    ncat.onclick = function(){
        //prompt("enter the name", "hello") ;
        if(ncatplusanim == 0)
        {cattext.animate(fade,{
            duration:3000,
            easing: 'ease-in-out'
        });
        ncatname.animate(fade,{
            duration:3000,
            easing: 'ease-in-out'
        });
        cattext.style["opacity"] = 1 ;
        ncatname.style["opacity"] = 1 ;
        newcategory.animate(fadebox,{
            duration : 1000,
            
        });
        setTimeout(function(){
            newcategory.animate(fadebox2,{
                duration:300,
                
            });
        },1001);
        setTimeout(function(){
            newcategory.animate(fadebox1,{
                duration:300,
                
            });
        },1310);
        setTimeout(function(){
            newcategory.animate(fadebox2,{
                duration:500,
                
            });
        },1601);
        newcategory.style["visibility"] = "visible" ;

        //rotate the plus
        ncatdiv1.animate(
            [
                {
                    "transform":"translate(15px,-15px) rotate(0)"
                },
                {
                    "transform" : "translate(15px,-15px) rotate(-90deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        ncatdiv1.style["transform"] = "translate(15px,-15px) rotate(-90deg)" ;
        ncatplusanim = 1 ;
        ncatdiv2.animate(
            [
                {
                    "transform":"translate(0px,-5px) rotate(0)"
                },
                {
                    "transform" : "translate(0px,-5px) rotate(360deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        ncatdiv2.style["transform"] = "translate(0px,-5px) rotate(180deg)" ;
        }
       
    
        
    }
    
    // submit the new category name 
    ncatname.onclick = function(){
        //prompt("ncatname", "hello") ;
     if(ncatplusanim == 1)
      {
        cattext.animate([{"opacity" : 1},{"opacity" : 0}],{
            duration:300,
            easing:'ease-in-out'
        });
        ncatname.animate([{"opacity" : 1},{"opacity" : 0}],{
            duration:10,
            
        });
        ncatname.style["opacity"] = 0 ;
        cattext.style["opacity"] = 0 ;
        newcategory.animate(fadeout,{
            duration : 1000,
            easing : "ease-in-out"
        }) ;
        newcategory.style["visibility"] = "hidden" ;


        //plus sign animate
        
            ncatdiv1.animate(
            [
                {
                    "transform":"translate(15px,-15px) rotate(-90deg)"
                },
                {
                    "transform" : "translate(15px,-15px) rotate(0deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        ncatplusanim = 0 ; 
        ncatdiv1.style["transform"] = "translate(15px,-15px) rotate(0deg)" ;
        
            ncatdiv2.animate(
            [
                {
                    "transform":"translate(0px,-5px) rotate(360deg)"
                },
                {
                    "transform" : "translate(0px,-5px) rotate(0deg)"
                }
            ],
            {
                duration:1000,
                easing:"ease-in-out"
            }
        );
        
        ncatdiv2.style["transform"] = "translate(0px,-5px) rotate(0deg)" ;
        
    
        if(cattext.value.length >0 )
        {var addcat = new XMLHttpRequest() ;
        addcat.open("POST", 'http://localhost:8000/category' + '?name=' + cattext.value ,true)
        addcat.send() ;
        console.log("sent new category as" + cattext.value) ;
        const displayquerycategory = new mynew(cattext.value) ;
        var dispcat = document.createElement("li") ;
        dispcat.id = "cat" ;
        dispcat.append(displayquerycategory.greet()) ;
        displaycategories.appendChild(dispcat) ;
        }
      }
    
    }

    //till load animation
    /*class tillload{
        
        greet(place){
            
            
            var loadanim = document.createElement("div") ;
            var loadanimchild = document.createElement("div") ;
            loadanim.style["width"] = "200px" ;
            loadanim.style["height"] = "20px" ;
            loadanim.style["borderRadius"] = "10px" ;
            loadanim.style["background"] = "white" ;
            loadanim.id = "tillload" + place ;
            loadanim.setAttribute("class","loadanim") ;
            loadanimchild.setAttribute("class","loadanimchild") ;
            loadanimchild.animate(rollright,{
                duration : 1300,
                easing : "ease-in-out"
            }) ;
            setTimeout(function(){
                        
                loadanimchild.animate(rollleft,{
                    duration : 1300,
                    easing : "ease-in-out"
                }) ;
            },1300) ;

            this.animating = setInterval(function(){
                loadanimchild.animate(rollright,{
                    duration : 1300,
                    easing : "ease-in-out"
                    }) ;
                    setTimeout(function(){
                        
                        loadanimchild.animate(rollleft,{
                            duration : 1300,
                            easing : "ease-in-out"
                        }) ;
                    },1300) ;
                    console.log("animating " ) ;

            },2600) ;
                
            
            
            


            loadanim.appendChild(loadanimchild) ;
            

            //console.log("loadanim") ;
            return loadanim ;

        }
        stop(){
           clearInterval(animating) ;
        }
    }*/

    var animating ; 
    var loadanim = document.createElement("div") ;
    var loadanimchild = document.createElement("div") ;
    
        
            loadanim.style["width"] = "200px" ;
            loadanim.style["height"] = "20px" ;
            loadanim.style["borderRadius"] = "10px" ;
            loadanim.style["background"] = "white" ;
            
            loadanim.setAttribute("class","loadanim") ;
            loadanimchild.setAttribute("class","loadanimchild") ;
        function tillload(){    
            loadanimchild.animate(rollright,{
                duration : 1300,
                easing : "ease-in-out"
            }) ;
            setTimeout(function(){
                        
                loadanimchild.animate(rollleft,{
                    duration : 1300,
                    easing : "ease-in-out"
                }) ;
            },1300) ;

            animating = setInterval(function(){
                loadanimchild.animate(rollright,{
                    duration : 1300,
                    easing : "ease-in-out"
                    }) ;
                    setTimeout(function(){
                        
                        loadanimchild.animate(rollleft,{
                            duration : 1300,
                            easing : "ease-in-out"
                        }) ;
                    },1300) ;
                    console.log("animating " ) ;

            },2600) ;
            loadanim.appendChild(loadanimchild) ;
        }
        function stopload(){
            clearInterval(animating) ;
        }
            
    
    
    
    

    
    





    
    class myelem{
    
        constructor(name,level){
            this.name = name ;
            this.level = level ;
        }
        greet(task_write){
            console.log("taskwrite = " + "1\n" + "2~\n" + task_write)
            var clele = document.createElement("div") ;
            var cleletask = document.createElement("div") ;
            var celebtdiv = document.createElement("div") ;
            var celebt = document.createElement("input") ;
            var testbutton = document.createElement("button") ;
            testbutton.innerText = "show" ;
            celebt.type = "checkbox" ;
            celebt.style["cursor"] = "pointer" ;
            //celebtdiv.innerText = "Check" ;
            var checkimg = document.createElement("img") ;
            checkimg.src = "./img/unchecked.png" ;
            checkimg.style["size"] = "50%" ;
            checkimg.setAttribute("class","checkimg") ;
            celebtdiv.append(checkimg) ;
            celebtdiv.style["fontSize"] = "15px" ;
            celebtdiv.style["color"] = "blue" ;
            celebtdiv.style["background"] = "darkorange" ;
            celebtdiv.style["borderRadius"] = "50%" ;
            
            celebtdiv.setAttribute("class","celebtdiv") ;
            celebt.setAttribute("class","celebt") ;
            var newtaskwrite = new String ;
            console.log("taskwrite length = " + task_write.length) ;
            var j=0;
            for(var i=0;i<task_write.length;i++)
            {
               if(task_write[i] == '~')
               {
                      j=i+1 ;
                for(j;j<task_write.length;j++)
                {
                     if(task_write[j]!='~')
                      {
                       newtaskwrite+=('\n');// + txtstr[j]) ;
                       i=j-1;
                       break ;
                      }
                     else
                       {
                         newtaskwrite+=task_write[j] ;
                       }
                }
              }
             else
               newtaskwrite+=task_write[i] ;

            }
            console.log("just seing the character " + task_write[5]) ;
            //console.log("tassk write replace = " + task_write.replace(/\n/g,"<br>")) ;
            //task_write = task_write.replace(/\n/g,"<br>") ;
            console.log("and now task write is " + newtaskwrite) ; 
            
            //cleletask.innerHTML = "<pre>" + task_write + "</pre>" ;
            //cleletask.innerHTML = task_write ;
            cleletask.innerHTML = newtaskwrite ;
            //cleletask.value = task_write ;
            
            
            clele.appendChild(cleletask) ;
            celebtdiv.appendChild(celebt) ;
            clele.appendChild(celebtdiv);
            clele.appendChild(testbutton) ;
            
            
            celebt.onclick = function(){
            if(celebt.checked == true )
            {
                //clele.append("checked");
                
                cleletask.innerHTML = cleletask.innerHTML.strike(cleletask.innerHTML) ;
                celebtdiv.style["background"] = "darksalmon" ;
                checkimg.animate([{
                    "opacity" : 1 ,
                    "scale" : 1
                },
                {
                    "opacity" : 0,
                    "scale" : 0

                }],{
                    duration:500,
                    easing : "ease-in-out"
                }) ;
                checkimg.style["opacity"] = 0 ;
                setTimeout(function(){
                    checkimg.src = "./img/check4.png" ;
                    checkimg.animate([{"opacity":0,
                     "scale":0},
                   {
                       "opacity" : 1,
                       "scale": 1

                   }],{
                       duration : 500,
                       easing : "ease-in-out"
                   });
                   checkimg.style["opacity"] = 1 ;
                },500) ;
                
            }
            else
            {
                //clele.append("notchecked") ;
                //clele.innerText = clele.innerText ;
                var formatstr = cleletask.innerHTML ;
                var tempstr = '' ;
                for(var i=8;i<formatstr.length-9;i++)
                   tempstr+=formatstr[i] ;
                
                cleletask.innerHTML = tempstr  ;
                celebtdiv.style["background"] = "darkorange" ;
                checkimg.animate([{
                    "opacity" : 1 ,
                    "scale" : 1
                },
                {
                    "opacity" : 0,
                    "scale" : 0

                }],{
                    duration:500,
                    easing : "ease-in-out"
                }) ;
                checkimg.style["opacity"] = 0 ;
                setTimeout(function(){
                    checkimg.src = "./img/unchecked.png" ;
                    checkimg.animate([{"opacity":0,
                     "scale":0},
                   {
                       "opacity" : 1,
                       "scale": 1

                   }],{
                       duration : 500,
                       easing : "ease-in-out"
                   });
                   checkimg.style["opacity"] = 1 ;
                },500) ;
            }
          }
          testbutton.onclick = function(){
              console.log("button pressed") ;
              var formatstr = cleletask.innerHTML ;
              var tempstr = formatstr.replace(/<br>/g,"\n") ;
                //for(var i=5;i<formatstr.length-6;i++)
                //   tempstr+=formatstr[i] ;
              showtext.innerHTML = tempstr ; //innerHTML.replace(/<br>/g,/\n/) ;
              //showtext.value = cleletask.value ;
          }
            return clele ;
            
        }
    
    
    
    }

    
    
    // creating all using class
    
    /*const hero1 = new myelem('Saswat',1) ;
    console.log(hero1) ;
    console.log(hero1.greet()) ;
    
    var newele = document.createElement("li") ;
    newele.append(hero1.greet("hello just yeah")) ;
    displaytask.appendChild(newele) ;
    */
    
    function deletechild(){
    
        
        var lastchild = displaytask.lastElementChild ;
        while(lastchild)
        {
            displaytask.removeChild(lastchild) ;
            lastchild = displaytask.lastElementChild ;
        }
        
    
    }
            
    var numids = [] ;
    var n_url = new XMLHttpRequest() ;
    //var loadanim = new tillload("alltask") ;
    
    n_url.open("GET", 'http://localhost:8000/gettasks' + "?cat=Newnotes"  , true ) ;
    alltask.appendChild(loadanim) ;
    tillload()
    n_url.onloadend = (e)=>{
    
        var lastchild = alltask.lastElementChild ;
        alltask.removeChild(lastchild) ;
        //clearInterval(animating) ;
        stopload();
        var t = n_url.response ;
        console.log("the data fetched is " + t) ;
        var n_t = t.split('|') ;
        console.log("after splitiing " + n_t) ;
        console.log("and the length is " + n_t.length) ;
        
    
        for(var i=0;i<n_t.length;i++)
        {
            var str = n_t[i] ;
            var num = 0, check=0, num_id=0 ;
           
            for(var j=5;j<str.length;j++)
            {
                if(str[j]=='"')
                {
                    check = 1 ;
                    num = j+11 ;
                    break ;
                }
                
            }
            num_id = parseInt(str.slice(5,num)) ;
            console.log("num_id is " + num_id) ;
            console.log("num is " + num ) ;
            var len = n_t[i].length ;
            str = str.slice(num,len-1) ;
            var bt = document.createElement("input") ;
            bt.type = "checkbox" ;
            //bt.innerText = "Delete" ;
            bt.id = "bt" + num_id ;
            const newtask = new myelem ;
            var task = document.createElement("li") ;
            task.id = "task" + num_id ;
           // task.innerText = str ;
            console.log("in gettask the string is \n" + str) ;
            task.append(newtask.greet(str)) ;
            task.appendChild(bt) ;
            displaytask.appendChild(task) ; 
            counttask = num_id ;
            numids.push(num_id) ;
        }
        console.log("nuid array is " + numids) ;
        counttask++ ;

        // category class and all its functions....
    /*class mynew{
        constructor(name)
        {
            this.name = name ;
        }
        
        greet(){
            var clele = document.createElement("div") ;
            var cleletask = document.createElement("div") ;
            var celebt = document.createElement("input") ;
            celebt.type = "checkbox" ;
            celebt.placeholder = "check the task " ;
            
            cleletask.innerText = this.name ;
            cleletask.style["fontSize"] = "20px" ;
            console.log("category innertext = " + cleletask.innerText) ;
            clele.appendChild(cleletask) ;
            clele.appendChild(celebt);
            
            
            celebt.onclick = function(){
            if(celebt.checked == true )
            {
                //clele.append("checked");
                deletechild() ;
                counttask = 0 ;
                 numids = [] ;
                 presentcategory = cleletask.innerText ;
                 console.log("presentcategory changed to " + cleletask.innerText) ;
                 n_url.open("GET", 'http://localhost:8000/gettasks' + "?cat=" + cleletask.innerText , true ) ;
                 alltask.appendChild(loadanim) ;
                 tillload();

    n_url.onloadend = (e)=>{
    
        var lastchild = alltask.lastElementChild ;
        alltask.removeChild(lastchild) ;
        stopload();
         t = n_url.response ;
        console.log("the data fetched is " + t) ;
         n_t = t.split('|') ;
        console.log("after splitiing " + n_t) ;
        console.log("and the length is " + n_t.length) ;
        
    
        for(var i=0;i<n_t.length;i++)
        {
            var str = n_t[i] ;
            var num = 0, check=0, num_id=0 ;
           
            for(var j=5;j<str.length;j++)
            {
                if(str[j]=='"')
                {
                    check = 1 ;
                    num = j+11 ;
                    break ;
                }
                
            }
            num_id = parseInt(str.slice(5,num)) ;
            console.log("num_id is " + num_id) ;
            console.log("num is " + num ) ;
             len = n_t[i].length ;
            str = str.slice(num,len-1) ;
             bt = document.createElement("input") ;
            bt.type = "checkbox" ;
            //bt.innerText = "Delete" ;
            bt.id = "bt" + num_id ;
            const newtask = new myelem ;
             task = document.createElement("li") ;
            task.id = "task" + num_id ;
           // task.innerText = str ;
            task.append(newtask.greet(str)) ;
            task.appendChild(bt) ;
            displaytask.appendChild(task) ; 
            counttask = num_id ;
            numids.push(num_id) ;
        }
        console.log("nuid array is " + numids) ;
        counttask++ ;
        
                
                
            }
            n_url.send() ;
    
    
    
        }
            else
            {
                //clele.append("notchecked") ;
                //clele.innerText = clele.innerText ;
                
                console.log("please select a category to show") ;
            }
          }
            return clele ;
        }
    }*/


    
    
        var categorieshttp = new XMLHttpRequest() ;
    categorieshttp.open("GET", 'http://localhost:8000/categories' , true) ;
    categorieshttp.onloadend = (e)=>{
    
        var t1 = categorieshttp.response ;
        console.log("the data fetched is " + t1) ;
        var n_t1 = t1.split('|') ;
        console.log("after splitiing " + n_t1) ;
        console.log("and the length is " + n_t1.length) ;
        for(var i=0;i<n_t1.length;i++)
        {
            var str = n_t1[i] ;
           
            for(var j=8;j<str.length;j++)
            {
                if(str[j]=='"')
                {
                    check = 1 ;
                    num = j+11 ;
                    break ;
                }
                
            }
           
            var len = n_t1[i].length ;
            str = str.slice(7,len-1) ;
            const displayquerycategory = new mynew(str) ;
            var dispcat = document.createElement("li") ;
            dispcat.append(displayquerycategory.greet()) ;
            dispcat.id = "cat" ;
            
            displaycategories.appendChild(dispcat) ;
          
           
            
        }
        
    
    
    };
    categorieshttp.send() ;
    
    
    
        
        
    
        //console.log(n_url.response) ;
    };
    n_url.send() ;
    
    // display the categories ......
    /* var categorieshttp = new XMLHttpRequest() ;
    categorieshttp.open("GET", 'http://localhost:8000/categories' , true) ;
    categorieshttp.onloadend = (e)=>{
    
        var t = n_url.response ;
        console.log("the data fetched is " + t) ;
        var n_t = t.split('|') ;
        console.log("after splitiing " + n_t) ;
        console.log("and the length is " + n_t.length) ;
        for(var i=0;i<n_t.length;i++)
        {
            var str = n_t[i] ;
            var num = 0, check=0, num_id=0 ;
           
            for(var j=5;j<str.length;j++)
            {
                if(str[j]=='"')
                {
                    check = 1 ;
                    num = j+11 ;
                    break ;
                }
                
            }
           
            var len = n_t[i].length ;
            str = str.slice(num,len-1) ;
            var dispcat = document.createElement("li") ;
            dispcat.id = "cat" ;
            dispcat.innerText = "just testing" + str ;
            displaycategories.appendChild(dispcat) ;
          
           
            
        }
        
    
    
    };
    categorieshttp.send() ; */
    
    
    
    
        // add to the task view......
        
        submitbt.onclick = function(){

            if(text.value.length > 0)
            {
                var submitstring = text.value ;
                var temsubstring = new String ; 
                //temsubstring = submitstring ;
                for(var i=0;i<submitstring.length ;i++)
                {
                    
                    if(submitstring[i] == '\n')
                     temsubstring+="~" ;
                    else
                     temsubstring+=submitstring[i] ; 
                }
                console.log("tempsubstring is \n" + temsubstring) ;
            console.log("submit button clicked and task being added is " + text.value) ;
            console.log("task hence aded in string form is " + submitstring + "\nthe length of the string hence is " + submitstring.length) ;
            console.log("upon addition of abcd the length changesto = " + ("abcd" + submitstring).length ) ;
            
            submitstring = "http://localhost:8000/newToDo" + "?task=" + temsubstring + "&id=" + counttask + "&cat=" + presentcategory ;
            console.log("upon changing the submit string i have = \n" + submitstring) ;
            var addli = new XMLHttpRequest() ;
            var bt = document.createElement("input") ;
            bt.type = "checkbox" ;
            //bt.innerText = "Delete" ;
            addli.open("POST", submitstring , true ) ;
            //addli.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") ;
            addli.send() ;  
            var newtask = new myelem ;
            var task = document.createElement("li") ;
            task.id = "task" + counttask ;
            //task.innerText = text.value ;
            task.append(newtask.greet(text.value)) ;
            console.log(task.innerText) ;
            bt.id = "bt" + counttask  ;
            //bt.onclick = deletetask(bt.id) ;
            task.appendChild(bt) ;
            task.style["visibility"] = "hidden" ;
            
            displaytask.appendChild(task) ;
            task.animate(fade,{
                easing : 'ease-in-out',
                duration : 1300
            });
            task.style["visibility"] = "visible" ;
             
            numids.push(counttask) ;
            counttask++ ;
        } 
    
        }
      
        
    
    
        // deleting tasks ......
    
        deletetasks.onclick = function(){
    
            for(var i=0;i<numids.length;i++)
            {
                if(numids[i]!=-1)
                if(document.getElementById('bt'+numids[i]))
                if(document.getElementById('bt'+numids[i]).checked == true )
                {
                    console.log("the " + numids[i] + " checkbox is checked" ) ;
                    var addli = new XMLHttpRequest() ;
                    displaytask.removeChild(document.getElementById('task'+numids[i])) ;
                    
                    addli.open("POST", 'http://localhost:8000/deleteToDo' + '?id=' + numids[i] + "&cat=" + presentcategory , true ) ;
                    addli.send() ;
                    numids[i] = -1 ;
            
                }
                
    
            }
            console.log("deleting in " + presentcategory) ;
            var addli = new XMLHttpRequest() ;
                addli.open("GET", 'http://localhost:8000/getnumlast' + "?cat=" + presentcategory, true ) ;
                addli.onloadend = function(){
                    counttask = parseInt(addli.response) ;
                    console.log("after deleting counttask is " + counttask) ;
                    console.log("and numid array is " + numids ) ;
                    counttask = counttask + 1 ;
                }
                addli.send() ;
    
    
        }
    
    
    
    
    
    
    }