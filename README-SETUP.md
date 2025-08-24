# Esportsify - Setup Guide

Dự án Esportsify bao gồm 2 ứng dụng riêng biệt:
- **User App**: Next.js (React) - Port 3000
- **Admin App**: Express.js + Handlebars - Port 3001

## 🚀 Quick Setup (Cho người clone dự án)

### 1. Clone repository
```bash
git clone <repository-url>
cd esportsify
```

### 2. Cài đặt tất cả dependencies
```bash
npm run setup
```
Script này sẽ tự động cài đặt dependencies cho cả User và Admin app.

### 3. Cấu hình Environment Variables

#### User App (.env.local)
```bash
cp env.example .env.local
```
Chỉnh sửa `.env.local` với thông tin của bạn.

#### Admin App (.env)
```bash
cp app/admin/.env.example app/admin/.env
```
**QUAN TRỌNG**: Cập nhật `MONGODB_URI` trong `app/admin/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### 4. Chạy ứng dụng

#### Chạy User App (Next.js)
```bash
npm run dev:user
```
→ http://localhost:3000

#### Chạy Admin App (Express.js)
```bash
npm run dev:admin
```
→ http://localhost:3001

#### Chạy cả 2 cùng lúc
Mở 2 terminal:
```bash
# Terminal 1
npm run dev:user

# Terminal 2  
npm run dev:admin
```

## 📋 Scripts có sẵn

```bash
npm run setup          # Cài đặt tất cả dependencies
npm run dev:user       # Chạy User app (Next.js)
npm run dev:admin      # Chạy Admin app (Express.js)
npm run start:user     # Production User app
npm run start:admin    # Production Admin app
npm run install:admin  # Chỉ cài dependencies cho Admin
```

## 🗂️ Cấu trúc dự án

```
├── app/
│   ├── admin/          # Express.js Admin App
│   │   ├── .env.example
│   │   ├── package.json
│   │   ├── index.js
│   │   ├── config/
│   │   ├── routes/
│   │   └── resources/
│   └── user/           # Next.js User Routes
├── components/         # React Components (User App)
├── env.example         # User app environment template
├── package.json        # Main package.json (User App)
└── README-SETUP.md     # This file
```

## ⚙️ Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **MongoDB**: Local hoặc MongoDB Atlas

## 🔧 Troubleshooting

### MongoDB Connection Issues
1. Kiểm tra `MONGODB_URI` trong `app/admin/.env`
2. Đảm bảo MongoDB service đang chạy (nếu dùng local)
3. Kiểm tra IP whitelist trên MongoDB Atlas
4. Thử với local MongoDB: `mongodb://localhost:27017/esportsify_web`

### Port Conflicts
- User app: Port 3000
- Admin app: Port 3001
- Thay đổi port trong `app/admin/index.js` nếu cần

### Dependencies Issues
```bash
# Xóa node_modules và cài lại
rm -rf node_modules app/admin/node_modules
npm run setup
```

## 📝 Lưu ý quan trọng

- File `.env` không được commit vào git
- Admin app cần MongoDB connection để hoạt động
- Cả 2 app có thể chạy đồng thời
- User app sử dụng Next.js 15 với React 19
- Admin app sử dụng Express.js với Mongoose
