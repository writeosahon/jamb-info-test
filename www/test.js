/**
 * Created by UTOPIA SOFTWARE on 06/01/2018.
 */

function loadAds(){
    console.log("FUNCTION CALLED");

    // config banner ad
    admob.banner.config({
        //id: 'ca-app-pub-8042133793597643/7566158747',
        isTesting: true,
        autoShow: true,
        bannerAtTop: true,
        overlap: true
    });

    // create banner ad
    admob.banner.prepare().then(function(){console.log("AD LOADED")});
}

document.addEventListener("deviceready", loadAds);
