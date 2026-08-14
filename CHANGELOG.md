# v1.18.0

- O acervo inicial do Antes e Depois agora usa exclusivamente os 8 arquivos já enviados ao bucket público `before-after`.
- O botão "Importar acervo inicial" valida a existência dos arquivos no Storage antes de cadastrar os casos.
- Registros antigos que apontavam para `/img/resultados/...` são atualizados para as URLs públicas do Supabase Storage.
- A importação não duplica casos já cadastrados.
- Corrigido o fluxo da Server Action para não capturar o `redirect()` dentro de `try/catch`, evitando o erro de servidor observado no POST.
- Painel Vital atualizado para exibir `v1.18`.

# v1.17.0

- Corrige o acervo inicial do Antes e Depois para usar as imagens estáticas já incluídas em `public/img/resultados/`.
- Não tenta buscar nem fazer upload dessas 8 imagens no Supabase Storage.
- Corrige os caminhos do acervo para `/img/resultados/...`.
- Mantém `image_url` como o campo principal e compatibilidade com `before_url`/`after_url`.
- Migration idempotente para preparar o banco e cadastrar os 8 casos.

# Changelog

## v1.16 — Correção do schema Antes e Depois
- Corrigida a importação do acervo inicial quando `before_url` e `after_url` antigos ainda são NOT NULL.
- O novo formato continua usando uma única `image_url`; os campos antigos ficam opcionais.
- Novos casos gravam `image_url` e também os campos legados para compatibilidade.


## v1.14 — Identificação da versão no Painel Vital
- Atualizada a versão do projeto para 1.14.0.
- Exibida a versão `v1.14` no cabeçalho do Painel Vital.
- Mantidas todas as funcionalidades e correções da v1.13.

## 1.9.0
- Corrige a galeria Sobre para renderizar a foto sem Reveal/opacity animation.
- Corrige Analytics Cloudflare para consultar o dataset RUM no escopo da conta.
- Usa CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_ANALYTICS_API_TOKEN e filtra pelo host adrielyanute.com.br.
- Exibe a mensagem real retornada pela GraphQL em caso de erro.

1.7.0
- Corrigida a imagem da seção Sobre para carregamento direto do asset público.
- Mantida a separação entre token de deploy e token da GraphQL Analytics API.

# Changelog

## 1.6.0
- Antes e Depois passou a usar uma única imagem 1:1 contendo o antes e o depois.
- Painel administrativo atualizado para upload de uma única imagem.
- Galeria da home e página `/resultados` atualizadas para o formato 1:1.
- Incluído acervo inicial com 8 imagens do site de referência em `public/resultados/acervo`.
- Incluído botão no painel para importar o acervo inicial para o Supabase.
- Mantidos os campos antigos `before_url` e `after_url` para compatibilidade com registros existentes.

## 1.8.0
- Fixed the Sobre portrait using a bundled static image import.
- Improved Cloudflare Web Analytics GraphQL query with typed variables and diagnostics.

## 1.11.0
- Adiciona painel para trocar as fotos do Hero e da seção Sobre.
- Salva as URLs das imagens no Supabase em `site_settings`.
- Adiciona bucket público `site-assets` para imagens editáveis do site.
- Mantém fallbacks locais caso as imagens ainda não tenham sido configuradas.

## v1.13 — Acervo inicial de resultados corrigido
- Corrigido o botão "Importar acervo inicial": as 8 imagens agora existem nos caminhos públicos usados pelos registros.
- O acervo inclui 1 caso de toxina botulínica, 2 de facetas e 5 de rinomodelação.
- Os casos importados são publicados automaticamente e aparecem na galeria da home e em /resultados.

## 1.15.0
- Reparação idempotente do schema de Antes e Depois e das imagens editáveis do site.
- Importação do acervo inicial com tratamento de erro e confirmação no painel.
- Home em modo dinâmico para refletir imediatamente alterações de Hero/Sobre.
