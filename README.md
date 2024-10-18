# Todo App

## Backend
- Go ile yazıldı
- HTTP sunucusu için `go run main.go` komutunu çalıştırın.

## Frontend
- Vue.js ile yazıldı
- Vue sunucusunu çalıştırmak için:
  ```bash
  cd frontend
  npm run serve

## Test
- Frontend Testleri
- Birim testlerini çalıştırmak için `npm run test:unit` komutunu çalıştırın.
- Contract testlerini çalıştırmak için `npm run test:contract`

## Dağıtım ve CI/CD
- Uygulama, Google Cloud VM üzerinde çalışmaktadır.
- Frontend, http://34.69.56.249:8081 adresinden erişilebilir.
- Backend, http://34.69.56.249:8080 adresinde çalışmaktadır.

## CI/CD Süreci
- CI/CD için GitHub Actions kullanılmıştır.
- Ana (master) branch'e yapılan her push, otomatik olarak dağıtımı tetiklemektedir.

## Mimari Kararlar
- Teknoloji Seçimi: Frontend için Vue.js ve backend için Go kullanılarak basit ve performanslı bir yapı oluşturuldu.
- Dağıtım: Google Cloud VM, dağıtım ve barındırma için seçildi.
- Testler: Frontend tarafında birim testler yazıldı 
