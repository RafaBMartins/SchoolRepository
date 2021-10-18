   const subtitulos = document.querySelectorAll('h2');
    const topicos = new Array();
    subtitulos.forEach(subtitulo => {
        topicos.push({href: subtitulo.getAttribute('id'), conteudo: subtitulo.textContent});
        });
    lista = document.querySelector('ol');
    topicos.forEach(topico => {
        const li = document.createElement('li');
        li.innerHTML = `<a href=#${topico.href}>${topico.conteudo}<\a>`
        lista.append(li);
    });
