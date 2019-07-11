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

    // register the log level for the store
    store.verbosity = store.DEBUG;
    console.log("STORE READY STARTING");

    // REGISTER THE STORE EVENT LISTENERS
    store.error(function(err){ // error handler
        console.log("STORE ERROR", err);
        window.premiumJambQProd = null; // reset the global product object
        // display error message to user
        navigator.notification.alert("You cannot make purchases at this stage. Try again in a moment. \nAlso, make sure you didn't enable In-App-Purchases restrictions on your phone.", function(){}, "Product Error", "OK");
    });

    store.when("premium jamb q&a1").loaded(function(product){ // listen for when product is loaded
        console.log("STORE LOADED");
        if(product && product.valid){ // product is loaded and valid
            window.premiumJambQProd = product; // store the loaded product globally
        }
        else{ // product may not be valid
            window.premiumJambQProd = null; // reset the global product object
        }
    });

    store.when("premium jamb q&a1").approved(function(product){ // listen for when the purchase of the premium jamb Q&A product has been successfully approved
        console.log("STORE APPROVED");
        product.finish();
        // display success message to user
        navigator.notification.alert("Thank you for purchasing '" + product.title + "'.", function(){
            location.href = "premium.html"; // navigate to the premium page
        }, "Product Purchased", "OK");
    });

    /*store.when("premium jamb q&a1").finished(function(product){ // listen for when the purchase of the premium jamb Q&A product has been successfully finished
        console.log("STORE FINISHED");
        //window.premiumJambQProd = product; // store the loaded product globally
    });*/

    console.log("STORE REGISTER BEGIN");
    // REGISTER THE PREMIUM JAMB Q&A PRODUCT WITH THE STORE OBJECT
    store.register({
        id: "com.exams.examseriesjamb.premium.jamb.qa1",
        alias: "premium jamb q&a1",
        type: store.NON_CONSUMABLE
    });
    console.log("STORE REGISTER ENDED");

    // TRIGGER STORE REFRESH
    if(navigator.connection.type !== Connection.NONE){
        store.refresh();
    }
}


function payPremium(){
    console.log("STORE PAY PREMUIM STARTED");
    console.log("PRODUCT STARTED", window.premiumJambQProd);
    if(! window.premiumJambQProd || ! window.premiumJambQProd.valid){
        store.refresh();
    }
    if(window.premiumJambQProd && ! window.premiumJambQProd.owned){ // the premium jamb product has not been purchased
        console.log("STORE ORDER STARTED");
        store.order(window.premiumJambQProd);
        return; // exit method
    }
    if(window.premiumJambQProd && window.premiumJambQProd.owned){ // the premium jamb product has already been purchased
        location.href = "premium.html"; // navigate to the premium page

        admob.interstitial.isReady().then(function(){
            admob.interstitial.show();
        }).catch();

        return; // exit method
    }
}

document.addEventListener("deviceready", loadAds);
document.addEventListener("deviceready", loadProducts);

document.addEventListener("online", function(){
    admob.banner.prepare().then(function(){
        admob.banner.show();
    }).catch();

    admob.interstitial.prepare();
});

/*document.addEventListener("online", function(){
    if(! window.premiumJambQProd || ! window.premiumJambQProd.valid){
        store.refresh();
    }
});*/
