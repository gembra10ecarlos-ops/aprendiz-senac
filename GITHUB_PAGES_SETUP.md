# Instruções de Deploy no GitHub Pages

Este projeto foi adaptado para funcionar no GitHub Pages. Siga os passos abaixo para fazer o deploy:

## Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Node.js e pnpm instalados (para desenvolvimento local)

## Passos para Deploy

### 1. Criar um repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nomeie o repositório como **aprendiz-senac** (importante para que o base URL funcione corretamente)
4. Escolha "Public" para que o GitHub Pages funcione
5. Clique em "Create repository"

### 2. Clonar o repositório localmente

```bash
git clone https://github.com/seu-usuario/aprendiz-senac.git
cd aprendiz-senac
```

### 3. Copiar os arquivos do projeto

Copie todos os arquivos do projeto para o diretório clonado, mantendo a estrutura de pastas.

### 4. Fazer o commit e push dos arquivos

```bash
git add .
git commit -m "Initial commit: Quiz Jovem Aprendiz Senac"
git push origin main
```

### 5. Configurar GitHub Pages

1. No repositório do GitHub, vá para **Settings**
2. Na seção esquerda, clique em **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Em "Branch", selecione **main** e a pasta **/dist**
5. Clique em "Save"

### 6. Aguardar o deploy

O GitHub Pages vai compilar e fazer o deploy automaticamente. Você pode acompanhar o progresso na aba "Actions" do repositório.

Após alguns minutos, o site estará disponível em:
```
https://seu-usuario.github.io/aprendiz-senac/
```

## Atualizações Futuras

Sempre que quiser atualizar o site:

1. Faça as alterações no código
2. Execute `pnpm build` para gerar a pasta `dist` atualizada
3. Faça o commit e push:
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push origin main
   ```

O GitHub Pages vai detectar as mudanças e fazer o deploy automaticamente.

## Configurações Importantes

- **Base URL**: O projeto está configurado com `base: '/aprendiz-senac/'` no `vite.config.ts`
- **Arquivo .nojekyll**: Presente na pasta `dist` para desabilitar o Jekyll
- **Estrutura de pastas**: O `dist` é a pasta que será servida pelo GitHub Pages

## Troubleshooting

### O site não carrega corretamente

- Verifique se o nome do repositório é **aprendiz-senac**
- Verifique se a pasta de source no GitHub Pages está configurada como `/dist`
- Limpe o cache do navegador (Ctrl+Shift+Delete ou Cmd+Shift+Delete)

### Os dados não persistem entre sessões

O aplicativo usa `localStorage` do navegador para armazenar os dados dos usuários. Isso significa que cada usuário tem seus próprios dados locais. Os dados não são sincronizados entre dispositivos diferentes.

### Erro ao fazer build localmente

Execute:
```bash
pnpm install
pnpm build
```

Se o problema persistir, delete a pasta `node_modules` e `dist`, depois execute novamente.

## Estrutura do Projeto

```
aprendiz-senac/
├── frontend/
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── constants.ts
│       └── services/
│           └── storageService.ts
├── dist/                    # Pasta gerada pelo build (não editar)
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

## Suporte

Para mais informações sobre GitHub Pages, visite: https://pages.github.com/
