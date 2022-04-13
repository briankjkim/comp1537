received_data = null;



function resetPage() {
    $('#unicornNameFilter').prop('checked', false);
    $('#unicornWieghtFilter').prop('checked', false);
}

function filter_f() {
    name_ = "unchecked"
    weight_ = "unchecked"

    if ($('#unicornNameFilter').is(":checked")) {
        name_ = "checked"
    }
    if ($('#unicornWieghtFilter').is(":checked")) {
        weight_ = "checked"
    }
    console.log(received_data);

    tmp = received_data.map(
        (ob) => {
            result = []
            if (name_ == "checked")
                result.push(ob["name"])

            if (weight_ == "checked")
                result.push(ob["weight"])

            return result
        }
    )
    console.log(tmp);
    $("#result").html("<pre>" + tmp + "</pre>");
}


function process_res(data) {
    received_data = data;
    console.log(data)

    result = ""

    for (i = 0; i < data.length; i++) {
        // for each unicorn
        result += "<table>"
        result += "<tr>"
        // display headers for data field
        for (field in data[i]){
            result += "<th>"
            result += field
            result += "</th>"

        }
        result += "/<tr>"
        result += "<tr>"
        for (field in data[i]){
            result += "<td>"
            result += data[i][field]
            result += "</td>"

        }
        result += "</tr>"
        result += "</table>"

    }
    $("#result").html(result)
    // data = JSON.stringify(JSON.parse(data), null, 4);
    // $("#result").html("<pre>" + data + "</pre>");
}


function findByWeight() {
    console.log("findByWeight" + "got called!");
    console.log($("#lowerWeight").val());
    $.ajax({
        url: 'https://blooming-anchorage-33176.herokuapp.com/findByWeight',
        // url: 'http://localhost:5000/findByWeight',
        type: 'POST',
        data: {
            "lowerWeight": $("#lowerWeight").val(),
            "higherWeight": $("#higherWeight").val()
        },
        success: process_res
    })
    resetPage();
    $("#filters").show()
}



function findUnicornByName() {
    console.log("findUnicornByName()" + "got called!");
    console.log($("#unicornName").val())

    $.ajax({
        url: "https://blooming-anchorage-33176.herokuapp.com/findUnicornByName",
        // url: 'http://localhost:5000/findUnicornByName',
        type: "POST",
        data: {
            "unicornName": $("#unicornName").val()
        },
        success: process_res

    })
    resetPage();
    $("#filters").show()
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
        url: "https://blooming-anchorage-33176.herokuapp.com/findUnicornByFood",
        // url: 'http://localhost:5000/findUnicornByFood',
        type: "POST",
        data: {
            "appleIsChecked": appleIsChecked,
            "carrotIsChecked": carrotIsChecked,
        },
        success: process_res

    })
    resetPage();
    $("#filters").show()
}


function setup() {
    $("#findUnicornByName").click(findUnicornByName)
    $("#findUnicornByFood").click(findUnicornByFood)
    $("#findUnicornByWeight").click(findByWeight)
    $("#filter").click(filter_f)
    $("#filters").hide()
}

$(document).ready(setup)