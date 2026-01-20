#!/bin/bash

# 批量替换 SettingsDialog.tsx 中的硬编码文本为翻译函数

FILE="/Users/rocalight/Desktop/All in one Data/01_PROJECTS/openwork/apps/desktop/src/renderer/components/layout/SettingsDialog.tsx"

# Cloud Providers 部分
sed -i '' 's/Select a cloud AI model\. Requires an API key for the provider\./\{t('\''settings.model.cloud.description'\'')\}/g' "$FILE"
sed -i '' 's/>Select a model\.\.\.</>{\t('\''settings.model.cloud.selectModel'\'')}</g' "$FILE"

# Local Models 部分
sed -i '' 's/Connect to a local Ollama server to use models running on your machine\./\{t('\''settings.model.local.description'\'')\}/g' "$FILE"
sed -i '' 's/>Ollama Server URL</>\{t('\''settings.model.local.serverUrl'\'')\}</g' "$FILE"
sed -i '' 's/>\{testingOllama \? '\''Testing\.\.\.'\'' : '\''Test'\''\}</>\{testingOllama ? t('\''settings.model.local.testing'\'') : t('\''settings.model.local.test'\'')\}</g' "$FILE"

# LiteLLM 部分
sed -i '' 's/>LiteLLM Proxy URL</>\{t('\''settings.model.proxy.litellm.proxyUrl'\'')\}</g' "$FILE"
sed -i '' 's/>API Key (Optional)</>\{t('\''settings.model.proxy.litellm.apiKey'\'')\}</g' "$FILE"
sed -i '' 's/placeholder="http:\/\/localhost:4000"/placeholder="http:\/\/localhost:4000"/g' "$FILE"
sed -i '' 's/>\{testingLitellm \? '\''Connecting\.\.\.'\'' : '\''Test Connection'\''\}</>\{testingLitellm ? t('\''settings.model.proxy.litellm.connecting'\'') : t('\''settings.model.proxy.litellm.testConnection'\'')\}</g' "$FILE"

# Developer 部分
sed -i '' 's/>Developer</>\{t('\''settings.developer.title'\'')\}</g' "$FILE"
sed -i '' 's/>Debug Mode</>\{t('\''settings.developer.debugMode'\'')\}</g' "$FILE"

# About 部分
sed -i '' 's/>About</>\{t('\''settings.about.title'\'')\}</g' "$FILE"

echo "批量替换完成！"
