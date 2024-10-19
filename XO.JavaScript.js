let title = document.querySelector('.title');
let turn = 'x';
let squares = [];
let filledSquares = 0;
let xScore = parseInt(localStorage.getItem('xScore')) || 0;
let oScore = parseInt(localStorage.getItem('oScore')) || 0;
let clickSound = document.getElementById('click-sound');
let winSound = document.getElementById('win-sound');
let victorySound = document.getElementById('victory-sound');

function end(num1, num2, num3) {
    title.innerHTML = `${squares[num1]} winner`;
    document.getElementById('item' + num1).style.background = '#000';
    document.getElementById('item' + num2).style.background = '#000';
    document.getElementById('item' + num3).style.background = '#000';
    setInterval(function(){title.innerHTML += '.'},1000);

    // تشغيل صوت الفوز
    if (winSound.readyState ==4) {
        winSound.play();
    }

    if (squares[num1] == 'x') {
        xScore++;
        if (xScore >= 3) {
            victorySound.play();
            xScore = 0;
            oScore = 0;
        }
        localStorage.setItem('xScore', xScore);
        localStorage.setItem('oScore', oScore);
        document.getElementById('x-score').innerHTML = xScore;
        document.getElementById('o-score').innerHTML = oScore;
    } else {
        oScore++;
        if (oScore >= 3) {
            victorySound.play();
            xScore = 0;
            oScore = 0;
        }
        localStorage.setItem('xScore', xScore);
        localStorage.setItem('oScore', oScore);
        document.getElementById('x-score').innerHTML = xScore;
        document.getElementById('o-score').innerHTML = oScore;
    }

    setTimeout(function() { location.reload(); }, 2000);
}

function winner() {
    for (let i = 1; i < 10; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML;
    }
    if (squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '') {
        end(1, 2, 3);
    } else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[4] != '') {
        end(4, 5, 6);
    } else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != '') {
        end(7, 8, 9);
    } else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '') {
        end(1, 4, 7);
    } else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != '') {
        end(2, 5, 8);
    } else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != '') {
        end(3, 6, 9);
    } else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '') {
        end(1, 5, 9);
    } else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != '') {
        end(3, 5, 7);
    } else if (filledSquares == 9) {
        title.innerHTML = "No one won.";
        setTimeout(function() { location.reload(); }, 4000);
    }
}

function game(id) {
    let element = document.getElementById(id);
    if (turn === 'x' && element.innerHTML == '') {
        element.innerHTML = 'x';
        turn = 'o';
        title.innerHTML = 'o';
        filledSquares++;
        clickSound.play();
    } else if (turn === 'o' && element.innerHTML == '') {
        element.innerHTML = 'o';
        turn = 'x';
        title.innerHTML = 'x';
        filledSquares++;
        clickSound.play();
    }
    winner();
}

// تحديث النقاط على الشاشة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('x-score').innerHTML = xScore;
    document.getElementById('o-score').innerHTML = oScore;
});
