你是一名资深全栈工程师，请帮我从0开发一个网站项目，项目名称为：
A股热点情报与全球事件日历系统
一、项目目标
我要做一个面向中国A股投资者的信息监控网站，用来收集、整理和展示可能影响A股、港股、美股以及全球市场的重要信息。
这个项目也是我的 Vibe Coding 实习作品集项目，所以请在开发过程中让我尽可能掌握以下能力：
1. 前端开发：HTML、CSS、JavaScript、React、Next.js、Tailwind CSS
2. 后端开发：API Routes、数据采集、数据清洗、JSON处理
3. 数据库：Supabase / PostgreSQL
4. 部署：Vercel
5. Git：提交代码、分支管理、PR思路
6. AI开发工作流：使用 Codex 辅助开发、调试、重构、生成文档
二、技术栈要求
请优先使用以下技术栈：
* Next.js
* React
* TypeScript
* Tailwind CSS
* Supabase
* PostgreSQL
* Vercel
* 可选：shadcn/ui
* 可选：ECharts 或 Recharts
请使用清晰的项目结构，适合部署到 Vercel。
三、核心功能模块
模块一：A股热点情报中心
功能说明：
收集可能影响A股市场的热点信息、热门题材和政策方向。
信息来源参考：
1. 国家发展改革委：
    * https://www.ndrc.gov.cn/xwdt/
    * https://www.ndrc.gov.cn/xxgk/
2. 财经媒体和题材参考：
    * 同花顺题材分类
    * 开盘啦题材分类
    * 财联社电报
    * X/Twitter财经信息
3. 社交媒体情绪参考：
    * 抖音财经博主
    * 抖音百万粉丝博主
    * 小张校长吃饭用缸/洗头哥这类财经传播账号
    * 宝妈群体、散户群体关注的股票和板块
注意：
第一版不要强制真实爬取所有平台数据，可以先使用 Mock 数据。请把数据结构设计好，后续方便替换成真实API或爬虫。
热点信息字段包括：
* id
* title：热点标题
* source：信息来源
* category：题材分类，例如 AI算力、低空经济、机器人、半导体、新能源、军工、消费、医药、国企改革等
* marketImpact：影响市场，例如 A股、港股、美股、全球
* relatedStocks：相关股票
* relatedSectors：相关板块
* sentimentScore：热度分数，0-100
* importanceLevel：重要程度，低/中/高
* summary：简短摘要
* publishedAt：发布时间
* sourceUrl：来源链接
页面要求：
* 热点列表
* 按题材分类筛选
* 按重要程度筛选
* 按来源筛选
* 显示热度分数
* 显示相关板块和股票
* 支持搜索
* 支持按发布时间排序
模块二：全球市场事件日历
功能说明：
以日历形式展示当月重要事件，这些事件可能影响A股、港股、美股和全球市场。
事件类型包括：
1. A股市场事件
    * 新股IPO
    * 股指期货交割日
    * 重要经济数据发布
    * 重要政策会议
    * 证监会/交易所政策发布
2. 港股市场事件
    * 港股IPO
    * 重要公司财报
    * 南向资金相关事件
3. 美股市场事件
    * 美联储议息会议
    * CPI、PCE、非农数据
    * 英伟达、苹果、特斯拉、微软、谷歌等公司发布会或财报
    * 重要IPO
4. 全球事件
    * 世界杯、奥运会等大型赛事
    * 地缘政治事件
    * 国际能源会议
    * 重要科技发布会
    * AI、芯片、机器人、新能源相关大会
