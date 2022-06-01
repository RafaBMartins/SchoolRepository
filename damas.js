const tamanhoCelula = 40;
let pecaId = 0;
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);

            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.addEventListener('dragover', allowDrop)
                celula.addEventListener('drop', drop)
                celula.style.backgroundColor = 'black';
                celula.setAttribute('x', `${i}`)
                celula.setAttribute('y', `${j}`)
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                    celula.removeEventListener('dragover', allowDrop)
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                    celula.removeEventListener('dragover', allowDrop)
                }

            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('cor', cor)
    imagem.setAttribute('width', `${tamanhoCelula - 4}px`);
    imagem.setAttribute('height', `${tamanhoCelula - 4}px`);
    imagem.setAttribute('draggable', 'true')
    imagem.addEventListener("dragstart", drag)
    imagem.setAttribute('id', `peca-${pecaId++}`)
    // imagem.addEventListener('mousedown', (ev) => {
    //     console.log(ev.target.id)
    // })

    return imagem;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const idelem = ev.dataTransfer.getData("idelemento");
    const peca = document.getElementById(idelem)
    const xori = parseInt(peca.parentElement.getAttribute('x'))
    const yori = parseInt(peca.parentElement.getAttribute('y'))
    const xdes = parseInt(ev.target.getAttribute('x'))
    const ydes = parseInt(ev.target.getAttribute('y'))
    // console.log(xori, yori, "->", xdes, ydes, (xdes - xori == -1))
    // console.log(peca.getAttribute('cor'))
    let step = 1
    if (peca.getAttribute('cor').valueOf() == 'red'.valueOf()) {
        step *= -1
    } 

    if ((xdes - xori == step) && (Math.abs(ydes - yori) == 1)) {
        peca.parentElement.addEventListener('dragover', allowDrop)
        ev.target.appendChild(peca);
        ev.target.removeEventListener('dragover', allowDrop)
    }
}

function drag(ev) {
    ev.dataTransfer.setData("idelemento", ev.target.id);
}
