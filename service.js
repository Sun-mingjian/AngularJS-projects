myApp.factory('search',function(){
    var songLists=[];
    var albumsLists=[];
    var songNum = 0;
    var albumNum = 0
    return{
        songSearch:function(results,key){
            for(var a=0;a<results.albumList.length;a++){                    for(var b=0;b<results.albumList[a].songList.length;b++){
                    var title = results.albumList[a].songList[b].title;
                    if(title.indexOf(key)>-1){
                        var song = results.albumList[a].songList[b];
                        var songBean = {};
                        songBean.title = title;
                        songBean.artist = song.artist;
                        songBean.price = song.price;
                        songBean.albumTitle = results.albumList[a].title;
                        songBean.year = results.albumList[a].year;
                        songBean.albumGenre = results.albumList[a].genre;
                        songBean.albumPublisher = results.albumList[a].publisher;
                        songBean.index = songNum;
                        songBean.type = "SONG";
                        songBean.albumID = song.albumID;
                        songNum++;
                        songLists.push(songBean);
                    }
                    
                }
               }
            return songLists;
            
            
        },
        albumSearch:function(results,key){
            for(var a=0;a<results.albumList.length;a++){
                var name = results.albumList[a].title;
                if(name.indexOf(key)>-1){
                    var album = results.albumList[a];
                    var albumBean={};
                    albumBean.albumTitle = album.title;
                    albumBean.albumArtist = album.artist;
                    albumBean.albumGenre = album.genre;
                    albumBean.albumPublisher = album.publisher;
                    albumBean.year = album.year;
                    albumBean.price = album.price;
                    albumBean.index = albumNum;
                    albumBean.type = "ALBUM";
                    albumBean.id = album.ID;
                    albumNum++;
                    albumsLists.push(albumBean);
                    
                }
            }
            return albumsLists;
        }
    }
          
});


myApp.factory('updateSelection',function(){
    return{
        update:function(currentSelection,selection){
         
                var found = false;
                var includedSong = [];
                if(selection.length==0){
                    selection = angular.copy(currentSelection)
                    return selection;
                }
            
            for(var b=0;b<currentSelection.length;b++){
                var item = currentSelection[b];
                for(var a=0;a<selection.length;a++){
                    console.log("current title is "+selection[a].title);
                    if(selection[a].type =="SONG" && item.type=="SONG"&&selection[a].title==item.title){
                        found=true;
                        
                    }
                    if(selection[a].type =="ALBUM" && item.type=="ALBUM"&&selection[a].albumTitle==item.albumTitle){
                        found=true;
                        
                    }
                    //if this item is an song but included in the chosen album;
                    if(selection[a].type =="ALBUM" && item.type=="SONG"){
                        if(item.albumID == selection[a].id){
                            console.log("song included");
                            found=true;
                            break;
                        }
                            
                        
                    }
                    //item is a album selection[a] is a song
                    if(selection[a].type =="SONG" && item.type=="ALBUM"){
                        console.log("album included");
                        item.id == selection[a].albumID;
                        includedSong.push(a);
                        console.log("add is "+a);
                        found=true;
                    }
                }
                
                console.log("current found is "+found);
                if(found){
                    found = false;
                    if(includedSong.length>0){
                        for(var c=includedSong.length-1;c>=0;c--){
                           
                            selection.splice(includedSong[c],1);
                        }
                        selection.push(item);
                    }
                   
                    
                }
                else{
                    found=false;
                    selection.push(item);
                   
                }
            }
             return selection;
        }
    }
});

myApp.factory('recordCheckBox',function(){
    return{
        count:function(item,selection,chosen){
                var idx = selection.indexOf(item);
                    // is currently selected
                    if (idx > -1) {
                        console.log("Duplicated and delete");
                        selection.splice(idx, 1);
                    }
                    // is newly selected
                    else {
                        //console.log("new"+item.title);
                        console.log("Not Dup and add");
                        selection.push(item);
                    //shareData.setSelection($scope.selection);
                        //sconsole.log($scope.selection);
                    }
                return selection;
            
        }
    }
});
              
              


myApp.factory('shareData',function($window){
   
    var KEY = 'App.SelectedValue';
    var Data = {item:"",choice:""};
    var KEY2 = 'result';
    var KEY3 = 'Selection';
    var KEY4 = 'final';
    return{
        store: function(item,choice){
                
            Data.item=item;
            Data.choice = choice;
            
            var mydata = $window.sessionStorage.getItem(KEY);
            mydata=Data;
            $window.sessionStorage.setItem(KEY,angular.toJson(mydata));
                                           
        },
            
        
        get: function(){
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
            //return Data.item;
        },
        
        setResult :function(Data){
            var mydata = $window.sessionStorage.getItem(KEY2);
            mydata = Data;
            $window.sessionStorage.setItem(KEY2,angular.toJson(mydata));

        },
        
        getResult :function(){
            var mydata = $window.sessionStorage.getItem(KEY2);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        },
        
        setSelection :function(Data){
            var mydata = $window.sessionStorage.getItem(KEY3);
            mydata = Data;
            $window.sessionStorage.setItem(KEY3,angular.toJson(mydata));

        },
        
        getSelection : function(){
            var mydata = $window.sessionStorage.getItem(KEY3);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
            
        },
         setFinalSelection :function(Data){
            var mydata = $window.sessionStorage.getItem(KEY4);
            mydata = Data;
            $window.sessionStorage.setItem(KEY4,angular.toJson(mydata));

        },
        
        getFinalSelection : function(){
            var mydata = $window.sessionStorage.getItem(KEY4);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
            
        }
    }
});