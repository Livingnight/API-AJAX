var ajaxBtns = ["Subzero", "Shoryuken", "Link", "Hyrule", "beaver", "doggo", "good boy"];
var btnsDiv = $(".buttons");
var gifDiv = $(".form-control");
//populating the button div
$(document).ready(function(){
    function buttons(){
        btnsDiv.empty();
        gifDiv.empty();
        for(var i = 0; i < ajaxBtns.length; i++) {
            var buttons =
                $("<button class='btn btn-danger query'>");
            buttons =
                buttons.attr("data-gif", ajaxBtns[i])
            btnsDiv.append(buttons.text(ajaxBtns[i]));
        }
    }
//making new buttons dynamically
    $("#searchBtn").on("click", function() {
        var searchText = gifDiv.val();
        console.log(gifDiv.val());
        //empties every time before making all the buttons again including new one
        gifDiv.empty();

        console.log(ajaxBtns);
        if (ajaxBtns.includes(searchText)){
            alert("You've already made that button")
        }else{
            ajaxBtns.push(searchText);
            buttons();
        }


        return false;
    });
    $(document).on("click", ".query", function(){
        console.log("hello");
        alert("You clicked: " + $(this).attr("data-gif"));
        var gif = $(this).attr("data-gif");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
            gif + "&api_key=VgHHBHryKYsIL3oERNnKPGWCqjReXtSF&limit=10";
        $.ajax({
            url: queryUrl,
            method: "GET"
         }).then(function(response){
             console.log(response);
        })
    });

    buttons();
});

