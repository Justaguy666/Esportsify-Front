# Hướng dẫn chạy Admin và User độc lập

Dự án Esportsify bao gồm 2 ứng dụng riêng biệt:
- **User App**: Next.js (React) - Port 3000
- **Admin App**: Express.js + Handlebars - Port 3001

## Cài đặt ban đầu

### 1. Cài đặt dependencies cho User app (Next.js)
```bash
npm install
```

### 2. Cài đặt dependencies cho Admin app (Express.js)
```bash
npm run install:admin
```

## Chạy ứng dụng

### Chạy User App (Next.js)
```bash
# Development mode
npm run dev:user

# Production mode  
npm run build
npm run start:user
```
User app sẽ chạy tại: http://localhost:3000

### Chạy Admin App (Express.js)
```bash
# Development mode (với nodemon)
npm run dev:admin

# Production mode
npm run start:admin
```
Admin app sẽ chạy tại: http://localhost:3001

### Chạy cả 2 ứng dụng cùng lúc
Mở 2 terminal riêng biệt:

**Terminal 1 (User):**
```bash
npm run dev:user
```

**Terminal 2 (Admin):**
```bash
npm run dev:admin
```

## Cấu trúc thư mục

```
├── app/
│   ├── admin/          # Express.js Admin App
│   │   ├── package.json
│   │   ├── index.js
│   │   ├── config/
│   │   ├── routes/
│   │   └── resources/
│   └── user/           # Next.js User Routes
├── components/         # React Components (User App)
├── package.json        # Main package.json (User App)
└── ...
```

## Ports
- User App: http://localhost:3000
- Admin App: http://localhost:3001

## Lưu ý
- Admin app có package.json riêng với dependencies của Express.js
- User app sử dụng package.json chính với dependencies của Next.js
- Cả 2 app có thể chạy đồng thời trên các port khác nhau
