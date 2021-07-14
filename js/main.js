'use strict'

window.addEventListener('load',function(){

    var button = document.querySelector("#button");
    var final_value = document.querySelector("#final-value");

    button.addEventListener("click", function(){

        // Valores a recibir

        var option_badge = document.querySelector("#badge").value;
        var option_to_badge = document.querySelector("#to_badge").value;
        var amount = parseInt(document.querySelector("#amount").value);

        // Debido a que se requiere hacer un pago para poder cambiar la divisa a la cual se desea hacer el cambio,
        // se tuvieron que usar valores estaticos para hacer el cambio del euro al peso y viceversa.

        fetch('http://apilayer.net/api/live?access_key=06e31364cecd62e351b3c311b3aeedf1&currencies=EUR,COP,USD&source=USD&format=1')
            .then(data => data.json())
            .then(data => {
                var valueCOP = data.quotes.USDCOP;
                var valueEUR = data.quotes.USDEUR;
                var valueUSD = data.quotes.USDUSD;

                var result;

                switch(option_badge){
                    case "COP":
                        switch(option_to_badge){
                            case "COP":
                                result = amount;
                                break;
                            case "USD":
                                result = (amount/valueCOP).toFixed(2);
                                break;
                            case "EUR":
                                result = (amount*0.00022).toFixed(2);
                                break;
                        }
                        break;

                    case "USD":
                        switch(option_to_badge){
                            case "COP":
                                result = (amount*valueCOP).toFixed(2);
                                break;
                            case "USD":
                                result = amount
                                break;
                            case "EUR":
                                result = (amount*valueEUR).toFixed(2);
                                break;
                        }
                        break;

                    case "EUR":
                        switch(option_to_badge){
                            case "COP":
                                result = (amount*4491.55).toFixed(2);
                                break;
                            case "USD":
                                result = (amount/valueEUR).toFixed(2);
                                break;
                            case "EUR":
                                result = amount;
                                break;
                        }
                        break;
                }

                final_value.value = result;

            });


    });

});