事件字段包括：
* id
* date：日期
* title：日历上显示的简短文字
* fullTitle：完整事件标题
* eventType：事件类型
* market：影响市场
* importanceLevel：低/中/高
* relatedSectors：相关板块
* relatedStocks：相关股票
* description：事件说明
* expectedImpact：可能影响
* source：来源
* sourceUrl：链接
页面要求：
* 月历视图
* 支持切换月份
* 每个日期格子显示简短事件文字
* 点击事件后弹出详情
* 按市场筛选：A股、港股、美股、全球
* 按重要程度筛选
* 重点事件使用明显标识
* 右侧显示本月重点事件列表
模块三：数据采集与管理
第一版使用 Mock 数据。
但请设计后端接口，方便以后接入真实数据源。
需要实现以下 API Routes：
1. GET /api/hot-topics返回热点题材列表
2. GET /api/hot-topics/:id返回单个热点详情
3. GET /api/events根据月份返回事件日历数据
4. GET /api/events/:id返回单个事件详情
5. POST /api/admin/hot-topics新增热点信息
6. POST /api/admin/events新增事件
后续真实数据源预留：
* NDRC政策信息抓取
* 财联社信息抓取
* 同花顺/开盘啦题材分类手动录入或API化
* X/Twitter信息采集
* 抖音热门内容人工录入或半自动整理
模块四：后台管理页面
请增加一个简单后台页面：
路径：
/admin
功能：
* 新增热点信息
* 新增事件
* 查看已有热点
* 查看已有事件
* 删除或编辑数据
第一版可以直接操作 Mock 数据或本地状态，后续再接 Supabase。
模块五：数据库设计
请给我设计 Supabase/PostgreSQL 表结构。
至少包含：
1. hot_topics 表
2. market_events 表
3. sources 表
4. sectors 表
5. stocks 表
6. topic_stock_relations 表
7. event_stock_relations 表
请给出 SQL 建表语句。
模块六：UI设计要求
整体风格：
Bloomberg Terminal + 同花顺专业版 + TradingView Dark 混合风格。
视觉要求：
* 深色背景
* 高信息密度
* 金融终端风格
* 卡片式布局
* 清晰的日历
* 热点标签明显
* 重要事件高亮
* 使用红绿表示市场情绪，但不要过度刺眼
* 适配移动端和桌面端
页面结构：
1. 首页 Dashboard
    * 今日重点热点
    * 今日重点事件
    * 热门题材排行
    * 市场影响概览
2. 热点题材页 /topics
    * 热点列表
    * 筛选器
    * 搜索框
3. 事件日历页 /calendar
    * 月历
    * 月份切换
    * 事件弹窗详情
4. 后台管理页 /admin
模块七：开发方式要求
请你按阶段开发，不要一次性生成不可维护的大代码。
请按照以下顺序执行：
第一阶段：
* 创建 Next.js 项目结构
* 配置 TypeScript 和 Tailwind
* 创建基础布局
* 创建 Mock 数据
第二阶段：
* 完成首页 Dashboard
* 完成热点题材页面
* 完成事件日历页面
第三阶段：
* 编写 API Routes
* 前端从 API 获取数据
* 不再直接读取 Mock 数据
第四阶段：
* 设计 Supabase 数据库表
* 给出 SQL
* 预留 Supabase 客户端代码
第五阶段：
* 创建后台管理页面
* 支持新增热点和事件
第六阶段：
* 优化UI
* 检查移动端适配
* 添加 README
* 添加部署说明
* 添加 Git 提交建议
模块八：代码质量要求
请保证：
* 组件拆分清晰
* 类型定义完整
* 不要把所有代码写在一个文件里
* 每个页面都有清晰注释
* Mock 数据结构接近真实业务
* API 返回格式统一
* 错误处理完整
* README 写清楚如何运行、如何部署、如何接入 Supabase
九、面试展示要求
请额外帮我生成：
1. README.md
2. 项目介绍文案
3. 面试时讲解这个项目的回答模板
4. GitHub提交记录建议
5. 后续可扩展功能清单
项目介绍重点突出：
这是一个使用 AI Coding 工作流开发的 A股热点情报 + 全球市场事件日历系统。
它体现了我对以下能力的掌握：
* 前端页面开发
* 后端 API 设计
* 数据结构设计
* Supabase 数据库设计
* Vercel 部署
* GitHub 项目管理
* AI 辅助开发
* 金融信息产品理解
十、请先输出开发计划
在正式写代码前，请先输出：
1. 项目架构
2. 文件目录结构
3. 数据模型
4. 页面规划
5. API规划
6. 开发步骤

