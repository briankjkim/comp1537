function calculate(operation) {
    first_num = parseInt(jQuery('#x').val());
    second_num = parseInt(jQuery('#y').val());
    font_boi = $("history").css("font-size");
    button_code = "<button class='remove'>DEL</button>";

    switch (operation) {
        case "add":
            result = first_num + second_num;
            text = first_num + " +  " + second_num + " = ";
            styled_result = "<span id='add_color'>" + text + result + button_code + "</span>";
            break;
        case "sub":
            result = first_num - second_num;
            text = first_num + " - " + second_num + " = ";
            styled_result = "<span id='sub_color'>" + text + result + button_code + "</span>";
            break;
        case "mul":
            result = first_num * second_num;
            text = first_num + " * " + second_num + " = ";
            styled_result = "<span id='mul_color'>" + text + result + button_code + "</span>";
            break;
        case "div":
            result = first_num / second_num;
            text = first_num + " / " + second_num + " = ";
            styled_result = "<span id='div_color'>" + text + result + button_code + "</span>";
            break;
        case "exp":
            result = first_num ** second_num;
            text = first_num + " ^ " + second_num + " = ";
            styled_result = "<span id='exp_color'>" + text + result + button_code + "</span>";
            break;
        case "mod":
            result = first_num % second_num;
            text = first_num + " % " + second_num + " = ";
            styled_result = "<span id='mod_color'>" + text + result + button_code + "</span>";
            break;
        case "inc":
            console.log(parseInt(font_boi));
            font_boi = parseInt(font_boi);
            $("#history").css("font-size", (font_boi + 10) + "px");
        case "dec":
            font_boi = parseInt(font_boi);
            $("#history").css("font-size", (font_boi - 10) + "px");
        default:
            result = "Thou Shalt Not Do So!";
            console.log("ERRORROROR");

    }

    result = text + result;
    jQuery('#result').html(result);

    old_history = jQuery('#history').html();
    new_history = old_history + styled_result + '<br>';
    jQuery('#history').append(styled_result + '<br>');
}


hide = function () {
    jQuery('#history').hide()

}

show = function () {
    jQuery('#history').show()
}


erase = function () {
    jQuery(this).parent().remove();
}

setup = function () {
    jQuery('.calc').click(
        function () {
            calculate(this.id);
        });
    jQuery('.show#show').click(show);
    jQuery('.show#hide').click(hide);       
    
    $('body').on("click", '.remove', erase);

}



jQuery(document).ready(setup);