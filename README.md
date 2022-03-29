# automato

como usar:

1) baixe os arquivos desse repositório.
2) abra a index.html.
3) escolha o arquivo arquivo.txt que vem junto com a index.
4) modifique o arquivo como quiser.

gramática utilizada:

G={V,T,P,S}

V = {<letras>, <inteiros>, <reais>, <pReservadas>, <comentário>}

T = {A-Z, a-z, 0-9, 0.0-99.99,//,int, double, float, real, break, case, char, const, continue}

P = {
<identificador> ::= <letras> | <pReservadas> | <comentários> | <inteiros> | <reais>
<comentários> ::= //<identificador>
<letras> ::= a-z | A-Z | a-z<letras> | A-Z<letras> | a-z<inteiros> | A-Z<inteiros> |  a-z<comentários> | A-Z<comentários>
<inteiros> ::= 0-99 | 0-99<inteiros> | 0-99<comentários>
<reais> ::= 0.0-99.99 | 0.0-99.99<comentários>
<pReservadas> ::= int<comentários> | double<comentários> | float<comentários> | real<comentários> | break<comentários> | case<comentários> | char<comentários> | const<comentários> | continue<comentários>
}

S = <identificador>
