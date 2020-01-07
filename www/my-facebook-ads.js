/**
 * Created by UTOPIA SOFTWARE on 07/01/2020.
 */



function loadFacebookAds(){

    cordova.plugins.codeplayfacebookads.showBannerAds({
        bannerid:"737711282985878_2732872996803020",
        isTesting:true
    },function(successResult){
        console.log("SUCCESS", successResult);
    },function (failureResult) {
        console.log("FAILURE", failureResult)
    });

}

document.addEventListener("deviceready", loadFacebookAds);

document.addEventListener("online", function(){
});
