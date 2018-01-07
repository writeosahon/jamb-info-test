/**
 * Created by UTOPIA SOFTWARE on 06/01/2018.
 */

function loadAds(){

    // config banner ad
    admob.banner.config({
        id: 'ca-app-pub-3940256099942544/6300978111',
        isTesting: true,
        autoShow: true,
        bannerAtTop: true,
        overlap: false
    });

    // config interstitial ad
    admob.interstitial.config({
        id: 'ca-app-pub-3940256099942544/1033173712',
        isTesting: true,
        autoShow: false
    });

    // create banner ad
    admob.banner.prepare().then(function(){});

    // create interstitial ad
    admob.interstitial.prepare().then(function(){});

    $(function(){
        $(document).on("click", '.btn.btn-success', function(){
            admob.interstitial.isReady().then(function(){
                admob.interstitial.show();
            }).catch();
        });
    });

}

document.addEventListener("deviceready", loadAds);
