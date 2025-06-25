const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const arquivosProtegidos = ['cypress/e2e'];
const pastaOculta = '.protegido';
const configPath = 'config/senhas.json';

const getHash = (senha) => crypto.createHash('sha256').update(senha).digest('hex');

const validarSenhas = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const prompt = (pergunta) =>
    new Promise((resolve) => rl.question(pergunta, resolve));

  const senhas = [];
  for (let i = 1; i <= 3; i++) {
    const senha = await prompt(`Digite a senha ${i}: `);
    senhas.push(getHash(senha.trim()));
  }

  rl.close();

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const match = senhas.every((s, i) => s === config.hashes[i]);

  if (!match) {
    console.log('❌ Senhas incorretas. Ocultando arquivos...');
    arquivosProtegidos.forEach(dir => {
      const destino = path.join(pastaOculta, dir);
      fs.mkdirSync(path.dirname(destino), { recursive: true });
      fs.renameSync(dir, destino);
    });
    process.exit(1);
  }

  // Atualiza a data
  config.ultimaVerificacao = new Date().toISOString();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  // Restaura arquivos, se estiverem ocultos
  arquivosProtegidos.forEach(dir => {
    const origem = path.join(pastaOculta, dir);
    if (fs.existsSync(origem)) {
      fs.renameSync(origem, dir);
    }
  });

  console.log('✅ Senhas válidas. Sistema desbloqueado.');
};

validarSenhas();
