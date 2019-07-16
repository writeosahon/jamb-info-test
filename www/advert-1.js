/**
 * Created by UTOPIA SOFTWARE on 06/01/2018.
 */

var premiumJambQProd = null; // holds the product to be purchased

var canPurchaseToday = false;

var productCallbacks = {};

productCallbacks.updated = function(product){ // listen for when product is loaded

    if(product && product.valid){ // product is loaded and valid
        window.premiumJambQProd = product; // store the loaded product globally
        if(window.premiumJambQProd.canPurchase){ // product is NOT already owned

            canPurchaseToday = true;
        }
    }
    else{ // product may not be valid
        window.premiumJambQProd = null; // reset the global product object
    }
};

productCallbacks.approved = function(product){ // listen for when the purchase of the premium jamb Q&A product has been successfully approved

    product.finish();
};

productCallbacks.finished = function(product){ // listen for when the purchase of the premium jamb Q&A product has been successfully approved
    /*if(canPurchaseToday === true){
        canPurchaseToday = false;
        navigator.notification.alert("Thank you for purchasing '" + product.title + "'.", function(){

            location.href = "premium.html"; // navigate to the premium page
        }, "Product Purchased", "OK");
    }*/
};

function loadAds(){

    // config banner ad
    admob.banner.config({
        id: 'ca-app-pub-6924159570556282/5102744837',
        isTesting: true,
        autoShow: true,
        bannerAtTop: true,
        overlap: false
    });

    // config interstitial ad
    admob.interstitial.config({
        id: 'ca-app-pub-6924159570556282/7396901532',
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

    // REGISTER THE STORE EVENT LISTENERS
    store.error(function(err){ // error handler
        window.premiumJambQProd = null; // reset the global product object
        // display error message to user
        navigator.notification.alert("You cannot make purchases at this stage. Try again in a moment. \nAlso, make sure you didn't enable In-App-Purchases restrictions on your phone.", function(){}, "Product Error", "OK");
    });

    store.when("premium jamb q&a1").updated(productCallbacks.updated);

    store.when("premium jamb q&a1").approved(productCallbacks.approved);

    store.when("premium jamb q&a1").finished(productCallbacks.finished);

    // REGISTER THE PREMIUM JAMB Q&A PRODUCT WITH THE STORE OBJECT
    store.register({
        id: "com.exams.examseriesjamb.premium.jamb.qa1",
        alias: "premium jamb q&a1",
        type: store.NON_CONSUMABLE
    });

    // TRIGGER STORE REFRESH
    if(navigator.connection.type !== Connection.NONE){
        store.refresh();
    }
}


function payPremium(){

    if(! store.get("premium jamb q&a1") || ! store.get("premium jamb q&a1").valid){
        store.refresh();
    }
    if(store.get("premium jamb q&a1") && store.get("premium jamb q&a1").canPurchase){ // the premium jamb product has not been purchased
        store.order(store.get("premium jamb q&a1"));
        return; // exit method
    }
    if(store.get("premium jamb q&a1") && store.get("premium jamb q&a1").valid
        && ! store.get("premium jamb q&a1").canPurchase){ // the premium jamb product has already been purchased
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
