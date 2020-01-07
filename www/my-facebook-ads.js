/**
 * Created by UTOPIA SOFTWARE on 07/01/2020.
 */



function loadFacebookAds(){

    cordova.plugins.codeplayfacebookads.showBannerAds({
        adId:"737711282985878_2732872996803020",
        isTesting:true,
        position:FacebookAds.AD_POSITION.BOTTOM_CENTER,
        autoShow:true
    },function(successResult){
        console.log("SUCCESS", successResult);
    },function (failureResult) {
        console.log("FAILURE", failureResult)
    });

}

document.addEventListener("deviceready", loadFacebookAds);

document.addEventListener("online", function(){
});
