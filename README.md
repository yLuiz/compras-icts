# Compras ICTS

Sistema de controle de compras, sugerido como teste técnico pelo Grupo ICTS.

# 🖼 Front-end

## 💻 Tecnologias
* Angular 14+
* PrimeNG
* Node.js
* Typescript

## ⚙ Configuração
Para conseguir rodar o Front-end, você precisa ter instalado o Node.js e Angular 14.x.
Após isso, clone o repositório e entre na pasta `./WebCompras` e execute o seguinte comando para instalar as dependências do projeto:

``` bash
$ npm install
```
* Obs: Vale lembrar que o Backend precisa está configurado e ligado para a aplicação funcionar

## 🚀 Executando
Após a instalação das dependências, execute o seguinte comando:

``` bash
$ npm start
```

Depois é só acessar em sua máquina o seguinte endereço: `http://localhost:4200/`

# 📡 Back-end

# 💻 Tecnologias
* C#
* ASP .NET 6
* Entity Framework Core
* SQLite

## ⚙ Configuração
Para conseguir rodar o Backe-end, você precisa ter instalado o .NET 6 e o Entity Framework Core em sua máquina.
Após isso, clone o repositório e entre na pasta `./Compras` e execute o seguinte comando para buildar a aplicação:

``` bash
// Limpa o cache
$ dotnet clean

// Builda a aplicação
$ dotnet build
```

Você também precisa "subir" as tabelas configuradas para o Banco, mas antes você deve instalar o CLI do .NET Core, então execute o seguinte comando:

``` bash
$ dotnet tool install --global dotnet-ef
```

Após isso, atualize o banco executando o comando:

``` bash
$ dotnet ef database update
```


## 🚀 Executando
Após a configurção, execute o seguinte comando:

``` bash
$ dotnet run

// Ou para executar o "Hot Reload"
$ dotnet watch run

```

## 🔀 Rotas
Para saber quais as rotas existentes, acesse: `https://localhost:7172/swagger/index.html`

# Observações

* Neste projeto, utilizei no backend um Design Pattern conhecido como IoC (Inversion of Controll) e para sua implementação utilizei a técnica conhecida como Dependency Injection, que representa a letra D do conhecido SOLID.
* Caso haja alguma coisa que eu possa melhorar no sistema, estarei totalmento aberto a criticas. Afinal, assim posso melhorar minhas habilidades no desenvolvimento.
* Qualquer dúvida em relação ao teste, entre em contato via email: luizvictor1231@gmail.com


