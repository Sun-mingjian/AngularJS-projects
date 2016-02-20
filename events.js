var myApp = angular.module('app', []);
 
myApp.controller("mycon", function ($scope,shareData,$location) {
     var lll = shareData.getSelection();
       console.log(lll);
    $scope.display = function(){
       shareData.store($scope.items,$scope.choice);
       if($scope.choice=="songs")
            window.location.href = "SongResults.html";
       else{
            window.location.href = "AlbumResults.html";
       }
       //$location.url('/display.html');
       
   }
   
});

myApp.controller("dis", function ($scope,shareData,$http,search,recordCheckBox,updateSelection) {
    
    $http.get('music.json').success(function(response){
        $scope.info = response;
        var all = shareData.get();
        var items = all.item;
        var choice = all.choice;
        $scope.selection = shareData.getSelection();
        
        if(choice=="songs"){
            var userSelection = [];
            $scope.songs = search.songSearch($scope.info,items);
            shareData.setResult($scope.songs);
            $scope.toggleSelection = function(item){
               console.log("yes"); userSelection=recordCheckBox.count(item,userSelection);
               
                
            } 
           
            
            $scope.Back = function(){
                shareData.setSelection($scope.selection);
                 window.location.href = "Search.html";
            }
            $scope.Cart = function(){
               
                window.location.href = "Cart.html"; $scope.selection=updateSelection.update(userSelection,$scope.selection);
                shareData.setSelection($scope.selection);
                
            }
            
            
            
        }
        else{
            var userSelection = [];
            $scope.albums = search.albumSearch($scope.info,items);
            shareData.setResult($scope.albums);
            
             $scope.toggleSelection = function(item){
                 userSelection=recordCheckBox.count(item,userSelection);
                
             }
            $scope.Back = function(){
                shareData.setSelection($scope.selection);
                 window.location.href = "Search.html";
            }
            $scope.Cart = function(){
                window.location.href = "Cart.html"; $scope.selection=updateSelection.update(userSelection,$scope.selection);
                shareData.setSelection($scope.selection);
            }

        }

    });
    
   
});


myApp.controller("cartCon", function ($scope,shareData,$http,search,recordCheckBox) {
    
    
    $scope.selection = shareData.getSelection();
    console.log($scope.selection);
    var finalSelected = [];
    $scope.toggleSelection = function(item){

        finalSelected=recordCheckBox.count(item,finalSelected);
        console.log(finalSelected);

                
    }
    
    $scope.Back = function(){
        window.location.href = "Search.html";
    }
    $scope.CheckOut = function(){
        shareData.setFinalSelection(finalSelected);
        window.location.href = "checkOut.html";
    }
    $scope.Remove = function(){
        //remove selected from selections
        for(var a=0;a<finalSelected.length;a++){
             var idx = $scope.selection.indexOf(finalSelected[a]);
            $scope.selection.splice(idx, 1);
            
        }
        shareData.setSelection($scope.selection);
        console.log(finalSelected);
        
        window.location.href = "Cart.html";
    }
    
    
    
    
});


myApp.controller("checkCon",function($scope,shareData,$http,search,recordCheckBox){
    $scope.selection=shareData.getFinalSelection();
    $scope.totalPrice = 0;
    for(var a=0;a<$scope.selection.length;a++){
        $scope.totalPrice+=parseFloat($scope.selection[a].price);
    }
    $scope.finalPage = function(){
        window.location.href = "Final.html";
    }
    
});