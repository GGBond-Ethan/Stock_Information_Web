# A股热点情报与全球事件日历系统

面向中国 A股投资者的信息监控网站，用来展示可能影响 A股、港股、美股和全球市场的热点题材、政策方向和重要事件。

## 技术栈

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Recharts
- API Routes
- Supabase/PostgreSQL 预留
- Vercel 部署友好

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 页面

- `/`：Dashboard，展示今日重点热点、近期事件、题材排行和市场影响概览。
- `/topics`：热点题材页，支持搜索、分类筛选、来源筛选、重要程度筛选和排序。
- `/calendar`：全球市场事件日历，支持月份切换、市场筛选、重要程度筛选和详情弹窗。
- `/admin`：后台管理页，第一版使用本地状态模拟新增、编辑和删除。

## API

- `GET /api/hot-topics`
- `GET /api/hot-topics/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/admin/hot-topics`
- `POST /api/admin/events`

统一响应格式：

```ts
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};
```

## Supabase 接入

1. 在 Supabase 创建项目。
2. 推荐使用 `supabase/migrations/` 下的 SQL 文件管理数据库结构和后台写入 RPC。
3. 可在 SQL Editor 执行 `supabase/seed.sql` 导入演示数据。
4. 在 Vercel 或本地 `.env.local` 添加：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的 Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 Supabase anon key
ADMIN_API_TOKEN=后台写入口令
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase service role key（可选）
```

生产环境会优先读取 Supabase；本地缺少 Supabase 环境变量时会自动回退 Mock 数据。后台写入优先使用 `SUPABASE_SERVICE_ROLE_KEY`，没有 service role 时会走受 `ADMIN_API_TOKEN` 保护的 Supabase RPC。

## 部署到 Vercel

1. 将代码推送到 GitHub。
2. 在 Vercel 导入仓库 `GGBond-Ethan/Stock_Information_Web`。
3. Framework Preset 选择 Next.js。
4. Build Command 使用 `npm run build`。
5. 添加 Supabase 和后台环境变量：

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
ADMIN_API_TOKEN
SUPABASE_SERVICE_ROLE_KEY（可选）
```

6. 点击 Deploy。
7. 部署后访问 `/api/hot-topics` 和 `/api/events?month=2026-05` 验证数据来源。

## 后台写入说明

`/admin` 页面新增热点或事件时，需要填写管理员写入口令。该口令必须和 Vercel 环境变量 `ADMIN_API_TOKEN` 一致。口令只保存在当前浏览器 `localStorage`，不会写入代码仓库。

注意：`SUPABASE_SERVICE_ROLE_KEY` 如需使用，只能配置在 Vercel 环境变量中，不要以 `NEXT_PUBLIC_` 开头，也不要暴露到前端。

## 项目亮点

- 使用 AI Coding 工作流，从 AGENTS.md 产品说明到计划再到实现。
- 用 TypeScript 明确建模热点、事件、股票、板块和来源。
- 用 API Routes 隔离数据访问，方便从 Mock 数据迁移到真实数据源。
- 用深色金融终端风格实现高信息密度页面。
- 包含数据库 SQL、作品集介绍、面试讲解和 GitHub 提交建议。

## 免责声明

本项目数据均为演示用途 Mock 数据，不构成任何投资建议。
