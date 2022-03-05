function calculate(operation) {
    first_num = parseInt(jQuery('#x').val());
    second_num = parseInt(jQuery('#y').val());
    font_boi = $("history").css("font-size");
    button_code = "<button class='remove_class'>DEL</button>";

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
            font_boi = font_boi + 1
            $("#history").css("font-size", font_boi)
        case "dec":            
            font_boi = font_boi - 1
            $("#history").css("font-size", font_boi)
        default:
            result = "Thou Shalt Not Do So!"
            console.log("ERRORROROR");

    }

    result = text + result;
    jQuery('#result').html(result);

    old_history = jQuery('#history').html();
    new_history = old_history + styled_result + '<br>';
    jQuery('#history').append(styled_result + '<br>');
}

function hide() {
    $(this).parent().remove();
}

setup = function () {
    jQuery('.button').click(
        function () {
            calculate(this.id);
        });
    $('body').on("click", '.remove_class', hide);
}



jQuery(document).ready(setup);