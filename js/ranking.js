// Definição da var de come back
var backclickable = false;
var base_url = "http://127.0.0.1:5000/players";

// Função para mostrar o ranking
function showRanking() {

    loadRanking();

    // Mostra o quadro de ranking
    $("#ranking").css({ y: '40px', opacity: 0 }); // Move o quadro de score para biaxo
    $("#home").css({ opacity: 0 });

    $("#ranking").transition({ y: '0px', opacity: 1 }, 600, 'ease', function () {
        // Quando a animação terminar começa o som de SWOOSH!
        $("#home").transition({ opacity: 1 }, 600, 'ease');
    });
}

function loadRanking() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", base_url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            var listDiv = document.getElementById('list-ranking');
            var ul = document.createElement('ul');
            ul.className = "list-ul";

            var lb = document.createElement('label');
            lb.className = 'list-header';
            lb.innerText = 'Ranking';

            listDiv.append(lb);
            listDiv.appendChild(ul);

            for (var i = 0; i < response.length; ++i) {
                var al = document.createElement('a');
                // al.href = window.location.origin + window.location.pathname + '/players/' + response[i].id;
                switch (i) {
                    case 0: al.className = 'first'; break;
                    case 1: al.className = 'second'; break;
                    case 2: al.className = 'third'; break;
                    default: break;
                }

                var li = document.createElement('li');
                document.createTextNode(response[i].name);
                al.id = response[i].id;

                var name = response[i].name;

                var score = response[i].big_score;
                score = pad(score, score.length);

                name = name.padEnd(20, '.');

                al.innerText = name + ' pts:' + score;

                li.append(al);
                ul.appendChild(li);
            }
        }
    }
    document.getElementById("list-ranking").innerHTML = xhttp.responseText;
}

function pad(num, size) {
    var s = "000" + num;
    return s.substr(s.length - size);
}


$("#home").click(function () {
    // Podemos deixar a ação de come back com clique também
    if (!backclickable) {
        window.location.href = 'index.html';
        return;
    } else {
        backclickable = false;
    }
});

