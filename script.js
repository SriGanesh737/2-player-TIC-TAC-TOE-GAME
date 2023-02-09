
var turn = 0;
var score1 = 0,score2=0,tiecnt=0,clickedcnt=0;




var filled=[10,11,12,13,14,15,16,17,18];
const icon1 = '<i class="fa-brands fa-teamspeak mov1"></i>';
const icon2 = '<i class="fa-brands fa-gitlab mov2"></i>';
const leg1 = '<i class="fa-brands fa-teamspeak leg1"></i>';
const leg2 = '<i class="fa-brands fa-gitlab turn"></i>';


function disablepointers() {
    for (let i = 0; i < 9; i++){
        let sel = '#' + i;
        $(sel).css('pointer-events', 'none');
    }
}
function enablepointers() {
    for (let i = 0; i < 9; i++){
        let sel = '#' + i;
        $(sel).css('pointer-events', '');
    }
}

function gamecheck()
{
    let a = filled[0], b = filled[8],o=filled[4];
    if (filled[0] == a && filled[1] == a && filled[2] == a) return true;
    else if (filled[3] == o && filled[4] == o && filled[5] == o) return true;
    else if (filled[6] == b && filled[7] == b && filled[8] == b) return true;
    else if (filled[0] == a && filled[3] == a && filled[6] == a) return true;
    else if (filled[1] == o && filled[4] == o && filled[7] == o) return true;
    else if (filled[2] == b && filled[5] == b && filled[8] == b) return true;
    else if (filled[0] == o && filled[4] == o && filled[8] == o) return true;
    else if (filled[6] == o && filled[4] == o && filled[2] == o) return true;
    else return false;
}

$('.unclicked').click(function (e) {
    e.preventDefault();
    let i = Number($(this).attr("id"));
    if ($(this).hasClass('unclicked'))
    {
        clickedcnt++;
        if (turn == 0) {
            $(this).html(icon1);
            $('.turnimg').html(leg2);
        }
        else {
            $(this).html(icon2);
            $('.turnimg').html(leg1);
        }
        $(this).removeClass('unclicked');
        filled[i] = 1+turn;
        if (gamecheck())
        {
            disablepointers();
            let won = Number(turn) + 1;
            if (won == 1)
            {
                score1++;
                $('.yourscore').text(score1);
                $('.result-txt').text("Player 1 Won");
            }
            else {
                score2++;
                $('.cpuScore').text(score2);
                $('.result-txt').text("Player 2 Won");
            }
            $('.result').css('display', 'block');

            console.log("Player " + won + " Won!!!");

        }
        turn = !turn;
    }



    if (clickedcnt == 9)
    {
        disablepointers();
        tiecnt++;
        $('.TieCount').text(tiecnt);
        $('.result-txt').text("IT'S A TIE");
        $('.result').css('display', 'block');
        console.log("Game Over");
    }

});

$('.replay').click(() => {
    sessionStorage.setItem("score1", score1);
    sessionStorage.setItem("score2", score2);
    sessionStorage.setItem("tiecnt", tiecnt);


    sessionStorage.setItem("reloading", "true");
    window.location.reload();


});


window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        enablepointers();
        score1= sessionStorage.getItem("score1");
        score2 = sessionStorage.getItem("score2");
        tiecnt = sessionStorage.getItem("tiecnt");
        $('.yourscore').text(score1);
        $('.cpuScore').text(score2);
        $('.TieCount').text(tiecnt);
    }
}




$('.quit').click(function (e) {
    e.preventDefault();

    window.location.reload();
});


