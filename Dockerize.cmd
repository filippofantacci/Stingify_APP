call docker build -t stingify/stingify-app .
@REM docker build -t filippofantacci/stingify-app:versione1.6 .

@REM call docker run --name  stingify-app -p 4200:80 stingify/stingify-app 

call docker run --name  stingify-app -p 4200:80 stingify/stingify-app 