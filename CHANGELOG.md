# Changelog

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
