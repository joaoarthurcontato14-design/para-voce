SITE "PARA VOCÊ." — GUIA RÁPIDO

1) GITHUB
- Crie um repositório público (ou privado, se souber configurar GitHub Pages).
- Envie index.html e a pasta assets inteira.
- A imagem da interface já está em assets/interface.png.
- As 4 páginas da carta já estão em assets/letter/page-1.png até page-4.png.

2) GOOGLE APPS SCRIPT (para as mensagens)
- Entre em https://script.google.com/ e crie um projeto novo.
- Apague o código inicial e cole TODO o conteúdo de Code.gs deste pacote.
- Clique em Implantar > Nova implantação.
- Tipo: Aplicativo da Web.
- Executar como: Eu.
- Quem tem acesso: Qualquer pessoa.
- Clique em Implantar e copie a URL que termina em /exec.
- Abra index.html e procure CONFIG.API_URL. Cole a URL entre aspas.
- Salve e envie o index.html novamente ao GitHub.

3) SENHA
A senha já está configurada no index.html como 25102008. Ela é pedida tanto para o livro quanto para a caneta.

4) CARTA
As 4 páginas do PDF que você havia enviado foram convertidas para PNG e já estão no pacote. Não é necessário colocar o PDF no GitHub.

5) CARREGAMENTO
A tela inicial permanece por 5 segundos e mostra “Um Ano Depois...” e “Feito por João Arthur.”.

6) IMPORTANTE
A imagem de fundo é somente a interface visual. Os pontos clicáveis são áreas invisíveis posicionadas sobre livro, caneta, calendário, globo e carro. Assim o cenário continua parecendo uma única imagem realista, mas os objetos continuam interativos.

7) SE VOCÊ TROCAR A IMAGEM
Mantenha o nome assets/interface.png e a mesma proporção 16:9. Se os objetos mudarem de lugar, será necessário ajustar os cinco hotspots no CSS do index.html.
