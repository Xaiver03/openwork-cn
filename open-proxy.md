从26年2月开始将进行以下调整：
1. 取消小组账号：为了更方便管理，将逐步取消小组账号，后续统一使用个人账号。
2. 个人默认额度为100美元：由于cc组（claude code）费率已经足够低（0.05倍率），100美元已经完全能够满足个人使用。
代理平台地址：https://openai-proxy.miracleplus.com/

个人账号每月额度为: 100美元（每月1号重置额度）

额度不够用？👇 以下有两种解决方案。
提高额度申请
兑换码自助扩额（使用后的兑换码请将使用人标记为自己）
其它问题请联系：@张鹏 @郑诚 

个人账号只用于本地环境或者测试环境使用，如有正式项目及长期使用需求请联系@张鹏 @郑诚 创建独立的key或账号，以免占用个人额度。

账号开通申请
暂时无法在飞书文档外展示此内容

聊天
操练场
平台中内置了操练场功能，可用于开发调试、参数验证等，具体使用请自行探索，界面如下图：
[图片]

第三方聊天平台及工具
在平台左侧导航栏下 > 聊天中，内置了Cherry Studio/Lobe Chat/AI as Workspace/AMA 问天/OpenCat等第三方聊天工具使用，具体使用自行探索。
[图片]

令牌（API KEY）
先通过账号密码登陆至OpenaiProxy平台
创建新的令牌
小组内成员使用，可以考虑给每个人单独创建令牌也可共用一个令牌。
具体怎么分配看组长安排。
依次点击左侧导航栏下 > 令牌管理 > 添加令牌，如下图。
[图片]
https://miracleplus.feishu.cn/sync/HJW4dCiHPsHp4Lb836PcbT66nNc
在弹出的“创建新的令牌”抽屉中补充令牌信息（名称/分组/过期时间/数量/额度/模型限制等），如下图。
[图片]
接入新模型
暂时无法在飞书文档外展示此内容
通过以上“新模型接入申请”表进行申请，接入完成后会有飞书通知提示。
模型广场
模型广场地址： https://openai-proxy.miracleplus.com/pricing
需要使用什么模型可以自行到模型广场中搜索，然后通过模型名去使用即可。
[图片]

---

Claude Code 使用
key(令牌)请使用cc分组。
~/.claude/settings.json
    {
  "env": {
    "ANTHROPIC_API_KEY": "你的key",
    "ANTHROPIC_BASE_URL": "https://openai-proxy.miracleplus.com"
  }
}
项目根目录下 /.claude/settings.local.json 也可以

通过GLM Code模型使用Claude Code 
Claude Code GLM备用方案使用

---
Codex 使用
key(令牌)请使用cc分组。
修改 ~/.codex/config.toml 和 ~/.codex/auth.json 文件。
model_provider = "openaiproxy"
model = "gpt-5-codex" 
model_reasoning_effort = "high"

[model_providers.openaiproxy]
name = "openaiproxy"
base_url = "https://openai-proxy.miracleplus.com/v1"
wire_api = "responses"
{
  "OPENAI_API_KEY": "你的key"
}

---
OpenAI SDK使用
key(令牌)请使用 default 分组。
环境变量方式：
OPENAI_API_BASE=https://openai-proxy.miracleplus.com/v1
OPENAI_API_KEY=你的令牌
代码方式：
import openai

# 代码方式一
openai.api_base = "https://openai-proxy.miracleplus.com/v1"
openai.api_key = "你的令牌"

# 代码方式二
client = OpenAI(
    base_url="https://openai-proxy.miracleplus.com/v1",
    api_key="你的令牌",
)

Anthropic SDK使用
key(令牌)请使用 default 分组。
环境变量方式：
ANTHROPIC_BASE_URL=https://openai-proxy.miracleplus.com
ANTHROPIC_API_KEY=你的令牌
代码方式：
# 代码方式
import anthropic

client = anthropic.Anthropic(
    base_url="https://openai-proxy.miracleplus.com",
    api_key="你的令牌",
)

Gemini SDK使用
key(令牌)请使用 default 分组。
环境变量方式（部分支持）：
某些情况下，Google API 客户端会读取环境变量 GOOGLE_API_BASE 或 GOOGLE_CLOUD_API_ENDPOINT 来覆盖默认端点。你可以尝试设置环境变量：
GOOGLE_API_BASE=https://openai-proxy.miracleplus.com
GEMINI_API_KEY=你的令牌
代码方式：
from google import genai
from google.genai.types import HttpOptions

client_options = HttpOptions(base_url="https://openai-proxy.miracleplus.com")
client = genai.Client(
    api_key="你的令牌",
    http_options=client_options,
)

response = client.models.generate_content(
    model="google/gemini-2.5-flash", contents="Explain how AI works in a few words"
)
print(response.text)

FQA
1. Claude code配置key后，key一直未生效。
[图片]
在config里把use custom api key改为true
