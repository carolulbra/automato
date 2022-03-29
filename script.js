document.getElementById('file').onchange = function(){ //ler elemento html com ID==file
    var file = this.files[0]; //declaração variável file que vai receber o arquivo carregado no input
    var reader = new FileReader(); //declaração variável reader que tem método FileReader para ler arquivo
    reader.onload = function(progressEvent){   //inicia variavel reader com uma função  
        var fileContentArray = this.result.split(/\r\n|\n/); //variavel fileContentArray que é um array onde cada valor é uma linha do arquivo. pega o resultado do arquivo e divide ele quanto achar \n ou quebra de linha
        var error = new Array(); //erros
        var id = new Array(); //identificadores
        let i = 0;                        
        document.write("ARQUIVO CARREGADO: <br>");
        for(var line = 0; line < fileContentArray.length; line++){ //laço for para ler cada linha. começa com a linha 0 até ser menor que o tamanho do array de fileContentArray
            document.write("["); //por algum motivo precisa ser separado do resto. há coisas na vida de programador que só aceitamos
            document.write(line+1 +"] "+ fileContentArray[line] + "<br>"); //mostra conteúdo
        }
        document.write("<br>");
        document.write("Tokens de Entrada: <br>");
        for(var line = 0, j = 0; line < fileContentArray.length; line++){ //laço for para ler cada linha. começa com a linha 0 até ser menor que o tamanho do array de fileContentArray
            let word = fileContentArray[line];//word recebe a linha
            let pattern = /^int$|^double$|^float$|^real$|^break$|^case$|^char$|^const$|^continue$/;//expressão regular para palavras reservadas
            let result = pattern.test(word);//result é um valor true ou false, se word estiver dentro da expressão regular result será true
            if(result){//se result for true
                document.write("["); //por algum motivo precisa ser separado do resto. há coisas na vida de programador que só aceitamos
                document.write(line+1 +"] "+ word.toUpperCase() + "<br>");//imprime na tela a palavra reservada em letras maiusculas
            }else if(!result){//se result for false
                pattern = /^[a-zA-Z]+$|^[a-zA-Z]+[/]{2}$|^[a-zA-Z]+\s[/]{2}$|^[a-zA-Z]+[0-9]+$|^[a-zA-Z]+[0-9]+\s[/]{2}$|^[a-zA-Z]+[0-9]+[/]{2}$/;//expressão regular para identificadores iniciados por letra podendo ter números e comentários
                result = pattern.test(word);//testa se word está dentro da expressão regular
                if(result){//se sim
                    let l = id.length;//l recebe o tamanho do array id
                    if(l == 0)//se o array está vazio
                        id[0] = word;//o array id indice 0 recebe a word
                    else{//se não
                        for(i = 0; i <= l; i++){//laço para passar em todo o array id
                            if(word == id[i])//verifica se a word é igual ao dado no array indice i
                                break;//se sim sai do laço
                            else if(i == l){//se não, se passou no último dado do array
                                word = word.replace(/[/]/g, "");//retira qualquer comentário que tiver
                                id[i] = word;//id recebe a word
                                break;//sai do laço
                            }
                        }
                    }
                    i++;//i recebe +1 pois a array começa em 0 e precisamos deixar bonito
                    document.write("["); //por algum motivo precisa ser separado do resto. há coisas na vida de programador que só aceitamos
                    document.write(line+1 +"] IDENTIFICADOR "+ i + "<br>");//imprime na tela o identificador e o seu número dentro do array+1 (i+1)
                }else{
                    pattern = /^[0-9]{1,2}[.][0-9]{1,2}$|^[0-9]{1,2}[.][0-9]{1,2}[/]{2}|^[0-9]{1,2}[.][0-9]{1,2}\s[/]{2}/;//expressão regular de números reais com comentários
                    result = pattern.test(word);//testa se word está dentro da expressão regular
                    if(result){//se sim
                        let l = id.length;
                        if(l == 0)
                            id[0] = word;
                        else{
                            for(i = 0; i <= l; i++){
                                if(word == id[i])
                                    break;
                                else if(i == l){
                                    word = word.replace(/[/]/g, "");
                                    id[i] = word;
                                    break;
                                }
                            }
                        }
                        i++;
                        document.write("["); //por algum motivo precisa ser separado do resto. há coisas na vida de programador que só aceitamos
                        document.write(line+1 +"] NÚMERO REAL " + i + "<br>");//imprime numero real com id do array+1                         
                    }else{
                        pattern = /^[0-9]{1,2}$|^[0-9]{1,2}\s[/]{2}|^[0-9]{1,2}[/]{2}/;//expressão regular de números inteiros
                        result = pattern.test(word);
                        if(result){
                            let l = id.length;
                            if(l == 0)
                                id[0] = word;
                            else{
                                for(i = 0; i <= l; i++){
                                    if(word == id[i])
                                        break;
                                    else if(i == l){
                                        word = word.replace(/[/]/g, "");
                                        id[i] = word;
                                        break;
                                    }
                                }
                            }
                            i++;
                            document.write("["); //por algum motivo precisa ser separado do resto. há coisas na vida de programador que só aceitamos
                            document.write(line+1 +"] NÚMERO INTEIRO " + i + "<br>");//imprime numeros inteiros
                        }else{
                            pattern = /^[/]{2}/;//expressão regular para comentários
                            result = pattern.test(word);
                            if(result){
                                document.write("["); //por algum motivo precisa ser separado do resto. há coisas na vida de programador que só aceitamos
                                document.write(line+1 +"] COMENTÁRIO <br>");//imprime comentário
                            }else{
                                error[j] = line+1 + " (" + word + ")";//se não caiu em nenhuma expressão regular é um erro, então adiciona word dentro da array errorf
                                j++;
                            }
                        }
                    }
                }
            }
        }
        document.write("<br>");//quebra linha
        let l = id.length; //l recebe tamanho do array id
        document.write("Tabela de Símbolos: <br>");//imprime
        for(i = 0, j = 1; i < l; i++, j++)//laço para passar no id
            document.write(j + "- " + id[i] + "<br>");//imprimir simbolos do laço
        document.write("<br>");//quebra de linha
        if(error){//se tem erro
            document.write("Erros nas linhas: <br>");//imprime
            for(i = 0; i < error.length; i++)//laço para passar no error
                document.write(error[i] + "<br>");//imprime erros
        }
    };
    reader.readAsText(file); //chamando função de leitura do arquivo com o arquivo que foi enviado no input
};