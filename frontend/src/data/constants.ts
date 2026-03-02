export type Question = {
  text: string;
  options: string[];
  correctAnswer: string;
};

export const QUESTIONS: Question[] = [
  // Perguntas novas do WhatsApp
  {
    text: "Sobre comunicação profissional, é correto afirmar que:",
    options: [
      "Serve apenas para conversar com colegas durante o trabalho.",
      "Envolve clareza na fala, escuta ativa e respeito às hierarquias.",
      "Não interfere no desempenho do jovem aprendiz.",
      "É menos importante que o conhecimento técnico."
    ],
    correctAnswer: "Envolve clareza na fala, escuta ativa e respeito às hierarquias."
  },
  {
    text: "O comportamento ético do jovem aprendiz inclui:",
    options: [
      "Ignorar regras da empresa quando achar necessário.",
      "Cumprir horários, agir com respeito e responsabilidade.",
      "Falar o que pensa sem considerar o ambiente profissional.",
      "Fazer apenas o que for pedido, sem comprometimento."
    ],
    correctAnswer: "Cumprir horários, agir com respeito e responsabilidade."
  },
  {
    text: "Por que a segurança no ambiente de trabalho é fundamental?",
    options: [
      "Para evitar acidentes e proteger a saúde dos trabalhadores.",
      "Para aumentar apenas o lucro da empresa.",
      "Para deixar o ambiente mais silencioso.",
      "Para diminuir o número de funcionários."
    ],
    correctAnswer: "Para evitar acidentes e proteger a saúde dos trabalhadores."
  },
  {
    text: "Como o respeito contribui para o bem-estar no ambiente de trabalho?",
    options: [
      "Criando conflitos entre colegas.",
      "Melhorando a convivência e o trabalho em equipe.",
      "Aumentando a competitividade negativa.",
      "Gerando desentendimentos frequentes."
    ],
    correctAnswer: "Melhorando a convivência e o trabalho em equipe."
  },
  {
    text: "Um jovem aprendiz relata que na empresa onde trabalha não recebe orientações claras sobre suas funções...",
    options: [
      "A empresa está agindo corretamente, pois o jovem precisa aprender sozinho para desenvolver autonomia.",
      "A empresa deveria oferecer acompanhamento, orientação e feedback, facilitando a adaptação e o desenvolvimento profissional.",
      "A responsabilidade é exclusivamente da instituição formadora.",
      "O jovem não deve demonstrar insegurança no ambiente de trabalho."
    ],
    correctAnswer: "A empresa deveria oferecer acompanhamento, orientação e feedback, facilitando a adaptação e o desenvolvimento profissional."
  },
  {
    text: "Sobre a integração do jovem aprendiz ao mercado de trabalho, analise as afirmativas: I – A empresa é responsável por proporcionar experiência prática supervisionada. II – A instituição formadora contribui com formação teórica e desenvolvimento de competências socioemocionais. III – O processo de integração depende apenas do esforço individual do jovem. Está correto o que se afirma em:",
    options: [
      "Apenas I",
      "Apenas I e II",
      "Apenas II e III",
      "I, II e III"
    ],
    correctAnswer: "Apenas I e II"
  },
  {
    text: "Sobre a jornada de trabalho do Jovem Aprendiz, é correto afirmar que:",
    options: [
      "Pode ultrapassar 10 horas diárias.",
      "É de 6 horas diárias para quem não concluiu o Ensino Fundamental.",
      "É sempre de 8 horas, independentemente da escolaridade.",
      "Não tem limite definido por lei."
    ],
    correctAnswer: "É de 6 horas diárias para quem não concluiu o Ensino Fundamental."
  },
  {
    text: "Qual é um dever do Jovem Aprendiz?",
    options: [
      "Trabalhar sem precisar estudar.",
      "Comparecer apenas às aulas práticas.",
      "Respeitar horários e normas da empresa.",
      "Escolher se quer receber 13º salário."
    ],
    correctAnswer: "Respeitar horários e normas da empresa."
  },
  {
    text: "O principal objetivo do programa Jovem Aprendiz é:",
    options: [
      "Oferecer emprego fixo e permanente para todos os jovens.",
      "Permitir que o jovem una a prática do trabalho ao aprendizado teórico, contribuindo para seu desenvolvimento profissional e pessoal.",
      "Substituir funcionários mais experientes por jovens.",
      "Garantir aumento de salário imediato ao jovem."
    ],
    correctAnswer: "Permitir que o jovem una a prática do trabalho ao aprendizado teórico, contribuindo para seu desenvolvimento profissional e pessoal."
  },
  {
    text: "Qual das alternativas apresenta características do perfil do jovem aprendiz?",
    options: [
      "Falta de compromisso e desinteresse pelo curso.",
      "Experiência profissional avançada e liderança imediata.",
      "Vontade de aprender, responsabilidade, boa comunicação e trabalho em equipe.",
      "Autonomia total sem necessidade de orientação."
    ],
    correctAnswer: "Vontade de aprender, responsabilidade, boa comunicação e trabalho em equipe."
  },
  {
    text: "Qual é um dos principais benefícios do acolhimento no primeiro dia de trabalho?",
    options: [
      "Aumentar a cobrança por resultados imediatos",
      "Reduzir a ansiedade e facilitar a adaptação do colaborador",
      "Diminuir a comunicação entre a equipe",
      "Evitar apresentar a cultura da empresa"
    ],
    correctAnswer: "Reduzir a ansiedade e facilitar a adaptação do colaborador"
  },
  {
    text: "O acolhimento adequado no primeiro dia contribui principalmente para:",
    options: [
      "Isolar o novo funcionário para que aprenda sozinho",
      "Aumentar a competitividade interna",
      "Fortalecer o sentimento de pertencimento e engajamento",
      "Delegar todas as responsabilidades imediatamente"
    ],
    correctAnswer: "Fortalecer o sentimento de pertencimento e engajamento"
  },
  {
    text: "O que são Canais de orientação ao aprendiz?",
    options: [
      "Canais com fins lucrativos",
      "Canais de react",
      "Canais de TV",
      "Canais de escuta e apoio ao aprendiz"
    ],
    correctAnswer: "Canais de escuta e apoio ao aprendiz"
  },
  {
    text: "Qual a importância dos canais de orientação ao aprendiz?",
    options: [
      "Trazer dinheiro pra pagar as contas",
      "Melhorar projeto de vida",
      "Fortalecer a trajetória educacional do estudante",
      "Está presente presencial ou virtual"
    ],
    correctAnswer: "Fortalecer a trajetória educacional do estudante"
  },
  {
    text: "A cultura organizacional pode ser definida como:",
    options: [
      "Um conjunto de leis trabalhistas obrigatórias para todas as empresas.",
      "O conjunto de valores, crenças, normas e práticas que orientam o comportamento dentro da empresa.",
      "Apenas as regras formais descritas no contrato de trabalho.",
      "Um manual exclusivo para gestores da organização."
    ],
    correctAnswer: "O conjunto de valores, crenças, normas e práticas que orientam o comportamento dentro da empresa."
  },
  {
    text: "As regras de convivência no ambiente de trabalho têm como principal objetivo:",
    options: [
      "Controlar rigidamente todas as ações dos colaboradores.",
      "Substituir a cultura organizacional da empresa.",
      "Garantir um ambiente saudável, harmonioso e produtivo.",
      "Beneficiar apenas os gestores da organização."
    ],
    correctAnswer: "Garantir um ambiente saudável, harmonioso e produtivo."
  },
  {
    text: "Qual é a duração máxima da jornada de trabalho diária, de acordo com a CLT?",
    options: ["6 horas", "8 horas", "10 horas", "12 horas"],
    correctAnswer: "8 horas"
  },
  {
    text: "Qual é o adicional noturno mínimo que um trabalhador deve receber por hora trabalhada à noite?",
    options: ["10%", "20%", "30%", "40%"],
    correctAnswer: "20%"
  }
];