var ajaxBtns = ["Subzero", "Shoryuken", "Link", "Hyrule", "beaver", "doggo", "good boy"];
var btn = $(".buttons");
var btnDiv = $(".form-control");
var gifDiv = $(".gifs");
//populating the button div
$(document).ready(function(){
    function buttons(){
        btn.empty();
        btnDiv.empty();
        for(var i = 0; i < ajaxBtns.length; i++) {
            var buttons =
                $("<button class='btn btn-danger query'>");
            buttons =
                buttons.attr("data-gif", ajaxBtns[i]);
            btn.append(buttons.text(ajaxBtns[i]));
        }
    }
//making new buttons dynamically
    $("#searchBtn").on("click", function(event) {
        // btnDiv.val("");
        event.preventDefault();
        var searchText = btnDiv.val();
        console.log(searchText);
        //empties every time before making all the buttons again including new one
        // gifDiv.empty();

        if (ajaxBtns.includes(searchText)){
            // alert("You've already made that button"
            btnDiv.val('');
            return;
        }else{
            ajaxBtns.push(searchText);
            console.log(ajaxBtns);

            var txt = $("<button class='btn btn-danger query'>");
            txt = txt.attr("data-gif", searchText);
            console.log("" + searchText);
            txt = txt.text("" + searchText);
            btn.append(txt);
            btnDiv.val('');
            // btn.append(buttons);
        }



    });
    $(document).on("click", ".query", function(){
        console.log("hello");
        // alert("You clicked: " + $(this).attr("data-gif"));
        var gif = $(this).attr("data-gif");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q="
            + gif + "&api_key=VgHHBHryKYsIL3oERNnKPGWCqjReXtSF&limit=10";
        $.ajax({
            url: queryUrl,
            method: "GET"
         }).then(function(response){
             console.log(response);
             var gifData = response.data;
             gifDiv.empty();
            for(var i=0; i<gifData.length; i++){
                 //console logs for different values needed
                 console.log(gifData[i].images.fixed_height_still.url);
                 console.log(gifData[i].rating);
            //   making an img div to place
                var div = $("<div class='calledGifs'>");
                var img = $("<img>");
                img = img.addClass("image");
                img = img.attr("data-still", gifData[i].images.fixed_height_still.url);
                img = img.attr("data-animate", gifData[i].images.fixed_height.url);
                img = img.attr("data-state", "still");
                img = img.attr("src", gifData[i].images.fixed_height_still.url);
                div.append($("<div>").html("<p>Rating: " + gifData[i].rating + "</p>"));
                div.append(img);
                // gifDiv.append("Rating: " + gifData[i].rating);
                gifDiv.append(div);

            }

        })


    });
    $(document).on("click", ".image", function(){
        if($(this).attr("data-state") === "still"){
            $(this).attr("data-state", "animate");
            $(this).attr("src", $(this).attr("data-animate"));
        }else if($(this).attr("data-state") === "animate"){
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
        }
    });

    buttons();
});

