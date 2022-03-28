current_page_id = null;
number_of_pages = null;
page_size = null;
received_object = null;


function display(current_page_id, page_size) {

    for (i = page_size * (current_page_id - 1); i < (page_size * (current_page_id - 1) + page_size); i++) {

        $("#results").append(received_object.results[i].original_title + "<br>");

        $("#results").append(received_object.results[i].overview + "<br>");
        x = received_object.results[i].poster_path 
        image_html =`<img src='https://image.tmdb.org/t/p/w500/${x}'>`
        $("#results").append(image_html + "<br>");

        z = `<button id="${received_object.results[i].backdrop_path}" class="backdrop_button"> backdrop image!</button>`
        $("#results").append(z + "<br>");
    }
    
    paginate_menu();
}

function paginate_menu() {
    number_of_pages = Math.ceil(received_object.results.length / page_size);
    $("header").show();
    $("#numbered_buttons_id").empty();
    for (i = 1; i <= number_of_pages; i++) {
        x = `<button id='${i}' class='numbered_buttons'> ${i} </button>`;
        $("#numbered_buttons_id").append(x)
    }
}

function process_response(data) {

    received_object = data;

    for (i = 0; i < data.results.length; i++) {

        $("#results").append(data.results[i].original_title + "<br>");

        $("#results").append(data.results[i].overview + "<br>");
        x = data.results[i].poster_path
        image_html = `<img src='https://image.tmdb.org/t/p/w500/${x}'>`
        $("#results").append(image_html + "<br>");

        z = `<button id="${data.results[i].backdrop_path}" class="backdrop_button"> backdrop image!</button>`
        $("#results").append(z + "<br>");
    }

    paginate_menu();
}

function call_ajax() {
    w = $("#movie_name").val();
    $.ajax({
        "url": `https://api.themoviedb.org/3/search/movie?api_key=ed4ef9b0f9bcb9c237ab83a2c2ffb909&query=${w}`,
        "type": "GET",
        "success": process_response
    })
}

function display_back_drop() {
    w = $(this).attr("id");
    console.log(`<img src="https://image.tmdb.org/t/p/original${w}" width="100"%>`);
    $("#right_div").html(`<img src="https://image.tmdb.org/t/p/original${w}" width="100%">`)


}

function header_button() {
    w = $(this).attr("id");
    current_page_id = Number(w);
    display(current_page_id, page_size)

    $("#next").show();
    $("#prev").show();
}

function first() {
    current_page_id = 1;
    $("#prev").show();
    $("#next").show();
    display(1, page_size);
}

function last() {
    current_page_id = 7;
    $("#prev").show();
    $("#next").show();
    display(7, page_size);
}

function prev() {
    if (current_page_id > 1)
        current_page_id--;
    display(current_page_id, page_size);
}

function next(){
    if(current_page_id < 7)
        current_page_id++;
    display(current_page_id, page_size);
}

function drop_down_menu_modify() {
    page_size = $(this).val();
    page_size = Number(page_size);
    paginate_menu();
}


function setup() {
    $("#find_movie_info").click(call_ajax)
    // $("body").click(()=>{alert()});
    $("body").on("click", ".backdrop_button", display_back_drop)
    $("body").on("click", ".numbered_buttons", header_button);
    $("#first").click(first);
    $("#last").click(last);
    $("#next").click(next);
    $("#prev").click(prev);
    $("#prev").hide();
    $("#next").hide();
    $("select").change(drop_down_menu_modify);
    page_size = Number($("option:selected").val());
}

jQuery(document).ready(setup)