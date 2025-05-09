# Node.js base image kullan
FROM node:alpine

# Uygulama için çalışma dizini oluştur
WORKDIR /usr/src/app

# Uygulama dosyalarını konteynıra kopyala
COPY . /usr/src/app

# Global Angular CLI yükle
RUN npm install -g @angular/cli

# Uygulama bağımlılıklarını yükle
RUN npm install

# Uygulama için geliştirme ortamında çalışacak komut
CMD ["ng", "serve", "--host", "0.0.0.0"]
