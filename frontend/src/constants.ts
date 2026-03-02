export type Question = {
  text: string;
  options: string[];
  correctAnswer: string;
};

export const QUESTIONS: Question[] = [
  {
    text: "Qual a idade mínima para ser um Jovem Aprendiz?",
    options: ["12 anos", "14 anos", "16 anos", "18 anos"],
    correctAnswer: "14 anos"
  },
  {
    text: "Qual a carga horária máxima diária permitida para o Jovem Aprendiz que ainda não concluiu o ensino fundamental?",
    options: ["4 horas", "6 horas", "8 horas", "10 horas"],
    correctAnswer: "6 horas"
  },
  {
    text: "O Jovem Aprendiz tem direito a férias?",
    options: ["Sim, e devem coincidir com as férias escolares", "Não, apenas após 2 anos", "Sim, mas apenas 15 dias", "Não tem direito"],
    correctAnswer: "Sim, e devem coincidir com as férias escolares"
  },
  {
    text: "Qual o prazo máximo de duração do contrato de aprendizagem?",
    options: ["1 ano", "2 anos", "3 anos", "4 anos"],
    correctAnswer: "2 anos"
  },
  {
    text: "O Jovem Aprendiz recebe FGTS?",
    options: ["Não recebe", "Sim, com alíquota de 8%", "Sim, com alíquota de 2%", "Sim, com alíquota de 4%"],
    correctAnswer: "Sim, com alíquota de 2%"
  }
];
