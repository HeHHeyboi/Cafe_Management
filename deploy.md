# 📦 Deployment Guide

## 🛠️ Prerequisites

Ensure the following packages are installed on the server:

* `jdk21` – for running Java backend (e.g., Spring Boot)
* `nodejs` & `npm` – for frontend (e.g., React, Vue)
* `pm2` – for managing processes

---

## 🔐 Step 1: Login to the Server

```bash
ssh <username>@<ip-address>
```

---

## 📤 Step 2: Copy Files to Server

Use `scp` to transfer files from your local machine to the server:

```bash
scp <local-file> <username>@<ip-address>:<target-directory>
```

---

## 🚀 Step 3: Start Applications with PM2

### ➤ Start Spring Boot Backend

```bash
pm2 start "java -jar <file>.jar" --name "backend"
```

### ➤ Start Frontend (e.g., React)

```bash
pm2 start "npm run start" --name "frontend"
```

> ℹ️ You can check running processes with:
> `pm2 list`
> And logs with:
> `pm2 logs <process-name>`

---

## 🌐 Step 4: Expose Service via Cloudflare Tunnel (HTTPS)

### Option 1: Using Config File

```bash
cloudflared tunnel --protocol http2 run ./config.yml
```

### Option 2: Direct Port Mapping

```bash
cloudflared tunnel run http://localhost:<port>
```

> ✅ Now your service is securely exposed with HTTPS via Cloudflare.

---

## 📝 Notes

* PM2 will keep your services alive and restart them if the server reboots.
* Make sure your Cloudflare tunnel is correctly linked to a domain if using in production.
* You can save PM2 state using `pm2 save` and resurrect with `pm2 resurrect`.

---
