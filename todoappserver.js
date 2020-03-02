var http = require('http') ;
var url = require('url') ;
var fs = require('fs') ;
var path = require('path') ;
const mongo = require('mongodb') ;
//const rp = require('request-promise') ;

var n_url ;
//var n_url = "mongodb://localhost:27017" ;
//const n_url = "mongodb://localhost:27017" ;
//const n_url = "mongodb+srv://deadpool1999:123sanu@yes@cluster-0-deadpool1999-hvcqg.mongodb.net/test?retryWrites=true&w=majority"
var db ;
var status_connect = false ;

///////////get the username and password//////////////////////
function getenv(req,res)
{
    return new Promise(resolove =>{
         var username = req.body.username ;
         var password = req.body.password ;
         if(username && password)
         {
           console.log("in async and username and password are - " + username + password) ;
           resolove("done async") ;
         } 
    })
  


}
async function setenv(req,res){
  const justwait = await getenv(req,res) ;
  n_url = "mongodb://localhost:27017" ;
  return justwait ;
}

function justcheck(req,res){
  console.log(req.password) ;
}

///////////readfile function////////////////
function ReadFile(req,res)
{
  var filePath = './' + req.url.toString().substring(1) ;
  console.log("new filepath is " + filePath) ;

  var extname = String(path.extname(filePath)).toLowerCase() ;
  var mimeTypes = {
      '.html' : 'text/html',
      '.js' : 'text/javascript' ,
      '.css' : 'text/css' ,
      '.json' : 'application/json' ,
      '.png' : 'image/png' ,
      '.jpg' : 'image/jpg' ,
      '.gif' : 'image/gif' ,
      '.svg' : 'image/svg+xml' ,
      '.wav' : 'audio/wav' ,
      '.mp4' : 'video/mp4' ,
      '.woff' :'application/font-woff' ,
      '.ttf' : 'application/font-ttf' ,
      '.eot' : 'application/vnd.ms-fontobject' ,
      'otf' : 'application/font-otf' ,
      '.wasm' : 'application/wasm'
  };

  var contentType = mimeTypes[extname] || 'application/octet-stream' ;


  fs.readFile(filePath,function(err,content){
        res.writeHead(200,{ 'Content-Type' : contentType }) ;
        res.end(content,'utf-8') ;
        /*var result = {
          'contentType' : contentType,
          'content' : content
        }
        console.log("in ReadFile") ;
        console.log("result = " + result) ;
        return result ;*/
  })
}


///////////////MONGO-CONNECT FUNCTION///////////////////////
function mymongo()
{
   return new Promise(resolve=>{
    console.log("-----------~~~~~~~~~~~~~~~~~~~~IN MYMONGO()~~~~~~~~~~~~~~~~~-------------------------") ;
    mongo.connect(n_url, {useNewUrlParser: true}, (err,database)=>{
      if(err)
       {
           console.log(err) ;
           process.exit(0) ;
       }
       
       else 
         {db = database ;console.log("database connected") ;
         
   
         var dbo = db.db('Notes') ;
         console.log('database connected!') ;
         
         
         //var collection = dbo.collection('Newnotes') ;
         

         resolve("database connected") ;status_connect = true ;}
      });
      
  }) 
}
async function mymongoconnect(req,res)
{
  if(!status_connect)
  {
    await mymongo() ;
    dboperations(req,res) ;
    status_connect = true ;
    console.log("awaited") ;
  }
  else
  {
    dboperations(req,res) ;
  }
  
  
}


/////////////////DB-OPERATIONS////////////////////////

