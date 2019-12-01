var http = require('http') ;
var url = require('url') ;
var fs = require('fs') ;
var path = require('path') ;
const mongo = require('mongodb') ;
const n_url = "mongodb://localhost:27017" ;
http.createServer(function(req,res){

  


  //if(req.url.toString().substring(1) == "newToDo" )

  var n = req.url.toString() ;
  var hash = "newToDo" ;
  var hash1 = "gettasks" ;
  var hashdelete = "deleteToDo" ;
  var hashgetnum = "getnumlast" ;
  var hashnewcat = "category" ;
  var hashcategory = "categories" ;

  mongo.connect(n_url, {useNewUrlParser: true}, (err,db)=>{
    if(err)
    {
        console.log(err) ;
        process.exit(0) ;
    }
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
          db.close() ;
           //res.writeHead(200,{ 'Content-Type' : 'plain/text' }) ;
          //res.write(t);
          return res.end(t,'utf-8') ;

          
         
          
      } );
  
      
  
  //}  );

  // just testing .......
  /*var t = "just testing" ;
  
  res.writeHead(200, { 'Content-Type' : 'text/plain' }) ;
  res.write(t) ;
  res.end() ;*/
  //res.end(t,'plain/text') ;
  



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
    /*for(var i=0;i<txt.length;i++)
    {
        if(txt[i] == '~')
        {
          j=i+1 ;
          for(j;j<txt.length;j++)
          {
            if(txt[j]!='~')
            {
               txtstr+=('\n');// + txtstr[j]) ;
               i=j-1;
               break ;
            }
            else
            {
              txtstr+=txt[j] ;
            }
          }
            
          
        }
        else
          txtstr+=txt[i] ;

    }*/

    console.log('task aded is ' + txtstr ) ;
    

      var dbo = db.db('Notes') ;
      var collection = dbo.collection(cat) ;
      /*collection.find( (err,result)=>{

        if(err)
        {

          dbo.createCollection('ToDoList', (err,result)=>{

            if(err)
            {
              console.log(err);
              process.exit(0) ;
            }
            console.log('collection created') ;
    
    
          } );


        }
      } );*/


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

      db.close() ;
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
        db.close() ;

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
        db.close() ;
        //res.end(num) ;
        //res.write(num) ;
        res.end(str) ;
        //console.log(result) ;
      }  );

      
      //open('http://localhost:8000/index.html') ;
      
      

   // } );
    
    
  }
  // New Category ... .... .... 
  
  
  else if (n.match(hashnewcat))
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
              process.exit(0) ;
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
      console.log('database connected!') ;
      
      
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
          db.close() ;
           //res.writeHead(200,{ 'Content-Type' : 'plain/text' }) ;
          //res.write(t);
          return res.end(t,'utf-8') ;

          
         
          
      } );






  }
  



else
{
  var filePath = './' + req.url.toString().substring(1) ;
  //console.log(filePath) ;
  
  //var ff = filePath.split("%20") ;
  //filePath.join("%20") ;
//   console.log("ff is " + ff) ;
//   if(ff.length>1)
//   {filePath = "" ;
//   for( var i=0;i<ff.length;i++)
//   {
//     filePath = filePath + ff[i] + " " ;
//   }
//  }
 // filePath = ff.toString() ;

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
    
    //if(err) throw err ;
    //else
     // {
        res.writeHead(200,{ 'Content-Type' : contentType }) ;
        res.end(content,'utf-8') ;
      //}

    
  })


 // console.log(req.url.toString().substring(1)) ;
  // if( /^\/[a-zA-Z0-9\/]*.js$/.test(req.url.toString()) )
  // {
  //   sendFileContent(res,req.url.toString().substring(1), "text" ) ;
  //   console.log(req.url.toString().substring(1)) ;
  // }
 
}

});
}).listen(8000) ;

      






        
 
