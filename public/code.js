function process_res(data) {
    console.log(data);
    $("#result").html(JSON.stringify(data));
}


function findUnicornByName() {
    console.log("findUnicornByName()" + "got called!");
    console.log($("#unicornName").val())

    $.ajax({
        url: "http://localhost:5000/findUnicornByName",
        type: "POST",
        data: {
            "unicornName": $("#unicornName").val()
        },
        success: process_res

    })
}


function findUnicornByFood() {
    console.log("findUnicornByFood()" + "got called!");
    carrotIsChecked = "unchecked"
    appleIsChecked = "unchecked"

    if ($("#carrot").is(":checked"))
        carrotIsChecked = "checked"

    if ($("#apple").is(":checked"))
        appleIsChecked = "checked"

    $.ajax({
        url: "http://localhost:5000/findUnicornByFood",
        type: "POST",
        data: {
            "appleIsChecked": appleIsChecked,
            "carrotIsChecked": carrotIsChecked,
        },
        success: process_res

    })



}


function setup() {
    $("#findUnicornByName").click(findUnicornByName)
    $("#findUnicornByFood").click(findUnicornByFood)
}

$(document).ready(setup)