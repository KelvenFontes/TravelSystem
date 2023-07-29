<h1 align="center">✈️ TripsWise</h1>

![TripsWise](https://github.com/KelvenFontes/TravelSystem/assets/69438619/85bc744c-d70d-413a-a683-1ed2065a3a55)

## :page_with_curl: Sobre o Projeto

O TripsWise é um projeto que oferece aos viajantes uma plataforma completa para explorar o mundo de forma inteligente. Com uma interface responsiva e amigável, o TripsWise permite que os usuários descubram destinos turísticos incríveis, personalizem suas viagens de acordo com suas preferências, realizem reservas com segurança e autentiquem-se rapidamente usando o Google.

## :computer: Funcionalidades:

- [x] Explorar Destinos Turísticos 🌍: Navegue por uma ampla seleção de destinos e descubra atrações imperdíveis em cada local.
- [x] Planejar Viagens Personalizadas ✈️: Crie roteiros personalizados, ajustando opções de acordo com suas preferências e interesses.
- [x] Realizar Reservas Seguras 🔒: Faça reservas de forma rápida e segura, garantindo uma experiência tranquila ao planejar suas aventuras.
- [x] Autenticação Rápida com Google 📲: Acesse o TripsWise com apenas um clique, utilizando a autenticação fornecida pelo Google.
- [x] Interface Responsiva 🖥️: Desfrute de uma experiência perfeita em qualquer dispositivo, seja computador, tablet ou smartphone.
- [x] Pagamento Integrado com Stripe 💳: Aproveite um sistema de pagamento fácil e seguro, permitindo reservas com cartão de crédito e outras opções.

## 🚀 Desenvolvido com:

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

---

## Passo a passo de para execução:

1. Clone o repositório para sua máquina local usando o comando:
```bash
git clone https://github.com/KelvenFontes/TravelSystem.git
```

## Executando:
__Para começar, siga os passos abaixo para executar o TripsWise:__

1. Acesse a pasta do projeto:
```bash
cd tripswise
```

3. Instale as dependências necessárias para rodar a aplicação:
```bash
npm install
# or
yarn
```

2. Conecte-se ao banco de dados fornecendo sua CONNECTIONSTRING no arquivo .env. Usando o Supabase, utilize a seguinte conexão:
```bash
DATABASE_URL="postgres://postgres:<sua-senha>@db.<seu-cluster>.supabase.co:5432/postgres"
```

3. Conecte-se ao [Google Developer Console](https://console.cloud.google.com/cloud-resource-manager) e crie uma nova credencial, adicionado as chaves no arquivo .env:
```bash
GOOGLE_CLIENT_ID=<public-key>
GOOGLE_CLIENT_SECRET=<secret-key>
```

4. Conecte-se ao [Stripe](https://stripe.com/br) passando as chaves de acesso no arquivo .env para poder ser feita a conexão:
```bash
NEXT_PUBLIC_STRIPE_KEY=<public-key>
STRIPE_SECRET_KEY=<secret-key>
STRIPE_WEBHOOK_SECRET_KEY=<secret-key-webhook>
```

5. Conecte-se ao [NextAuth.js]([https://generate-secret.vercel.app/32](https://next-auth.js.org/deployment)) e adicione sua chave secreta no arquivo .env:
```bash
NEXTAUTH_SECRET=<secret-key>
```

6. Adicione a linha abaixo no arquivo .env e quando o pagamento for realizado com sucesso, será direcionado a essa página:
```bash
HOST_URL=http://localhost:3000/my-trips
```

4. Realize o build:
```bash
npm run build
# or
yarn build
```

5. Agora, inicie (ele estará disponível em http://localhost:3000/):
```bash
npm start
# or
yarn start
```

Alternativa: Caso quiser rodar em ambiente de desenvolvimento (ele estará disponível em http://localhost:3000/):
```bash
npm run dev
# or
yarn dev
```

Agora você pode executar o TripsWise em sua máquina e começar a utilizar a aplicação!

Feito por Kelven Fontes :wave: [LinkedIn](https://www.linkedin.com/in/kelven-bento-fontes-4ab2b2210)!
