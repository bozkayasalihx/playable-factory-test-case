# playable factory test case 🚀

## Installation

Install my-project with yarn

.env.example dosyasini .env dosyasina cevirin

```bash
    mv .env.example .env
```

burada onemli olan image ve dosyalar aws s3 uzerinde tutuldugu icin

```bash
    email deki access key ve secret keyleri .env icindeki gerekli yerlere yapistirin

```

sonrasinda database acilmasi lazim

```bash
    docker compose up -d
```

diyerek postgrse db ayaga kaldirin

daha sonrasinda

```bash

  yarn install my-project
  cd my-project

  yarn install yada npm install

```

yaparak gerekli paketleri kurun

ardindan

```bash
  root dizinde yarn dev yada npm run dev demeniz yeterli

```

app monorepo mimarisyle yazildigi icin ayri ayri hem client hemde server' ayaga kaldirmania gerek yok

default olarak client server

```bash
    client => localhost:3000
    server => localhost:8081
```
