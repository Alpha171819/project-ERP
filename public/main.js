$(document).ready(() => {
    $.ajax({
        type: "POST",
        url: "/verify/if/Ao",
        data: {},
        success: function(datafound) {

            // console.log(datafound);
            if (datafound.length === 0) $(".goback").css('display', 'none')
            else $(".goback").css('display', 'inline')

        },
        error: function() {
            console.log(" error while geting loging verification from backend");
        }

    });

    $(() => {
        var date = new Date();
        console.log(date)
        var tdate = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getUTCFullYear();
        if (month < 10) {
            month = '0' + month;
        }
        if (tdate < 10) {
            tdate = '0' + tdate;
        }
        var minDate = year + '-' + month + '-' + tdate;
        $('#return').attr('min', minDate);


    });
    $.ajax({
        type: "POST",
        url: "/reserving/rooms/in/db",
        data: {},
        success: function(roomsdata) {

            var number = 0;
            roomsdata.forEach((el) => {
                number++;
            });
            console.log("number of notifications " + number);
            $(".badge").text(number);

        },
        error: function() {
            console.log(" error while sending data  to backend");
        }

    });


    $("#classroom").click(() => {
        $(".sem,.comp").attr("disabled", "");
        $(".room").removeAttr("disabled", "disabled");
    });

    $("#Seminars").click(() => {
        $(".sem").removeAttr("disabled", "disabled");
        $(".room,.comp").attr("disabled", "");
    });

    $("#Labs").click(() => {
        $(".comp").removeAttr("disabled", "disabled");
        $(".room,.sem").attr("disabled", "");
    });


    $('.room,.sem,.comp').addClass('tick');
    $('#return').change(() => {
        $('#Reserve').click(() => {
            var res = $('#return').val();
            date = res.slice(8, 10);
            month = res.slice(5, 7);
            year = res.slice(0, 4);

            var reserverooms = {
                'date': date,
                'month': month,
                'year': year,
                periodNumber: $('.table:checked').attr('id'),
                choice: $('.cls:checked').attr('id'),
                classroom: $('.tick:checked').attr('id')
            }
            alert("you have selected " + reserverooms.choice + " (" + reserverooms.classroom + ") " + " on " + reserverooms.date + "/" + reserverooms.month + "/" + reserverooms.year + " period number is : " + reserverooms.periodNumber + " your Request is sent to AO Please contact for Approval");
            $.ajax({
                type: "GET",
                url: "/reserving/rooms/in/db",
                data: reserverooms,
                success: function(roomsdata) {

                    var number = 0;
                    roomsdata.forEach((el) => {
                        number++;
                    });
                    console.log("number of notifications " + number);
                    $(".badge").text(number);


                },
                error: function() {
                    console.log(" error while sending data  to backend");
                }

            });


        });
    });
    $('.checkrooms-btn').click(() => {


        var res = $('#return').val();
        date = res.slice(8, 10);
        month = res.slice(5, 7);
        year = res.slice(0, 4);

        var choosedOptions = {
            'date': date,
            'month': month,
            'year': year,
            periodNumber: $('.table:checked').attr('id'),
            choice: $('.cls:checked').attr('id')

        }

        $.ajax({
            type: "GET",
            url: "/Roomverification",
            data: choosedOptions,
            success: function(verifedRooms) {
                console.log(verifedRooms);
                //$(".room").removeAttr("disabled", "disabled");
                verifedRooms.forEach((el) => {
                    document.getElementById(el).setAttribute("disabled", "");
                });

            },
            error: function() {
                console.log(" error while sending data  to backend");
            }

        });





    });


});