function dboperations(req,res)
{
  var n = req.url.toString() ;
  console.log("-----------~~~~~~~~~~~~~~~~~~~~IN DBOPERATIONS()~~~~~~~~~~~~~~~~~-------------------------") ;
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~##########AND STATUS_CONNECT = " + status_connect ) ;
  //console.log("n = " + n) ;
  var hash = "newToDo" ;
  var hash1 = "gettasks" ;
  var hashdelete = "deleteToDo" ;
  var hashgetnum = "getnumlast" ;
  var hashnewcat = "category" ;
  var hashcategory = "categories" ;
  var delcat = "make?name" ;
  
    if(n.match(hash1))
  {

     var q = url.parse(req.url,true).query ;
     var cat = q.cat ;
      var dbo = db.db('Notes') ;
      console.log('database connected!') ;
      
      
      //var collection = dbo.collection('Newnotes') ;
      var collection = dbo.collection(cat) ;
      collection.find( {}).project( {name  : 1, id : 1, _id:0 } ).toArray( (err,results)=> {
      //collection.find( (err,results)=>{  

          if(results.length == 0 )
          {
            res.end() ;
          }
          if(err)
          {
              console.log(err) ;
              process.exit(0) ;
          }
          console.log(results) ;
          var t = "" ;
          
          for(var i=0;i<results.length;i++)
          {

            var nma = JSON.stringify(results[i]) ;
            
            var len = nma.length ;
            console.log(nma + '\n') ;
            nma = nma.slice(2,len-1) ;
            
            t = t + nma  ;
            if(i<results.length-1)
              t = t + "|" ;

          }
          console.log(t) ; 
          //db.close() ;
           //res.writeHead(200,{ 'Content-Type' : 'plain/text' }) ;
          //res.write(t);
          return res.end(t,'utf-8') ;

          
         
          
      } );
  }
  else if( n.match(hash) )
  {
    var q = url.parse(req.url,true).query ;
    var txt = q.task ;
    var num = q.id ;
    var cat = q.cat ;

    var txtstr = new String ;
    txtstr = txt ;
    var j=0 ;
    console.log('task aded is ' + txtstr ) ;
    

      var dbo = db.db('Notes') ;
      var collection = dbo.collection(cat) ;
      let data = [
        {
          "id":num ,
          "name" : " " + txtstr  
        }
      ];
      collection.insertMany(data, (err,result)=>{
        if(err)
        {
          console.log(err) ;
          process.exit(0) ;
        }

        console.log(result) ;
      }  );

      //db.close() ;
      //open('http://localhost:8000/index.html') ;
      res.end() ;
      

    //} );
    
    
  }
  else if( n.match(hashdelete) )
  {
    var q = url.parse(req.url,true).query ;
    var num = q.id ;
    var cat = q.cat ;
    console.log('task deleted is ' + num ) ;
   

      var dbo = db.db('Notes') ;
      var collection = dbo.collection(cat) ;
      
      var myquery = { id:num };

      
     
      collection.deleteOne(myquery, (err,result)=>{
        if(err)
        {
          console.log(err) ;
          process.exit(0) ;
        }
        console.log(result.result.n + "number of data deleted ") ;
        //db.close() ;

        //console.log(result) ;
      }  );

      
      //open('http://localhost:8000/index.html') ;
      res.end() ;
      

    //} );
    
    
  }
  else if( n.match(hashgetnum) )
  {
    
    var q = url.parse(req.url,true).query ;
     var cat = q.cat ;
      var dbo = db.db('Notes') ;
      var collection = dbo.collection(cat) ;
     
      collection.find({}).project({id:1,_id:0}).toArray( (err,result)=>{
        if(result.length == 0)
        {
          return res.end("0") ;
        }
        if(err)
        {
          console.log(err) ;
          process.exit(0) ;
        }
        var len = result.length ;
        
        console.log("the last num_id is " + JSON.stringify(result[len-1])) ;
        var str = JSON.stringify(result[len-1]) ;
        
        str = str.slice(7,str.length-2) ;
        console.log("num  = " + str) ;
        //db.close() ;
        //res.end(num) ;
        //res.write(num) ;
        res.end(str) ;
        //console.log(result) ;
      }  );

      
      //open('http://localhost:8000/index.html') ;
      
      

   // } );
    
    
  }
  // New Category ... .... .... 
  
  
  else if (url.parse(req.url,true).query.make == "category")
  {
    console.log("hashnewcat") ;
    var q = url.parse(req.url,true).query ;
    var newcat = q.name ;
    console.log("newcat is "+newcat) ;
     var dbo = db.db('Notes') ;
     var collection = dbo.collection('collections') ;
     collection.find({'name':newcat}).toArray((err,result)=>{
       if(err)
       {
         console.log(err) ;
       }
       else{
         console.log("in else ") ;
         if(result.length == 0)
         {
          console.log("creating new collection") ;
          dbo.createCollection(newcat, (err,result)=>{
  
            if(err)
            {
              console.log(err);
              //process.exit(0) ;
            }
            console.log('collection created' + newcat) ;
    
    
          } );
    
          let data = [
            {
              'name' : newcat
            }
          ];
    
          collection.insertMany(data,(err,result)=>{
    
            if(err)
              console.log(err) ;
            else
              console.log(result) ;   
          });


         }
         



       }
     });
    

  }  
  // dispaly all the categories ....
  else if (n.match(hashcategory))
  {

    var dbo = db.db('Notes') ;
      console.log('~~~~~~~~~~~~~~~~~~~~~~`http display categories~~~~~~~~~~~~~~~~~~~~~~~~') ;
      
      
      var collection = dbo.collection('collections') ;
      collection.find( {}).project( {name  : 1, _id:0 } ).toArray( (err,results)=> {
      //collection.find( (err,results)=>{  

          if(results.length == 0 )
          {
            res.end() ;
          }
          if(err)
          {
              console.log(err) ;
              process.exit(0) ;
          }
          console.log(results) ;
          var t = "" ;
          
          for(var i=0;i<results.length;i++)
          {

            var nma = JSON.stringify(results[i]) ;
           
            var len = nma.length ;
            console.log(nma + '\n') ;
            nma = nma.slice(2,len-1) ;
            
            t = t + nma  ;
            if(i<results.length-1)
              t = t + "|" ;

          }
          console.log(t) ; 
          //db.close() ;
           //res.writeHead(200,{ 'Content-Type' : 'plain/text' }) ;
          //res.write(t);
          return res.end(t,'utf-8') ;

          
         
          
      } );






  }
else if( url.parse(req.url,true).query.make == "delcat" )
{
  console.log("in delcat") ;
  var q = url.parse(req.url,true).query ;
  var todel = q.name ;
  var dbo = db.db("Notes") ;
  console.log('database connected!') ;
  var collection = dbo.collection('collections') ;
  var myquery = { name:todel };
  collection.deleteOne(myquery, (err,result)=>{
    if(err)
      {
        console.log(err) ;
        process.exit(0) ;
      }
      console.log(result.result.n + "number of data deleted ") ;
      //db.close() ;
      }
  );
  dbo.collection("todel").drop(function(err,ok){
     
     if(ok) collection.log("collection deleted") ;
     
  });
  res.end() ;
}  
else if(url.parse(req.url,true).query.make == "edit")
{
   console.log("in edit ") ;
   var q = url.parse(req.url,true).query ;
   var query = q.id ;
   var myquery = {id:q.id} ;
   var newdata = { $set: {name : " " + q.task} } ;
   console.log("task edited is - " + q.task) ;
   var cat = q.cat ;
   var dbo = db.db("Notes") ;
   var collection = dbo.collection(cat) ;
   collection.updateOne(myquery,newdata,function(err,res){if(err)console.log(err) ; }) ;
}
  



else
{

  ReadFile(req,res) ;

}


}















