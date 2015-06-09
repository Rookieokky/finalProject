var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/' , function (request , response ) {

    response.sendfile( __dirname + "/views/index.html");

});



app.post('/compilecode' , function (request , response ) {
    
    var code = request.body.code;   
    var input = request.body.input;
    var inputRadio = request.body.inputRadio;
    var lang = request.body.lang;
    if((lang === "C") || (lang === "C++"))
    {        
        if(inputRadio === "true")
        {    
            var envData = { OS : "Mac" , cmd : "gcc"};      
            compiler.compileCPPWithInput(envData , code ,input , function (data) {
                if(data.error)
                {
                    response.send(data.error);          
                }
                else
                {
                    response.send(data.output);
                }
            });
       }
       else
       {
        
        var envData = { OS : "Mac" , cmd : "gcc"};     
            compiler.compileCPP(envData , code , function (data) {
            if(data.error)
            {
                response.send(data.error);
            }       
            else
            {
                response.send(data.output);
            }
    
            });
       }
    }
    if(lang === "Java")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "Mac" , cmd: "javac"};     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , function(data){
                response.send(data);
            });
        }
        else
        {
            var envData = { OS : "Mac" };     
            console.log(code);
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
                response.send(data);
            });

        }

    }
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "Mac"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                response.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compilePython(envData , code , function(data){
                response.send(data);
            });
        }
    }
    if( lang === "CS")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileCSWithInput(envData , code , input , function(data){
                response.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileCS(envData , code , function(data){
                response.send(data);
            });
        }

    }
    if( lang === "VB")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compileVBWithInput(envData , code , input , function(data){
                response.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compileVB(envData , code , function(data){
                response.send(data);
            });
        }

    }

});

app.get('/fullStat' , function(request , response ){
    compiler.fullStat(function(data){
        response.send(data);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
