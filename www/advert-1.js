/**
 * Created by UTOPIA SOFTWARE on 06/01/2018.
 */

var premiumJambQProd = null; // holds the product to be purchased

function loadAds(){

    // config banner ad
    admob.banner.config({
        //id: 'ca-app-pub-6924159570556282/5102744837',
        isTesting: true,
        autoShow: true,
        bannerAtTop: true,
        overlap: false
    });

    // config interstitial ad
    admob.interstitial.config({
        //id: 'ca-app-pub-6924159570556282/7396901532',
        isTesting: true,
        autoShow: false
    });

    // create banner ad
    admob.banner.prepare().then(function(){});

    // create interstitial ad
    admob.interstitial.prepare().then(function(){});

    $(function(){
        $(document).on("click", '.btn.btn-success:not(.premium)', function(){
            admob.interstitial.isReady().then(function(){
                admob.interstitial.show();
            }).catch();
        });
    });


}

function loadProducts(){

    // check if the store object is ready and execute
    store.ready(function(){

        // register the log level for the store
        store.verbosity = store.DEBUG;

        // REGISTER THE STORE EVENT LISTENERS
        store.error(function(){ // error handler
            window.premiumJambQProd = null; // reset the global product object
            // display error message to user
            navigator.notification.alert("You cannot make purchases at this stage. Try again in a moment. \nMake sure you didn't enable In-App-Purchases restrictions on your phone.", function(){}, "Product Error", "OK");
        });

        store.when("premium jamb q&a").loaded(function(product){ // listen for when product is loaded
            if(product && product.valid){ // product is loaded and valid
                window.premiumJambQProd = product; // store the loaded product globally
            }
            else{ // product may not be valid
                window.premiumJambQProd = null; // reset the global product object
            }
        });

        store.when("premium jamb q&a").approved(function(product){ // listen for when the purchase of the premium jamb Q&A product has been successfully approved
            product.finish();
        });

        store.when("premium jamb q&a").finished(function(product){ // listen for when the purchase of the premium jamb Q&A product has been successfully finished
            // display error message to user
            navigator.notification.alert("Thank you for purchasing '" + product.title + "'.", function(){
                location.href = "premium.html"; // navigate to the premium page
            }, "Product Purchased", "OK");
        });

        // REGISTER THE PREMIUM JAMB Q&A PRODUCT WITH THE STORE OBJECT
        store.register({
            id: "android.test.purchased",
            alias: "premium jamb q&a",
            type: store.CONSUMABLE
        });

        // TRIGGER STORE REFRESH
        store.refresh();
    });
}


function payPremium(){
    if(window.premiumJambQProd && !window.premiumJambQProd.owned){ // the premium jamb product has not been purchased
        store.order(window.premiumJambQProd);
        return; // exit method
    }
    if(window.premiumJambQProd && window.premiumJambQProd.owned){ // the premium jamb product has already been purchased
        location.href = "premium.html"; // navigate to the premium page
    }
}

document.addEventListener("deviceready", loadAds);
document.addEventListener("deviceready", loadProducts);