////////////////////////////////////////////////////////////////

////////////CONNECTING TO THE DATABASE///////////////////////////
//mymongo();
//mymongoconnect() ;
/////////////////////////////////////////////////////////////////

http.createServer(function(req,res){

 
     //.catch(console.log("password = " + req.body.password)) ;


  //if(req.url.toString().substring(1) == "newToDo" )

  
  
  var n = req.url.toString() ;
  console.log("n = " + n) ;
  var hash = "newToDo" ;
  var hash1 = "gettasks" ;
  var hashdelete = "deleteToDo" ;
  var hashgetnum = "getnumlast" ;
  var hashnewcat = "category" ;
  var hashcategory = "categories" ;
  var delcat = "make?name" ;
  

  //mymongo(req,res) ;
  if(n.match("connectionstring"))
  {
      var q = "" ;
      for(var i=0;i<n.length;i++)
      {
        
        if(n[i]==`%`)
        {
          
          for(var j=i+3;j<n.length;j++)
            q= q + n[j] ;

          break ;  
        }
      }
      console.log("IN CONNECTION STRING AND NAME = " + q) ;
      n_url = q ;
     // var check_connection = mymongoconnect() ;
      //mymongoconnect(req,res) ;
      //mymongo(req,res) ;
      
      
  }
  if(n_url)
    { console.log("yes n-url = " + n_url) ;
      mymongoconnect(req,res) ;
      //if(status_connect)
      //dboperations(req,res) ;
      //else
      //ReadFile(req,res) ;
    }
  else
  {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~SORRRY ESTABLISH A CONNECTION FIRST~~~~~~~~~~~~~~~~~~~~~~~~~") ;
    ReadFile(req,res) ;
  }  
  
  





/////////////////////////////////resticted line //////////////////////////































//   mongo.connect(n_url, {useNewUrlParser: true}, (err,db)=>{
//     if(err)
//     {
//         console.log(err) ;
//         process.exit(0) ;
//     }
//   if(n.match(hash1))
//   {

//      var q = url.parse(req.url,true).query ;
//      var cat = q.cat ;
//       var dbo = db.db('Notes') ;
//       console.log('database connected!') ;
      
      
//       //var collection = dbo.collection('Newnotes') ;
//       var collection = dbo.collection(cat) ;
//       collection.find( {}).project( {name  : 1, id : 1, _id:0 } ).toArray( (err,results)=> {
//       //collection.find( (err,results)=>{  

//           if(results.length == 0 )
//           {
//             res.end() ;
//           }
//           if(err)
//           {
//               console.log(err) ;
//               process.exit(0) ;
//           }
//           console.log(results) ;
//           var t = "" ;
          
//           for(var i=0;i<results.length;i++)
//           {

//             var nma = JSON.stringify(results[i]) ;
            
//             var len = nma.length ;
//             console.log(nma + '\n') ;
//             nma = nma.slice(2,len-1) ;
            
//             t = t + nma  ;
//             if(i<results.length-1)
//               t = t + "|" ;

//           }
//           console.log(t) ; 
//           db.close() ;
//            //res.writeHead(200,{ 'Content-Type' : 'plain/text' }) ;
//           //res.write(t);
//           return res.end(t,'utf-8') ;

          
         
          
//       } );
//   }
//   else if( n.match(hash) )
//   {
//     var q = url.parse(req.url,true).query ;
//     var txt = q.task ;
//     var num = q.id ;
//     var cat = q.cat ;

//     var txtstr = new String ;
//     txtstr = txt ;
//     var j=0 ;
//     console.log('task aded is ' + txtstr ) ;
    

//       var dbo = db.db('Notes') ;
//       var collection = dbo.collection(cat) ;
//       let data = [
//         {
//           "id":num ,
//           "name" : " " + txtstr  
//         }
//       ];
//       collection.insertMany(data, (err,result)=>{
//         if(err)
//         {
//           console.log(err) ;
//           process.exit(0) ;
//         }

//         console.log(result) ;
//       }  );

//       db.close() ;
//       //open('http://localhost:8000/index.html') ;
//       res.end() ;
      

//     //} );
    
    
//   }
//   else if( n.match(hashdelete) )
//   {
//     var q = url.parse(req.url,true).query ;
//     var num = q.id ;
//     var cat = q.cat ;
//     console.log('task deleted is ' + num ) ;
   

//       var dbo = db.db('Notes') ;
//       var collection = dbo.collection(cat) ;
      
//       var myquery = { id:num };

      
     
//       collection.deleteOne(myquery, (err,result)=>{
//         if(err)
//         {
//           console.log(err) ;
//           process.exit(0) ;
//         }
//         console.log(result.result.n + "number of data deleted ") ;
//         db.close() ;

//         //console.log(result) ;
//       }  );

      
//       //open('http://localhost:8000/index.html') ;
//       res.end() ;
      

//     //} );
    
    
//   }
//   else if( n.match(hashgetnum) )
//   {
    
//     var q = url.parse(req.url,true).query ;
//      var cat = q.cat ;
//       var dbo = db.db('Notes') ;
//       var collection = dbo.collection(cat) ;
     
//       collection.find({}).project({id:1,_id:0}).toArray( (err,result)=>{
//         if(result.length == 0)
//         {
//           return res.end("0") ;
//         }
//         if(err)
//         {
//           console.log(err) ;
//           process.exit(0) ;
//         }
//         var len = result.length ;
        
//         console.log("the last num_id is " + JSON.stringify(result[len-1])) ;
//         var str = JSON.stringify(result[len-1]) ;
        
//         str = str.slice(7,str.length-2) ;
//         console.log("num  = " + str) ;
//         db.close() ;
//         //res.end(num) ;
//         //res.write(num) ;
//         res.end(str) ;
//         //console.log(result) ;
//       }  );

      
//       //open('http://localhost:8000/index.html') ;
      
      

//    // } );
    
    
//   }
//   // New Category ... .... .... 
  
  
//   else if (url.parse(req.url,true).query.make == "category")
//   {
//     console.log("hashnewcat") ;
//     var q = url.parse(req.url,true).query ;
//     var newcat = q.name ;
//     console.log("newcat is "+newcat) ;
//      var dbo = db.db('Notes') ;
//      var collection = dbo.collection('collections') ;
//      collection.find({'name':newcat}).toArray((err,result)=>{
//        if(err)
//        {
//          console.log(err) ;
//        }
//        else{
//          console.log("in else ") ;
//          if(result.length == 0)
//          {
//           console.log("creating new collection") ;
//           dbo.createCollection(newcat, (err,result)=>{
  
//             if(err)
//             {
//               console.log(err);
//               //process.exit(0) ;
//             }
//             console.log('collection created' + newcat) ;
    
    
//           } );
    
//           let data = [
//             {
//               'name' : newcat
//             }
//           ];
    
//           collection.insertMany(data,(err,result)=>{
    
//             if(err)
//               console.log(err) ;
//             else
//               console.log(result) ;   
//           });


//          }
         



//        }
//      });
    

//   }  
//   // dispaly all the categories ....
//   else if (n.match(hashcategory))
//   {

//     var dbo = db.db('Notes') ;
//       console.log('~~~~~~~~~~~~~~~~~~~~~~`http display categories~~~~~~~~~~~~~~~~~~~~~~~~') ;
      
      
//       var collection = dbo.collection('collections') ;
//       collection.find( {}).project( {name  : 1, _id:0 } ).toArray( (err,results)=> {
//       //collection.find( (err,results)=>{  

//           if(results.length == 0 )
//           {
//             res.end() ;
//           }
//           if(err)
//           {
//               console.log(err) ;
//               process.exit(0) ;
//           }
//           console.log(results) ;
//           var t = "" ;
          
//           for(var i=0;i<results.length;i++)
//           {

//             var nma = JSON.stringify(results[i]) ;
           
//             var len = nma.length ;
//             console.log(nma + '\n') ;
//             nma = nma.slice(2,len-1) ;
            
//             t = t + nma  ;
//             if(i<results.length-1)
//               t = t + "|" ;

//           }
//           console.log(t) ; 
//           db.close() ;
//            //res.writeHead(200,{ 'Content-Type' : 'plain/text' }) ;
//           //res.write(t);
//           return res.end(t,'utf-8') ;

          
         
          
//       } );






//   }
// else if( url.parse(req.url,true).query.make == "delcat" )
// {
//   console.log("in delcat") ;
//   var q = url.parse(req.url,true).query ;
//   var todel = q.name ;
//   var dbo = db.db("Notes") ;
//   console.log('database connected!') ;
//   var collection = dbo.collection('collections') ;
//   var myquery = { name:todel };
//   collection.deleteOne(myquery, (err,result)=>{
//     if(err)
//       {
//         console.log(err) ;
//         process.exit(0) ;
//       }
//       console.log(result.result.n + "number of data deleted ") ;
//       //db.close() ;
//       }
//   );
//   dbo.collection("todel").drop(function(err,ok){
     
//      if(ok) collection.log("collection deleted") ;
//      db.close() ;
//   });
//   res.end() ;
// }  
// else if(url.parse(req.url,true).query.make == "edit")
// {
//    console.log("in edit ") ;
//    var q = url.parse(req.url,true).query ;
//    var query = q.id ;
//    var myquery = {id:q.id} ;
//    var newdata = { $set: {name : " " + q.task} } ;
//    console.log("task edited is - " + q.task) ;
//    var cat = q.cat ;
//    var dbo = db.db("Notes") ;
//    var collection = dbo.collection(cat) ;
//    collection.updateOne(myquery,newdata,function(err,res){if(err)console.log(err) ; }) ;
// }
  



// else
// {

//   ReadFile(req,res) ;
//   //console.log("toarr = " + toarr) ;
//   //res.writeHead(200,{ 'Content-Type' : toarr['ContentType'] }) ;
//   //      res.end(toarr['content'],'utf-8') ;
  
//   /*var filePath = './' + req.url.toString().substring(1) ;
//   console.log("new filepath is " + filePath) ;

//   var extname = String(path.extname(filePath)).toLowerCase() ;
//   var mimeTypes = {
//       '.html' : 'text/html',
//       '.js' : 'text/javascript' ,
//       '.css' : 'text/css' ,
//       '.json' : 'application/json' ,
//       '.png' : 'image/png' ,
//       '.jpg' : 'image/jpg' ,
//       '.gif' : 'image/gif' ,
//       '.svg' : 'image/svg+xml' ,
//       '.wav' : 'audio/wav' ,
//       '.mp4' : 'video/mp4' ,
//       '.woff' :'application/font-woff' ,
//       '.ttf' : 'application/font-ttf' ,
//       '.eot' : 'application/vnd.ms-fontobject' ,
//       'otf' : 'application/font-otf' ,
//       '.wasm' : 'application/wasm'
//   };

//   var contentType = mimeTypes[extname] || 'application/octet-stream' ;

//   fs.readFile(filePath,function(err,content){
//         res.writeHead(200,{ 'Content-Type' : contentType }) ;
//         res.end(content,'utf-8') ;
//   })*/
// }

// });// monog.connect

    



}).listen(8000) ;

      






        
 